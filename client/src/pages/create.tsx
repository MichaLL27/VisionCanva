import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, ArrowRight, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLocalization } from "@/lib/localization";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type Step = "style-selection" | "dreams" | "prompt" | "loading";

export default function Create() {
  const [_, setLocation] = useLocation();
  const [step, setStep] = useState<Step>("style-selection");
  const [selectedStyle, setSelectedStyle] = useState<string>("corkboard");
  const [dreamsText, setDreamsText] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const { t, language } = useLocalization();
  const { toast } = useToast();

  const NextIcon = language === "he" ? ArrowLeft : ArrowRight;

  // Mutation for generating prompt
  const generatePromptMutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await apiRequest<{ prompt: string }>(
        "POST",
        "/api/generatePrompt",
        { dreamsText: text, style: selectedStyle }
      );
      return res.prompt;
    },
    onSuccess: (prompt) => {
      setCurrentPrompt(prompt);
      setStep("prompt");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate prompt. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mutation for generating vision board image
  const generateBoardMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest<{ imageUrl: string; provider: string }>(
        "POST",
        "/api/generateVisionBoard",
        { prompt: currentPrompt }
      );
      return res;
    },
    onSuccess: (data) => {
      const params = new URLSearchParams({
        imageUrl: encodeURIComponent(data.imageUrl),
        prompt: encodeURIComponent(currentPrompt),
        provider: encodeURIComponent(data.provider),
      });
      setLocation(`/result?${params.toString()}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate vision board. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGeneratePrompt = () => {
    if (dreamsText.trim().length < 20) {
      toast({
        title: "Too short",
        description: t("create.errorTooShort"),
        variant: "destructive",
      });
      return;
    }
    setStep("loading");
    generatePromptMutation.mutate(dreamsText);
  };

  const handleGenerateBoard = () => {
    setStep("loading");
    generateBoardMutation.mutate();
  };

  const handleRegeneratePrompt = () => {
    setStep("loading");
    generatePromptMutation.mutate(dreamsText);
  };

  const isGenerating =
    generatePromptMutation.isPending || generateBoardMutation.isPending;

  // Loading Screen
  if (isGenerating && step === "loading") {
    return (
      <Layout hideHeader hideFooter>
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
              <h2 className="text-2xl font-display font-semibold">
                {generatePromptMutation.isPending
                  ? t("loading.creatingPrompt")
                  : t("loading.creatingBoard")}
              </h2>
              <p className="text-muted-foreground">
                {t("loading.thinkingPrompt")}
              </p>
            </div>

            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideFooter>
      <div className="min-h-screen bg-background flex flex-col">
        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 flex flex-col">
          <AnimatePresence mode="wait">
            {step === "style-selection" && (
              <motion.div
                key="style-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col"
              >
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-center">
                  Choose Your Style
                </h1>
                <p className="text-muted-foreground text-lg mb-12 text-center max-w-2xl mx-auto">
                  Select the aesthetic for your vision board.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Option 1: Corkboard */}
                  <div 
                    onClick={() => {
                      setSelectedStyle("corkboard");
                      setStep("dreams");
                    }}
                    className="cursor-pointer group relative aspect-[3/4] bg-amber-100 rounded-2xl border-2 border-transparent hover:border-primary hover:shadow-xl transition-all overflow-hidden"
                  >
                    <img 
                      src="/first.jpeg" 
                      alt="First Style" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-display font-bold text-5xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-wider">
                      {t("create.style1")}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-sm font-medium text-center">Classic & Organic</p>
                    </div>
                  </div>

                  {/* Option 2: Minimalist */}
                  <div 
                    onClick={() => {
                      setSelectedStyle("minimalist");
                      setStep("dreams");
                    }}
                    className="cursor-pointer group relative aspect-[3/4] bg-gray-100 rounded-2xl border-2 border-transparent hover:border-primary hover:shadow-xl transition-all overflow-hidden"
                  >
                    <img 
                      src="/second.jpeg" 
                      alt="Second Style" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-display font-bold text-5xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-wider">
                      {t("create.style2")}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-sm font-medium text-center">Clean & Modern</p>
                    </div>
                  </div>

                  {/* Option 3: Cinematic */}
                  <div 
                    onClick={() => {
                      setSelectedStyle("cinematic");
                      setStep("dreams");
                    }}
                    className="cursor-pointer group relative aspect-[3/4] bg-slate-800 rounded-2xl border-2 border-transparent hover:border-primary hover:shadow-xl transition-all overflow-hidden"
                  >
                    <img 
                      src="/third.jpeg" 
                      alt="Third Style" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-display font-bold text-5xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-wider">
                      {t("create.style3")}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-sm font-medium text-center text-black">Moody & Deep</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "dreams" && (
              <motion.div
                key="dreams"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col"
              >
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  {t("create.dreamsTitle")}
                </h1>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
                  {t("create.dreamsSubtitle")}
                </p>

                <div className="flex-1 min-h-[300px] mb-8">
                  <textarea
                    value={dreamsText}
                    onChange={(e) => setDreamsText(e.target.value)}
                    placeholder={t("create.dreamsPlaceholder")}
                    className="w-full h-full p-6 rounded-2xl border-2 border-transparent bg-white shadow-sm focus:border-primary focus:ring-0 resize-none text-lg leading-relaxed placeholder:text-muted-foreground/50 transition-all"
                  />
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  {t("create.dreamsHelper")}
                </p>

                <button
                  onClick={handleGeneratePrompt}
                  disabled={dreamsText.trim().length < 20}
                  className={`
                    w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg
                    ${
                      dreamsText.trim().length < 20
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5"
                    }
                  `}
                >
                  {t("create.generatePrompt")}
                  <NextIcon className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === "prompt" && (
              <motion.div
                key="prompt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col"
              >
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  {t("create.promptTitle")}
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  {t("create.promptSubtitle")}
                </p>

                <div className="flex-1 min-h-[300px] mb-8 bg-white p-8 rounded-2xl shadow-sm border-2 border-border overflow-auto">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap font-medium">
                    {currentPrompt}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleGenerateBoard}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    {t("create.generateBoard")}
                  </button>

                  <button
                    onClick={handleRegeneratePrompt}
                    className="w-full bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-4 px-6 rounded-full transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    {t("create.newPrompt")}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </Layout>
  );
}
