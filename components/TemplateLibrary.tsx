
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {
  AspectRatio,
  GenerateVideoParams,
  GenerationMode,
  OutputFormat,
  Resolution,
  VeoModel,
} from '../types';
import {
  ActivityIcon,
  BabyIcon,
  BinaryIcon,
  BrushIcon,
  BuildingIcon,
  CameraIcon,
  CassetteTapeIcon,
  CircleHelpIcon,
  ChurchIcon,
  ClapperboardIcon,
  ClockIcon,
  CloudDrizzleIcon,
  CloudFogIcon,
  CloudLightningIcon,
  CloudRainIcon,
  CoffeeIcon,
  DiscIcon,
  DropletsIcon,
  DrumIcon,
  EyeIcon,
  FeatherIcon,
  FilmIcon,
  FlameIcon,
  Flower2Icon,
  FrownIcon,
  GamepadIcon,
  GemIcon,
  GhostIcon,
  GlobeIcon,
  GraduationCapIcon,
  GuitarIcon,
  HeadphonesIcon,
  HeartHandshakeIcon,
  HeartIcon,
  HistoryIcon,
  LandmarkIcon,
  LaptopIcon,
  MagicWandIcon,
  MehIcon,
  Mic2Icon,
  MonitorPlayIcon,
  MusicIcon,
  PaletteIcon,
  PartyPopperIcon,
  PawPrintIcon,
  PianoIcon,
  PlaneIcon,
  RadioIcon,
  RectangleStackIcon,
  RocketIcon,
  SearchIcon,
  ShieldIcon,
  ShirtIcon,
  ShoppingBagIcon,
  SkullIcon,
  SmartphoneIcon,
  SmileIcon,
  SparklesIcon,
  SpeakerIcon,
  SproutIcon,
  StarIcon,
  SunIcon,
  SunriseIcon,
  TrophyIcon,
  TvIcon,
  UserIcon,
  UtensilsIcon,
  WindIcon,
  ZapIcon,
} from './icons';

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  params: GenerateVideoParams;
}

