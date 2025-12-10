import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react"; // Import both arrows
import { Layout } from "@/components/Layout";
import modernImage from "@assets/generated_images/modern_clean_vision_board_collage.png";
import colorfulImage from "@assets/generated_images/colorful_energetic_vision_board_collage.png";
import spiritualImage from "@assets/generated_images/calm_spiritual_vision_board_collage.png";
import { useLocalization } from "@/lib/localization";

export default function Home() {
  const { t, language } = useLocalization();
  
  // Choose the correct arrow based on direction
  const ArrowIcon = language === "he" ? ArrowLeft : ArrowRight;

  return (
    <Layout>
      <div className="bg-background text-foreground overflow-hidden">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t("landing.badge")}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-semibold leading-[1.1] tracking-tight">
              {t("landing.title")}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              {t("landing.subtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/create">
                <button className="bg-primary hover:bg-primary/90 text-white font-medium text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
                  {t("landing.cta")} <ArrowIcon className="w-5 h-5" />
                </button>
              </Link>
            </div>

            <div className="pt-8 flex gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-1 rounded-full"><Check className="w-3 h-3 text-green-600" /></div>
                <span>{t("landing.feature.ready")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-1 rounded-full"><Check className="w-3 h-3 text-green-600" /></div>
                <span>{t("landing.feature.print")}</span>
              </div>
            </div>
          </motion.div>

          {/* Visuals */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-50 pointer-events-none" />
            
            <div className="relative grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="space-y-4 pt-12"
              >
                <img 
                  src={modernImage} 
                  alt="Modern Vision Board" 
                  className="w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
                />
                <img 
                  src={spiritualImage} 
                  alt="Spiritual Vision Board" 
                  className="w-full aspect-square object-cover rounded-2xl shadow-2xl rotate-[1deg] hover:rotate-0 transition-transform duration-500"
                />
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="space-y-4"
              >
                <img 
                  src={colorfulImage} 
                  alt="Colorful Vision Board" 
                  className="w-full aspect-square object-cover rounded-2xl shadow-2xl rotate-[2deg] hover:rotate-0 transition-transform duration-500"
                />
                <img 
                  src={modernImage} 
                  alt="Clean Vision Board" 
                  className="w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl rotate-[-1deg] hover:rotate-0 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
