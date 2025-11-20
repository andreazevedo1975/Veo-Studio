
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
  ArrowRightIcon,
  AudioLinesIcon,
  ChevronDownIcon,
  ClockIcon,
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
}> = ({onSelect, onRemove, image, label}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsLoading(true);
    try {
      const imageFile = await fileToImageFile(file);
      onSelect(imageFile);
    } catch (error) {
      console.error('Error converting file:', error);
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
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  if (image) {
    return (
      <div className="relative w-28 h-20 group">
        <img
          src={URL.createObjectURL(image.file)}
          alt="preview"
          className="w-full h-full object-cover rounded-lg border border-gray-600"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Remover imagem">
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => !isLoading && inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      disabled={isLoading}
      className={`w-28 h-20 rounded-lg flex flex-col items-center justify-center transition-all duration-200 relative overflow-hidden
        ${
          isLoading
            ? 'bg-gray-800 border-2 border-indigo-500/50 cursor-wait'
            : isDragging
            ? 'bg-indigo-600/20 border-2 border-indigo-500 text-indigo-400 scale-105'
            : 'bg-gray-700/30 hover:bg-gray-700/50 border-2 border-dashed border-gray-600 text-gray-400 hover:text-white'
        }
      `}>
      {isLoading ? (
        <LoaderIcon className="w-6 h-6 animate-spin text-indigo-400" />
      ) : isDragging ? (
        <UploadCloudIcon className="w-6 h-6 animate-bounce" />
      ) : (
        <PlusIcon className="w-6 h-6" />
      )}
      <span className="text-[10px] mt-1 font-medium px-2 truncate max-w-full">
        {isLoading ? 'Processando...' : isDragging ? 'Solte aqui' : label}
      </span>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </button>
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

  const processFile = async (file: File) => {
    if (!file.type.startsWith('video/')) return;
    setIsLoading(true);
    try {
      const videoFile = await fileToVideoFile(file);
      onSelect(videoFile);
    } catch (error) {
      console.error('Error converting file:', error);
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
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  if (video) {
    return (
      <div className="relative w-48 h-28 group">
        <video
          src={URL.createObjectURL(video.file)}
          muted
          loop
          className="w-full h-full object-cover rounded-lg border border-gray-600"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Remover vídeo">
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => !isLoading && inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      disabled={isLoading}
      className={`w-48 h-28 rounded-lg flex flex-col items-center justify-center transition-all duration-200 relative overflow-hidden text-center
        ${
          isLoading
            ? 'bg-gray-800 border-2 border-indigo-500/50 cursor-wait'
            : isDragging
            ? 'bg-indigo-600/20 border-2 border-indigo-500 text-indigo-400 scale-105'
            : 'bg-gray-700/30 hover:bg-gray-700/50 border-2 border-dashed border-gray-600 text-gray-400 hover:text-white'
        }
      `}>
      {isLoading ? (
        <LoaderIcon className="w-6 h-6 animate-spin text-indigo-400 mb-1" />
      ) : isDragging ? (
        <UploadCloudIcon className="w-6 h-6 animate-bounce mb-1" />
      ) : (
        <PlusIcon className="w-6 h-6 mb-1" />
      )}
      <span className="text-[10px] px-2 font-medium">
        {isLoading ? 'Processando...' : isDragging ? 'Solte o vídeo' : label}
      </span>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />
    </button>
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
  const [prompt, setPrompt] = useState(initialValues?.prompt ?? '');
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
    initialValues?.mode ?? GenerationMode.TEXT_TO_VIDEO,
  );
  const [durationSeconds, setDurationSeconds] = useState<number>(
    initialValues?.durationSeconds ?? 5,
  );
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

  // Sync state with initialValues prop when it changes (e.g., for "Extend" or "Try Again")
  useEffect(() => {
    if (initialValues) {
      setPrompt(initialValues.prompt ?? '');
      setModel(initialValues.model ?? VeoModel.VEO_FAST);
      setAspectRatio(initialValues.aspectRatio ?? AspectRatio.LANDSCAPE);
      setResolution(initialValues.resolution ?? Resolution.P720);
      setOutputFormat(initialValues.outputFormat ?? OutputFormat.MP4);
      setGenerationMode(initialValues.mode ?? GenerationMode.TEXT_TO_VIDEO);
      setDurationSeconds(initialValues.durationSeconds ?? 5);
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
    if (generationMode === GenerationMode.REFERENCES_TO_VIDEO) {
      setModel(VeoModel.VEO);
      setAspectRatio(AspectRatio.LANDSCAPE);
      setResolution(Resolution.P720);
    } else if (generationMode === GenerationMode.EXTEND_VIDEO) {
      setResolution(Resolution.P720);
    }
  }, [generationMode]);

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

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onGenerate({
        prompt,
        model,
        aspectRatio,
        resolution,
        outputFormat,
        mode: generationMode,
        durationSeconds,
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
    // Reset media when mode changes to avoid confusion
    setStartFrame(null);
    setEndFrame(null);
    setReferenceImages([]);
    setStyleImage(null);
    setInputVideo(null);
    setInputVideoObject(null);
    setIsLooping(false);
  };

  const promptPlaceholder = {
    [GenerationMode.TEXT_TO_VIDEO]: 'Descreva o vídeo que você deseja criar...',
    [GenerationMode.TEXT_TO_IMAGE]: 'Descreva a imagem que você deseja criar...',
    [GenerationMode.TEXT_TO_AUDIO]: 'Descreva a música ou som que você deseja criar...',
    [GenerationMode.TEXT_TO_SPEECH]: 'Digite o texto para ser narrado...',
    [GenerationMode.FRAMES_TO_VIDEO]:
      'Descreva o movimento entre os quadros (opcional)...',
    [GenerationMode.REFERENCES_TO_VIDEO]:
      'Descreva o vídeo combinando as referências visuais...',
    [GenerationMode.EXTEND_VIDEO]: 'Descreva o que acontece em seguida (opcional)...',
  }[generationMode];

  const selectableModes = [
    GenerationMode.TEXT_TO_VIDEO,
    GenerationMode.TEXT_TO_IMAGE,
    GenerationMode.TEXT_TO_AUDIO,
    GenerationMode.TEXT_TO_SPEECH,
    GenerationMode.FRAMES_TO_VIDEO,
    GenerationMode.REFERENCES_TO_VIDEO,
  ];

  const renderMediaUploads = () => {
    if (generationMode === GenerationMode.FRAMES_TO_VIDEO) {
      return (
        <div className="mb-4 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <ImageUpload
              label="Quadro Inicial"
              image={startFrame}
              onSelect={setStartFrame}
              onRemove={() => {
                setStartFrame(null);
                setIsLooping(false);
              }}
            />
            {!isLooping && (
              <ImageUpload
                label="Quadro Final"
                image={endFrame}
                onSelect={setEndFrame}
                onRemove={() => setEndFrame(null)}
              />
            )}
          </div>
          {startFrame && !endFrame && (
            <div className="mt-1 flex items-center">
              <input
                id="loop-video-checkbox"
                type="checkbox"
                checked={isLooping}
                onChange={(e) => setIsLooping(e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 focus:ring-offset-gray-800 cursor-pointer"
              />
              <label
                htmlFor="loop-video-checkbox"
                className="ml-2 text-sm font-medium text-gray-300 cursor-pointer">
                Criar vídeo em loop
              </label>
            </div>
          )}
        </div>
      );
    }
    if (generationMode === GenerationMode.REFERENCES_TO_VIDEO) {
      return (
        <div className="mb-4 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Assets Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-300 flex items-center gap-1">
                  <RectangleStackIcon className="w-3 h-3" />
                  Conteúdo (Personagens/Objetos)
                </label>
                <span className="text-[10px] px-1.5 py-0.5 bg-gray-800 rounded text-gray-400">
                  {referenceImages.length} / 3
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {referenceImages.map((img, index) => (
                  <ImageUpload
                    key={`ref-${index}`}
                    image={img}
                    label=""
                    onSelect={() => {}}
                    onRemove={() =>
                      setReferenceImages((imgs) =>
                        imgs.filter((_, i) => i !== index),
                      )
                    }
                  />
                ))}
                {referenceImages.length < 3 && (
                  <ImageUpload
                    label="Adicionar"
                    onSelect={(img) =>
                      setReferenceImages((imgs) => [...imgs, img])
                    }
                  />
                )}
              </div>
              <p className="text-[10px] text-gray-500 leading-tight">
                Adicione imagens para definir a aparência dos elementos no
                vídeo.
              </p>
            </div>

            {/* Style Section */}
            <div className="flex flex-col gap-2 md:border-l md:border-gray-700 md:pl-6">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1">
                <SparklesIcon className="w-3 h-3" />
                Estilo Visual (Separado)
              </label>
              <div>
                <ImageUpload
                  label="Imagem de Estilo"
                  image={styleImage}
                  onSelect={setStyleImage}
                  onRemove={() => setStyleImage(null)}
                />
              </div>
              <p className="text-[10px] text-gray-500 leading-tight">
                Carregue uma imagem separada para influenciar a estética geral (iluminação, cores, estilo artístico) do vídeo gerado.
              </p>
            </div>
          </div>
        </div>
      );
    }
    if (generationMode === GenerationMode.EXTEND_VIDEO) {
      return (
        <div className="mb-4 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 flex items-center justify-center gap-4">
          <VideoUpload
            label={
              <>
                Vídeo de Entrada
                <br />
                (deve ser 720p gerado no Veo)
              </>
            }
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

  const isRefMode = generationMode === GenerationMode.REFERENCES_TO_VIDEO;
  const isExtendMode = generationMode === GenerationMode.EXTEND_VIDEO;
  const isImageMode = generationMode === GenerationMode.TEXT_TO_IMAGE;
  const isAudioMode = generationMode === GenerationMode.TEXT_TO_AUDIO;
  const isSpeechMode = generationMode === GenerationMode.TEXT_TO_SPEECH;

  let isSubmitDisabled = false;
  let tooltipText = '';

  switch (generationMode) {
    case GenerationMode.TEXT_TO_VIDEO:
    case GenerationMode.TEXT_TO_IMAGE:
    case GenerationMode.TEXT_TO_AUDIO:
    case GenerationMode.TEXT_TO_SPEECH:
      isSubmitDisabled = !prompt.trim();
      if (isSubmitDisabled) {
        tooltipText = 'Por favor, insira um prompt.';
      }
      break;
    case GenerationMode.FRAMES_TO_VIDEO:
      isSubmitDisabled = !startFrame;
      if (isSubmitDisabled) {
        tooltipText = 'Um quadro inicial é obrigatório.';
      }
      break;
    case GenerationMode.REFERENCES_TO_VIDEO:
      const hasNoRefs = referenceImages.length === 0;
      const hasNoPrompt = !prompt.trim();
      const hasNoImages = hasNoRefs && !styleImage;
      
      isSubmitDisabled = hasNoImages || hasNoPrompt;
      
      if (hasNoImages && hasNoPrompt) {
        tooltipText = 'Adicione uma imagem de referência e insira um prompt.';
      } else if (hasNoImages) {
        tooltipText = 'Pelo menos uma imagem (Conteúdo ou Estilo) é necessária.';
      } else if (hasNoPrompt) {
        tooltipText = 'Por favor, insira um prompt.';
      }
      break;
    case GenerationMode.EXTEND_VIDEO:
      isSubmitDisabled = !inputVideoObject;
      if (isSubmitDisabled) {
        tooltipText =
          'Um vídeo de entrada de uma geração anterior é necessário para estender.';
      }
      break;
  }

  return (
    <div className="relative w-full">
      {isSettingsOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-3 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 shadow-2xl z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {isSpeechMode ? (
              <CustomSelect
                label="Voz"
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
                icon={<UserIcon className="w-5 h-5 text-gray-400" />}
                disabled={false}>
                {['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </CustomSelect>
            ) : (
              <CustomSelect
                label="Modelo"
                value={model}
                onChange={(e) => setModel(e.target.value as VeoModel)}
                icon={<SparklesIcon className="w-5 h-5 text-gray-400" />}
                disabled={isRefMode || isImageMode || isAudioMode}>
                {Object.values(VeoModel).map((modelValue) => (
                  <option key={modelValue} value={modelValue}>
                    {modelValue}
                  </option>
                ))}
              </CustomSelect>
            )}
            
            <CustomSelect
              label="Proporção"
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
              icon={<RectangleStackIcon className="w-5 h-5 text-gray-400" />}
              disabled={isRefMode || isExtendMode || isAudioMode || isSpeechMode}>
              {Object.entries(aspectRatioDisplayNames).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </CustomSelect>
            <div>
              <CustomSelect
                label="Resolução"
                value={resolution}
                onChange={(e) => setResolution(e.target.value as Resolution)}
                icon={<TvIcon className="w-5 h-5 text-gray-400" />}
                disabled={isRefMode || isExtendMode || isImageMode || isAudioMode || isSpeechMode}>
                <option value={Resolution.P720}>720p</option>
                <option value={Resolution.P1080}>1080p</option>
              </CustomSelect>
              {resolution === Resolution.P1080 && !isImageMode && !isAudioMode && !isSpeechMode && (
                <p className="text-xs text-yellow-400/80 mt-2">
                  Vídeos em 1080p não podem ser estendidos.
                </p>
              )}
            </div>
             <CustomSelect
              label="Formato de Saída"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
              icon={<FileVideoIcon className="w-5 h-5 text-gray-400" />}
              disabled={isImageMode || isAudioMode || isSpeechMode}>
              <option value={OutputFormat.MP4}>MP4</option>
              <option value={OutputFormat.MOV}>MOV</option>
            </CustomSelect>
            <div className="flex flex-col">
              <label className="text-xs block mb-1.5 font-medium text-gray-400">
                Duração (seg)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={durationSeconds}
                  onChange={(e) => setDurationSeconds(Number(e.target.value))}
                  min={4}
                  max={8} // Enforcing API limit
                  step={1}
                  disabled={isRefMode || isExtendMode || isImageMode || isAudioMode || isSpeechMode}
                  className="w-full bg-[#1f1f1f] border border-gray-600 rounded-lg pl-10 pr-3 py-2.5 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-700/50 disabled:border-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-gray-200"
                />
              </div>
              <p className="text-[10px] text-gray-500 mt-1 leading-tight">
                Max: 8s. Use "Estender" para vídeos mais longos.
              </p>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full">
        {renderMediaUploads()}
        {audioFile && (
          <div className="mb-2 flex items-center w-max bg-[#1f1f1f] border border-indigo-500/50 rounded-lg px-3 py-1.5 text-xs text-gray-200">
            <MusicIcon className="w-3.5 h-3.5 mr-2 text-indigo-400" />
            <span className="max-w-[200px] truncate">{audioFile.name}</span>
            <button
              onClick={() => {
                setAudioFile(null);
                if (audioInputRef.current) audioInputRef.current.value = '';
              }}
              className="ml-2 p-0.5 hover:bg-gray-700 rounded-full"
              aria-label="Remover áudio">
              <XMarkIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        <div className="flex items-end gap-2 bg-[#1f1f1f] border border-gray-600 rounded-2xl p-2 shadow-lg focus-within:ring-2 focus-within:ring-indigo-500">
          <div className="relative" ref={modeSelectorRef}>
            <button
              type="button"
              onClick={() => setIsModeSelectorOpen((prev) => !prev)}
              className="flex shrink-0 items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
              aria-label="Selecionar modo de geração">
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
                    className={`w-full text-left flex items-center gap-3 p-3 hover:bg-indigo-600/50 ${generationMode === mode ? 'bg-indigo-600/30 text-white' : 'text-gray-300'}`}>
                    {modeIcons[mode]}
                    <span>{mode}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={promptPlaceholder}
            className="flex-grow bg-transparent focus:outline-none resize-none text-base text-gray-200 placeholder-gray-500 max-h-48 py-2"
            rows={1}
          />
          <button
            type="button"
            onClick={() => audioInputRef.current?.click()}
            className={`p-2.5 rounded-full hover:bg-gray-700 transition-colors ${audioFile ? 'bg-indigo-900/50 text-indigo-400' : 'text-gray-300'}`}
            aria-label="Adicionar música de fundo"
            disabled={isAudioMode || isSpeechMode}
            title="Adicionar música de fundo">
            <MusicIcon className="w-5 h-5" />
          </button>
          <input
            type="file"
            ref={audioInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) setAudioFile(e.target.files[0]);
              e.target.value = '';
            }}
            accept="audio/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => setIsSettingsOpen((prev) => !prev)}
            className={`p-2.5 rounded-full hover:bg-gray-700 ${isSettingsOpen ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
            aria-label="Alternar configurações">
            <SlidersHorizontalIcon className="w-5 h-5" />
          </button>
          <div className="relative group">
            <button
              type="submit"
              className="p-2.5 bg-indigo-600 rounded-full hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
              aria-label="Gerar vídeo"
              disabled={isSubmitDisabled}>
              <ArrowRightIcon className="w-5 h-5 text-white" />
            </button>
            {isSubmitDisabled && tooltipText && (
              <div
                role="tooltip"
                className="absolute bottom-full right-0 mb-2 w-max max-w-xs px-3 py-1.5 bg-gray-900 border border-gray-700 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {tooltipText}
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2 px-4">
          O Veo é um modelo pago. Você será cobrado em seu projeto Cloud. Veja os{' '}
          <a
            href="https://ai.google.dev/gemini-api/docs/pricing#veo-3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline"
          >
            detalhes de preço
          </a>
          .
        </p>
      </form>
    </div>
  );
};

export default PromptForm;
