import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </span>
        </Link>
        <h1 className="text-4xl font-display font-bold mb-8">Terms of Use</h1>
        <div className="prose prose-slate max-w-none text-muted-foreground">
          <p className="mb-4">Last updated: December 10, 2025</p>
          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing and using VisionAI, you accept and agree to be bound by the terms and provision of this agreement.</p>
          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">2. Description of Service</h2>
          <p className="mb-4">VisionAI provides an AI-powered service to generate custom vision boards. We offer digital downloads and physical print services.</p>
          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">3. User Conduct</h2>
          <p className="mb-4">You agree to use the service only for lawful purposes. You are prohibited from generating content that is illegal, offensive, or violates the rights of others.</p>
        </div>
      </div>
    </Layout>
  );
}
