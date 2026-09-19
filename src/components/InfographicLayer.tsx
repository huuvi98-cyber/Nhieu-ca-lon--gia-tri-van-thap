import React from 'react';
import { motion } from 'motion/react';
import { OceanTheme } from '../types';
import { TrendingDown, Fish, Factory, ArrowUpRight } from 'lucide-react';

interface InfographicLayerProps {
  theme: OceanTheme;
  visible: boolean;
}

export const InfographicLayer: React.FC<InfographicLayerProps> = ({
  theme,
  visible,
}) => {
  if (!visible) return null;

  const cardBg = theme.isDark
    ? 'bg-slate-900/80 border-slate-800 text-slate-100'
    : 'bg-white/85 border-sky-100 text-slate-800 shadow-lg shadow-sky-900/5';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      id="infographic-stats-grid"
      className="absolute bottom-6 sm:bottom-10 right-6 sm:right-12 z-20 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl"
    >
      {/* Stat 1 */}
      <div
        className={`p-3 sm:p-4 rounded-xl backdrop-blur-md border ${cardBg} transition-transform hover:-translate-y-1 duration-300`}
      >
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-600">
            <Fish className="w-3.5 h-3.5 text-sky-500" />
            <span>Sản lượng đánh bắt</span>
          </div>
          <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-700">Dồi dào</span>
        </div>
        <div className="text-xl sm:text-2xl font-black font-display text-slate-900">
          85<span className="text-sm font-bold text-sky-600">%</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
          Chủ yếu xuất thô hoặc đông lạnh sơ chế
        </p>
      </div>

      {/* Stat 2 */}
      <div
        className={`p-3 sm:p-4 rounded-xl backdrop-blur-md border ${cardBg} transition-transform hover:-translate-y-1 duration-300`}
      >
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600">
            <Factory className="w-3.5 h-3.5 text-rose-500" />
            <span>Chế biến sâu</span>
          </div>
          <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">Thách thức</span>
        </div>
        <div className="text-xl sm:text-2xl font-black font-display text-slate-900">
          15<span className="text-sm font-bold text-rose-600">%</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
          Giá trị thặng dư chưa tương xứng tiềm năng
        </p>
      </div>

      {/* Stat 3 */}
      <div
        className={`p-3 sm:p-4 rounded-xl backdrop-blur-md border ${cardBg} transition-transform hover:-translate-y-1 duration-300 hidden md:block`}
      >
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
            <span>Dư địa gia tăng</span>
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black font-display text-slate-900">
          3.5<span className="text-sm font-bold text-emerald-600">x</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
          Khi hoàn thiện chuỗi giá trị và thương hiệu
        </p>
      </div>
    </motion.div>
  );
};
