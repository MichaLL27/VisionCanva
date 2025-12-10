import { Link, useLocation } from "wouter";
import { User, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalization } from "@/lib/localization";

export function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = location.includes("/account"); // Mock login state based on route
  const { t, language, setLanguage } = useLocalization();

  const toggleLanguage = () => {
    setLanguage(language === "he" ? "en" : "he");
  };

  return (
    <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto relative z-50">
      <Link href="/">
        <div className="font-display font-bold text-2xl tracking-tight text-primary cursor-pointer">{t("nav.logo")}</div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/how-it-works"><span className="text-sm font-medium hover:text-primary cursor-pointer transition-colors">{t("nav.howItWorks")}</span></Link>
        <Link href="/pricing"><span className="text-sm font-medium hover:text-primary cursor-pointer transition-colors">{t("nav.pricing")}</span></Link>
        
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <Globe className="w-4 h-4" />
          {language === "he" ? "English" : "עברית"}
        </button>

        {isLoggedIn ? (
          <Link href="/account">
            <span className="flex items-center gap-2 text-sm font-medium hover:text-primary cursor-pointer transition-colors">
              <User className="w-4 h-4" /> {t("nav.myAccount")}
            </span>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/auth/sign-in">
              <span className="text-sm font-medium hover:text-primary cursor-pointer transition-colors">{t("nav.myAccount")}</span>
            </Link>
            <Link href="/auth/sign-in">
              <button className="bg-white hover:bg-gray-50 text-foreground font-medium py-2 px-6 rounded-full border shadow-sm transition-colors cursor-pointer text-sm">
                {t("nav.signIn")}
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex items-center gap-4 md:hidden">
        <button 
          onClick={toggleLanguage}
          className="text-sm font-medium"
        >
          {language === "he" ? "EN" : "עב"}
        </button>
        <button 
          className="p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 shadow-xl md:hidden flex flex-col gap-4 z-50"
          >
            <Link href="/how-it-works"><span className="text-lg font-medium">{t("nav.howItWorks")}</span></Link>
            <Link href="/pricing"><span className="text-lg font-medium">{t("nav.pricing")}</span></Link>
            <div className="h-px bg-gray-100 my-2" />
            <Link href="/account"><span className="text-lg font-medium">{t("nav.myAccount")}</span></Link>
            <Link href="/auth/sign-in">
              <button className="w-full bg-primary text-white font-medium py-3 rounded-xl">
                {t("nav.signIn")}
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
