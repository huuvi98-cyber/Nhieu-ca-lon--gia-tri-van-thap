import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TypographySettings, OceanTheme } from '../types';

interface KineticTypographyProps {
  settings: TypographySettings;
  theme: OceanTheme;
  triggerKey: number; // Increment to re-trigger entrance animation
}

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  settings,
  theme,
  triggerKey,
}) => {
  const { line1, line2, line3, fontSize, animationStyle } = settings;

  // Only keep valid lines (e.g. "NHIỀU CÁ LỚN," and "GIÁ TRỊ VẪN THẤP")
  const lines = [line1, line2, line3]
    .map((l) => l?.trim())
    .filter((l): l is string => Boolean(l && l.length > 0));

  // Render variant depending on animationStyle
  const renderLines = () => {
    switch (animationStyle) {
      case 'ocean-surge':
        return (
          <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
            {lines.map((line, idx) => (
              <div key={idx} className="overflow-hidden pt-4 pb-2 -my-2">
                <motion.div
                  initial={{ y: '125%', opacity: 0, rotate: -2.5 }}
                  animate={{ y: '0%', opacity: 1, rotate: 0 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.16 * idx,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display font-extrabold tracking-tight leading-[1.2] select-none"
                  style={{
                    color: theme.textColor,
                    fontSize: `clamp(1.9rem, ${4.8 * fontSize}vw, 5.2rem)`,
                    textRendering: 'optimizeLegibility',
                  }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>
        );

      case 'kinetic-impact':
        return (
          <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 1.25, opacity: 0, filter: 'blur(10px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2 * idx,
                }}
                className="font-display font-black tracking-tight leading-[1.2] pt-2 pb-1 select-none"
                style={{
                  color: theme.textColor,
                  fontSize: `clamp(1.9rem, ${4.8 * fontSize}vw, 5.2rem)`,
                  textRendering: 'optimizeLegibility',
                  textShadow: theme.isDark
                    ? '0 0 40px rgba(56, 189, 248, 0.35)'
                    : '0 4px 20px rgba(10, 35, 86, 0.08)',
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        );

      case 'tidal-glow':
        return (
          <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
                animate={{
                  opacity: [0, 1, 0.95, 1],
                  y: [35, 0, -4, 0],
                  filter: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.25 * idx,
                  ease: 'easeOut',
                }}
                className="font-display font-extrabold tracking-tight leading-[1.2] pt-2 pb-1 select-none"
                style={{
                  color: theme.textColor,
                  fontSize: `clamp(1.9rem, ${4.8 * fontSize}vw, 5.2rem)`,
                  textRendering: 'optimizeLegibility',
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        );

      case 'depth-parallax':
        return (
          <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4 perspective-1000">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, z: 80, rotateX: 25 }}
                animate={{ opacity: 1, z: 0, rotateX: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.18 * idx,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display font-extrabold tracking-tight leading-[1.2] pt-2 pb-1 select-none"
                style={{
                  color: theme.textColor,
                  fontSize: `clamp(1.9rem, ${4.8 * fontSize}vw, 5.2rem)`,
                  textRendering: 'optimizeLegibility',
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        );

      case 'typewriter':
        return (
          <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
            {lines.map((line, lineIdx) => {
              const words = line.split(' ');
              return (
                <div key={lineIdx} className="flex flex-wrap items-center gap-x-3 pt-2 pb-1">
                  {words.map((word, wordIdx) => (
                    <motion.span
                      key={wordIdx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: (lineIdx * 3 + wordIdx) * 0.12,
                        ease: 'easeOut',
                      }}
                      className="font-display font-extrabold tracking-tight leading-[1.2] select-none"
                      style={{
                        color: theme.textColor,
                        fontSize: `clamp(1.9rem, ${4.8 * fontSize}vw, 5.2rem)`,
                        textRendering: 'optimizeLegibility',
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                  {lineIdx === lines.length - 1 && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-3.5 h-10 sm:h-14 ml-1 bg-cyan-500 rounded-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={triggerKey}
        id="kinetic-typography-container"
        className="relative z-10 max-w-4xl flex flex-col justify-center"
      >
        {renderLines()}
      </motion.div>
    </AnimatePresence>
  );
};
