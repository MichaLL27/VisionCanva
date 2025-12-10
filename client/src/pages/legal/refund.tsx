import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft } from "lucide-react";

export default function Refund() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </span>
        </Link>
        <h1 className="text-4xl font-display font-bold mb-8">Refund Policy</h1>
        <div className="prose prose-slate max-w-none text-muted-foreground">
          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Print Orders</h2>
          <p className="mb-4">Due to the personalized nature of our products, we cannot accept returns for custom printed vision boards unless they arrive damaged or defective.</p>
          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Damaged Items</h2>
          <p className="mb-4">If your print arrives damaged, please contact us within 7 days of delivery with photos of the damage, and we will send a replacement at no cost.</p>
        </div>
      </div>
    </Layout>
  );
}
