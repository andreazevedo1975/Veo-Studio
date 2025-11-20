
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {Video} from '@google/genai';
import React, {useCallback, useEffect, useState} from 'react';
import ApiKeyDialog from './components/ApiKeyDialog';
import ExternalToolsDialog from './components/ExternalToolsDialog';
import TemplateLibrary from './components/TemplateLibrary';
import {CurvedArrowDownIcon, WrenchIcon} from './components/icons';
import LoadingIndicator from './components/LoadingIndicator';
import PromptForm from './components/PromptForm';
import VideoResult from './components/VideoResult';
import {generateVideo} from './services/geminiService';
import {
  AppState,
  GenerateVideoParams,
  GenerationMode,
  OutputFormat,
  Resolution,
  VideoFile,
} from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastConfig, setLastConfig] = useState<GenerateVideoParams | null>(
    null,
  );
  const [lastVideoObject, setLastVideoObject] = useState<Video | null>(null);
  const [lastVideoBlob, setLastVideoBlob] = useState<Blob | null>(null);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [showToolsDialog, setShowToolsDialog] = useState(false);

  // A single state to hold the initial values for the prompt form
  const [initialFormValues, setInitialFormValues] =
    useState<GenerateVideoParams | null>(null);

  // Check for API key on initial load
  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        try {
          if (!(await window.aistudio.hasSelectedApiKey())) {
            setShowApiKeyDialog(true);
          }
        } catch (error) {
          console.warn(
            'aistudio.hasSelectedApiKey check failed, assuming no key selected.',
            error,
          );
          setShowApiKeyDialog(true);
        }
      }
    };
    checkApiKey();
  }, []);

  const showStatusError = (message: string) => {
    setErrorMessage(message);
    setAppState(AppState.ERROR);
  };

  const handleGenerate = useCallback(async (params: GenerateVideoParams) => {
    if (window.aistudio) {
      try {
        if (!(await window.aistudio.hasSelectedApiKey())) {
          setShowApiKeyDialog(true);
          return;
        }
      } catch (error) {
        console.warn(
          'aistudio.hasSelectedApiKey check failed, assuming no key selected.',
          error,
        );
        setShowApiKeyDialog(true);
        return;
      }
    }

    setAppState(AppState.LOADING);
    setErrorMessage(null);
    setLastConfig(params);
    // Reset initial form values for the next fresh start
    setInitialFormValues(null);

    try {
      const {objectUrl, blob, video} = await generateVideo(params);
      setVideoUrl(objectUrl);
      setLastVideoBlob(blob);
      setLastVideoObject(video);
      setAppState(AppState.SUCCESS);
    } catch (error: any) {
      console.error('Video generation failed:', error);

      // Robust error message extraction
      let rawMessage = 'An unknown error occurred.';
      if (typeof error === 'string') {
        rawMessage = error;
      } else if (error instanceof Error) {
        rawMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        try {
          rawMessage = JSON.stringify(error);
        } catch {
          rawMessage = String(error);
        }
      }

      let userFriendlyMessage = `Falha na geração do vídeo.`;
      let shouldOpenDialog = false;
      
      // Check for Quota/429 errors in various formats (JSON string or plain text)
      const isQuotaError = 
        rawMessage.includes('429') || 
        rawMessage.includes('RESOURCE_EXHAUSTED') || 
        rawMessage.includes('quota');
      
      const isAuthError = 
        rawMessage.includes('API_KEY_INVALID') || 
        rawMessage.includes('permission denied');
      
      const isNotFound = 
        rawMessage.includes('Requested entity was not found');

      if (isNotFound) {
        userFriendlyMessage =
          'Modelo não encontrado. Verifique se sua chave de API tem acesso ao modelo Veo.';
        shouldOpenDialog = true;
      } else if (isAuthError) {
        userFriendlyMessage =
          'Chave de API inválida ou sem permissão. Selecione uma chave de API válida.';
        shouldOpenDialog = true;
      } else if (isQuotaError) {
        userFriendlyMessage =
          'Cota excedida (Erro 429). O Veo requer um projeto Google Cloud com faturamento ativado e cota disponível. Verifique seu plano.';
        // We allow them to change the key via the button in the error view, rather than forcing the dialog
        shouldOpenDialog = false; 
      } else {
        // If it's a raw JSON string, try to clean it up for display
        if (rawMessage.trim().startsWith('{')) {
           try {
             const parsed = JSON.parse(rawMessage);
             if (parsed.error && parsed.error.message) {
               userFriendlyMessage = `Erro: ${parsed.error.message}`;
             } else {
                userFriendlyMessage = `Erro na API: ${rawMessage.substring(0, 100)}...`;
             }
           } catch {
             userFriendlyMessage = `Erro: ${rawMessage}`;
           }
        } else {
           userFriendlyMessage = `Erro: ${rawMessage}`;
        }
      }

      setErrorMessage(userFriendlyMessage);
      setAppState(AppState.ERROR);

      if (shouldOpenDialog) {
        setShowApiKeyDialog(true);
      }
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (lastConfig) {
      handleGenerate(lastConfig);
    }
  }, [lastConfig, handleGenerate]);

  const handleApiKeyDialogContinue = async () => {
    setShowApiKeyDialog(false);
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
    }
    // Optionally retry immediately or let user click retry
  };

  const handleSwitchKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // If we are in error state, the user can click "Try Again" after switching
    }
  };

  const handleNewVideo = useCallback(() => {
    setAppState(AppState.IDLE);
    setVideoUrl(null);
    setErrorMessage(null);
    setLastConfig(null);
    setLastVideoObject(null);
    setLastVideoBlob(null);
    setInitialFormValues(null); // Clear the form state
  }, []);

  const handleTryAgainFromError = useCallback(() => {
    if (lastConfig) {
      setInitialFormValues(lastConfig);
      setAppState(AppState.IDLE);
      setErrorMessage(null);
    } else {
      // Fallback to a fresh start if there's no last config
      handleNewVideo();
    }
  }, [lastConfig, handleNewVideo]);

  const handleTemplateSelect = useCallback(
    (templateParams: GenerateVideoParams) => {
      setInitialFormValues(templateParams);
    },
    [],
  );

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleExtend = useCallback(async () => {
    if (lastConfig && lastVideoBlob && lastVideoObject) {
      try {
        const base64Data = await blobToBase64(lastVideoBlob);
        const file = new File([lastVideoBlob], 'last_video.mp4', {
          type: lastVideoBlob.type,
        });
        const videoFile: VideoFile = {file, base64: base64Data};

        setInitialFormValues({
          ...lastConfig, // Carry over model, aspect ratio
          mode: GenerationMode.EXTEND_VIDEO,
          prompt: '', // Start with a blank prompt
          inputVideo: videoFile, // for preview in the form
          inputVideoObject: lastVideoObject, // for the API call
          resolution: Resolution.P720, // Extend requires 720p
          // Reset other media types
          startFrame: null,
          endFrame: null,
          referenceImages: [],
          styleImage: null,
          isLooping: false,
          // Reset audio specific
          voiceName: undefined,
          // Default to MP4 if not set
          outputFormat: lastConfig.outputFormat || OutputFormat.MP4,
          audioFile: lastConfig.audioFile || null, // Keep the music if extending
        });

        setAppState(AppState.IDLE);
        setVideoUrl(null);
        setErrorMessage(null);
      } catch (error) {
        console.error('Failed to process video for extension:', error);
        const message =
          error instanceof Error ? error.message : 'An unknown error occurred.';
        showStatusError(`Falha ao preparar vídeo para extensão: ${message}`);
      }
    }
  }, [lastConfig, lastVideoBlob, lastVideoObject]);

  const renderError = (message: string) => (
    <div className="text-center bg-red-900/20 border border-red-500 p-8 rounded-lg max-w-2xl shadow-2xl">
      <h2 className="text-2xl font-bold text-red-400 mb-4">Erro na Geração</h2>
      <p className="text-red-200 mb-6 text-lg leading-relaxed">{message}</p>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={handleSwitchKey}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors border border-gray-600 shadow-sm"
        >
          Trocar Chave de API
        </button>
        
        <button
          onClick={handleTryAgainFromError}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-indigo-500/30"
        >
          Voltar e Tentar Novamente
        </button>
      </div>
    </div>
  );

  const isAudioResult = lastConfig?.mode === GenerationMode.TEXT_TO_AUDIO || lastConfig?.mode === GenerationMode.TEXT_TO_SPEECH;

  return (
    <div className="h-screen bg-black text-gray-200 flex flex-col font-sans overflow-hidden">
      {showApiKeyDialog && (
        <ApiKeyDialog onContinue={handleApiKeyDialogContinue} />
      )}
      {showToolsDialog && (
        <ExternalToolsDialog onClose={() => setShowToolsDialog(false)} />
      )}
      <header className="py-6 flex justify-between items-center px-8 relative z-10 flex-shrink-0 max-w-6xl mx-auto w-full">
        <div className="w-12"></div> {/* Spacer to balance layout */}
        <h1 className="text-5xl font-semibold tracking-wide text-center bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Veo Studio
        </h1>
        <button
          onClick={() => setShowToolsDialog(true)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 hover:border-indigo-500 transition-all text-xs font-medium text-gray-300 hover:text-white"
          title="Ferramentas para criar vídeos longos"
        >
          <WrenchIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Ferramentas de Edição</span>
        </button>
      </header>
      <main className="w-full max-w-4xl mx-auto flex-grow flex flex-col overflow-hidden relative">
        {appState === AppState.IDLE ? (
          <>
            <div className="flex-grow overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {/* Template Library replacing the placeholder */}
              <div className="flex flex-col items-center w-full pb-6">
                <div className="w-full">
                  <TemplateLibrary onSelect={handleTemplateSelect} />
                </div>

                {/* Arrow pointing down to form if space permits, or just rely on flow */}
                {!initialFormValues && (
                  <div className="mt-8 text-center opacity-40 hidden md:block">
                    <p className="text-sm text-gray-500 mb-2">
                      Ou crie do zero
                    </p>
                    <CurvedArrowDownIcon className="w-12 h-12 text-gray-700 mx-auto" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 p-4 bg-black/95 border-t border-gray-800 z-20">
              <PromptForm
                onGenerate={handleGenerate}
                initialValues={initialFormValues}
              />
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center p-4 overflow-y-auto">
            {appState === AppState.LOADING && <LoadingIndicator />}
            {appState === AppState.SUCCESS && videoUrl && (
              <VideoResult
                videoUrl={videoUrl}
                audioFile={lastConfig?.audioFile}
                onRetry={handleRetry}
                onNewVideo={handleNewVideo}
                onExtend={handleExtend}
                canExtend={lastConfig?.resolution === Resolution.P720}
                isImage={lastConfig?.mode === GenerationMode.TEXT_TO_IMAGE}
                isAudio={isAudioResult}
                is1080p={lastConfig?.resolution === Resolution.P1080}
              />
            )}
            {appState === AppState.SUCCESS &&
              !videoUrl &&
              renderError(
                'Vídeo gerado, mas a URL está faltando. Por favor, tente novamente.',
              )}
            {appState === AppState.ERROR &&
              errorMessage &&
              renderError(errorMessage)}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
