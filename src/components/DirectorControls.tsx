import React from 'react';
import {
  Sliders,
  Type,
  Fish,
  Palette,
  Layers,
  Sparkles,
  RefreshCw,
  Gauge,
  Eye,
} from 'lucide-react';
import {
  AnimationStyle,
  AspectRatio,
  MarineSettings,
  OceanTheme,
  OceanThemeId,
  TypographySettings,
} from '../types';
import { OCEAN_THEMES } from '../themes';

interface DirectorControlsProps {
  theme: OceanTheme;
  onThemeChange: (themeId: OceanThemeId) => void;
  marineSettings: MarineSettings;
  onMarineSettingsChange: (settings: Partial<MarineSettings>) => void;
  typographySettings: TypographySettings;
  onTypographySettingsChange: (settings: Partial<TypographySettings>) => void;
  aspectRatio: AspectRatio;
  onAspectRatioChange: (ratio: AspectRatio) => void;
  playbackSpeed: number;
  onPlaybackSpeedChange: (speed: number) => void;
  onResetToOriginal: () => void;
}

export const DirectorControls: React.FC<DirectorControlsProps> = ({
  theme,
  onThemeChange,
  marineSettings,
  onMarineSettingsChange,
  typographySettings,
  onTypographySettingsChange,
  aspectRatio,
  onAspectRatioChange,
  playbackSpeed,
  onPlaybackSpeedChange,
  onResetToOriginal,
}) => {
  const [activeTab, setActiveTab] = React.useState<'motion' | 'text' | 'marine' | 'theme'>('motion');

  const animationPresets: { id: AnimationStyle; label: string; desc: string }[] = [
    {
      id: 'ocean-surge',
      label: 'Sóng Nước Dâng',
      desc: 'Từng dòng chữ dập dềnh vươn lên theo nhịp sóng ngầm mượt mà',
    },
    {
      id: 'kinetic-impact',
      label: 'Động Lực Học',
      desc: 'Chuyển động dứt khoát chuẩn truyền hình với hiệu ứng lực nảy lò xo',
    },
    {
      id: 'tidal-glow',
      label: 'Thủy Triều Sáng',
      desc: 'Ánh sáng đại dương lung linh, các nét chữ bồng bềnh lơ lửng',
    },
    {
      id: 'depth-parallax',
      label: 'Tách Lớp 3D',
      desc: 'Chữ phân tầng không gian đa chiều tạo chiều sâu thị giác ấn tượng',
    },
    {
      id: 'typewriter',
      label: 'Gõ Phím & Con Trỏ',
      desc: 'Từng từ xuất hiện nối tiếp với nhịp điệu thôi thúc và con trỏ neon',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-2xl">
      {/* Top Header & Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>Bảng Điều Khiển Đồ Họa Động</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Motion Studio
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Tùy chỉnh chuyển động kinetic, sinh thái đại dương và kịch bản truyền thông
            </p>
          </div>
        </div>

        <button
          onClick={onResetToOriginal}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors border border-slate-600/40 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Về Chuẩn Mẫu Gốc</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('motion')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            activeTab === 'motion'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 font-bold'
              : 'bg-slate-700/40 text-slate-300 hover:bg-slate-700/80 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Kiểu Chuyển Động</span>
        </button>

        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            activeTab === 'text'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 font-bold'
              : 'bg-slate-700/40 text-slate-300 hover:bg-slate-700/80 hover:text-white'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>Văn Bản & Tiêu Đề</span>
        </button>

        <button
          onClick={() => setActiveTab('marine')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            activeTab === 'marine'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 font-bold'
              : 'bg-slate-700/40 text-slate-300 hover:bg-slate-700/80 hover:text-white'
          }`}
        >
          <Fish className="w-4 h-4" />
          <span>Hệ Sinh Thái Biển</span>
        </button>

        <button
          onClick={() => setActiveTab('theme')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            activeTab === 'theme'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 font-bold'
              : 'bg-slate-700/40 text-slate-300 hover:bg-slate-700/80 hover:text-white'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Màu Sắc & Khung Hình</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="mt-5">
        {/* Tab 1: Motion Presets */}
        {activeTab === 'motion' && (
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Chọn Phong Cách Kinetic Typography
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {animationPresets.map((preset) => {
                const isSelected = typographySettings.animationStyle === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() =>
                      onTypographySettingsChange({ animationStyle: preset.id })
                    }
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-slate-100 shadow-md ring-1 ring-cyan-400/40'
                        : 'bg-slate-700/30 border-slate-700 hover:border-slate-600 text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-cyan-300">
                        {preset.label}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {preset.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Speed & Infographic Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-700/60">
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Tốc độ phát chuyển động: {playbackSpeed}x</span>
                </label>
                <div className="flex items-center gap-2">
                  {[0.5, 0.75, 1, 1.25, 1.5].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => onPlaybackSpeedChange(spd)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors ${
                        playbackSpeed === spd
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                          : 'bg-slate-700/40 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Lớp thông tin Infographic thực trạng thủy sản</span>
                </label>
                <button
                  onClick={() =>
                    onTypographySettingsChange({
                      showInfographic: !typographySettings.showInfographic,
                    })
                  }
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    typographySettings.showInfographic
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                      : 'bg-slate-700/40 border-slate-700 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>
                    {typographySettings.showInfographic
                      ? 'Đang hiển thị thẻ số liệu (85% thô, 15% tinh)'
                      : 'Đã ẩn thẻ số liệu (Chỉ giữ chữ chính như ảnh gốc)'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Text Customization */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">
                  Dòng 1 (Line 1)
                </label>
                <input
                  type="text"
                  value={typographySettings.line1}
                  onChange={(e) =>
                    onTypographySettingsChange({ line1: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-sm font-bold text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">
                  Dòng 2 (Line 2)
                </label>
                <input
                  type="text"
                  value={typographySettings.line2}
                  onChange={(e) =>
                    onTypographySettingsChange({ line2: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-sm font-bold text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">
                  Dòng 3 (Line 3)
                </label>
                <input
                  type="text"
                  value={typographySettings.line3}
                  onChange={(e) =>
                    onTypographySettingsChange({ line3: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-sm font-bold text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">
                Phụ đề giải thích (Subtitle)
              </label>
              <input
                type="text"
                value={typographySettings.subtitle}
                onChange={(e) =>
                  onTypographySettingsChange({ subtitle: e.target.value })
                }
                placeholder="Ví dụ: Thực trạng ngành thủy hải sản & Giải pháp gia tăng chuỗi giá trị..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Font Size Multiplier Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Kích cỡ phông chữ (Scale)
                </label>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {Math.round(typographySettings.fontSize * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.3"
                step="0.05"
                value={typographySettings.fontSize}
                onChange={(e) =>
                  onTypographySettingsChange({
                    fontSize: parseFloat(e.target.value),
                  })
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Marine Life Settings */}
        {activeTab === 'marine' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Số lượng đàn cá đang bơi (Fish Count): {marineSettings.fishCount}
                  </label>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  step="1"
                  value={marineSettings.fishCount}
                  onChange={(e) =>
                    onMarineSettingsChange({
                      fishCount: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Tốc độ bơi lượn: {marineSettings.fishSpeed}x
                  </label>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="2.2"
                  step="0.1"
                  value={marineSettings.fishSpeed}
                  onChange={(e) =>
                    onMarineSettingsChange({
                      fishSpeed: parseFloat(e.target.value),
                    })
                  }
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Mật độ bọt khí nổi lên (Bubbles): Cấp {marineSettings.bubbleDensity}
                  </label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={marineSettings.bubbleDensity}
                  onChange={(e) =>
                    onMarineSettingsChange({
                      bubbleDensity: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Tốc độ cuộn sóng ngầm (Wave Speed): {marineSettings.waveSpeed}x
                  </label>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={marineSettings.waveSpeed}
                  onChange={(e) =>
                    onMarineSettingsChange({
                      waveSpeed: parseFloat(e.target.value),
                    })
                  }
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Toggle Toggles */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-700/60">
              <button
                onClick={() =>
                  onMarineSettingsChange({
                    showJellyfish: !marineSettings.showJellyfish,
                  })
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  marineSettings.showJellyfish
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                    : 'bg-slate-700/40 border-slate-700 text-slate-400'
                }`}
              >
                {marineSettings.showJellyfish ? '✓ Sứa biển phát sáng' : '✕ Tắt sứa biển'}
              </button>

              <button
                onClick={() =>
                  onMarineSettingsChange({
                    showTurtle: !marineSettings.showTurtle,
                  })
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  marineSettings.showTurtle
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                    : 'bg-slate-700/40 border-slate-700 text-slate-400'
                }`}
              >
                {marineSettings.showTurtle ? '✓ Rùa biển lướt êm' : '✕ Tắt rùa biển'}
              </button>

              <button
                onClick={() =>
                  onMarineSettingsChange({
                    interactiveRepulsion: !marineSettings.interactiveRepulsion,
                  })
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  marineSettings.interactiveRepulsion
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                    : 'bg-slate-700/40 border-slate-700 text-slate-400'
                }`}
              >
                {marineSettings.interactiveRepulsion
                  ? '✓ Tương tác chuột (Cá tản ra khi rê chuột)'
                  : '✕ Tắt tương tác chuột'}
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Theme & Aspect Ratio */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Bảng Màu Đại Dương
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {OCEAN_THEMES.map((th) => {
                  const isSelected = theme.id === th.id;
                  return (
                    <button
                      key={th.id}
                      onClick={() => onThemeChange(th.id)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg'
                          : 'border-slate-700 hover:border-slate-600 bg-slate-700/30'
                      }`}
                      style={{
                        background: th.bgGradient,
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="font-bold text-xs"
                          style={{ color: th.textColor }}
                        >
                          {th.nameVi}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: th.accentWaveColor }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: th.textColor }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: th.fishColor }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/60">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Tỉ Lệ Khung Hình Trình Chiếu
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['16:9', '9:16', '4:3', '1:1'] as AspectRatio[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => onAspectRatioChange(r)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition-colors ${
                      aspectRatio === r
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                        : 'bg-slate-700/40 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {r === '16:9' && '16:9 (Chuẩn Slide Gốc)'}
                    {r === '9:16' && '9:16 (Story / Reel)'}
                    {r === '4:3' && '4:3 (Màn hình vuông)'}
                    {r === '1:1' && '1:1 (Instagram)'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
