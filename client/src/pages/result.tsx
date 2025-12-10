import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Printer, RefreshCw, Download, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/Layout";
import { useLocalization } from "@/lib/localization";

export default function Result() {
  const { toast } = useToast();
  const { t } = useLocalization();
  
  // Get image URL and vision summary from query params
  const searchParams = new URLSearchParams(window.location.search);
  const imageUrl = decodeURIComponent(searchParams.get("imageUrl") || "");
  const visionSummary = decodeURIComponent(searchParams.get("visionSummary") || "");

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
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt="לוח החזון שלך" 
                  className="w-full h-auto rounded-2xl"
                />
              )}
            </motion.div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-border/50">
              <h3 className="font-display font-bold text-xl mb-4 text-primary">{t("result.yourVision")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {visionSummary || "לוח החזון שלך נוצר בהצלחה."}
              </p>
            </div>
          </div>

          {/* Actions Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-primary/10 sticky top-6">
              <h2 className="font-display font-bold text-2xl mb-6">{t("result.nextSteps")}</h2>
              
              <div className="space-y-4">
                <Link href="/print/options">
                  <button 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <Printer className="w-5 h-5" />
                    {t("result.sendToPrint")}
                  </button>
                </Link>
                
                <Link href="/create">
                  <button 
                    className="w-full bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <RefreshCw className="w-5 h-5" />
                    {t("result.generateVariation")}
                  </button>
                </Link>
                
                <button 
                  onClick={handleDownload}
                  className="w-full bg-transparent hover:bg-muted text-muted-foreground font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-3 text-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {t("result.downloadPdf")}
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-medium text-sm text-muted-foreground mb-4">{t("result.printIncludes")}</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    {t("result.include.paper")}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    {t("result.include.shipping")}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    {t("result.include.packaging")}
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
