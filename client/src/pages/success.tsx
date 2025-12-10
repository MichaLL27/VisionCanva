import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, Home } from "lucide-react";

export default function Success() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-6">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-display font-bold">Order Received!</h1>
          <p className="text-xl text-muted-foreground">
            Your vision board is being prepared for printing. You will receive a confirmation email shortly.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border border-border">
          <h3 className="font-bold mb-2">What happens next?</h3>
          <ul className="text-sm text-muted-foreground space-y-2 text-left list-disc pl-5">
            <li>We verify the image quality for print</li>
            <li>Printing takes 1-2 business days</li>
            <li>Shipping usually takes 3-5 days</li>
          </ul>
        </div>

        <Link href="/">
          <button className="w-full bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2">
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
