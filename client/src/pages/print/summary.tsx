import { Layout } from "@/components/Layout";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { ArrowLeft, Check, CreditCard, Lock } from "lucide-react";
import modernImage from "@assets/generated_images/modern_clean_vision_board_collage.png";

export default function Summary() {
  const [_, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setLocation("/print/success");
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-12 w-full">
        <Link href="/print/shipping">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to shipping
          </span>
        </Link>

        <div className="grid md:grid-cols-12 gap-12">
          {/* Summary Column */}
          <div className="md:col-span-7 space-y-8">
            <div>
              <h1 className="text-3xl font-display font-bold mb-4">Order Summary</h1>
              <p className="text-muted-foreground">Review your order before payment.</p>
            </div>

            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="p-6 flex gap-6">
                <img src={modernImage} alt="Preview" className="w-24 h-32 object-cover rounded-lg bg-muted" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">A3 Poster</h3>
                  <p className="text-sm text-muted-foreground mb-4">29.7 x 42 cm • Matte Paper</p>
                  <Link href="/print/options"><span className="text-sm text-primary hover:underline cursor-pointer">Change size</span></Link>
                </div>
              </div>
              
              <div className="border-t border-border p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>$29.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-border">
                  <span>Total</span>
                  <span>$34.00</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-2xl">
              <h4 className="font-bold text-sm mb-4">Print Includes:</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  High-quality matte photo paper
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Secure packaging
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Fast processing time (1-2 business days)
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Column */}
          <div className="md:col-span-5 space-y-6">
             <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-lg sticky top-6">
               <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                 <CreditCard className="w-5 h-5 text-primary" /> Payment
               </h3>
               
               <div className="p-4 bg-muted/20 rounded-xl border border-dashed border-border mb-6 text-center">
                 <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                 <p className="text-sm text-muted-foreground">Secure payment processing via Stripe</p>
               </div>

               <div className="flex items-start gap-3 mb-6">
                <input type="checkbox" required className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" id="terms" />
                <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer leading-tight">
                  I agree to the <Link href="/legal/terms"><span className="text-primary hover:underline">Terms of Use</span></Link> and <Link href="/legal/refund"><span className="text-primary hover:underline">Refund Policy</span></Link>. I understand this is a custom printed product.
                </label>
              </div>

               <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
               >
                 {isProcessing ? "Processing..." : "Pay and send to print"}
               </button>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
