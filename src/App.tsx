import { useState, useMemo } from 'react';
import { MotionStage } from './components/MotionStage';
import { OCEAN_THEMES } from './themes';
import {
  AnimationStyle,
  AspectRatio,
  MarineSettings,
  OceanThemeId,
  TypographySettings,
} from './types';
import { CheckCircle2 } from 'lucide-react';

const DEFAULT_TYPOGRAPHY: TypographySettings = {
  line1: 'NHIỀU CÁ LỚN,',
  line2: 'GIÁ TRỊ VẪN THẤP',
  line3: '',
  subtitle: '',
  fontSize: 1.0,
  fontFamily: 'Be Vietnam Pro',
  animationStyle: 'ocean-surge' as AnimationStyle,
  showInfographic: false, // Clean layout with only the requested headline
};

const DEFAULT_MARINE: MarineSettings = {
  fishCount: 16,
  fishSpeed: 1.0,
  showJellyfish: true,
  showTurtle: true,
  bubbleDensity: 2,
  waveSpeed: 1.0,
  interactiveRepulsion: true,
};

export default function App() {
  const [themeId, setThemeId] = useState<OceanThemeId>('cyan-original');
  const [marineSettings, setMarineSettings] = useState<MarineSettings>(DEFAULT_MARINE);
  const [typographySettings, setTypographySettings] =
    useState<TypographySettings>(DEFAULT_TYPOGRAPHY);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [triggerKey, setTriggerKey] = useState<number>(1);
  const [notification, setNotification] = useState<string | null>(null);

  const currentTheme = useMemo(() => {
    return (
      OCEAN_THEMES.find((t) => t.id === themeId) || OCEAN_THEMES[0]
    );
  }, [themeId]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleReplay = () => {
    setTriggerKey((k) => k + 1);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleResetToOriginal = () => {
    setThemeId('cyan-original');
    setMarineSettings(DEFAULT_MARINE);
    setTypographySettings(DEFAULT_TYPOGRAPHY);
    setAspectRatio('16:9');
    setPlaybackSpeed(1.0);
    setTriggerKey((k) => k + 1);
    showToast('Đã khôi phục về thiết kế gốc của slide!');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/95 border border-cyan-500/40 text-cyan-200 text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Studio Workspace - Clean presentation */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
        {/* Stage Presentation Viewport */}
        <MotionStage
          theme={currentTheme}
          marineSettings={marineSettings}
          typographySettings={typographySettings}
          aspectRatio={aspectRatio}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          playbackSpeed={playbackSpeed}
          triggerKey={triggerKey}
          onReplay={handleReplay}
        />
      </main>
    </div>
  );
}
