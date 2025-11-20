
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  Baby,
  Baseline,
  Binary,
  Brush,
  Building2,
  Camera,
  ChevronDown,
  Clapperboard,
  Clock,
  CloudFog,
  CloudLightning,
  CloudRain,
  Coffee,
  Disc,
  Download,
  Droplets,
  Eye,
  Feather,
  FileVideo,
  Film,
  Flame,
  Gamepad2,
  Gem,
  Ghost,
  Globe,
  GraduationCap,
  Guitar,
  Headphones,
  Heart,
  HeartHandshake,
  History,
  Image as ImageIconLucide,
  Image,
  KeyRound,
  Laptop,
  Layers,
  Loader2,
  Mic,
  Mic2,
  MonitorPlay,
  Music,
  Palette,
  PartyPopper,
  PawPrint,
  Plane,
  Plus,
  Radio,
  RefreshCw,
  Rocket,
  Search,
  Shield,
  Shirt,
  ShoppingBag,
  SlidersHorizontal,
  Smartphone,
  Smile,
  Sparkles,
  Speaker,
  Sprout,
  Sun,
  Trophy,
  Tv,
  UploadCloud,
  User,
  Utensils,
  Wand2,
  X,
  Zap,
} from 'lucide-react';

const defaultProps = {
  strokeWidth: 1.5,
};

export const KeyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <KeyRound {...defaultProps} {...props} />
);

export const ArrowPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => <RefreshCw {...defaultProps} {...props} />;

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Sparkles {...defaultProps} {...props} />
);

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Plus {...defaultProps} {...props} />
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => <ChevronDown {...defaultProps} {...props} />;

export const SlidersHorizontalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => <SlidersHorizontal {...defaultProps} {...props} />;

export const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => <ArrowRight {...defaultProps} {...props} />;

export const RectangleStackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => <Layers {...defaultProps} {...props} />;

export const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <X {...defaultProps} {...props} />
);

export const TextModeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Baseline {...defaultProps} {...props} />
);

export const FramesModeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => <Image {...defaultProps} {...props} />;

export const ReferencesModeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => <Film {...defaultProps} {...props} />

export const TvIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Tv {...defaultProps} {...props} />
);

export const FilmIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Film {...defaultProps} {...props} />
);

export const ClapperboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => <Clapperboard {...defaultProps} {...props} />;

export const SmartphoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => <Smartphone {...defaultProps} {...props} />;

export const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Globe {...defaultProps} {...props} />
);

export const ZapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Zap {...defaultProps} {...props} />
);

export const FileVideoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => <FileVideo {...defaultProps} {...props} />;

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Download {...defaultProps} {...props} />
);

export const ImageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <ImageIconLucide {...defaultProps} {...props} />
);

export const LoaderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Loader2 {...defaultProps} {...props} />
);

export const UploadCloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <UploadCloud {...defaultProps} {...props} />
);

export const AudioLinesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AudioLines {...defaultProps} {...props} />
);

export const MicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Mic {...defaultProps} {...props} />
);

// New Icons for Templates
export const ShoppingBagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <ShoppingBag {...defaultProps} {...props} />;
export const RadioIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Radio {...defaultProps} {...props} />;
export const MonitorPlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <MonitorPlay {...defaultProps} {...props} />;
export const GamepadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Gamepad2 {...defaultProps} {...props} />;
export const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Clock {...defaultProps} {...props} />;
export const DropletsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Droplets {...defaultProps} {...props} />;
export const RocketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Rocket {...defaultProps} {...props} />;
export const GhostIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Ghost {...defaultProps} {...props} />;
export const BinaryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Binary {...defaultProps} {...props} />;
export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Search {...defaultProps} {...props} />;
export const PaletteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Palette {...defaultProps} {...props} />;
export const BuildingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Building2 {...defaultProps} {...props} />;
export const CloudFogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <CloudFog {...defaultProps} {...props} />;
export const PlaneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Plane {...defaultProps} {...props} />;
export const UtensilsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Utensils {...defaultProps} {...props} />;
export const MusicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Music {...defaultProps} {...props} />;
export const GraduationCapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <GraduationCap {...defaultProps} {...props} />;
export const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Trophy {...defaultProps} {...props} />;
export const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Camera {...defaultProps} {...props} />;
export const BrushIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Brush {...defaultProps} {...props} />;
export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <User {...defaultProps} {...props} />;
export const PawPrintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <PawPrint {...defaultProps} {...props} />;
export const ShirtIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Shirt {...defaultProps} {...props} />;
export const MagicWandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Wand2 {...defaultProps} {...props} />;
export const CoffeeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Coffee {...defaultProps} {...props} />;
export const LaptopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Laptop {...defaultProps} {...props} />;

// Music Icons
export const HeadphonesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Headphones {...defaultProps} {...props} />;
export const GuitarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Guitar {...defaultProps} {...props} />;
export const Mic2Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Mic2 {...defaultProps} {...props} />;
export const DiscIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Disc {...defaultProps} {...props} />;
export const SpeakerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Speaker {...defaultProps} {...props} />;

// Emotion Icons
export const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Heart {...defaultProps} {...props} />;
export const CloudRainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <CloudRain {...defaultProps} {...props} />;
export const CloudLightningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <CloudLightning {...defaultProps} {...props} />;
export const HistoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <History {...defaultProps} {...props} />;
export const SmileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Smile {...defaultProps} {...props} />;
export const PartyPopperIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <PartyPopper {...defaultProps} {...props} />;
export const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Sun {...defaultProps} {...props} />;
export const FeatherIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Feather {...defaultProps} {...props} />;
export const HeartHandshakeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <HeartHandshake {...defaultProps} {...props} />;
export const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Eye {...defaultProps} {...props} />;
export const FlameIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Flame {...defaultProps} {...props} />;
export const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Shield {...defaultProps} {...props} />;
export const SproutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Sprout {...defaultProps} {...props} />;
export const BabyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Baby {...defaultProps} {...props} />;
export const GemIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Gem {...defaultProps} {...props} />;

// This icon had a different stroke width in the original file, so we preserve it.
export const CurvedArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => <ArrowDown {...props} strokeWidth={3} />;
