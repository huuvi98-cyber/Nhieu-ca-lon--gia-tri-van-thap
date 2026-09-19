export type AnimationStyle = 
  | 'ocean-surge' 
  | 'kinetic-impact' 
  | 'tidal-glow' 
  | 'depth-parallax' 
  | 'typewriter';

export type AspectRatio = '16:9' | '9:16' | '4:3' | '1:1';

export type OceanThemeId = 'cyan-original' | 'deep-abyss' | 'sunset-coral' | 'arctic-ice';

export interface OceanTheme {
  id: OceanThemeId;
  name: string;
  nameVi: string;
  bgGradient: string;
  textColor: string;
  accentWaveColor: string;
  secondaryWaveColor: string;
  ambientLight: string;
  fishColor: string;
  fishAlpha: number;
  jellyfishColor: string;
  turtleColor: string;
  isDark: boolean;
}

export interface MarineSettings {
  fishCount: number;
  fishSpeed: number;
  showJellyfish: boolean;
  showTurtle: boolean;
  bubbleDensity: number; // 1 to 5
  waveSpeed: number;
  interactiveRepulsion: boolean;
}

export interface TypographySettings {
  line1: string;
  line2: string;
  line3: string;
  subtitle: string;
  fontSize: number; // scale multiplier e.g. 1.0
  fontFamily: string;
  animationStyle: AnimationStyle;
  showInfographic: boolean;
}

export interface InfographicStat {
  label: string;
  value: string;
  subtext: string;
  highlightColor: string;
}
