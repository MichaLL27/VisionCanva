import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, Home, Package } from "lucide-react";
import { Layout } from "@/components/Layout";

export default function PrintSuccess() {
  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative rounded-full bg-green-100 p-6">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-display font-bold">Your print order is on its way ✨</h1>
            <p className="text-xl text-muted-foreground">
              We’ve received your order and sent it to our print studio. You’ll receive an email with tracking details soon.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/account">
              <button className="flex-1 bg-white border border-border hover:bg-gray-50 text-foreground font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm">
                <Package className="w-5 h-5" />
                View my orders
              </button>
            </Link>
            
            <Link href="/create">
              <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
                Create another
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
