import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";

// Mock Data
const LIFE_AREAS = [
  "Money & Wealth", 
  "Career & Business", 
  "Love & Relationships", 
  "Health & Fitness", 
  "Family & Home", 
  "Spirituality", 
  "Social Life & Fun",
  "Travel & Adventure"
];

const STYLES = [
  { id: "modern", name: "Modern & Clean", description: "Minimalist, organized, and fresh." },
  { id: "colorful", name: "Colorful & Energetic", description: "Bold, vibrant, and high energy." },
  { id: "spiritual", name: "Calm & Spiritual", description: "Soft, organic, and peaceful." },
];

export default function Create() {
  const [_, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form State
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(a => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const handleNext = () => {
    if (step === 3) {
      handleGenerate();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      // Navigate to result with query params (in a real app, we'd persist state properly)
      setLocation(`/result?style=${selectedStyle}`);
    }, 3000);
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-white p-6 rounded-full shadow-xl flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-primary animate-spin-slow" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-semibold">Manifesting your vision...</h2>
            <p className="text-muted-foreground">
              Our AI is curating the perfect images to align with your goals for {selectedAreas.slice(0, 3).join(", ")}...
            </p>
          </div>

          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 py-6 flex items-center justify-between max-w-3xl mx-auto w-full">
        <button 
          onClick={handleBack}
          disabled={step === 1}
          className={`p-2 rounded-full hover:bg-secondary transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-2 w-8 rounded-full transition-colors ${s <= step ? 'bg-primary' : 'bg-secondary'}`} 
            />
          ))}
        </div>
        
        <div className="w-9" /> {/* Spacer */}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 flex flex-col">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Focus Areas</h1>
              <p className="text-muted-foreground text-lg mb-8">Which areas of your life do you want to elevate this year?</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LIFE_AREAS.map((area) => (
                  <label 
                    key={area}
                    className={`
                      flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${selectedAreas.includes(area) 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-transparent bg-white shadow-sm hover:border-primary/30'}
                    `}
                  >
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={selectedAreas.includes(area)}
                      onChange={() => toggleArea(area)}
                    />
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                      ${selectedAreas.includes(area) ? 'border-primary bg-primary text-white' : 'border-muted-foreground/30'}
                    `}>
                      {selectedAreas.includes(area) && <CheckIcon className="w-3 h-3" />}
                    </div>
                    <span className="font-medium text-lg">{area}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Your Vision</h1>
              <p className="text-muted-foreground text-lg mb-8">Describe how your dream life looks and feels one year from now. Be specific.</p>
              
              <div className="relative flex-1 min-h-[300px]">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="I am waking up in a sun-filled bedroom overlooking the ocean. I feel calm, healthy, and financially free. I run a successful creative business..."
                  className="w-full h-full p-6 rounded-2xl border-2 border-transparent bg-white shadow-sm focus:border-primary focus:ring-0 resize-none text-lg leading-relaxed placeholder:text-muted-foreground/50 transition-all"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Choose a Style</h1>
              <p className="text-muted-foreground text-lg mb-8">How should your vision board feel?</p>
              
              <div className="space-y-4">
                {STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`
                      w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group
                      ${selectedStyle === style.id 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-transparent bg-white shadow-sm hover:border-primary/30'}
                    `}
                  >
                    <div>
                      <h3 className="font-display font-bold text-xl mb-1">{style.name}</h3>
                      <p className="text-muted-foreground">{style.description}</p>
                    </div>
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                      ${selectedStyle === style.id ? 'border-primary bg-primary text-white' : 'border-muted-foreground/30 group-hover:border-primary/50'}
                    `}>
                      <div className="w-2.5 h-2.5 bg-current rounded-full" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="pt-8 mt-auto">
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && selectedAreas.length === 0) ||
              (step === 2 && description.length < 10) ||
              (step === 3 && !selectedStyle)
            }
            className={`
              w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg
              ${(step === 1 && selectedAreas.length === 0) || (step === 2 && description.length < 10) || (step === 3 && !selectedStyle)
                ? 'bg-muted text-muted-foreground cursor-not-allowed shadow-none' 
                : 'bg-primary text-white hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5'}
            `}
          >
            {step === 3 ? "Create My Vision Board" : "Continue"}
            {step !== 3 && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </main>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
