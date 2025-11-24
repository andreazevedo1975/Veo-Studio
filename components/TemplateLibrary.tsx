
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
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
  MicIcon,
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
  WrenchIcon,
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
        'Sequência de abertura de anime, cena de ação dinâmica, cores vibrantes, estilo de animação cel shaded, alta energia, linhas de velocidade',
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
        'Pura alegria e felicidade, cores vibrantes, pessoas rindo em um parque, dia ensolarado, balões coloridos, confete, alta energia, 4k, cinematográfico, atmosfera edificante',
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
        'Metáfora visual de alívio, sol rompendo nuvens pesadas de tempestade, luz dourada quente inundando uma paisagem molhada, pássaros levantando voo, atmosfera de libertação e paz, cinematográfico, altamente detalhado',
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
        'Cena de natureza ambiente, floresta de bambu pacífica, vento balançando suavemente as folhas, luz solar filtrada suave, partículas flutuantes, atmosfera meditativa, cinematográfico, 8k',
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
        'Dois melhores amigos se abraçando e rindo ao pôr do sol, hora dourada, reflexo de lente, emoção genuína, calor, amizade, iluminação cinematográfica, 4k',
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
        'Cena romântica cinematográfica, casal de mãos dadas caminhando na praia ao pôr do sol, iluminação suave e quente, efeito bokeh, conexão emocional, hora dourada, altamente detalhado',
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
        'Gatinhos fofos brincando em uma cesta, luz solar suave da manhã, atmosfera aconchegante, pelos em alto detalhe, resolução 4k, cinematográfico, profundidade de campo rasa',
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
        'Representação visual da ansiedade, timelapse de rua movimentada da cidade com desfoque de movimento, cortes rápidos, luzes neon avassaladoras, câmera tremida, atmosfera intensa, energia caótica',
    },
  },
  {
    id: 'zombies',
    name: 'Apocalipse Zumbi',
    description: 'Sobrevivência em cidade em ruínas.',
    icon: <SkullIcon className="w-6 h-6 text-stone-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Cena pós-apocalíptica de zumbis, cidade em ruínas, fumaça, hordas de mortos-vivos vagando, atmosfera sombria, sobrevivência, estilo cinematográfico, texturas sujas, 4k',
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
        'Animação em pintura aquarela, cores pastéis suaves, efeito de tinta sangrando, textura de papel, fluxo artístico e onírico',
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
        'Visualização arquitetônica moderna, casa de vidro luxuosa, luz solar da hora dourada, renderização fotorrealista, design de interiores',
    },
  },
  {
    id: 'ballet',
    name: 'Ballet Clássico',
    description: 'Elegância e movimento no palco.',
    icon: <FeatherIcon className="w-6 h-6 text-pink-200" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Bailarina clássica dançando no palco de um teatro, holofote único, tutu branco, movimentos elegantes, câmera lenta, partículas de poeira na luz, atmosfera dramática, 4k',
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
        'Estética lo-fi hip hop, garota estilo anime estudando na mesa, janela com chuva, quarto aconchegante, vibes relaxantes, iluminação suave, loopável, animação 2d',
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
        'Guitarrista de blues solo sentado em um banco, atmosfera de bar enfumaçado, letreiro neon ao fundo, iluminação azul melancólica, expressão com alma, cinematográfico, alto contraste',
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
        'Cena musical de Bollywood, coreografia de dança em grande grupo, trajes de seda coloridos vibrantes, palácios ao fundo, movimento energético, alta saturação, iluminação cinematográfica',
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
        'Praia do Rio de Janeiro ao pôr do sol, Ipanema, violão acústico encostado em uma palmeira, ondas gentis, iluminação quente e suave, vibe bossa nova, cinematográfico, pacífico',
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
        'Atmosfera de cafeteria aconchegante, xícara de latte fumegante em mesa de madeira, chuva lá fora na janela, iluminação quente e suave, vibe lo-fi, 4k',
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
        'Super câmera lenta, balão de água estourando, detalhes macro, gotículas de água suspensas no ar, alta taxa de quadros, cinematográfico',
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
        'Rua de cidade cyberpunk futurista à noite, luzes neon, reflexos de chuva, carros voadores, estilo blade runner, composição cinematográfica',
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
        'Comercial de produto de alto padrão, design elegante, girando em base giratória, iluminação dramática de estúdio, luz de recorte, 4k, sensação luxuosa',
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
        'Close-up de mãos ajudando alguém a se levantar, iluminação suave e quente, momento emocional de bondade, conexão humana, cinematográfico, profundidade de campo, esperança',
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
        'Guitarrista tocando no palco, reflexo de lente, silhueta da multidão no estádio, atmosfera energética, iluminação volumétrica, 4k, concerto de rock',
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
        'Cena onírica surreal representando confusão, névoa rodopiante, relógios flutuantes, perspectiva distorcida, cores suaves, atmosfera misteriosa, cinematográfico, estilo inception',
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
        'Cena cinematográfica de coragem, um herói solitário contra uma tempestade gigante, escudo erguido, luz dourada rompendo nuvens escuras, escala épica, determinação, 8k',
    },
  },
  {
    id: 'race',
    name: 'Corrida Futurista',
    description: 'Velocidade e naves anti-gravidade.',
    icon: <RocketIcon className="w-6 h-6 text-cyan-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Corrida de naves espaciais futuristas em alta velocidade, cidade sci-fi, rastro de luz neon, desfoque de movimento intenso, adrenalina, 4k, estilo wipeout cinematográfico',
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
        'Cena de música country americana, músico sentado em uma varanda de fazenda durante a hora dourada, tocando violão, cavalos ao fundo, atmosfera rústica, cinematográfico',
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
        'Uma criança olhando para um vaga-lume mágico brilhante em uma floresta, olhos arregalados de admiração, close-up, atmosfera mágica, brilhos, iluminação cinematográfica, descoberta',
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
        'Visual de decepção, uma única flor murcha na chuva, paleta de cores cinza, gotas de chuva batendo na janela, fundo desfocado, câmera lenta, clima melancólico',
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
        'Desejo ardente intenso, close-up de olhos ansiando, mordendo o lábio, iluminação neon vermelha e roxa, textura de pele suada, bokeh cinematográfico, paixão, obsessão, altamente detalhado',
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
        'Cena cinematográfica de desespero, silhueta de uma pessoa com a cabeça nas mãos, sentada em um quarto escuro e vazio, sombras longas e dramáticas, iluminação azul fria, sensação de isolamento e desesperança',
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
        'Pista de dança disco dos anos 70, reflexos de globo de espelhos, luzes coloridas funky, calças boca de sino, movimentos de dança retrô, energia vibrante, granulação de filme vintage',
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
        'Representação visual da dor emocional, cena cinematográfica sombria, vidro quebrado, céu cinza tempestuoso, chuva forte, tons de azul frio, desespero emocional, iluminação dramática, metafórico',
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
        'Cena cinematográfica aérea de drone, voando sobre uma cordilheira épica ao pôr do sol, movimento de câmera amplo, grande angular, vista de tirar o fôlego',
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
        'Visualizador de Drum and Bass, movimento de túnel em alta velocidade, efeitos de glitch, verde neon e preto, estética cibernética futurista, pulso energético, sensação de 60fps',
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
        'Drop de show de dubstep, parede de alto-falantes maciça tremendo, efeito visual de onda de choque, iluminação estroboscópica caótica, multidão pulando, energia intensa, atmosfera de clube escuro',
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
        'Animação explicativa educacional, estilo recorte de papel, gráficos simples, comunicação visual clara, cores brilhantes, infográfico',
    },
  },
  {
    id: 'interview',
    name: 'Entrevista Documental',
    description: 'Iluminação profissional e bokeh.',
    icon: <MicIcon className="w-6 h-6 text-blue-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Entrevista estilo documentário, pessoa falando para a câmera, iluminação de três pontos profissional, fundo de escritório desfocado (bokeh), alta resolução, tom sério, cinematográfico',
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
        'Explosão de entusiasmo, multidão torcendo com explosões de confete, cores saturadas brilhantes, movimento de câmera dinâmico, sorrisos, celebração de alta energia, vibe de festival',
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
        'Configuração moderna de home office, laptop na mesa, luz solar natural, plantas internas, espaço de trabalho minimalista limpo, atmosfera produtiva',
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
        'Símbolo de esperança, um pequeno broto verde crescendo através de concreto rachado, raio de luz solar quente atingindo-o, orvalho da manhã, profundidade de campo, inspirador e edificante, cinematográfico',
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
        'Ação de esportes radicais, snowboard descendo uma montanha, câmera dinâmica seguindo, spray de neve, ritmo acelerado, adrenalina, 4k',
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
        'Uma cena de vídeo gerada no exato estilo visual da imagem de referência, mantendo a vibe artística, cores e iluminação, altamente detalhado',
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
        'Experiência visual eufórica, caleidoscópio de cores neon, desfoque de movimento rápido, fogos de artifício, atmosfera de festival, energia positiva intensa, psicodélico, alta velocidade',
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
        'Exploração do espaço profundo, nave espacial voando por nebulosa colorida, estrelas, cena de filme de ficção científica cinematográfica, altamente detalhado',
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
        'Visual de êxtase e transcendência, partículas douradas em espiral, ascendendo em direção a uma luz divina brilhante, sensação de leveza, visualização de som etéreo, surreal, cinematográfico',
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
        'Felicidade radiante, pessoa correndo por um campo de girassóis durante a hora dourada, reflexo de lente, sorrisos genuínos, câmera lenta, atmosfera brilhante e arejada, cinematográfico',
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
        'Festival de música EDM massivo, palco principal, show de luzes laser espetacular, confete, multidão gigante pulando, atmosfera energética, cores neon, noite, plano aberto',
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
        'Estilo Filme Noir, preto e branco, detetive caminhando em rua chuvosa à noite, sombras de alto contraste, iluminação dramática, vibe anos 40',
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
        'Cena de filme de terror, floresta escura com neblina, silhueta misteriosa, atmosfera assustadora, iluminação cinematográfica, suspense',
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
        'Músico folk indie tocando violão acústico perto de uma fogueira, cenário de floresta, vaga-lumes, iluminação aconchegante quente, atmosfera íntima, profundidade de campo cinematográfica',
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
        'Festa tradicional de Forró brasileiro, bandeirinhas coloridas, casal dançando junto, sanfoneiro, fogueira, cores vibrantes, atmosfera festiva, cinematográfico',
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
        'Festa de rua de funk brasileiro (baile funk), parede de alto-falantes maciça (paredão), luzes neon, multidão dançando energeticamente, cena noturna de favela urbana, atmosfera vibrante, 4k',
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
        'Recife de coral subaquático, peixes tropicais vibrantes, raios de sol penetrando na água, bolhas, cena oceânica cinematográfica',
    },
  },
  {
    id: 'soccer',
    name: 'Futebol Arte',
    description: 'A emoção do gol em câmera lenta no estádio.',
    icon: <TrophyIcon className="w-6 h-6 text-emerald-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Jogo de futebol cinematográfico, jogador chutando a bola em um estádio lotado à noite, super câmera lenta, grama voando, iluminação de estádio, torcida desfocada ao fundo, 4k, energia vibrante',
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
        'Comercial de comida gourmet, hambúrguer delicioso fumegante, puxada de queijo em câmera lenta, close-up, iluminação apetitosa, 4k',
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
        'Coral gospel cantando em uma grande igreja, raios de sol entrando pelos vitrais, poeira flutuante, atmosfera emocional edificante, mãos levantadas, iluminação cinematográfica',
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
        'Visualizando a gratidão, nascer do sol quente sobre uma montanha majestosa, pessoa de braços abertos, luz suave brilhante, atmosfera espiritual, pacífico, cinematográfico, grato',
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
        'Ensaio de banda de rock grunge dos anos 90 em uma garagem escura, estética vintage, camisas de flanela, cabelo bagunçado, efeito de lente olho de peixe, iluminação sombria, energia crua, atmosfera empoeirada',
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
        'Banda de heavy metal tocando em um armazém escuro, iluminação estroboscópica agressiva, headbanging, máquinas de fumaça, atmosfera intensa, alto contraste, estética sombria',
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
        'Cena de rua urbana, paredes com arte em graffiti, dançarinos de break, boombox, roupas de rua vibrantes, vibe hip hop anos 90, efeito de lente olho de peixe, movimento dinâmico',
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
        'Filme documentário histórico cinematográfico, ruínas de templo grego antigo ao pôr do sol, plano de estabelecimento, colunas de mármore, partículas de poeira, hora dourada, texturas realistas, 8k, atmosfera épica',
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
        'Festa de house tropical em um clube de praia durante o pôr do sol, decks de DJ, silhuetas de palmeiras, iluminação laranja dourada quente, dança em câmera lenta, vibes de verão relaxadas, cinematográfico',
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
        'Representação visual da inveja, olhos verdes brilhantes nas sombras, cobras deslizando, iluminação esmeralda fria, atmosfera dramática, ciúme, cinematográfico, misterioso',
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
        'Fúria incontrolável, silhueta gritando contra uma parede de fogo, vidro estilhaçando, cores vermelhas e laranjas intensas, alto contraste, energia caótica, raiva explosiva',
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
        'Renderização de sala isométrica 3D, estilo low poly fofo, cores pastéis, iluminação suave, ilustração blender 3d, atmosfera aconchegante',
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
        'Banda de metais de Nova Orleans tocando em uma rua ensolarada, arquitetura colorida do bairro francês, colares de mardi gras, atmosfera animada, close-up de trompete, estilo de câmera na mão, celebração alegre',
    },
  },
  {
    id: 'jazz-fusion',
    name: 'Jazz Fusion',
    description: 'Mistura elétrica e improvisação moderna.',
    icon: <MusicIcon className="w-6 h-6 text-teal-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Banda de jazz fusion tocando em estúdio moderno, piano elétrico rhodes, baixo funky, iluminação colorida suave, atmosfera sofisticada, close-up nos instrumentos',
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
        'Close-up de um microfone vintage em um clube de jazz mal iluminado, saxofone ao fundo, luzes bokeh, atmosfera sombria, estilo noir, cinematográfico',
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
        'Cenário de videoclipe de K-Pop, cores pastéis vibrantes, grupo dançando coreografia sincronizada, iluminação de estúdio, visual brilhante, alta produção, cinematográfico',
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
        'Banda de mariachi tocando em uma praça mexicana colorida, trajes tradicionais de charro, sombreros, trompete e violão, fitas vibrantes, dia festivo, cinematográfico',
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
        'Medo psicológico, caminhando por um corredor estreito e escuro com luzes piscando, figura sombria ameaçadora, som de batimentos cardíacos implícito, alto suspense, atmosfera de terror, cinematográfico',
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
        'Melancolia silenciosa, garoa suave em uma vidraça, luz cinza suave, xícara de café vazia, paisagem urbana desfocada ao fundo, clima contemplativo, estética lo-fi',
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
        'Foto editorial de alta moda, roupa vanguardista, modelo caminhando sobre um chão de espelho, holofote dramático, fundo minimalista, câmera lenta, 8k, iluminação cinematográfica',
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
        'Paisagem mágica de fantasia, ilhas flutuantes, partículas brilhantes, atmosfera etérea, qualidade onírica, estilo de arte digital',
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
        'Filme documentário de natureza estilo National Geographic, foto macro da flora, texturas realistas, iluminação natural suave, 8k, altamente detalhado',
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
        'Estúdio de transmissão de notícias de TV, mesa de âncora profissional, gráficos de notícias de última hora na tela, fundo de redação moderno, realista',
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
        'Performance em grande palco de ópera, cantora soprano em traje elaborado, iluminação de palco dramática, cortinas de veludo vermelho, expressão emocional, atmosfera teatral, cinematográfico',
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
        'Grande salão de orquestra, maestro regendo, músicos sinfônicos, iluminação dourada, atmosfera elegante, plano aberto, cinematográfico, 8k',
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
        'Sentimento de orgulho e realização, um atleta segurando uma medalha de ouro sob as luzes do estádio, pose triunfante, suor na testa, ângulo baixo cinematográfico, iluminação heróica, câmera lenta',
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
        'Paz interior e zen, belo jardim japonês, água ondulando lentamente em um lago, flor de lótus, névoa suave, movimento gentil, atmosfera calma, vibe de meditação',
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
        'Animação de personagem, o personagem da imagem de referência realizando uma ação natural, mantendo aparência consistente, iluminação cinematográfica, alta qualidade',
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
        'Piano de cauda sob um holofote, poeira dançando na luz, fundo de sala de concertos elegante, mãos de pianista tocando, emotivo, atmosfera clássica, cinematográfico',
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
        'Animação estilo pintura a óleo, inspirado em van gogh, pinceladas grossas, textura artística, paisagem colorida, impressionismo',
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
        'Cena de jogo pixel art 8-bit, nível de rolagem lateral, estética retrô, paleta vibrante, vibe nostálgica de jogos',
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
        'Show de punk rock em um clube de porão sujo, moicanos, jaquetas de couro, mosh pit, energia agressiva, paredes com graffiti, movimento de câmera caótico, estética crua',
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
        'Quarteto de cordas clássico tocando em um luxuoso salão de baile barroco, lustres dourados, atmosfera elegante, movimento de câmera suave, 4k, iluminação cinematográfica, sofisticado',
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
        'Cena de videoclipe de R&B, cantor em um terraço à noite com bokeh de luzes da cidade, calçada molhada pela chuva, iluminação roxa e azul, vibe emocional, cinematográfico, suave',
    },
  },
  {
    id: 'rap',
    name: 'Rap Cypher',
    description: 'Rima, ritmo e cultura de rua.',
    icon: <MicIcon className="w-6 h-6 text-zinc-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Roda de rima (cypher) em uma esquina urbana à noite, rappers com microfone, iluminação de poste de rua, fumaça, estética crua, lente grande angular, energia underground',
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
        'Estilo realismo mágico, misturando cenas cotidianas realistas com elementos fantásticos, significado simbólico profundo, atmosfera onírica, iluminação cinematográfica, altamente detalhado, toque surreal',
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
        'Vibes de música Reggae, músicos em uma praia tropical ao pôr do sol, dreadlocks, detalhes de iluminação em vermelho ouro e verde, atmosfera relaxada, palmeiras, câmera lenta, cinematográfico',
    },
  },
  {
    id: 'vhs',
    name: 'Retro VHS',
    description: 'Estilo de vídeo caseiro dos anos 90.',
    icon: <TvIcon className="w-6 h-6 text-purple-300" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Estilo de vídeo caseiro dos anos 90, efeito de glitch VHS, linhas de rastreamento, vibe nostálgica de férias em família, estética de baixa fidelidade',
    },
  },
  {
    id: 'psy-rock',
    name: 'Rock Psicodélico',
    description: 'Cores vibrantes e distorção anos 70.',
    icon: <EyeIcon className="w-6 h-6 text-indigo-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Banda de rock psicodélico dos anos 70, efeitos visuais caleidoscópicos, cores líquidas girando, distorção de lente, roupas vintage, atmosfera alucinante, videoclipe retrô',
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
        'Desfile de carnaval do Rio de Janeiro (sambódromo), passistas de samba com elaborados trajes de penas coloridas, carros alegóricos intrincados, bateristas, energia vibrante, confete, cinematográfico 4k',
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
        'Cena nostálgica representando saudade, efeito de granulação de filme antigo, olhando por uma janela chuvosa, tons de sépia, memória desaparecendo, sentimental, emocional',
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
        'Serenidade perfeita, um lago calmo ao amanhecer refletindo montanhas como um espelho, névoa matinal, silêncio completo, paleta de cores frias, meditativo, cinematográfico 8k',
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
        'Paisagem do sertão brasileiro, violão acústico em uma varanda de madeira, pôr do sol sobre uma fazenda, cavalos pastando ao longe, hora dourada, vibe rústica pacífica, cinematográfico',
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
        'Cena cinematográfica de solidão, uma figura solitária sentada em um banco em um parque vazio e vasto durante o outono, folhas caindo, plano aberto mostrando isolamento, cores frias, beleza melancólica',
    },
  },
  {
    id: 'steampunk',
    name: 'Steampunk Vitoriano',
    description: 'Engrenagens, vapor e latão.',
    icon: <WrenchIcon className="w-6 h-6 text-amber-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Cidade steampunk vitoriana, engrenagens de latão, vapor, dirigíveis no céu, arquitetura mecânica, iluminação sépia, detalhado, fantasia industrial',
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
        'Animação estilo claymation, personagem de massinha feito à mão, textura de stop motion, iluminação suave, atmosfera lúdica',
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
        'Story vertical para rede social, cores vibrantes, energia otimista, estética de tendência, iluminação natural brilhante, vibe lifestyle',
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
        'Conceito de surpresa, close-up extremo de olhos arregalando em choque alegre, explosão de confete colorido e serpentinas ao fundo, alta energia, efeito de congelamento de quadro, vibrante',
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
        'Estética synthwave anos 80, horizonte de grade neon, sol retrô, névoa roxa e ciano, paisagem digital, retrofuturismo, loop',
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
        'Fundo tecnológico minimalista, formas geométricas 3D brancas abstratas, iluminação limpa, estética moderna, movimento suave',
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
        'Clube de techno underground, armazém industrial, luzes estroboscópicas, neblina, silhueta de multidão dançando, energia crua, atmosfera escura, monocromático',
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
        'Visualizando o tédio, um relógio tiquetaqueando na parede, poeira flutuando em um raio de luz da tarde, movimento de câmera lento, movimento repetitivo, atmosfera mundana, cores suaves',
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
        'Ternura gentil, uma mãe segurando a mão de um bebê, cores pastéis suaves, iluminação aconchegante quente, desfoque onírico, conexão emocional, amor puro, cinematográfico',
    },
  },
  {
    id: 'trance',
    name: 'Trance Hipnótico',
    description: 'Viagem visual e lasers infinitos.',
    icon: <ActivityIcon className="w-6 h-6 text-blue-400" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Visualizador de música trance, túnel de luz infinito, lasers pulsantes sincronizados, cores azul e branco, geometria sagrada, sensação de velocidade, eufórico',
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
        'Intro de trailer de filme cinematográfico, iluminação dramática, alto contraste, atmosfera épica, resolução 4k, movimento de câmera lento, névoa volumétrica',
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
        'Estética moderna de videoclipe de Trap, ângulo baixo de um carro esportivo de luxo em um estúdio escuro, lasers neon roxos e azuis vibrantes, fumaça, reflexos brilhantes, estilo moderno, cinematográfico 4k',
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
        'Visualizador de áudio abstrato para trilha sonora de filme, formas de onda elegantes movendo-se com a música, partículas cinematográficas, fundo escuro, tons dourados e prateados',
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
        'Tristeza melancólica, silhueta solitária caminhando na chuva, rua da cidade vazia à noite, reflexos no pavimento molhado, clima azul, cinematográfico, ritmo lento',
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
        'Estilo videoclipe, boate neon, silhueta dançando, luzes estroboscópicas, atmosfera energética, color grading cinematográfico',
    },
  },
  {
    id: 'vlog',
    name: 'Vlog de Viagem',
    description: 'Estilo selfie em locais exóticos.',
    icon: <PlaneIcon className="w-6 h-6 text-sky-500" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO_FAST,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Estilo vlog de viagem, câmera na mão (selfie), pessoa sorrindo com paisagem de montanha famosa ao fundo, luz natural brilhante, alta energia, youtuber, 4k',
    },
  },
  {
    id: 'western',
    name: 'Western Clássico',
    description: 'Duelo ao meio-dia no velho oeste.',
    icon: <SunIcon className="w-6 h-6 text-orange-600" />,
    params: {
      mode: GenerationMode.TEXT_TO_VIDEO,
      model: VeoModel.VEO,
      resolution: Resolution.P1080,
      aspectRatio: AspectRatio.LANDSCAPE,
      outputFormat: OutputFormat.MP4,
      prompt:
        'Cena de filme de faroeste clássico, duelo ao meio-dia em uma cidade fantasma empoeirada, close-up nos olhos, plantas rolando (tumbleweed), iluminação dura do sol, tensão, textura de filme granulado, cinemascope',
    },
  },
];

interface TemplateLibraryProps {
  onSelect: (params: GenerateVideoParams) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({onSelect}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = TEMPLATES.filter((template) => {
    const query = searchQuery.toLowerCase();
    return (
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-2" id="tour-templates">
      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-4 gap-4">
        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
          Comece com um Modelo
        </h3>
        
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg leading-5 bg-[#1f1f1f] text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
            placeholder="Buscar modelo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredTemplates.map((template) => (
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
      ) : (
        <div className="text-center py-12 bg-[#1f1f1f] border border-gray-700 rounded-xl border-dashed">
          <SearchIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">Nenhum modelo encontrado para "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default TemplateLibrary;
