
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Video } from '@google/genai';
import { GenerateVideoParams, GenerationMode, OutputFormat } from '../types';

// --- ASSET LIBRARIES FOR FREE MODE ---

// Mapeamento inteligente de vídeos de amostra do Google para "Vibes" e Tópicos.
// Usamos vídeos diferentes para categorias diferentes para simular variedade.
const STOCK_VIDEOS: Record<string, string[]> = {
  // --- NATUREZA & PAZ ---
  natureza: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", // Natureza
  ],
  praia: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  ],
  mar: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  ],
  paz: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  ],
  zen: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  ],

  // --- AÇÃO & ESPORTES & VELOCIDADE ---
  esportes: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", // Ação/Carros
  ],
  carros: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  ],
  velocidade: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  ],
  corrida: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  ],
  trap: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", // Carros de luxo
  ],

  // --- TECNOLOGIA & SCI-FI & INDUSTRIAL ---
  tecnologia: [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", // Sci-Fi
  ],
  cyberpunk: [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  ],
  espaco: [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  ],
  futuro: [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  ],
  rock: [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", // Vibe industrial/pesada
  ],
  metal: [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  ],
  punk: [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  ],
  techno: [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  ],
  cidade: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  ],
  urbano: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  ],

  // --- FANTASIA & DRAMA & EMOÇÃO ---
  fantasia: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", // Fantasia/Dragão
  ],
  historia: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  ],
  tristeza: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", // Tem cenas tristes
  ],
  dor: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  ],
  solidao: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  ],
  medo: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", // Dragão/Ameaça
  ],
  terror: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  ],

  // --- ALEGRIA & LIFESTYLE & FAMÍLIA ---
  alegria: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", // Lifestyle/Happy
  ],
  felicidade: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  ],
  familia: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  ],
  amigos: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  ],
  festa: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  ],
  comida: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  ],

  // --- ANIMAÇÃO & FOFURA & ESTRANHO ---
  animacao: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Cartoon
  ],
  fofo: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  ],
  animal: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  ],
  engracado: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  ],
  abstrato: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Surreal
  ],
  sonho: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  ],
  confusao: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  ],

  // Fallback
  default: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
  ]
};

// Expanded Audio Library
const STOCK_AUDIO: Record<string, string[]> = {
  // Relaxing
  relaxante: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"],
  calmo: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"],
  zen: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"],
  paz: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"],
  tristeza: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"], // Slower
  melancolia: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"],

  // Upbeat / Energetic
  agitado: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"],
  energia: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"],
  festa: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"],
  pop: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"],
  alegria: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"],

  // Genres
  rock: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"], // More intense
  metal: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"],
  eletronica: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"],
  techno: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"],
  jazz: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"], // Smoother
  blues: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"],
  classico: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"], // Piano-ish
  piano: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"],

  default: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"]
};

// Helper to select best matching asset
const getBestMatch = (prompt: string, library: Record<string, string[]>): string => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Check specifically for keys present in the prompt
  for (const key in library) {
    if (key !== 'default' && lowerPrompt.includes(key)) {
      const items = library[key];
      // Deterministic randomness based on prompt length to keep it consistent per prompt but random per topic
      const index = prompt.length % items.length;
      return items[index];
    }
  }
  
  // If no specific match, pick a random default
  const defaults = library.default;
  return defaults[Math.floor(Math.random() * defaults.length)];
};

const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, {type: contentType});
};

const writeWavHeader = (sampleRate: number, dataLength: number, numChannels: number) => {
  const buffer = new ArrayBuffer(44);
  const view = new DataView(buffer);
  view.setUint8(0, 'R'.charCodeAt(0)); view.setUint8(1, 'I'.charCodeAt(0)); view.setUint8(2, 'F'.charCodeAt(0)); view.setUint8(3, 'F'.charCodeAt(0));
  view.setUint32(4, 36 + dataLength, true);
  view.setUint8(8, 'W'.charCodeAt(0)); view.setUint8(9, 'A'.charCodeAt(0)); view.setUint8(10, 'V'.charCodeAt(0)); view.setUint8(11, 'E'.charCodeAt(0));
  view.setUint8(12, 'f'.charCodeAt(0)); view.setUint8(13, 'm'.charCodeAt(0)); view.setUint8(14, 't'.charCodeAt(0)); view.setUint8(15, ' '.charCodeAt(0));
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);
  view.setUint8(36, 'd'.charCodeAt(0)); view.setUint8(37, 'a'.charCodeAt(0)); view.setUint8(38, 't'.charCodeAt(0)); view.setUint8(39, 'a'.charCodeAt(0));
  view.setUint32(40, dataLength, true);
  return buffer;
};

