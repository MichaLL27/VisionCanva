import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Printer, RefreshCw, Download, Check, MapPin, CreditCard } from "lucide-react";
import modernImage from "@assets/generated_images/modern_clean_vision_board_collage.png";
import colorfulImage from "@assets/generated_images/colorful_energetic_vision_board_collage.png";
import spiritualImage from "@assets/generated_images/calm_spiritual_vision_board_collage.png";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/Layout";

export default function Result() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(window.location.search);
  const style = searchParams.get("style") || "modern";
  
  // Determine image based on style
  const getImage = () => {
    switch(style) {
      case "colorful": return colorfulImage;
      case "spiritual": return spiritualImage;
      default: return modernImage;
    }
  };

  const handleDownload = () => {
    toast({
      title: "Downloading...",
      description: "Your PDF is being generated.",
    });
  };

  return (
    <Layout>
      <div className="bg-background pb-12">
        <main className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 py-12">
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
                <Link href="/print/options">
                  <button 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <Printer className="w-5 h-5" />
                    Send to Print
                  </button>
                </Link>
                
                <button 
                  onClick={() => window.history.back()}
                  className="w-full bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <RefreshCw className="w-5 h-5" />
                  Generate Variation
                </button>
                
                <button 
                  onClick={handleDownload}
                  className="w-full bg-transparent hover:bg-muted text-muted-foreground font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-3 text-sm cursor-pointer"
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
      </div>
    </Layout>
  );
}
