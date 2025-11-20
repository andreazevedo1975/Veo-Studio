
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {
  GoogleGenAI,
  Modality,
  Video,
  VideoGenerationReferenceImage,
  VideoGenerationReferenceType,
} from '@google/genai';
import {GenerateVideoParams, GenerationMode} from '../types';

// Helper to convert base64 to Blob
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

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
};

// Helper to write WAV header for raw PCM data
const writeWavHeader = (sampleRate: number, dataLength: number, numChannels: number) => {
  const buffer = new ArrayBuffer(44);
  const view = new DataView(buffer);

  // RIFF identifier
  view.setUint8(0, 'R'.charCodeAt(0));
  view.setUint8(1, 'I'.charCodeAt(0));
  view.setUint8(2, 'F'.charCodeAt(0));
  view.setUint8(3, 'F'.charCodeAt(0));

  // file length
  view.setUint32(4, 36 + dataLength, true);

  // RIFF type
  view.setUint8(8, 'W'.charCodeAt(0));
  view.setUint8(9, 'A'.charCodeAt(0));
  view.setUint8(10, 'V'.charCodeAt(0));
  view.setUint8(11, 'E'.charCodeAt(0));

  // format chunk identifier
  view.setUint8(12, 'f'.charCodeAt(0));
  view.setUint8(13, 'm'.charCodeAt(0));
  view.setUint8(14, 't'.charCodeAt(0));
  view.setUint8(15, ' '.charCodeAt(0));

  // format chunk length
  view.setUint32(16, 16, true);

  // sample format (raw)
  view.setUint16(20, 1, true);

  // channel count
  view.setUint16(22, numChannels, true);

  // sample rate
  view.setUint32(24, sampleRate, true);

  // byte rate (sampleRate * blockAlign)
  view.setUint32(28, sampleRate * numChannels * 2, true);

  // block align (channel count * bytes per sample)
  view.setUint16(32, numChannels * 2, true);

  // bits per sample
  view.setUint16(34, 16, true);

  // data chunk identifier
  view.setUint8(36, 'd'.charCodeAt(0));
  view.setUint8(37, 'a'.charCodeAt(0));
  view.setUint8(38, 't'.charCodeAt(0));
  view.setUint8(39, 'a'.charCodeAt(0));

  // data chunk length
  view.setUint32(40, dataLength, true);

  return buffer;
};

const createWavBlob = (base64PCM: string, sampleRate = 24000): Blob => {
  const byteCharacters = atob(base64PCM);
  const dataLength = byteCharacters.length;
  const byteArray = new Uint8Array(dataLength);
  for (let i = 0; i < dataLength; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }
  
  // Gemini Audio is usually 24kHz, 1 Channel, 16-bit PCM
  const header = writeWavHeader(sampleRate, dataLength, 1);
  return new Blob([header, byteArray], { type: 'audio/wav' });
};

