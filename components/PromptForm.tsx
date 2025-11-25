/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {Video} from '@google/genai';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  AspectRatio,
  GenerateVideoParams,
  GenerationMode,
  ImageFile,
  OutputFormat,
  Resolution,
  VeoModel,
  VideoFile,
} from '../types';
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  AudioLinesIcon,
  ChevronDownIcon,
  ClockIcon,
  FileVideoIcon,
  FilmIcon,
  FramesModeIcon,
  ImageIcon,
  ImagePlayIcon,
  LoaderIcon,
  MicIcon,
  PaletteIcon,
  PlusIcon,
  RectangleStackIcon,
  ReferencesModeIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  TextModeIcon,
  TvIcon,
  UploadCloudIcon,
  UserIcon,
  XMarkIcon,
} from './icons';

const aspectRatioDisplayNames: Record<AspectRatio, string> = {
  [AspectRatio.LANDSCAPE]: 'Paisagem (16:9)',
  [AspectRatio.PORTRAIT]: 'Retrato (9:16)',
};

// Configuração centralizada dos modos para as abas
const MODE_TABS = [
  { mode: GenerationMode.TEXT_TO_VIDEO, label: 'Texto', icon: <TextModeIcon className="w-4 h-4" /> },
  { mode: GenerationMode.IMAGE_TO_VIDEO, label: 'Imagem', icon: <ImagePlayIcon className="w-4 h-4" /> },
  { mode: GenerationMode.FRAMES_TO_VIDEO, label: 'Quadros', icon: <FramesModeIcon className="w-4 h-4" /> },
  { mode: GenerationMode.REFERENCES_TO_VIDEO, label: 'Ref + Estilo', icon: <ReferencesModeIcon className="w-4 h-4" /> },
  { mode: GenerationMode.EXTEND_VIDEO, label: 'Estender', icon: <FilmIcon className="w-4 h-4" /> },
  { mode: GenerationMode.TEXT_TO_IMAGE, label: 'Img Estática', icon: <ImageIcon className="w-4 h-4" /> },
  { mode: GenerationMode.TEXT_TO_AUDIO, label: 'Música', icon: <AudioLinesIcon className="w-4 h-4" /> },
  { mode: GenerationMode.TEXT_TO_SPEECH, label: 'Narração', icon: <MicIcon className="w-4 h-4" /> },
];

