import { Loader2, AlertCircle, Search } from "lucide-react";
import { motion } from "framer-motion";

export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
      <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
      <p className="text-sm font-medium animate-pulse">{message}</p>
    </div>
  );
}

export function ErrorState({ 
  message = "Something went wrong.", 
  onRetry 
}: { 
  message?: string; 
  onRetry?: () => void 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-destructive/10 p-4 rounded-full mb-4">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="text-lg font-bold mb-2">Error</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="bg-white border border-border hover:bg-gray-50 font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ 
  title, 
  description, 
  action 
}: { 
  title: string; 
  description: string; 
  action?: React.ReactNode 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border rounded-2xl bg-muted/10">
      <div className="bg-background p-4 rounded-full shadow-sm mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-xs mx-auto">{description}</p>
      {action}
    </div>
  );
}
