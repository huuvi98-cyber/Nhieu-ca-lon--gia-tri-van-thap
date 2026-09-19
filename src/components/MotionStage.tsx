import React, { useRef } from 'react';
import { MarineCanvas } from './MarineCanvas';
import { KineticTypography } from './KineticTypography';
import { OceanTheme, MarineSettings, TypographySettings, AspectRatio } from '../types';

interface MotionStageProps {
  theme: OceanTheme;
  marineSettings: MarineSettings;
  typographySettings: TypographySettings;
  aspectRatio: AspectRatio;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playbackSpeed: number;
  triggerKey: number;
  onReplay: () => void;
}

export const MotionStage: React.FC<MotionStageProps> = ({
  theme,
  marineSettings,
  typographySettings,
  aspectRatio,
  isPlaying,
  playbackSpeed,
  triggerKey,
}) => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasInstanceRef = useRef<HTMLCanvasElement | null>(null);

  // Aspect Ratio wrapper classes
  const getAspectClass = () => {
    switch (aspectRatio) {
      case '16:9':
        return 'aspect-video max-w-6xl';
      case '9:16':
        return 'aspect-[9/16] max-w-sm';
      case '4:3':
        return 'aspect-[4/3] max-w-4xl';
      case '1:1':
        return 'aspect-square max-w-2xl';
      default:
        return 'aspect-video max-w-6xl';
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* The Stage Viewport */}
      <div
        ref={stageRef}
        id="motion-graphics-stage"
        className={`relative w-full ${getAspectClass()} overflow-hidden rounded-2xl shadow-xl shadow-slate-200/60 transition-all duration-500 border border-slate-200/80 select-none`}
        style={{
          background: theme.bgGradient,
        }}
      >
        {/* Living Canvas Layer (Fish, waves, jellyfish, bubbles, ripples) */}
        <MarineCanvas
          theme={theme}
          settings={marineSettings}
          isPlaying={isPlaying}
          playbackSpeed={playbackSpeed}
          onCanvasReady={(c) => {
            canvasInstanceRef.current = c;
          }}
        />

        {/* Content Container (Typography layer) */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 sm:px-14 md:px-20 lg:px-24 pointer-events-none">
          <KineticTypography
            settings={typographySettings}
            theme={theme}
            triggerKey={triggerKey}
          />
        </div>
      </div>
    </div>
  );
};
