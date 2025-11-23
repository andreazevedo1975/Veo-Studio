
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {Video} from '@google/genai';
import React, {useCallback, useEffect, useState} from 'react';
import ExternalToolsDialog from './components/ExternalToolsDialog';
import TemplateLibrary from './components/TemplateLibrary';
import Tutorial, { TutorialStep } from './components/Tutorial';
import {CircleHelpIcon, CurvedArrowDownIcon, WrenchIcon} from './components/icons';
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

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    targetId: 'tour-templates',
    title: 'Comece Rápido',
    content: 'Escolha um destes modelos pré-configurados para garantir um resultado incrível sem esforço. Basta clicar e adaptar!'
  },
  {
    targetId: 'tour-prompt',
    title: 'Sua Visão',
    content: 'Digite aqui o que você imagina. O sistema buscará ou gerará o melhor conteúdo gratuito para sua ideia.'
  },
  {
    targetId: 'tour-modes',
    title: 'Muito mais que Vídeo',
    content: 'Clique aqui para alternar entre criar Vídeos (Stock), Imagens (IA), Músicas ou Narrações.'
  },
  {
    targetId: 'tour-settings',
    title: 'Ajustes Finos',
    content: 'Abra as configurações para definir a proporção, duração e formato do seu projeto.'
  },
  {
    targetId: 'tour-generate',
    title: 'Criar Gratuitamente',
    content: 'Quando estiver pronto, clique aqui. Esta ferramenta utiliza serviços gratuitos e bancos de imagens para criar seu conteúdo.'
  }
];

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastConfig, setLastConfig] = useState<GenerateVideoParams | null>(
    null,
  );
  const [lastVideoObject, setLastVideoObject] = useState<Video | null>(null);
  const [lastVideoBlob, setLastVideoBlob] = useState<Blob | null>(null);
  const [showToolsDialog, setShowToolsDialog] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // A single state to hold the initial values for the prompt form
  const [initialFormValues, setInitialFormValues] =
    useState<GenerateVideoParams | null>(null);

  // Check tutorial status
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('veo_tutorial_completed');
    
    if (!hasSeenTutorial && !showToolsDialog && appState === AppState.IDLE) {
      const timer = setTimeout(() => setShowTutorial(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [showToolsDialog, appState]);

  // Scroll to top when entering IDLE state
  useEffect(() => {
    if (appState === AppState.IDLE) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [appState]);

  const handleTutorialComplete = () => {
    localStorage.setItem('veo_tutorial_completed', 'true');
    setShowTutorial(false);
  };

  const showStatusError = (message: string) => {
    setErrorMessage(message);
    setAppState(AppState.ERROR);
  };

  const handleGenerate = useCallback(async (params: GenerateVideoParams) => {
    setAppState(AppState.LOADING);
    setErrorMessage(null);
    setLastConfig(params);
    setInitialFormValues(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const {objectUrl, blob, video} = await generateVideo(params);
      setVideoUrl(objectUrl);
      setLastVideoBlob(blob);
      setLastVideoObject(video);
      setAppState(AppState.SUCCESS);
    } catch (error: any) {
      console.error('Generation failed:', error);

      let rawMessage = 'Ocorreu um erro desconhecido.';
      if (typeof error === 'string') rawMessage = error;
      else if (error instanceof Error) rawMessage = error.message;

      setErrorMessage(rawMessage);
      setAppState(AppState.ERROR);
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (lastConfig) {
      handleGenerate(lastConfig);
    }
  }, [lastConfig, handleGenerate]);

  const handleNewVideo = useCallback(() => {
    setAppState(AppState.IDLE);
    setVideoUrl(null);
    setErrorMessage(null);
    setLastConfig(null);
    setLastVideoObject(null);
    setLastVideoBlob(null);
    setInitialFormValues(null);
  }, []);

  const handleTemplateSelect = useCallback(
    (templateParams: GenerateVideoParams) => {
      setInitialFormValues(templateParams);
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
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
    if (lastConfig && lastVideoBlob) {
      try {
        const base64Data = await blobToBase64(lastVideoBlob);
        const file = new File([lastVideoBlob], 'last_video.mp4', {
          type: lastVideoBlob.type,
        });
        const videoFile: VideoFile = {file, base64: base64Data};

        setInitialFormValues({
          ...lastConfig,
          mode: GenerationMode.EXTEND_VIDEO,
          prompt: '',
          inputVideo: videoFile,
          inputVideoObject: lastVideoObject,
          resolution: Resolution.P720,
          startFrame: null,
          endFrame: null,
          referenceImages: [],
          styleImage: null,
          isLooping: false,
          voiceName: undefined,
          outputFormat: lastConfig.outputFormat || OutputFormat.MP4,
          audioFile: lastConfig.audioFile || null,
          durationSeconds: lastConfig.durationSeconds ? Math.min(Math.max(lastConfig.durationSeconds, 4), 8) : 5,
        });

        setAppState(AppState.IDLE);
        setVideoUrl(null);
        setErrorMessage(null);
      } catch (error) {
        console.error('Failed to process video for extension:', error);
        showStatusError('Falha ao preparar vídeo para extensão.');
      }
    }
  }, [lastConfig, lastVideoBlob, lastVideoObject]);

  const renderError = (message: string) => (
    <div className="text-center bg-red-900/20 border border-red-500 p-8 rounded-lg max-w-2xl shadow-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-red-400 mb-4">Erro na Criação</h2>
      <p className="text-red-200 mb-6 text-lg leading-relaxed">{message}</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => handleGenerate(lastConfig!)}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );

  const isAudioResult = lastConfig?.mode === GenerationMode.TEXT_TO_AUDIO || lastConfig?.mode === GenerationMode.TEXT_TO_SPEECH;

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col font-sans">
      {showToolsDialog && (
        <ExternalToolsDialog onClose={() => setShowToolsDialog(false)} />
      )}
      <Tutorial 
        steps={TUTORIAL_STEPS}
        isActive={showTutorial && !showToolsDialog}
        onComplete={handleTutorialComplete}
        onSkip={handleTutorialComplete}
      />
      
      {/* Free Mode Banner */}
      <div className="bg-emerald-800/80 text-emerald-100 px-4 py-2 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 relative z-50">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Modo Gratuito Ativo: Usando Pollinations.ai & Banco de Dados Open Source
      </div>

      <header className="py-6 flex justify-between items-center px-8 relative z-30 max-w-6xl mx-auto w-full">
        <div className="w-24 flex items-center gap-2">
          <button 
            onClick={() => setShowTutorial(true)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
            title="Iniciar Tutorial"
          >
            <CircleHelpIcon className="w-5 h-5" />
          </button>
        </div>
        <h1 className="text-5xl font-semibold tracking-wide text-center bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
          Open Studio
        </h1>
        <button
          onClick={() => setShowToolsDialog(true)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 hover:border-indigo-500 transition-all text-xs font-medium text-gray-300 hover:text-white"
        >
          <WrenchIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Ferramentas de Edição</span>
        </button>
      </header>
      
      <main className="w-full max-w-4xl mx-auto flex-grow flex flex-col relative">
        {appState === AppState.IDLE ? (
          <>
            <div className="flex-grow p-4">
              <div className="flex flex-col items-center w-full pb-6">
                <div className="w-full">
                  <TemplateLibrary onSelect={handleTemplateSelect} />
                </div>
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
            
            <div className="w-full p-4 bg-black border-t border-gray-800 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
              <PromptForm
                onGenerate={handleGenerate}
                initialValues={initialFormValues}
              />
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center p-4 min-h-[60vh]">
            {appState === AppState.LOADING && <LoadingIndicator />}
            {appState === AppState.SUCCESS && videoUrl && (
              <VideoResult
                videoUrl={videoUrl}
                audioFile={lastConfig?.audioFile}
                onRetry={handleRetry}
                onNewVideo={handleNewVideo}
                onExtend={handleExtend}
                canExtend={false} // Extensions disabled in free mode for simplicity
                isImage={lastConfig?.mode === GenerationMode.TEXT_TO_IMAGE}
                isAudio={isAudioResult}
                is1080p={false}
                prompt={lastConfig?.prompt}
              />
            )}
            {appState === AppState.SUCCESS && !videoUrl && renderError('Erro ao recuperar conteúdo.')}
            {appState === AppState.ERROR && errorMessage && renderError(errorMessage)}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
