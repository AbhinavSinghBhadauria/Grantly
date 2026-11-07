import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/30 bg-[#0F1E19]/95 text-emerald-100',
    info: 'border-brand-500/30 bg-[#12162B]/95 text-brand-100',
    warning: 'border-amber-500/30 bg-[#241C10]/95 text-amber-100',
    error: 'border-rose-500/30 bg-[#251014]/95 text-rose-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md pointer-events-auto transition-all transform animate-bounce-short">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md ${borders[toastMessage.type]}`}>
        {icons[toastMessage.type]}
        <p className="text-sm font-medium">{toastMessage.text}</p>
      </div>
    </div>
  );
};
