import { Layout } from "@/components/Layout";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Package, Truck, CheckCircle2, Download, MapPin } from "lucide-react";
import modernImage from "@assets/generated_images/modern_clean_vision_board_collage.png";

export default function OrderDetails() {
  const [match, params] = useRoute("/account/orders/:id");
  const orderId = params?.id || "12345";

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-12 w-full">
        <Link href="/account">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to orders
          </span>
        </Link>

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Order #{orderId}</h1>
            <p className="text-muted-foreground mt-1">Placed on December 10, 2024</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
            Processing
          </span>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-2xl border border-border p-8 mb-8 shadow-sm">
          <div className="relative flex justify-between">
            {/* Progress Bar Background */}
            <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 -z-10" />
            
            {/* Active Progress Bar */}
            <div className="absolute top-4 left-0 w-1/3 h-1 bg-primary -z-10" />

            {/* Step 1 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-white">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-primary">Order Received</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-white">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-primary">Printing</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center ring-4 ring-white">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-gray-400">Shipped</span>
            </div>
          </div>
        </div>

        {/* Order Info Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Product Details</h3>
              <div className="flex gap-4">
                <img src={modernImage} alt="Vision Board" className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                <div>
                  <h4 className="font-medium">2025 Vision Board</h4>
                  <p className="text-sm text-muted-foreground mt-1">A2 Poster (42 x 59.4 cm)</p>
                  <p className="text-sm text-muted-foreground">Matte Premium Paper</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
                <span className="font-medium">Total Paid</span>
                <span className="font-bold text-lg">$39.00</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm h-full">
              <h3 className="font-bold text-lg mb-4">Shipping Address</h3>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <address className="not-italic text-sm leading-relaxed">
                  Jane Doe<br />
                  123 Dream St, Apt 4B<br />
                  Cloud City, 90210<br />
                  Israel
                </address>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> Download Receipt
          </button>
        </div>
      </div>
    </Layout>
  );
}
