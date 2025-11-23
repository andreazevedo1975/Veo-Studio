
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
  FileImageIcon,
  FileVideoIcon,
  FilmIcon,
  FramesModeIcon,
  ImageIcon,
  LoaderIcon,
  MicIcon,
  MusicIcon,
  PlusIcon,
  RectangleStackIcon,
  ReferencesModeIcon,
  RepeatIcon,
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

const modeIcons: Record<GenerationMode, React.ReactNode> = {
  [GenerationMode.TEXT_TO_VIDEO]: <TextModeIcon className="w-5 h-5" />,
  [GenerationMode.TEXT_TO_IMAGE]: <ImageIcon className="w-5 h-5" />,
  [GenerationMode.TEXT_TO_AUDIO]: <AudioLinesIcon className="w-5 h-5" />,
  [GenerationMode.TEXT_TO_SPEECH]: <MicIcon className="w-5 h-5" />,
  [GenerationMode.FRAMES_TO_VIDEO]: <FramesModeIcon className="w-5 h-5" />,
  [GenerationMode.REFERENCES_TO_VIDEO]: (
    <ReferencesModeIcon className="w-5 h-5" />
  ),
  [GenerationMode.EXTEND_VIDEO]: <FilmIcon className="w-5 h-5" />,
};

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
              className={`w-full h-full object-cover transition-opacity ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               {isLoading ? (
                 <LoaderIcon className="w-6 h-6 animate-spin text-white" />
               ) : (
                 <span className="text-xs text-white font-medium">Trocar</span>
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
         {video ? (
          <>
            <video
              src={URL.createObjectURL(video.file)}
              muted
              loop
              className={`w-full h-full object-cover rounded-lg ${isLoading ? 'opacity-50' : ''}`}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               {isLoading ? (
                 <LoaderIcon className="w-8 h-8 animate-spin text-white" />
               ) : (
                 <div className="flex flex-col items-center">
                    <FileVideoIcon className="w-6 h-6 text-white mb-1" />
                    <span className="text-xs text-white font-medium">Trocar Vídeo</span>
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
    initialValues?.prompt ?? 'A character video, maintain visual consistency with reference images and style.'
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
  const [isModeSelectorOpen, setIsModeSelectorOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modeSelectorRef = useRef<HTMLDivElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modeSelectorRef.current &&
        !modeSelectorRef.current.contains(event.target as Node)
      ) {
        setIsModeSelectorOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      inputVideo,
      inputVideoObject,
      onGenerate,
      isLooping,
      audioFile,
    ],
  );

  const handleSelectMode = (mode: GenerationMode) => {
    setGenerationMode(mode);
    setIsModeSelectorOpen(false);
    setStartFrame(null);
    setEndFrame(null);
    setReferenceImages([]);
    setStyleImage(null);
    setInputVideo(null);
    setInputVideoObject(null);
    setIsLooping(false);

    if (mode === GenerationMode.TEXT_TO_AUDIO) {
      setDurationSeconds(30);
      if (!prompt.trim()) {
        setPrompt("Música ambiente relaxante, sons da natureza");
      }
    } else if (mode === GenerationMode.TEXT_TO_IMAGE) {
      setOutputFormat(OutputFormat.JPEG);
    } else if (mode === GenerationMode.REFERENCES_TO_VIDEO) {
      if (!prompt.trim()) {
        setPrompt('A character video, maintain visual consistency with reference images and style.');
      }
    } else {
      if (durationSeconds === 30) {
        setDurationSeconds(5);
      }
      if (outputFormat === OutputFormat.JPEG || outputFormat === OutputFormat.PNG) {
        setOutputFormat(OutputFormat.MP4);
      }
    }
  };

  const promptPlaceholder = {
    [GenerationMode.TEXT_TO_VIDEO]: 'Descreva o vídeo (Ex: praia tropical)...',
    [GenerationMode.TEXT_TO_IMAGE]: 'Descreva a imagem (Ex: astronauta no espaço)...',
    [GenerationMode.TEXT_TO_AUDIO]: 'Descreva o tipo de música...',
    [GenerationMode.TEXT_TO_SPEECH]: 'Digite o texto para narração...',
    [GenerationMode.FRAMES_TO_VIDEO]: 'Descreva o movimento...',
    [GenerationMode.REFERENCES_TO_VIDEO]: 'Adicione referências e descreva a cena...',
    [GenerationMode.EXTEND_VIDEO]: 'Descreva a continuação...',
  }[generationMode];

  const selectableModes = [
    GenerationMode.TEXT_TO_VIDEO,
    GenerationMode.TEXT_TO_IMAGE,
    GenerationMode.TEXT_TO_AUDIO,
    GenerationMode.TEXT_TO_SPEECH,
    GenerationMode.FRAMES_TO_VIDEO,
    GenerationMode.REFERENCES_TO_VIDEO,
    GenerationMode.EXTEND_VIDEO,
  ];

  const renderMediaUploads = () => {
    if (generationMode === GenerationMode.FRAMES_TO_VIDEO) {
      return (
        <div className="mb-4 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 flex flex-col gap-4" id="tour-upload">
           <div className="flex items-center justify-center gap-4 sm:gap-8">
              <div className="flex flex-col items-center">
                 <ImageUpload
                  label="Quadro Inicial"
                  image={startFrame}
                  onSelect={setStartFrame}
                  className="w-32 h-24"
                  onRemove={() => {
                    setStartFrame(null);
                    setIsLooping(false);
                  }}
                />
              </div>
              <div className="h-[2px] w-8 bg-gray-700 rounded-full" />
              <div className={`flex flex-col items-center transition-opacity ${isLooping ? 'opacity-30 pointer-events-none' : ''}`}>
                 <ImageUpload
                  label="Quadro Final"
                  image={endFrame}
                  onSelect={setEndFrame}
                  className="w-32 h-24"
                  onRemove={() => setEndFrame(null)}
                />
              </div>
           </div>
        </div>
      );
    }
    if (generationMode === GenerationMode.REFERENCES_TO_VIDEO) {
      return (
        <div className="mb-4 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700" id="tour-upload">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-3">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                <div className="p-1 bg-indigo-500/10 rounded">
                   <RectangleStackIcon className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                Imagens de Referência
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((index) => (
                  <ImageUpload
                    key={`ref-${index}`}
                    image={referenceImages[index]}
                    label={`Ref ${index + 1}`}
                    className="w-full h-24 aspect-square"
                    onSelect={(img) => {
                       setReferenceImages(prev => {
                          const newArr = [...prev];
                          newArr[index] = img;
                          return newArr;
                       });
                    }}
                    onRemove={() =>
                      setReferenceImages((imgs) =>
                        imgs.filter((_, i) => i !== index),
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (generationMode === GenerationMode.EXTEND_VIDEO) {
      return (
        <div className="mb-4 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 flex flex-col items-center justify-center gap-4" id="tour-upload">
          <VideoUpload
            label="Carregar Vídeo"
            video={inputVideo}
            onSelect={setInputVideo}
            onRemove={() => {
              setInputVideo(null);
              setInputVideoObject(null);
            }}
          />
        </div>
      );
    }
    return null;
  };

  const isAudioMode = generationMode === GenerationMode.TEXT_TO_AUDIO;
  const isSpeechMode = generationMode === GenerationMode.TEXT_TO_SPEECH;
  const isImageMode = generationMode === GenerationMode.TEXT_TO_IMAGE;

  return (
    <div className="relative w-full">
      {isSettingsOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-3 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 shadow-2xl z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
             {/* Simplified settings for free mode */}
             <div>
              <label className="text-xs block mb-1.5 font-medium text-gray-400">
                Formato
              </label>
              <CustomSelect
                label=""
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                icon={isImageMode ? <FileImageIcon className="w-4 h-4" /> : <FileVideoIcon className="w-4 h-4" />}
                disabled={isAudioMode}>
                {isImageMode ? (
                  <>
                    <option value={OutputFormat.JPEG}>JPEG</option>
                    <option value={OutputFormat.PNG}>PNG</option>
                  </>
                ) : (
                  <option value={OutputFormat.MP4}>MP4</option>
                )}
              </CustomSelect>
             </div>

             <div>
               <label className="text-xs block mb-1.5 font-medium text-gray-400">
                 Duração (s)
               </label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                   <ClockIcon className={`w-4 h-4 ${durationSeconds > 8 ? 'text-amber-500' : 'text-gray-400'}`} />
                 </div>
                 <input
                   type="number"
                   min="4"
                   value={durationSeconds}
                   onChange={(e) => setDurationSeconds(parseInt(e.target.value) || 0)}
                   onBlur={handleDurationBlur}
                   disabled={isImageMode}
                   className={`w-full bg-[#1f1f1f] border rounded-lg pl-10 pr-3 py-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${durationSeconds > 8 ? 'border-amber-500/50 text-amber-500' : 'border-gray-600 text-gray-200'}`}
                 />
               </div>
               {durationSeconds > 8 && !isAudioMode && (
                 <div className="absolute mt-2 p-3 bg-amber-900/40 border border-amber-500/30 rounded-lg backdrop-blur-md z-30 w-64 shadow-xl">
                   <div className="flex items-start gap-2">
                     <AlertTriangleIcon className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                     <div>
                       <p className="text-[11px] font-bold text-amber-400 mb-0.5">Aviso de Custo/Performance</p>
                       <p className="text-[10px] text-amber-200/80 leading-relaxed">
                         Vídeos acima de 8s podem demorar mais para processar e consumir mais créditos (se aplicável).
                       </p>
                     </div>
                   </div>
                 </div>
               )}
             </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full">
        {renderMediaUploads()}
        <div className="flex items-end gap-2 bg-[#1f1f1f] border border-gray-600 rounded-2xl p-2 shadow-lg focus-within:ring-2 focus-within:ring-emerald-500">
          <div className="relative" ref={modeSelectorRef}>
            <button
              type="button"
              id="tour-modes"
              onClick={() => setIsModeSelectorOpen((prev) => !prev)}
              className="flex shrink-0 items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
            >
              {modeIcons[generationMode]}
              <span className="font-medium text-sm whitespace-nowrap">
                {generationMode}
              </span>
            </button>
            {isModeSelectorOpen && (
              <div className="absolute bottom-full mb-2 w-60 bg-[#2c2c2e] border border-gray-600 rounded-lg shadow-xl overflow-hidden z-10">
                {selectableModes.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleSelectMode(mode)}
                    className={`w-full text-left flex items-center gap-3 p-3 hover:bg-emerald-600/50 ${generationMode === mode ? 'bg-emerald-600/30 text-white' : 'text-gray-300'}`}>
                    {modeIcons[mode]}
                    <span>{mode}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <textarea
            ref={textareaRef}
            id="tour-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={promptPlaceholder}
            className="flex-grow bg-transparent focus:outline-none resize-none text-base text-gray-200 placeholder-gray-500 max-h-48 py-2"
            rows={1}
          />
          <button
            type="button"
            id="tour-settings"
            onClick={() => setIsSettingsOpen((prev) => !prev)}
            className={`p-2.5 rounded-full hover:bg-gray-700 ${isSettingsOpen ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
            aria-label="Alternar configurações">
            <SlidersHorizontalIcon className="w-5 h-5" />
          </button>
          <div className="relative group">
            <button
              type="submit"
              id="tour-generate"
              className="p-2.5 bg-emerald-600 rounded-full hover:bg-emerald-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
              aria-label="Gerar vídeo">
              <ArrowRightIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2 px-4">
          Ferramenta 100% gratuita usando Pollinations.ai e bancos de imagem open source.
        </p>
      </form>
    </div>
  );
};

export default PromptForm;
