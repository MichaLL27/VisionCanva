import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Printer, RefreshCw, Download, Check, MapPin, CreditCard } from "lucide-react";
import modernImage from "@assets/generated_images/modern_clean_vision_board_collage.png";
import colorfulImage from "@assets/generated_images/colorful_energetic_vision_board_collage.png";
import spiritualImage from "@assets/generated_images/calm_spiritual_vision_board_collage.png";
import { useToast } from "@/hooks/use-toast";

export default function Result() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(window.location.search);
  const style = searchParams.get("style") || "modern";
  
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Determine image based on style
  const getImage = () => {
    switch(style) {
      case "colorful": return colorfulImage;
      case "spiritual": return spiritualImage;
      default: return modernImage;
    }
  };

  const handlePrintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setLocation("/success");
    }, 1000);
  };

  const handleDownload = () => {
    toast({
      title: "Downloading...",
      description: "Your PDF is being generated.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto mb-8">
        <Link href="/">
          <div className="font-display font-bold text-2xl tracking-tight text-primary cursor-pointer">VisionAI</div>
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
        {/* Preview Column */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-3xl shadow-2xl"
          >
            <img 
              src={getImage()} 
              alt="Generated Vision Board" 
              className="w-full h-auto rounded-2xl"
            />
          </motion.div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-border/50">
            <h3 className="font-display font-bold text-xl mb-4 text-primary">Your Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              "A future where financial freedom allows for spontaneous travel and deep creative work. Surrounded by nature, practicing daily mindfulness, and cultivating meaningful connections with loved ones. Radiant health and abundant energy flow through every day."
            </p>
          </div>
        </div>

        {/* Actions Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-primary/10 sticky top-6">
            <h2 className="font-display font-bold text-2xl mb-6">Next Steps</h2>
            
            <div className="space-y-4">
              <button 
                onClick={() => setShowPrintModal(true)}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                <Printer className="w-5 h-5" />
                Send to Print
              </button>
              
              <button 
                onClick={() => window.history.back()}
                className="w-full bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3"
              >
                <RefreshCw className="w-5 h-5" />
                Generate Variation
              </button>
              
              <button 
                onClick={handleDownload}
                className="w-full bg-transparent hover:bg-muted text-muted-foreground font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-3 text-sm"
              >
                <Download className="w-4 h-4" />
                Download as PDF
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h4 className="font-medium text-sm text-muted-foreground mb-4">Print Includes:</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  High-quality matte photo paper
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Free shipping worldwide
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Secure packaging
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Print Modal Overlay */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8 border-b border-border bg-gray-50/50">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-display font-bold text-2xl">Print Details</h2>
                <button 
                  onClick={() => setShowPrintModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              <p className="text-muted-foreground text-sm">Where should we send your vision board?</p>
            </div>
            
            <form onSubmit={handlePrintSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input required type="text" className="w-full p-3 rounded-xl border bg-background" placeholder="Jane Doe" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Shipping Address</label>
                  <textarea required className="w-full p-3 rounded-xl border bg-background resize-none h-24" placeholder="123 Dream St, Cloud City..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <input required type="tel" className="w-full p-3 rounded-xl border bg-background" placeholder="+1 (555)..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Size</label>
                    <select className="w-full p-3 rounded-xl border bg-background">
                      <option>A3 Poster ($29)</option>
                      <option>A2 Poster ($39)</option>
                      <option>18x24 Canvas ($59)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-xl flex items-start gap-3">
                <input type="checkbox" required className="mt-1 w-4 h-4 text-primary rounded border-primary focus:ring-primary" id="confirm" />
                <label htmlFor="confirm" className="text-sm text-muted-foreground cursor-pointer">
                  I confirm the print order details and authorize the charge to my account.
                </label>
              </div>

              <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all">
                Confirm & Order Print
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
