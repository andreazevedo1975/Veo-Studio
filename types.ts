
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {Video} from '@google/genai';

export enum AppState {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

export enum VeoModel {
  VEO_FAST = 'veo-3.1-fast-generate-preview',
  VEO = 'veo-3.1-generate-preview',
  IMAGEN = 'imagen-3.0-generate-002',
  GEMINI_AUDIO = 'gemini-2.5-flash-native-audio-preview-09-2025',
  GEMINI_TTS = 'gemini-2.5-flash-preview-tts',
}

export enum AspectRatio {
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
}

export enum Resolution {
  P720 = '720p',
  P1080 = '1080p',
}

export enum OutputFormat {
  MP4 = 'mp4',
  MOV = 'mov',
  JPEG = 'jpeg',
  PNG = 'png',
}

export enum GenerationMode {
  TEXT_TO_VIDEO = 'Texto para Vídeo',
  TEXT_TO_IMAGE = 'Texto para Imagem Estática',
  TEXT_TO_AUDIO = 'Texto para Música',
  TEXT_TO_SPEECH = 'Texto para Narração',
  FRAMES_TO_VIDEO = 'Quadros para Vídeo',
  REFERENCES_TO_VIDEO = 'Referências para Vídeo',
  EXTEND_VIDEO = 'Estender Vídeo',
}

export interface ImageFile {
  file: File;
  base64: string;
}

export interface VideoFile {
  file: File;
  base64: string;
}

export interface GenerateVideoParams {
  prompt: string;
  model: VeoModel;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  outputFormat: OutputFormat;
  mode: GenerationMode;
  durationSeconds?: number;
  voiceName?: string;
  startFrame?: ImageFile | null;
  endFrame?: ImageFile | null;
  referenceImages?: ImageFile[];
  styleImage?: ImageFile | null;
  inputVideo?: VideoFile | null;
  inputVideoObject?: Video | null;
  isLooping?: boolean;
  audioFile?: File | null;
  useMock?: boolean; // Flag para modo de teste gratuito
}