// --- CORE GENERATION FUNCTION ---
export const generateVideo = async (
  params: GenerateVideoParams,
): Promise<{objectUrl: string; blob: Blob; uri: string; video: Video | null}> => {
  console.log('FREE MODE: Starting generation with params:', params);
  
  // Simulate processing delay for "AI" feel
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 1. TEXT TO IMAGE (POLLINATIONS.AI - REAL AI, FREE)
  if (params.mode === GenerationMode.TEXT_TO_IMAGE) {
    const encodedPrompt = encodeURIComponent(params.prompt + " high quality, 4k, cinematic");
    // Pollinations doesn't allow Aspect Ratio config easily in URL, but seeds work.
    const seed = Math.floor(Math.random() * 10000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&nologo=true`;

    try {
      const res = await fetch(imageUrl);
      if (!res.ok) throw new Error("Falha ao buscar imagem do Pollinations.ai");
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      return { objectUrl, blob, uri: imageUrl, video: null };
    } catch (e) {
      console.error(e);
      throw new Error("Erro ao conectar com serviço gratuito de imagem.");
    }
  }

  // 2. TEXT TO SPEECH (WEB SPEECH API - NATIVE, FREE)
  if (params.mode === GenerationMode.TEXT_TO_SPEECH) {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(params.prompt);
      // Select voice based on params or default
      const voices = window.speechSynthesis.getVoices();
      // Simple heuristic for male/female based on the name passed
      const targetVoice = voices.find(v => v.name.includes(params.voiceName || 'Google')) || voices[0];
      if (targetVoice) utterance.voice = targetVoice;

      // Placeholder audio URL strategy
      const mockAudioUrl = STOCK_AUDIO.default[0];
      fetch(mockAudioUrl)
        .then(r => r.blob())
        .then(blob => {
           resolve({
             objectUrl: URL.createObjectURL(blob),
             blob: blob,
             uri: mockAudioUrl,
             video: null
           });
        });
    });
  }

  // 3. TEXT TO AUDIO (MUSIC - ASSET MATCHING)
  if (params.mode === GenerationMode.TEXT_TO_AUDIO) {
    const audioUrl = getBestMatch(params.prompt, STOCK_AUDIO);
    const res = await fetch(audioUrl);
    const blob = await res.blob();
    return {
      objectUrl: URL.createObjectURL(blob),
      blob: blob,
      uri: audioUrl,
      video: null
    };
  }

  // 4. VIDEO GENERATION (ASSET MATCHING - "SMART STOCK")
  // Includes TEXT_TO_VIDEO and IMAGE_TO_VIDEO modes
  
  if (params.mode === GenerationMode.IMAGE_TO_VIDEO) {
     console.log("Image source provided:", params.sourceImage ? "Yes" : "No");
     // In this mock mode, we fallback to text matching for the stock video.
  }

  // Use the upgraded matching logic
  const videoUrl = getBestMatch(params.prompt, STOCK_VIDEOS);
  
  try {
    const res = await fetch(videoUrl);
    const blob = await res.blob();
    return {
      objectUrl: URL.createObjectURL(blob),
      blob: blob,
      uri: videoUrl,
      video: { uri: videoUrl } as Video
    };
  } catch (e) {
    // If CORS fails, return the URL directly
    return {
      objectUrl: videoUrl,
      blob: new Blob(),
      uri: videoUrl,
      video: { uri: videoUrl } as Video
    };
  }
};

export const generateVideoCaption = async (videoBlob: Blob): Promise<string> => {
  return "Legenda automática indisponível no modo offline/gratuito. (Requer API Multimodal)";
};