const fileToBase64 = <T extends {file: File; base64: string}>(
  file: File,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      if (base64) {
        resolve({file, base64} as T);
      } else {
        reject(new Error('Failed to read file as base64.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
const fileToImageFile = (file: File): Promise<ImageFile> =>
  fileToBase64<ImageFile>(file);
const fileToVideoFile = (file: File): Promise<VideoFile> =>
  fileToBase64<VideoFile>(file);

const CustomSelect: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}> = ({label, value, onChange, icon, children, disabled = false}) => (
  <div>
    <label
      className={`text-xs block mb-1.5 font-medium ${
        disabled ? 'text-gray-500' : 'text-gray-400'
      }`}>
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {icon}
      </div>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full bg-[#1f1f1f] border border-gray-600 rounded-lg pl-10 pr-8 py-2.5 appearance-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-700/50 disabled:border-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed">
        {children}
      </select>
      <ChevronDownIcon
        className={`w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
          disabled ? 'text-gray-600' : 'text-gray-400'
        }`}
      />
    </div>
  </div>
);

const ImageUpload: React.FC<{
  onSelect: (image: ImageFile) => void;
  onRemove?: () => void;
  image?: ImageFile | null;
  label: React.ReactNode;
  className?: string;
}> = ({onSelect, onRemove, image, label, className = "w-28 h-20"}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Apenas Imagens');
      setTimeout(() => setErrorMessage(null), 2000);
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const imageFile = await fileToImageFile(file);
      onSelect(imageFile);
    } catch (error) {
      console.error('Error converting file:', error);
      setErrorMessage('Erro no envio');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isLoading) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isLoading) return;
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };
  
  return (
    <div className={`relative group ${className}`}>
      <button
        type="button"
        onClick={() => !isLoading && inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        disabled={isLoading}
        className={`w-full h-full rounded-lg flex flex-col items-center justify-center transition-all duration-200 relative overflow-hidden
          ${
            errorMessage 
              ? 'bg-red-900/20 border-2 border-red-500' 
              : isLoading
                ? 'bg-gray-900 border-2 border-indigo-500 cursor-wait'
                : isDragging
                  ? 'bg-indigo-600/20 border-2 border-indigo-500 text-indigo-400 scale-[1.02]'
                  : image 
                    ? 'border border-gray-600 hover:border-gray-400' 
                    : 'bg-gray-700/30 hover:bg-gray-700/50 border-2 border-dashed border-gray-600 text-gray-400 hover:text-white'
          }
        `}
      >
        {image ? (
          <>
            <img
              src={URL.createObjectURL(image.file)}
              alt="preview"
              className={`w-full h-full object-cover transition-opacity ${isLoading ? 'opacity-40' : 'opacity-100'}`}
            />
            <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${isLoading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
               {isLoading ? (
                 <div className="flex flex-col items-center gap-1">
                   <LoaderIcon className="w-5 h-5 animate-spin text-white" />
                   <span className="text-[10px] text-white font-medium">Processando...</span>
                 </div>
               ) : (
                 <span className="text-xs text-white font-medium backdrop-blur-sm px-2 py-1 rounded-full bg-black/30">Trocar</span>
               )}
            </div>
          </>
        ) : (
          <>
            {isLoading ? (
              <LoaderIcon className="w-6 h-6 animate-spin text-indigo-400" />
            ) : errorMessage ? (
              <AlertTriangleIcon className="w-6 h-6 text-red-500" />
            ) : isDragging ? (
              <UploadCloudIcon className="w-6 h-6 animate-bounce" />
            ) : (
              <PlusIcon className="w-6 h-6" />
            )}
            <span className={`text-[10px] mt-1 font-medium px-1 truncate max-w-full ${errorMessage ? 'text-red-400' : isLoading ? 'text-indigo-300' : ''}`}>
              {errorMessage || (isLoading ? 'Carregando...' : isDragging ? 'Solte aqui' : label)}
            </span>
          </>
        )}
      </button>

      {image && !isLoading && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-900 border border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-md z-10"
          aria-label="Remover imagem">
          <XMarkIcon className="w-3 h-3" />
        </button>
      )}

      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

const VideoUpload: React.FC<{
  onSelect: (video: VideoFile) => void;
  onRemove?: () => void;
  video?: VideoFile | null;
  label: React.ReactNode;
}> = ({onSelect, onRemove, video, label}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Manage video preview URL to prevent memory leaks
  useEffect(() => {
    if (video?.file) {
      const url = URL.createObjectURL(video.file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [video]);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('video/')) {
       setErrorMessage('Apenas Vídeo');
       setTimeout(() => setErrorMessage(null), 2000);
       return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const videoFile = await fileToVideoFile(file);
      onSelect(videoFile);
    } catch (error) {
      console.error('Error converting file:', error);
      setErrorMessage('Erro no vídeo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if(!isLoading) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if(isLoading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  return (
    <div className="relative group w-full max-w-xs mx-auto">
      <button
        type="button"
        onClick={() => !isLoading && inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        disabled={isLoading}
        className={`w-full h-32 rounded-lg flex flex-col items-center justify-center transition-all duration-200 relative overflow-hidden text-center
          ${
            errorMessage
              ? 'bg-red-900/20 border-2 border-red-500'
              : isLoading
                ? 'bg-gray-900 border-2 border-indigo-500 cursor-wait'
                : isDragging
                  ? 'bg-indigo-600/20 border-2 border-indigo-500 text-indigo-400 scale-[1.02]'
                  : video
                    ? 'border border-gray-600 hover:border-gray-400'
                    : 'bg-gray-700/30 hover:bg-gray-700/50 border-2 border-dashed border-gray-600 text-gray-400 hover:text-white'
          }
        `}
      >
         {video && previewUrl ? (
          <>
            <video
              src={previewUrl}
              muted
              loop
              autoPlay
              playsInline
              className={`w-full h-full object-cover rounded-lg ${isLoading ? 'opacity-40' : ''}`}
            />
            <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${isLoading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
               {isLoading ? (
                 <div className="flex flex-col items-center gap-2">
                   <LoaderIcon className="w-8 h-8 animate-spin text-white" />
                   <span className="text-xs text-white font-medium">Processando Vídeo...</span>
                 </div>
               ) : (
                 <div className="flex flex-col items-center">
                    <FileVideoIcon className="w-6 h-6 text-white mb-1" />
                    <span className="text-xs text-white font-medium backdrop-blur-sm px-2 py-1 rounded-full bg-black/30">Trocar Vídeo</span>
                 </div>
               )}
            </div>
          </>
        ) : (
          <>
            {isLoading ? (
              <LoaderIcon className="w-8 h-8 animate-spin text-indigo-400 mb-2" />
            ) : errorMessage ? (
              <AlertTriangleIcon className="w-8 h-8 text-red-500 mb-2" />
            ) : isDragging ? (
              <UploadCloudIcon className="w-8 h-8 animate-bounce mb-2" />
            ) : (
              <PlusIcon className="w-8 h-8 mb-2" />
            )}
            <span className={`text-xs px-2 font-medium ${errorMessage ? 'text-red-400' : isLoading ? 'text-indigo-300' : ''}`}>
              {errorMessage || (isLoading ? 'Processando...' : isDragging ? 'Solte o vídeo aqui' : label)}
            </span>
          </>
        )}
      </button>

      {video && !isLoading && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 border border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-md z-10"
          aria-label="Remover vídeo">
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}

      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />
    </div>
  );
};

interface PromptFormProps {
  onGenerate: (params: GenerateVideoParams) => void;
  initialValues?: GenerateVideoParams | null;
}

const PromptForm: React.FC<PromptFormProps> = ({
  onGenerate,
  initialValues,
}) => {
  const [prompt, setPrompt] = useState(
    initialValues?.prompt ?? 'Um vídeo de personagem, mantenha a consistência visual com as imagens de referência e o estilo.'
  );
  const [model, setModel] = useState<VeoModel>(
    initialValues?.model ?? VeoModel.VEO_FAST,
  );
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(
    initialValues?.aspectRatio ?? AspectRatio.LANDSCAPE,
  );
  const [resolution, setResolution] = useState<Resolution>(
    initialValues?.resolution ?? Resolution.P720,
  );
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(
    initialValues?.outputFormat ?? OutputFormat.MP4,
  );
  const [generationMode, setGenerationMode] = useState<GenerationMode>(
    initialValues?.mode ?? GenerationMode.REFERENCES_TO_VIDEO,
  );
  const [durationSeconds, setDurationSeconds] = useState<number>(() => {
    const val = initialValues?.durationSeconds ?? 5;
    return Math.max(val, 4);
  });

  const [voiceName, setVoiceName] = useState<string>(
    initialValues?.voiceName ?? 'Puck',
  );
  const [startFrame, setStartFrame] = useState<ImageFile | null>(
    initialValues?.startFrame ?? null,
  );
  const [endFrame, setEndFrame] = useState<ImageFile | null>(
    initialValues?.endFrame ?? null,
  );
  const [referenceImages, setReferenceImages] = useState<ImageFile[]>(
    initialValues?.referenceImages ?? [],
  );
  const [styleImage, setStyleImage] = useState<ImageFile | null>(
    initialValues?.styleImage ?? null,
  );
  const [sourceImage, setSourceImage] = useState<ImageFile | null>(
    initialValues?.sourceImage ?? null,
  );
  const [inputVideo, setInputVideo] = useState<VideoFile | null>(
    initialValues?.inputVideo ?? null,
  );
  const [inputVideoObject, setInputVideoObject] = useState<Video | null>(
    initialValues?.inputVideoObject ?? null,
  );
  const [isLooping, setIsLooping] = useState(initialValues?.isLooping ?? false);
  const [audioFile, setAudioFile] = useState<File | null>(
    initialValues?.audioFile ?? null,
  );

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialValues) {
      setPrompt(initialValues.prompt ?? '');
      setModel(initialValues.model ?? VeoModel.VEO_FAST);
      setAspectRatio(initialValues.aspectRatio ?? AspectRatio.LANDSCAPE);
      setResolution(initialValues.resolution ?? Resolution.P720);
      setOutputFormat(initialValues.outputFormat ?? OutputFormat.MP4);
      setGenerationMode(initialValues.mode ?? GenerationMode.REFERENCES_TO_VIDEO);
      
      const rawDuration = initialValues.durationSeconds ?? 5;
      const clampedDuration = Math.max(rawDuration, 4);
      setDurationSeconds(clampedDuration);

      setVoiceName(initialValues.voiceName ?? 'Puck');
      setStartFrame(initialValues.startFrame ?? null);
      setEndFrame(initialValues.endFrame ?? null);
      setReferenceImages(initialValues.referenceImages ?? []);
      setStyleImage(initialValues.styleImage ?? null);
      setSourceImage(initialValues.sourceImage ?? null);
      setInputVideo(initialValues.inputVideo ?? null);
      setInputVideoObject(initialValues.inputVideoObject ?? null);
      setIsLooping(initialValues.isLooping ?? false);
      setAudioFile(initialValues.audioFile ?? null);
    }
  }, [initialValues]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [prompt]);

  const handleDurationBlur = () => {
    let d = durationSeconds;
    if (d < 4) d = 4;
    setDurationSeconds(d);
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const finalDuration = Math.max(durationSeconds, 4);

      onGenerate({
        prompt,
        model,
        aspectRatio,
        resolution,
        outputFormat,
        mode: generationMode,
        durationSeconds: finalDuration,
        voiceName,
        startFrame,
        endFrame,
        referenceImages,
        styleImage,
        sourceImage,
        inputVideo,
        inputVideoObject,
        isLooping,
        audioFile,
      });
    },
    [
      prompt,
      model,
      aspectRatio,
      resolution,
      outputFormat,
      generationMode,
      durationSeconds,
      voiceName,
      startFrame,
      endFrame,
      referenceImages,
      styleImage,
      sourceImage,
      inputVideo,
      inputVideoObject,
      onGenerate,
      isLooping,
      audioFile,
    ],
  );

  const handleSelectMode = (mode: GenerationMode) => {
    setGenerationMode(mode);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-6" id="tour-prompt">
      <div className="flex flex-wrap gap-2 justify-center mb-6 bg-gray-900/50 p-2 rounded-xl border border-gray-800" id="tour-modes">
        {MODE_TABS.map((tab) => (
          <button
            key={tab.mode}
            type="button"
            onClick={() => handleSelectMode(tab.mode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              generationMode === tab.mode
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 flex flex-col gap-4">
            {generationMode === GenerationMode.IMAGE_TO_VIDEO && (
                <ImageUpload 
                    label="Imagem de Origem" 
                    image={sourceImage} 
                    onSelect={setSourceImage} 
                    onRemove={() => setSourceImage(null)}
                    className="w-full h-40" 
                />
            )}

             {generationMode === GenerationMode.FRAMES_TO_VIDEO && (
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <ImageUpload label="Quadro Inicial" image={startFrame} onSelect={setStartFrame} onRemove={() => setStartFrame(null)} className="w-full h-32" />
                    </div>
                    <div className="text-gray-500">
                        <ArrowRightIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <ImageUpload label="Quadro Final" image={endFrame} onSelect={setEndFrame} onRemove={() => setEndFrame(null)} className="w-full h-32" />
                    </div>
                </div>
            )}

            {generationMode === GenerationMode.REFERENCES_TO_VIDEO && (
                <div className="space-y-4">
                     <div className="p-3 bg-gray-900/40 rounded-xl border border-gray-800">
                        <div className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-2">
                            <UserIcon className="w-3 h-3" />
                            Conteúdo (Personagens/Objetos)
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {[0, 1].map((i) => (
                                <ImageUpload
                                    key={i}
                                    label={`Referência ${i+1}`}
                                    image={referenceImages[i]}
                                    onSelect={(img) => {
                                        const newRefs = [...referenceImages];
                                        newRefs[i] = img;
                                        setReferenceImages(newRefs);
                                    }}
                                    onRemove={() => {
                                        const newRefs = [...referenceImages];
                                        newRefs.splice(i, 1);
                                        setReferenceImages(newRefs);
                                    }}
                                    className="w-full h-24"
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div className="p-3 bg-gray-900/40 rounded-xl border border-gray-800">
                        <div className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-2">
                            <PaletteIcon className="w-3 h-3" />
                            Estilo Visual (Vibe/Cores)
                        </div>
                        <ImageUpload label="Referência de Estilo" image={styleImage} onSelect={setStyleImage} onRemove={() => setStyleImage(null)} className="w-full h-24" />
                    </div>
                </div>
            )}

            {generationMode === GenerationMode.EXTEND_VIDEO && (
                <VideoUpload label="Vídeo para Estender" video={inputVideo} onSelect={setInputVideo} onRemove={() => setInputVideo(null)} />
            )}
        </div>

        <div className="w-full md:w-2/3 space-y-4">
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Descreva o que você quer criar em detalhes..."
                    className="w-full bg-[#1f1f1f] border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all min-h-[120px] resize-none text-base leading-relaxed"
                />
                <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                        type="button"
                        className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 transition-colors"
                        title="Otimizar Prompt"
                    >
                        <SparklesIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="border border-gray-800 rounded-xl overflow-hidden bg-[#1f1f1f]" id="tour-settings">
                <button
                    type="button"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className="w-full flex items-center justify-between p-3 bg-gray-900/50 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                    <div className="flex items-center gap-2">
                        <SlidersHorizontalIcon className="w-4 h-4" />
                        Configurações Avançadas
                    </div>
                    <ChevronDownIcon className={`w-4 h-4 transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isSettingsOpen && (
                    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-200">
                        <CustomSelect
                            label="Modelo"
                            value={model}
                            onChange={(e) => setModel(e.target.value as VeoModel)}
                            icon={<SparklesIcon className="w-4 h-4 text-gray-400" />}
                        >
                            <option value={VeoModel.VEO_FAST}>Veo Fast (Rápido)</option>
                            <option value={VeoModel.VEO}>Veo (Alta Qualidade)</option>
                            <option value={VeoModel.IMAGEN}>Imagen 3 (Imagem)</option>
                        </CustomSelect>

                        <CustomSelect
                            label="Proporção"
                            value={aspectRatio}
                            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                            icon={<RectangleStackIcon className="w-4 h-4 text-gray-400" />}
                        >
                            {Object.entries(aspectRatioDisplayNames).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </CustomSelect>

                        <CustomSelect
                            label="Resolução"
                            value={resolution}
                            onChange={(e) => setResolution(e.target.value as Resolution)}
                            icon={<TvIcon className="w-4 h-4 text-gray-400" />}
                        >
                            <option value={Resolution.P720}>720p</option>
                            <option value={Resolution.P1080}>1080p</option>
                        </CustomSelect>

                        <CustomSelect
                            label="Formato"
                            value={outputFormat}
                            onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                            icon={<FileVideoIcon className="w-4 h-4 text-gray-400" />}
                        >
                            <option value={OutputFormat.MP4}>MP4</option>
                            <option value={OutputFormat.MOV}>MOV</option>
                        </CustomSelect>

                        <div>
                            <label className="text-xs block mb-1.5 font-medium text-gray-400">Duração (s)</label>
                            <div className="relative">
                                <ClockIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="number" 
                                    min="4"
                                    max="60"
                                    value={durationSeconds}
                                    onChange={(e) => setDurationSeconds(parseInt(e.target.value))}
                                    onBlur={handleDurationBlur}
                                    className={`w-full bg-[#1f1f1f] border rounded-lg pl-10 pr-3 py-2 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                        durationSeconds > 8 ? 'border-amber-500/50 focus:border-amber-500' : 'border-gray-600'
                                    }`}
                                />
                            </div>
                        </div>

                         {generationMode === GenerationMode.TEXT_TO_SPEECH && (
                             <CustomSelect
                                label="Voz"
                                value={voiceName}
                                onChange={(e) => setVoiceName(e.target.value)}
                                icon={<MicIcon className="w-4 h-4 text-gray-400" />}
                            >
                                <option value="Puck">Puck</option>
                                <option value="Charon">Charon</option>
                                <option value="Kore">Kore</option>
                                <option value="Fenrir">Fenrir</option>
                                <option value="Aoede">Aoede</option>
                            </CustomSelect>
                         )}

                         {/* Background Music Option in Settings */}
                         {(generationMode !== GenerationMode.TEXT_TO_AUDIO && generationMode !== GenerationMode.TEXT_TO_SPEECH) && (
                            <div>
                                <label className="text-xs block mb-1.5 font-medium text-gray-400">Música de Fundo (MP3, WAV)</label>
                                <div className="relative">
                                    <input 
                                        type="file" 
                                        accept="audio/mpeg, audio/wav, audio/mp3" 
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) setAudioFile(file);
                                        }}
                                        className="hidden"
                                        id="bg-music-upload-settings"
                                    />
                                    <label 
                                        htmlFor="bg-music-upload-settings"
                                        className="w-full bg-[#1f1f1f] border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white hover:border-gray-500 cursor-pointer flex items-center gap-2 truncate transition-colors"
                                    >
                                        <AudioLinesIcon className="w-4 h-4 flex-shrink-0 text-gray-400" />
                                        <span className="truncate">
                                            {audioFile ? audioFile.name : 'Carregar Áudio'}
                                        </span>
                                    </label>
                                    {audioFile && (
                                        <button 
                                            type="button"
                                            onClick={() => setAudioFile(null)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-red-400 transition-colors"
                                            title="Remover áudio"
                                        >
                                            <XMarkIcon className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            </div>
                         )}
                         
                         {/* Loop Checkbox in Settings */}
                         {(generationMode === GenerationMode.TEXT_TO_VIDEO || generationMode === GenerationMode.EXTEND_VIDEO) && (
                            <div className="flex items-end pb-2">
                                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isLooping ? 'bg-indigo-600 border-indigo-600' : 'bg-[#1f1f1f] border-gray-600 group-hover:border-gray-500'}`}>
                                        {isLooping && <SparklesIcon className="w-3 h-3 text-white" />}
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        checked={isLooping} 
                                        onChange={(e) => setIsLooping(e.target.checked)}
                                        className="hidden" 
                                    />
                                    <span>Vídeo em Loop</span>
                                </label>
                            </div>
                         )}
                    </div>
                )}

                 {/* Warning for long durations */}
                 {isSettingsOpen && durationSeconds > 8 && (
                    <div className="mx-4 mb-4 p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg flex items-start gap-3">
                        <AlertTriangleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-amber-200/80 leading-relaxed">
                            <strong className="text-amber-400 block mb-1">Duração Estendida</strong>
                            Vídeos acima de 8 segundos podem demorar mais para processar ou falhar devido a limites de cota da API. Se falhar, tente reduzir para 5-8s e use a função "Estender".
                        </div>
                    </div>
                )}
            </div>

            <button
                type="submit"
                id="tour-generate"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
                <SparklesIcon className="w-5 h-5" />
                Gerar Conteúdo
            </button>
        </div>
      </div>
    </form>
  );
};

export default PromptForm;