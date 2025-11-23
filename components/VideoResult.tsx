
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, {useEffect, useRef, useState} from 'react';
import { generateVideoCaption } from '../services/geminiService';
import {
  ArrowPathIcon,
  AudioLinesIcon,
  CaptionsIcon,
  DownloadIcon,
  LoaderIcon,
  MusicIcon,
  PlusIcon,
  SparklesIcon,
} from './icons';

interface VideoResultProps {
  videoUrl: string; // Reused for Image URL and Audio URL as well
  audioFile?: File | null;
  onRetry: () => void;
  onNewVideo: () => void;
  onExtend: () => void;
  canExtend: boolean;
  isImage?: boolean;
  isAudio?: boolean;
  is1080p?: boolean;
  prompt?: string;
}

const VideoResult: React.FC<VideoResultProps> = ({
  videoUrl,
  audioFile,
  onRetry,
  onNewVideo,
  onExtend,
  canExtend,
  isImage = false,
  isAudio = false,
  is1080p = false,
  prompt,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGeneratingCaptions, setIsGeneratingCaptions] = useState(false);

  useEffect(() => {
    if (audioFile && !isImage && !isAudio) {
      const url = URL.createObjectURL(audioFile);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [audioFile, isImage, isAudio]);

  // Sync audio with video
  useEffect(() => {
    if (isImage || isAudio) return;

    const video = videoRef.current;
    const audio = audioRef.current;

    if (video && audio) {
      const handlePlay = () => audio.play().catch(() => {});
      const handlePause = () => audio.pause();
      const handleSeek = () => {
        audio.currentTime = video.currentTime;
      };
      
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('seeking', handleSeek);
      video.addEventListener('waiting', handlePause);
      video.addEventListener('playing', handlePlay);

      // Loop audio if video loops
      audio.loop = true;

      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('seeking', handleSeek);
        video.removeEventListener('waiting', handlePause);
        video.removeEventListener('playing', handlePlay);
      };
    }
  }, [audioUrl, isImage, isAudio]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    let extension = 'mp4';
    let prefix = 'veo';
    
    if (isImage) {
      extension = 'jpg';
      prefix = 'imagen';
    } else if (isAudio) {
      extension = 'wav';
      prefix = 'gemini-audio';
    }
    
    // Sanitize prompt for filename
    const safePrompt = prompt
      ? prompt.substring(0, 30).replace(/[^a-z0-9]/gi, '-').toLowerCase()
      : 'creation';

    link.download = `${prefix}-${safePrompt}-${Date.now()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAutoCaption = async () => {
    if (!videoUrl || isGeneratingCaptions) return;
    
    try {
      setIsGeneratingCaptions(true);
      
      // Fetch the blob from the Object URL
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      
      const transcription = await generateVideoCaption(blob);
      
      setCaption(prev => prev ? `${prev}\n\n[Auto-Transcrição]: ${transcription}` : transcription);
    } catch (error) {
      console.error("Erro ao gerar legendas:", error);
      setCaption(prev => `${prev}\n\n[Erro]: Não foi possível gerar legendas automaticamente.`);
    } finally {
      setIsGeneratingCaptions(false);
    }
  };

  const renderContent = () => {
    if (isImage) {
      return (
         <img 
           src={videoUrl} 
           alt="Generated Image" 
           className="max-h-[70vh] object-contain"
         />
      );
    }
    
    if (isAudio) {
      return (
        <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-900/50 relative overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
             {/* Simulated waveform background */}
             <div className="flex gap-1 h-32 items-center">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-2 bg-indigo-500 animate-pulse" style={{height: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s`}} />
                ))}
             </div>
          </div>
          <div className="w-32 h-32 rounded-full bg-indigo-600/20 border-4 border-indigo-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.3)] animate-[spin_8s_linear_infinite]">
            <AudioLinesIcon className="w-16 h-16 text-indigo-400" />
          </div>
          <audio src={videoUrl} controls className="w-full max-w-md relative z-10" />
        </div>
      );
    }

    return (
      <>
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          autoPlay
          loop
          className="w-full h-full object-contain"
        />
        {audioUrl && <audio ref={audioRef} src={audioUrl} className="hidden" />}
        {audioFile && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <MusicIcon className="w-3 h-3" />
            <span>+ {audioFile.name}</span>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 p-8 bg-gray-800/50 rounded-lg border border-gray-700 shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-200">
        Sua Criação está Pronta!
      </h2>
      <div className={`w-full max-w-2xl ${isImage || isAudio ? '' : 'aspect-video'} rounded-lg overflow-hidden bg-black shadow-lg relative group flex justify-center`}>
        {renderContent()}
      </div>

      {/* Caption Input */}
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-end mb-2">
           <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block">
             Legenda / Notas
           </label>
           
           {!isImage && (
             <button 
               onClick={handleAutoCaption}
               disabled={isGeneratingCaptions}
               className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded transition-colors ${isGeneratingCaptions ? 'bg-gray-700 text-gray-400' : 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30'}`}
               title="Usar IA para transcrever o áudio do vídeo"
             >
               {isGeneratingCaptions ? (
                 <LoaderIcon className="w-3 h-3 animate-spin" />
               ) : (
                 <CaptionsIcon className="w-3 h-3" />
               )}
               {isGeneratingCaptions ? 'Transcrevendo...' : 'Gerar Legendas'}
             </button>
           )}
        </div>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Escreva algo sobre esta criação..."
          className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg p-3 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none text-sm"
          rows={3}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors">
          <ArrowPathIcon className="w-5 h-5" />
          Tentar Novamente
        </button>
        
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
          <DownloadIcon className="w-5 h-5" />
          Baixar
        </button>

        {!isImage && !isAudio && (
          <div className="relative group/extend">
            <button
              onClick={canExtend ? onExtend : undefined}
              disabled={!canExtend}
              className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all duration-300 ease-out ${
                canExtend
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 hover:shadow-lg shadow-indigo-500/20 active:scale-95'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}>
              <SparklesIcon className="w-5 h-5" />
              Estender
            </button>
            {!canExtend && is1080p && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 px-2 py-1 bg-black border border-gray-700 text-xs text-gray-300 text-center rounded shadow-lg opacity-0 group-hover/extend:opacity-100 transition-opacity pointer-events-none">
                Extensão indisponível para vídeos 1080p. Use 720p.
              </div>
            )}
          </div>
        )}

        <button
          onClick={onNewVideo}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
          <PlusIcon className="w-5 h-5" />
          Novo
        </button>
      </div>
    </div>
  );
};

export default VideoResult;