// Fix: API key is now handled by process.env.API_KEY, so it's removed from parameters.
export const generateVideo = async (
  params: GenerateVideoParams,
): Promise<{objectUrl: string; blob: Blob; uri: string; video: Video | null}> => {
  console.log('Starting generation with params:', params);

  // Fix: API key must be obtained from process.env.API_KEY as per guidelines.
  const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

  // HANDLE TEXT TO IMAGE
  if (params.mode === GenerationMode.TEXT_TO_IMAGE) {
    console.log('Generating Image...');
    // Using Imagen 3 (or 4 if available/requested)
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002', 
      prompt: params.prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: params.aspectRatio, // '16:9' | '9:16' | '1:1'
        outputMimeType: 'image/jpeg',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const img = response.generatedImages[0];
      const base64 = img.image.imageBytes;
      const blob = b64toBlob(base64, 'image/jpeg');
      const objectUrl = URL.createObjectURL(blob);
      
      return {
        objectUrl,
        blob,
        uri: '', // Images don't have a persistent URI in this context
        video: null // No video object
      };
    } else {
      throw new Error('No image generated.');
    }
  }

  // HANDLE TEXT TO AUDIO (MUSIC/SFX)
  if (params.mode === GenerationMode.TEXT_TO_AUDIO) {
    console.log('Generating Audio...');
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      contents: params.prompt,
      config: {
        responseModalities: [Modality.AUDIO],
      }
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0 && candidates[0].content.parts) {
      const part = candidates[0].content.parts[0];
      if (part.inlineData && part.inlineData.data) {
         const base64Audio = part.inlineData.data;
         // Convert Raw PCM to WAV Blob
         const blob = createWavBlob(base64Audio);
         const objectUrl = URL.createObjectURL(blob);

         return {
          objectUrl,
          blob,
          uri: '',
          video: null
         };
      }
    }
    throw new Error('No audio generated.');
  }

  // HANDLE TEXT TO SPEECH (NARRATION)
  if (params.mode === GenerationMode.TEXT_TO_SPEECH) {
    console.log('Generating Speech...');
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ parts: [{ text: params.prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: params.voiceName || 'Puck' },
          },
        },
      }
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0 && candidates[0].content.parts) {
      const part = candidates[0].content.parts[0];
      if (part.inlineData && part.inlineData.data) {
         const base64Audio = part.inlineData.data;
         // Convert Raw PCM to WAV Blob
         const blob = createWavBlob(base64Audio);
         const objectUrl = URL.createObjectURL(blob);

         return {
          objectUrl,
          blob,
          uri: '',
          video: null
         };
      }
    }
    throw new Error('No speech generated.');
  }

  // HANDLE VIDEO GENERATION (VEO)
  const config: any = {
    numberOfVideos: 1,
    resolution: params.resolution,
  };

  // Conditionally add aspect ratio. It's not used for extending videos.
  if (params.mode !== GenerationMode.EXTEND_VIDEO) {
    config.aspectRatio = params.aspectRatio;
  }

  // Add duration if specified
  if (params.durationSeconds) {
    config.durationSeconds = params.durationSeconds;
  }

  const generateVideoPayload: any = {
    model: params.model,
    config: config,
  };

  // Only add the prompt if it's not empty, as an empty prompt might interfere with other parameters.
  if (params.prompt) {
    generateVideoPayload.prompt = params.prompt;
  }

  if (params.mode === GenerationMode.FRAMES_TO_VIDEO) {
    if (params.startFrame) {
      generateVideoPayload.image = {
        imageBytes: params.startFrame.base64,
        mimeType: params.startFrame.file.type,
      };
      console.log(
        `Generating with start frame: ${params.startFrame.file.name}`,
      );
    }

    const finalEndFrame = params.isLooping
      ? params.startFrame
      : params.endFrame;
    if (finalEndFrame) {
      generateVideoPayload.config.lastFrame = {
        imageBytes: finalEndFrame.base64,
        mimeType: finalEndFrame.file.type,
      };
      if (params.isLooping) {
        console.log(
          `Generating a looping video using start frame as end frame: ${finalEndFrame.file.name}`,
        );
      } else {
        console.log(`Generating with end frame: ${finalEndFrame.file.name}`);
      }
    }
  } else if (params.mode === GenerationMode.REFERENCES_TO_VIDEO) {
    const referenceImagesPayload: VideoGenerationReferenceImage[] = [];

    if (params.referenceImages) {
      for (const img of params.referenceImages) {
        console.log(`Adding reference image: ${img.file.name}`);
        referenceImagesPayload.push({
          image: {
            imageBytes: img.base64,
            mimeType: img.file.type,
          },
          referenceType: VideoGenerationReferenceType.ASSET,
        });
      }
    }

    if (params.styleImage) {
      console.log(
        `Adding style image as a reference: ${params.styleImage.file.name}`,
      );
      referenceImagesPayload.push({
        image: {
          imageBytes: params.styleImage.base64,
          mimeType: params.styleImage.file.type,
        },
        referenceType: VideoGenerationReferenceType.STYLE,
      });
    }

    if (referenceImagesPayload.length > 0) {
      generateVideoPayload.config.referenceImages = referenceImagesPayload;
    }
  } else if (params.mode === GenerationMode.EXTEND_VIDEO) {
    if (params.inputVideoObject) {
      generateVideoPayload.video = params.inputVideoObject;
      console.log(`Generating extension from input video object.`);
    } else {
      throw new Error('An input video object is required to extend a video.');
    }
  }

  console.log('Submitting video generation request...', generateVideoPayload);
  let operation = await ai.models.generateVideos(generateVideoPayload);
  console.log('Video generation operation started:', operation);

  while (!operation.done) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log('...Generating...');
    operation = await ai.operations.getVideosOperation({operation: operation});
  }

  if (operation?.response) {
    const videos = operation.response.generatedVideos;

    if (!videos || videos.length === 0) {
      throw new Error('No videos were generated.');
    }

    const firstVideo = videos[0];
    if (!firstVideo?.video?.uri) {
      throw new Error('Generated video is missing a URI.');
    }
    const videoObject = firstVideo.video;

    const url = decodeURIComponent(videoObject.uri);
    console.log('Fetching video from:', url);

    // Fix: The API key for fetching the video must also come from process.env.API_KEY.
    const res = await fetch(`${url}&key=${process.env.API_KEY}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch video: ${res.status} ${res.statusText}`);
    }

    const videoBlob = await res.blob();
    const objectUrl = URL.createObjectURL(videoBlob);

    return {objectUrl, blob: videoBlob, uri: url, video: videoObject};
  } else {
    console.error('Operation failed:', operation);
    throw new Error('No videos generated.');
  }
};
