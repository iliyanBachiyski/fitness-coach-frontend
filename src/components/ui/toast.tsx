import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type ToastVariant = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const variantConfig = {
  success: {
    icon: CheckCircle,
    containerClass: 'bg-primary/10 border-primary',
    iconClass: 'text-primary',
  },
  error: {
    icon: XCircle,
    containerClass: 'bg-warning/10 border-warning',
    iconClass: 'text-warning',
  },
  info: {
    icon: Info,
    containerClass: 'bg-secondary/10 border-secondary',
    iconClass: 'text-secondary',
  },
  warning: {
    icon: AlertTriangle,
    containerClass: 'bg-fat/10 border-fat',
    iconClass: 'text-fat',
  },
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const config = variantConfig[toast.variant];
  const Icon = config.icon;

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const duration = toast.duration ?? 5000;
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(toast.id), 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove, isPaused]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 200);
  };

  return (
    <div
      className={cn(
        'pointer-events-auto flex items-start gap-3 p-4 rounded-card border backdrop-blur-glass',
        'shadow-card transition-all duration-200 ease-out',
        config.containerClass,
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.iconClass)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{toast.title}</p>
        {toast.description && (
          <p className="text-sm text-text-secondary mt-1">{toast.description}</p>
        )}
      </div>
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4 text-text-secondary" />
      </button>
    </div>
  );
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }].slice(-3));
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export type { Toast, ToastVariant };