const TEMPLATES: Template[] = [
  {
    id: 'anime',
    name: 'Abertura de Anime',
    description: 'Estilo de animação japonesa dinâmico.',
    icon: <MonitorPlayIcon className="w-6 h-6 text-red-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Anime opening sequence, dynamic action shot, vibrant colors, cel shaded animation style, high energy, speed lines',
    },
  },
  {
    id: 'joy',
    name: 'Alegria Pura',
    description: 'Cores vibrantes e risadas contagiantes.',
    icon: <SmileIcon className="w-6 h-6 text-yellow-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Pure joy and happiness, vibrant colors, people laughing in a park, sunny day, colorful balloons, confetti, high energy, 4k, cinematic, uplifting atmosphere',
    },
  },
  {
    id: 'relief',
    name: 'Alívio',
    description: 'A calma após a tempestade.',
    icon: <SunriseIcon className="w-6 h-6 text-amber-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Visual metaphor for relief, sun breaking through dark heavy storm clouds, warm golden light flooding a wet landscape, birds taking flight, atmosphere of release and peace, cinematic, highly detailed',
    },
  },
  {
    id: 'ambient',
    name: 'Ambient Zen',
    description: 'Sons da natureza para relaxamento profundo.',
    icon: <WindIcon className="w-6 h-6 text-teal-200" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Ambient nature scene, peaceful bamboo forest, wind gently swaying leaves, soft filtered sunlight, floating particles, meditative atmosphere, cinematic, 8k',
    },
  },
  {
    id: 'fraternal-love',
    name: 'Amor Fraterno',
    description: 'Amizade verdadeira e conexão humana.',
    icon: <HeartHandshakeIcon className="w-6 h-6 text-orange-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Two best friends hugging and laughing at sunset, golden hour, lens flare, genuine emotion, warmth, friendship, cinematic lighting, 4k',
    },
  },
  {
    id: 'love',
    name: 'Amor Romântico',
    description: 'Momentos suaves e iluminação quente.',
    icon: <HeartIcon className="w-6 h-6 text-pink-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Cinematic romantic scene, couple holding hands walking on a beach at sunset, soft warm lighting, bokeh effect, emotional connection, golden hour, highly detailed',
    },
  },
  {
    id: 'animals',
    name: 'Animais Fofos',
    description: 'Filhotes adoráveis em 4K.',
    icon: <PawPrintIcon className="w-6 h-6 text-amber-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Cute fluffy kittens playing in a basket, soft morning sunlight, cozy atmosphere, high detail fur, 4k resolution, cinematic, shallow depth of field',
    },
  },
  {
    id: 'anxiety',
    name: 'Ansiedade Urbana',
    description: 'O ritmo frenético e caótico da cidade.',
    icon: <ActivityIcon className="w-6 h-6 text-zinc-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Visual representation of anxiety, busy city street timelapse with motion blur, fast cuts, overwhelming neon lights, shaky camera, intense atmosphere, chaotic energy',
    },
  },
  {
    id: 'watercolor',
    name: 'Aquarela',
    description: 'Arte suave e fluida.',
    icon: <BrushIcon className="w-6 h-6 text-teal-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Watercolor painting animation, soft pastel colors, ink bleed effect, paper texture, artistic and dreamy flow',
    },
  },
  {
    id: 'archviz',
    name: 'Arquitetura',
    description: 'Visualização arquitetônica moderna.',
    icon: <BuildingIcon className="w-6 h-6 text-stone-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Modern architectural visualization, luxurious glass house, golden hour sunlight, photorealistic render, interior design',
    },
  },
  {
    id: 'lofi',
    name: 'Batida Lo-Fi',
    description: 'Vibe relaxante e estética de anime.',
    icon: <CassetteTapeIcon className="w-6 h-6 text-violet-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Lo-fi hip hop aesthetic, anime style girl studying at desk, rainy window, cozy room, chill vibes, soft lighting, loopable, 2d animation',
    },
  },
  {
    id: 'blues',
    name: 'Blues Melancólico',
    description: 'Alma, guitarra e luzes azuis.',
    icon: <GuitarIcon className="w-6 h-6 text-blue-600" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Solo blues guitarist sitting on a stool, smoky dive bar atmosphere, neon sign in background, moody blue lighting, soulful expression, cinematic, high contrast',
    },
  },
  {
    id: 'bollywood',
    name: 'Bollywood Vibrante',
    description: 'Dança colorida e produção épica.',
    icon: <StarIcon className="w-6 h-6 text-pink-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Bollywood musical scene, large group dance choreography, vibrant colorful silk costumes, palaces in background, energetic movement, high saturation, cinematic lighting',
    },
  },
  {
    id: 'bossa',
    name: 'Bossa Nova',
    description: 'Praia de Ipanema e violão suave.',
    icon: <Flower2Icon className="w-6 h-6 text-yellow-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Rio de Janeiro beach at sunset, Ipanema, acoustic guitar leaning on a palm tree, gentle waves, soft warm lighting, bossa nova vibe, cinematic, peaceful',
    },
  },
  {
    id: 'cafe',
    name: 'Cafeteria Aconchegante',
    description: 'Um momento relaxante com café.',
    icon: <CoffeeIcon className="w-6 h-6 text-amber-700" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Cozy coffee shop atmosphere, steaming cup of latte on a wooden table, rain outside the window, soft warm lighting, lo-fi vibe, 4k',
    },
  },
  {
    id: 'slowmo',
    name: 'Câmera Lenta',
    description: 'Detalhes macro em alta taxa.',
    icon: <CloudFogIcon className="w-6 h-6 text-cyan-200" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Super slow motion, water balloon popping, macro details, water droplets suspended in air, high frame rate, cinematic',
    },
  },
  {
    id: 'cyberpunk',
    name: 'Cidade Cyberpunk',
    description: 'Estética neon futurista noturna.',
    icon: <ZapIcon className="w-6 h-6 text-cyan-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Futuristic cyberpunk city street at night, neon lights, rain reflections, flying cars, blade runner style, cinematic composition',
    },
  },
  {
    id: 'commercial',
    name: 'Comercial de Produto',
    description: 'Iluminação de estúdio profissional.',
    icon: <ShoppingBagIcon className="w-6 h-6 text-orange-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'High-end product commercial, sleek design, rotating on turntable, dramatic studio lighting, rim light, 4k, luxurious feel',
    },
  },
  {
    id: 'compassion',
    name: 'Compaixão',
    description: 'O toque humano e solidariedade.',
    icon: <HeartIcon className="w-6 h-6 text-red-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Close up shot of hands helping someone up, warm soft lighting, emotional moment of kindness, human connection, cinematic, depth of field, hope',
    },
  },
  {
    id: 'rock',
    name: 'Concerto de Rock',
    description: 'Energia, luzes e guitarras elétricas.',
    icon: <GuitarIcon className="w-6 h-6 text-red-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Electric guitar player on stage, lens flare, stadium crowd silhouette, energetic atmosphere, volumetric lighting, 4k, rock concert',
    },
  },
  {
    id: 'confusion',
    name: 'Confusão Mental',
    description: 'Surrealismo e incerteza.',
    icon: <CircleHelpIcon className="w-6 h-6 text-purple-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Surreal dreamlike scene representing confusion, swirling fog, floating clocks, distorted perspective, muted colors, mysterious atmosphere, cinematic, inception style',
    },
  },
  {
    id: 'courage',
    name: 'Coragem Heróica',
    description: 'Bravura contra todas as probabilidades.',
    icon: <ShieldIcon className="w-6 h-6 text-blue-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Cinematic shot of courage, a lone hero standing against a giant storm, shield raised, golden lighting breaking through dark clouds, epic scale, determination, 8k',
    },
  },
  {
    id: 'country',
    name: 'Country Americano',
    description: 'Vida no campo e violão acústico.',
    icon: <GuitarIcon className="w-6 h-6 text-amber-600" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'American country music scene, musician sitting on a porch at a farm during golden hour, playing acoustic guitar, horses in background, rustic atmosphere, cinematic',
    },
  },
  {
    id: 'curiosity',
    name: 'Curiosidade',
    description: 'A maravilha da descoberta.',
    icon: <SearchIcon className="w-6 h-6 text-green-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'A child looking at a glowing magical firefly in a forest, eyes wide with wonder, macro shot, magical atmosphere, sparkles, cinematic lighting, discovery',
    },
  },
  {
    id: 'disappointment',
    name: 'Decepção',
    description: 'Expectativas frustradas e chuva.',
    icon: <CloudRainIcon className="w-6 h-6 text-slate-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Visual of disappointment, a single wilted flower in the rain, grey color palette, raindrops hitting a window, blurry background, slow motion, melancholic mood',
    },
  },
  {
    id: 'desire',
    name: 'Desejo Ardente',
    description: 'Paixão intensa e atração magnética.',
    icon: <GemIcon className="w-6 h-6 text-rose-600" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Intense burning desire, close up of longing eyes, biting lip, red and purple neon lighting, sweaty skin texture, cinematic bokeh, passion, obsession, highly detailed',
    },
  },
  {
    id: 'despair',
    name: 'Desespero Profundo',
    description: 'Sombras e angústia.',
    icon: <FrownIcon className="w-6 h-6 text-zinc-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Cinematic shot of despair, silhouette of a person with head in hands, sitting in a dark empty room, dramatic long shadows, cold blue lighting, feeling of isolation and hopelessness',
    },
  },
  {
    id: 'disco',
    name: 'Disco Anos 70',
    description: 'Globo de espelhos e dança retro.',
    icon: <DiscIcon className="w-6 h-6 text-fuchsia-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        '70s disco dance floor, mirror ball reflections, funky colorful lights, bell bottom pants, retro dance moves, vibrant energy, vintage film grain',
    },
  },
  {
    id: 'pain',
    name: 'Dor Intensa',
    description: 'Atmosfera sombria e tempestuosa.',
    icon: <CloudLightningIcon className="w-6 h-6 text-slate-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Visual representation of emotional pain, dark cinematic scene, shattered glass, stormy grey sky, heavy rain, cold blue tones, emotional despair, dramatic lighting, metaphorical',
    },
  },
  {
    id: 'drone',
    name: 'Drone Aéreo',
    description: 'Vistas panorâmicas de cima.',
    icon: <PlaneIcon className="w-6 h-6 text-sky-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Cinematic aerial drone shot, flying over epic mountain range at sunset, sweeping camera movement, wide angle, breathtaking view',
    },
  },
  {
    id: 'dnb',
    name: 'Drum and Bass',
    description: 'Ritmo rápido e futurista.',
    icon: <ActivityIcon className="w-6 h-6 text-lime-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Drum and Bass visualizer, high speed tunnel movement, glitch effects, neon green and black, futuristic cyber aesthetic, energetic pulse, 60fps feel',
    },
  },
  {
    id: 'dubstep',
    name: 'Dubstep Drop',
    description: 'Bass pesado e luzes estroboscópicas.',
    icon: <SpeakerIcon className="w-6 h-6 text-violet-600" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Dubstep concert drop, massive speaker wall shaking, shockwave visual effect, strobe lighting chaotic, crowd jumping, intense energy, dark club atmosphere',
    },
  },
  {
    id: 'edu',
    name: 'Educacional',
    description: 'Animação explicativa simples.',
    icon: <GraduationCapIcon className="w-6 h-6 text-yellow-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Educational explainer animation, paper cutout style, simple graphics, clear visual communication, bright colors, infographic',
    },
  },
  {
    id: 'enthusiasm',
    name: 'Entusiasmo',
    description: 'Celebração e alta energia.',
    icon: <RocketIcon className="w-6 h-6 text-orange-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Burst of enthusiasm, crowd cheering with confetti explosions, bright saturated colors, dynamic camera movement, smiles, high energy celebration, festival vibe',
    },
  },
  {
    id: 'office',
    name: 'Escritório Home Office',
    description: 'Produtividade em ambiente moderno.',
    icon: <LaptopIcon className="w-6 h-6 text-slate-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Modern home office setup, laptop on desk, natural sunlight, indoor plants, clean minimalist workspace, productive atmosphere',
    },
  },
  {
    id: 'hope',
    name: 'Esperança Renovada',
    description: 'Uma luz no fim do túnel.',
    icon: <SproutIcon className="w-6 h-6 text-green-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Symbol of hope, a small green sprout growing through cracked concrete, ray of warm sunlight hitting it, morning dew, depth of field, inspiring and uplifting, cinematic',
    },
  },
  {
    id: 'sports',
    name: 'Esportes Radicais',
    description: 'Ação intensa e movimento.',
    icon: <TrophyIcon className="w-6 h-6 text-yellow-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Extreme sports action, snowboarding down a mountain, dynamic camera follow, snow spray, fast paced, adrenaline, 4k',
    },
  },
  {
    id: 'style-transfer',
    name: 'Estilo Visual',
    description: 'Faça upload de uma imagem de referência de estilo para ditar a estética.',
    icon: <PaletteIcon className="w-6 h-6 text-pink-400" />,
    params: {
      mode: GenerationMode.REFERENCES_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'A video scene generated in the exact visual style of the reference image, keeping the artistic vibe, colors, and lighting, highly detailed',
      referenceImages: [],
    },
  },
  {
    id: 'euphoria',
    name: 'Euforia Vibrante',
    description: 'Explosão de cores e energia.',
    icon: <PartyPopperIcon className="w-6 h-6 text-purple-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Euphoric visual experience, kaleidoscope of neon colors, fast motion blur, fireworks, festival atmosphere, intense positive energy, psychedelic, high speed',
    },
  },
  {
    id: 'space',
    name: 'Exploração Espacial',
    description: 'Viagem por nebulosas e estrelas.',
    icon: <RocketIcon className="w-6 h-6 text-indigo-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Deep space exploration, spaceship flying past colorful nebula, stars, cinematic sci-fi movie scene, highly detailed',
    },
  },
  {
    id: 'ecstasy',
    name: 'Êxtase Divino',
    description: 'Ascensão e partículas douradas.',
    icon: <ZapIcon className="w-6 h-6 text-yellow-200" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Visual of ecstasy and transcendence, spiraling golden particles, ascending towards a bright divine light, feeling of weightlessness, ethereal sound visualization, surreal, cinematic',
    },
  },
  {
    id: 'happiness',
    name: 'Felicidade Radiante',
    description: 'Luz solar e campos abertos.',
    icon: <SunIcon className="w-6 h-6 text-orange-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Radiant happiness, person running through a field of sunflowers during golden hour, lens flare, genuine smiles, slow motion, bright and airy atmosphere, cinematic',
    },
  },
  {
    id: 'festival-edm',
    name: 'Festival EDM',
    description: 'Lasers, multidão e energia pura.',
    icon: <ZapIcon className="w-6 h-6 text-cyan-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Massive EDM music festival, main stage, spectacular laser light show, confetti, massive jumping crowd, energetic atmosphere, neon colors, night time, wide shot',
    },
  },
  {
    id: 'noir',
    name: 'Filme Noir',
    description: 'Estilo detetive preto e branco.',
    icon: <SearchIcon className="w-6 h-6 text-neutral-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Film noir style, black and white, detective walking on rainy street at night, high contrast shadows, dramatic lighting, 1940s vibe',
    },
  },
  {
    id: 'horror',
    name: 'Filme de Terror',
    description: 'Atmosfera sombria e misteriosa.',
    icon: <GhostIcon className="w-6 h-6 text-gray-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Horror movie scene, dark foggy forest, mysterious silhouette, eerie atmosphere, cinematic lighting, suspenseful',
    },
  },
  {
    id: 'folk',
    name: 'Folk Acústico',
    description: 'Natureza, fogueira e violão.',
    icon: <GuitarIcon className="w-6 h-6 text-emerald-600" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Indie folk musician playing acoustic guitar by a campfire, forest setting, fireflies, warm cozy lighting, intimate atmosphere, cinematic depth of field',
    },
  },
  {
    id: 'forro',
    name: 'Forró Nordestino',
    description: 'Festa junina, sanfona e dança.',
    icon: <MusicIcon className="w-6 h-6 text-orange-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Traditional Brazilian Forró party, colorful flags (bandeirinhas), couple dancing close, accordion player, bonfire, vibrant colors, festive atmosphere, cinematic',
    },
  },
  {
    id: 'underwater',
    name: 'Fundo do Mar',
    description: 'Recife de corais e vida marinha.',
    icon: <DropletsIcon className="w-6 h-6 text-blue-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Underwater coral reef, vibrant tropical fish, sun rays piercing through water, bubbles, cinematic ocean scene',
    },
  },
  {
    id: 'funk-br',
    name: 'Funk Brasileiro',
    description: 'Paredão de som e energia urbana.',
    icon: <SpeakerIcon className="w-6 h-6 text-purple-600" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Brazilian funk street party (baile funk), massive wall of speakers (paredão), neon lights, energetic dancing crowd, urban favela night scene, vibrant atmosphere, 4k',
    },
  },
  {
    id: 'food',
    name: 'Gastronomia',
    description: 'Comida apetitosa em close-up.',
    icon: <UtensilsIcon className="w-6 h-6 text-orange-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Gourmet food commercial, steaming delicious burger, slow motion cheese pull, macro shot, appetizing lighting, 4k',
    },
  },
  {
    id: 'gospel',
    name: 'Gospel Emocionante',
    description: 'Coral, luz divina e espiritualidade.',
    icon: <ChurchIcon className="w-6 h-6 text-indigo-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Gospel choir singing in a grand church, sunbeams streaming through stained glass windows, dust motes, emotional uplifting atmosphere, raised hands, cinematic lighting',
    },
  },
  {
    id: 'gratitude',
    name: 'Gratidão e Luz',
    description: 'Paz espiritual e nascer do sol.',
    icon: <HeartHandshakeIcon className="w-6 h-6 text-rose-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Visualizing gratitude, warm sunrise over a majestic mountain, person with open arms, soft glowing light, spiritual atmosphere, peaceful, cinematic, thankful',
    },
  },
  {
    id: 'grunge',
    name: 'Grunge Anos 90',
    description: 'Estética de garagem, flanela e rock alternativo.',
    icon: <GuitarIcon className="w-6 h-6 text-stone-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        '90s Grunge rock band rehearsal in a dim garage, vintage aesthetic, flannel shirts, messy hair, fisheye lens effect, moody lighting, raw energy, dusty atmosphere',
    },
  },
  {
    id: 'metal',
    name: 'Heavy Metal',
    description: 'Escuridão, fumaça e intensidade.',
    icon: <FlameIcon className="w-6 h-6 text-red-700" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Heavy metal band performing in a dark warehouse, aggressive strobe lighting, headbanging, smoke machines, intense atmosphere, high contrast, dark aesthetic',
    },
  },
  {
    id: 'hiphop',
    name: 'Hip Hop Urbano',
    description: 'Graffiti, boombox e estilo de rua.',
    icon: <RadioIcon className="w-6 h-6 text-orange-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Urban street scene, graffiti art walls, breakdancers, boombox, vibrant street wear, 90s hip hop vibe, fisheye lens effect, dynamic movement',
    },
  },
  {
    id: 'history',
    name: 'História Antiga',
    description: 'Civilizações perdidas e ruínas majestosas.',
    icon: <LandmarkIcon className="w-6 h-6 text-amber-200" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Cinematic historical documentary footage, ancient greek temple ruins at sunset, establishing shot, marble columns, dust particles, golden hour, realistic textures, 8k, epic atmosphere',
    },
  },
  {
    id: 'house',
    name: 'House Tropical',
    description: 'Festa na praia ao pôr do sol, vibe de verão.',
    icon: <SunIcon className="w-6 h-6 text-orange-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Tropical house party at a beach club during sunset, DJ decks, palm trees in silhouette, warm golden orange lighting, slow motion dancing, relaxed summer vibes, cinematic',
    },
  },
  {
    id: 'envy',
    name: 'Inveja Silenciosa',
    description: 'Olhares cobiçosos e tons de esmeralda.',
    icon: <EyeIcon className="w-6 h-6 text-emerald-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Visual representation of envy, glowing green eyes in the shadows, snakes slithering, cold emerald lighting, dramatic atmosphere, jealousy, cinematic, mysterious',
    },
  },
  {
    id: 'wrath',
    name: 'Ira Explosiva',
    description: 'Fúria incontrolável e fogo.',
    icon: <FlameIcon className="w-6 h-6 text-orange-600" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Uncontrollable rage, screaming silhouette against a wall of fire, shattering glass, intense red and orange colors, high contrast, chaotic energy, explosive anger',
    },
  },
  {
    id: 'isometric',
    name: 'Isométrico 3D',
    description: 'Render 3D fofo e colorido.',
    icon: <RectangleStackIcon className="w-6 h-6 text-pink-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Isometric 3D room render, cute low poly style, pastel colors, soft lighting, blender 3d illustration, cozy atmosphere',
    },
  },
  {
    id: 'jazz-street',
    name: 'Jazz de Nova Orleans',
    description: 'Banda de metais na rua, dia ensolarado e festivo.',
    icon: <Mic2Icon className="w-6 h-6 text-yellow-600" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'New Orleans brass band performing on a sunny street, colorful french quarter architecture, mardi gras beads, lively atmosphere, trumpet close up, handheld camera style, joyful celebration',
    },
  },
  {
    id: 'jazz',
    name: 'Jazz Noturno',
    description: 'Clube de jazz esfumaçado e elegante.',
    icon: <Mic2Icon className="w-6 h-6 text-amber-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Close up of a vintage microphone in a dimly lit jazz club, saxophone background, bokeh lights, moody atmosphere, noir style, cinematic',
    },
  },
  {
    id: 'kpop',
    name: 'K-Pop Vibrante',
    description: 'Cores pastéis e coreografia pop.',
    icon: <StarIcon className="w-6 h-6 text-pink-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'K-Pop music video set, vibrant pastel colors, group dancing synchronized choreography, studio lighting, glossy look, high production value, cinematic',
    },
  },
  {
    id: 'mariachi',
    name: 'Mariachi Festivo',
    description: 'Música mexicana tradicional e cores.',
    icon: <GuitarIcon className="w-6 h-6 text-yellow-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Mariachi band performing in a colorful mexican plaza, traditional charro suits, sombreros, trumpet and guitar, vibrant ribbons, festive day, cinematic',
    },
  },
  {
    id: 'fear',
    name: 'Medo do Escuro',
    description: 'Suspense e sombras ameaçadoras.',
    icon: <GhostIcon className="w-6 h-6 text-gray-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Psychological fear, walking down a dark narrow corridor with flickering lights, looming shadow figure, heartbeat sound implied, high suspense, horror atmosphere, cinematic',
    },
  },
  {
    id: 'melancholy',
    name: 'Melancolia',
    description: 'Um dia cinzento de reflexão.',
    icon: <CloudDrizzleIcon className="w-6 h-6 text-blue-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Quiet melancholy, gentle drizzle on a window pane, soft grey light, empty coffee cup, blurred cityscape background, contemplative mood, lo-fi aesthetic',
    },
  },
  {
    id: 'fashion',
    name: 'Moda Editorial',
    description: 'Lookbook de moda conceito.',
    icon: <ShirtIcon className="w-6 h-6 text-fuchsia-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'High fashion editorial shot, avant-garde outfit, model walking on a mirror floor, dramatic spotlight, minimal background, slow motion, 8k, cinematic lighting',
    },
  },
  {
    id: 'fantasy',
    name: 'Mundo de Fantasia',
    description: 'Paisagem mágica com partículas.',
    icon: <SparklesIcon className="w-6 h-6 text-yellow-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Magical fantasy landscape, floating islands, glowing particles, ethereal atmosphere, dreamlike quality, digital art style',
    },
  },
  {
    id: 'nature',
    name: 'Natureza Selvagem',
    description: 'Cena fotorrealista de documentário.',
    icon: <GlobeIcon className="w-6 h-6 text-green-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'National Geographic style nature documentary footage, macro shot of flora, realistic textures, soft natural lighting, 8k, highly detailed',
    },
  },
  {
    id: 'news',
    name: 'Noticiário TV',
    description: 'Estúdio de transmissão ao vivo.',
    icon: <RadioIcon className="w-6 h-6 text-blue-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'TV news broadcast studio, professional anchor desk, breaking news graphics on screen, modern newsroom background, realistic',
    },
  },
  {
    id: 'opera',
    name: 'Ópera Dramática',
    description: 'Teatro, figurino épico e drama.',
    icon: <Mic2Icon className="w-6 h-6 text-red-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Grand opera stage performance, soprano singer in elaborate costume, dramatic stage lighting, red velvet curtains, emotional expression, theatrical atmosphere, cinematic',
    },
  },
  {
    id: 'orchestra',
    name: 'Orquestra Épica',
    description: 'Sinfonia majestosa e grandiosa.',
    icon: <MusicIcon className="w-6 h-6 text-yellow-600" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Grand orchestra hall, conductor waving baton, symphony musicians, golden lighting, elegant atmosphere, wide shot, cinematic, 8k',
    },
  },
  {
    id: 'pride',
    name: 'Orgulho',
    description: 'Realização e glória pessoal.',
    icon: <TrophyIcon className="w-6 h-6 text-amber-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Feeling of pride and achievement, an athlete holding a gold medal under stadium lights, triumphant pose, sweat on brow, cinematic low angle, heroic lighting, slow motion',
    },
  },
  {
    id: 'peace',
    name: 'Paz Interior',
    description: 'Jardim Zen e calma absoluta.',
    icon: <FeatherIcon className="w-6 h-6 text-emerald-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Inner peace and zen, beautiful japanese garden, water rippling slowly in a pond, lotus flower, soft mist, gentle movement, calm atmosphere, meditation vibe',
    },
  },
  {
    id: 'character-ref',
    name: 'Personagem Vivo',
    description: 'Dê vida ao seu personagem.',
    icon: <UserIcon className="w-6 h-6 text-indigo-400" />,
    params: {
      mode: GenerationMode.REFERENCES_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Character animation, the character from the reference image performing a natural action, maintaining consistent appearance, cinematic lighting, high quality',
      referenceImages: [],
    },
  },
  {
    id: 'piano',
    name: 'Piano Clássico',
    description: 'Elegância e concerto solo.',
    icon: <PianoIcon className="w-6 h-6 text-gray-200" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Grand piano in a spotlight, dust motes dancing in light, elegant concert hall background, pianist hands playing, emotive, classical atmosphere, cinematic',
    },
  },
  {
    id: 'painting',
    name: 'Pintura a Óleo',
    description: 'Arte impressionista animada.',
    icon: <BrushIcon className="w-6 h-6 text-rose-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Oil painting style animation, van gogh inspired, thick brush strokes, artistic texture, colorful landscape, impressionism',
    },
  },
  {
    id: 'pixel',
    name: 'Pixel Art Retrô',
    description: 'Estilo de jogo 8-bit nostálgico.',
    icon: <GamepadIcon className="w-6 h-6 text-emerald-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        '8-bit pixel art game scene, side scroller level, retro aesthetic, vibrant palette, nostalgic gaming vibe',
    },
  },
  {
    id: 'punk',
    name: 'Punk Rock',
    description: 'Rebeldia, anarquia e energia crua.',
    icon: <SkullIcon className="w-6 h-6 text-stone-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Punk rock concert in a dirty basement club, mohawks, leather jackets, mosh pit, aggressive energy, graffiti walls, chaotic camera movement, raw aesthetic',
    },
  },
  {
    id: 'quartet',
    name: 'Quarteto de Cordas',
    description: 'Elegância clássica e harmonia em salão de baile.',
    icon: <MusicIcon className="w-6 h-6 text-yellow-700" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Classical string quartet performing in a luxurious baroque ballroom, golden chandeliers, elegant atmosphere, soft camera movement, 4k, cinematic lighting, sophisticated',
    },
  },
  {
    id: 'rnb',
    name: 'R&B Soul',
    description: 'Urbano, suave e romântico.',
    icon: <HeartIcon className="w-6 h-6 text-purple-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'R&B music video scene, singer on a rooftop at night with city lights bokeh, rain wet pavement, purple and blue mood lighting, emotional vibe, cinematic, smooth',
    },
  },
  {
    id: 'magical-realism',
    name: 'Realismo Mágico',
    description: 'O cotidiano com um toque de surrealismo.',
    icon: <MagicWandIcon className="w-6 h-6 text-purple-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Magical realism style, blending realistic everyday scenes with fantastical elements, deep symbolic meaning, dreamlike atmosphere, cinematic lighting, highly detailed, surreal twist',
    },
  },
  {
    id: 'reggae',
    name: 'Reggae Roots',
    description: 'Praia, sol e boas vibrações.',
    icon: <SunIcon className="w-6 h-6 text-yellow-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Reggae music vibes, musicians on a tropical beach at sunset, dreadlocks, red gold and green lighting accents, relaxed atmosphere, palm trees, slow motion, cinematic',
    },
  },
  {
    id: 'vhs',
    name: 'Retro VHS',
    description: 'Estilo caseiro dos anos 90.',
    icon: <TvIcon className="w-6 h-6 text-purple-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        '1990s home video style, VHS glitch effect, tracking lines, nostalgic family vacation vibe, low fidelity aesthetic',
    },
  },
  {
    id: 'samba',
    name: 'Samba Carnaval',
    description: 'Desfile, penas coloridas e ritmo.',
    icon: <DrumIcon className="w-6 h-6 text-green-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Rio de Janeiro carnival parade (sambódromo), samba dancers with elaborate colorful feather costumes, intricate floats, drummers, vibrant energy, confetti, cinematic 4k',
    },
  },
  {
    id: 'saudade',
    name: 'Saudade Nostálgica',
    description: 'Memórias antigas e tons de sépia.',
    icon: <HistoryIcon className="w-6 h-6 text-amber-600" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Nostalgic scene representing longing (saudade), old film grain effect, looking out a rainy window, sepia tones, fading memory, sentimental, emotional',
    },
  },
  {
    id: 'serenity',
    name: 'Serenidade',
    description: 'Silêncio e reflexão na água.',
    icon: <FeatherIcon className="w-6 h-6 text-cyan-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Perfect serenity, a still lake at dawn reflecting mountains like a mirror, morning mist, complete silence, cool color palette, meditative, cinematic 8k',
    },
  },
  {
    id: 'sertanejo',
    name: 'Sertanejo Raiz',
    description: 'Vida no campo, violão e pôr do sol.',
    icon: <GuitarIcon className="w-6 h-6 text-amber-700" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Brazilian countryside (sertão) landscape, acoustic guitar on a wooden porch, sunset over a farm, horses grazing in distance, golden hour, peaceful rustic vibe, cinematic',
    },
  },
  {
    id: 'loneliness',
    name: 'Solidão',
    description: 'Isolamento em um mundo vasto.',
    icon: <UserIcon className="w-6 h-6 text-blue-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Cinematic shot of loneliness, a lone figure sitting on a bench in a vast empty park during autumn, falling leaves, wide shot showing isolation, cold colors, melancholic beauty',
    },
  },
  {
    id: 'claymation',
    name: 'Stop Motion',
    description: 'Animação estilo massinha.',
    icon: <ClockIcon className="w-6 h-6 text-amber-600" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Claymation style animation, handmade plasticine character, stop motion texture, soft lighting, whimsical atmosphere',
    },
  },
  {
    id: 'social',
    name: 'Story Social',
    description: 'Vídeo vertical 9:16 para redes sociais.',
    icon: <SmartphoneIcon className="w-6 h-6 text-pink-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.PORTRAIT,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Vertical social media story, vibrant colors, upbeat energy, trending aesthetic, bright natural lighting, lifestyle vibe',
    },
  },
  {
    id: 'surprise',
    name: 'Surpresa',
    description: 'O momento do choque alegre.',
    icon: <PartyPopperIcon className="w-6 h-6 text-yellow-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Concept of surprise, extreme close up of eyes widening in joyful shock, explosion of colorful confetti and streamers in background, high energy, freeze frame effect, vibrant',
    },
  },
  {
    id: 'synthwave',
    name: 'Synthwave Retrô',
    description: 'Vibe anos 80 com luzes de neon.',
    icon: <DiscIcon className="w-6 h-6 text-fuchsia-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        '80s synthwave aesthetic, neon grid horizon, retro sun, purple and cyan fog, digital landscape, retrofuturism, loop',
    },
  },
  {
    id: 'tech',
    name: 'Tech Minimalista',
    description: 'Abstrato clean e futurista.',
    icon: <BinaryIcon className="w-6 h-6 text-gray-200" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Minimalist tech background, abstract white 3D geometric shapes, clean lighting, modern aesthetic, smooth motion',
    },
  },
  {
    id: 'techno',
    name: 'Techno Industrial',
    description: 'Underground, escuro e estroboscópico.',
    icon: <ActivityIcon className="w-6 h-6 text-zinc-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Underground techno club, industrial warehouse, strobe lights, fog, silhouette crowd dancing, raw energy, dark atmosphere, monochromatic',
    },
  },
  {
    id: 'boredom',
    name: 'Tédio',
    description: 'O tempo passando devagar.',
    icon: <MehIcon className="w-6 h-6 text-slate-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Visualizing boredom, a ticking clock on a wall, dust motes floating in a ray of afternoon light, slow camera movement, repetitive motion, mundane atmosphere, muted colors',
    },
  },
  {
    id: 'tenderness',
    name: 'Ternura Suave',
    description: 'Cuidado gentil e afeto puro.',
    icon: <BabyIcon className="w-6 h-6 text-pink-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Gentle tenderness, a mother holding a baby\'s hand, soft pastel colors, warm cozy lighting, dreamy blur, emotional connection, pure love, cinematic',
    },
  },
  {
    id: 'cinematic',
    name: 'Trailer Cinematográfico',
    description: 'Intro épica em 1080p com iluminação dramática.',
    icon: <ClapperboardIcon className="w-6 h-6 text-purple-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Cinematic movie trailer intro, dramatic lighting, high contrast, epic atmosphere, 4k resolution, slow camera movement, volumetric fog',
    },
  },
  {
    id: 'trap',
    name: 'Trap Neon',
    description: 'Carros de luxo, estúdio e luzes futuristas.',
    icon: <ZapIcon className="w-6 h-6 text-violet-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Modern Trap music video aesthetic, low angle shot of a luxury sports car in a dark studio, vibrant purple and blue neon lasers, smoke, glossy reflections, modern style, cinematic 4k',
    },
  },
  {
    id: 'soundtrack',
    name: 'Trilha Sonora',
    description: 'Visualizador de áudio abstrato.',
    icon: <FilmIcon className="w-6 h-6 text-gray-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Abstract audio visualizer for movie soundtrack, elegant waveforms moving to music, cinematic particles, dark background, gold and silver tones',
    },
  },
  {
    id: 'sadness',
    name: 'Tristeza Melancólica',
    description: 'Chuva, solidão e reflexão.',
    icon: <CloudRainIcon className="w-6 h-6 text-blue-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Melancholic sadness, lonely silhouette walking in the rain, empty city street at night, reflections on wet pavement, blue mood, cinematic, slow pace',
    },
  },
  {
    id: 'music',
    name: 'Videoclipe',
    description: 'Energia e luzes de balada.',
    icon: <MusicIcon className="w-6 h-6 text-fuchsia-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Music video style, neon night club, silhouette dancing, strobing lights, energetic atmosphere, cinematic color grading',
    },
  },
];

interface TemplateLibraryProps {
  onSelect: (params: GenerateVideoParams) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({onSelect}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-2" id="tour-templates">
      <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider">
        Comece com um Modelo
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.params)}
            className="flex flex-col items-start p-4 bg-[#1f1f1f] border border-gray-700 hover:border-indigo-500 hover:bg-gray-800 rounded-xl transition-all duration-300 ease-out group text-left h-full min-h-[140px] hover:shadow-xl hover:shadow-indigo-500/10 hover:scale-[1.02]">
            <div className="mb-3 p-2 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
              {template.icon}
            </div>
            <div className="font-semibold text-gray-200 text-sm mb-1">
              {template.name}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
              {template.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateLibrary;
