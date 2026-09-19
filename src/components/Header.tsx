import React from 'react';
import { Waves, Sparkles, Download, Video, Presentation } from 'lucide-react';

interface HeaderProps {
  onQuickPreset: (preset: 'original' | 'infographic' | 'deep') => void;
  onSnapshot: () => void;
  onRecord: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onQuickPreset,
  onSnapshot,
  onRecord,
}) => {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-300 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20">
            <Waves className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white font-display">
                ĐỒ HỌA ĐỘNG
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                Ocean Motion
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Motion Graphics Canvas • Dựa trên thiết kế slide thủy sản
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="hidden md:flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs">
          <button
            onClick={() => onQuickPreset('original')}
            className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            Mẫu Chuẩn Gốc
          </button>
          <button
            onClick={() => onQuickPreset('infographic')}
            className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1"
          >
            <Presentation className="w-3 h-3 text-cyan-400" />
            <span>Infographic Báo Cáo</span>
          </button>
          <button
            onClick={() => onQuickPreset('deep')}
            className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span>Biển Đêm Huyền Ảo</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSnapshot}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            title="Xuất ảnh tĩnh định dạng PNG sắc nét"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Xuất Ảnh</span>
          </button>

          <button
            onClick={onRecord}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 active:scale-95"
            title="Ghi hình video chuyển động chất lượng cao 60FPS"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Ghi Video</span>
          </button>
        </div>
      </div>
    </header>
  );
};
