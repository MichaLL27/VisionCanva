import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </span>
        </Link>
        <h1 className="text-4xl font-display font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-muted-foreground">
          <p className="mb-4">Last updated: December 10, 2025</p>
          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us, such as when you create an account, request a vision board, or communicate with us.</p>
          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">2. How We Use Information</h2>
          <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, including to generate personalized vision boards and process print orders.</p>
        </div>
      </div>
    </Layout>
  );
}
