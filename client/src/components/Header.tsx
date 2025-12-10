import { Link, useLocation } from "wouter";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = location.includes("/account"); // Mock login state based on route

  return (
    <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto relative z-50">
      <Link href="/">
        <div className="font-display font-bold text-2xl tracking-tight text-primary cursor-pointer">VisionAI</div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/how-it-works"><span className="text-sm font-medium hover:text-primary cursor-pointer transition-colors">How it works</span></Link>
        <Link href="/pricing"><span className="text-sm font-medium hover:text-primary cursor-pointer transition-colors">Pricing</span></Link>
        
        {isLoggedIn ? (
          <Link href="/account">
            <span className="flex items-center gap-2 text-sm font-medium hover:text-primary cursor-pointer transition-colors">
              <User className="w-4 h-4" /> My Account
            </span>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/auth/sign-in">
              <span className="text-sm font-medium hover:text-primary cursor-pointer transition-colors">My Account</span>
            </Link>
            <Link href="/auth/sign-in">
              <button className="bg-white hover:bg-gray-50 text-foreground font-medium py-2 px-6 rounded-full border shadow-sm transition-colors cursor-pointer text-sm">
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 shadow-xl md:hidden flex flex-col gap-4"
          >
            <Link href="/how-it-works"><span className="text-lg font-medium">How it works</span></Link>
            <Link href="/pricing"><span className="text-lg font-medium">Pricing</span></Link>
            <div className="h-px bg-gray-100 my-2" />
            <Link href="/account"><span className="text-lg font-medium">My Account</span></Link>
            <Link href="/auth/sign-in">
              <button className="w-full bg-primary text-white font-medium py-3 rounded-xl">
                Sign In
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
