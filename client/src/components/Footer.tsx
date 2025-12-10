import { Link } from "wouter";
import { Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/how-it-works"><span className="text-sm hover:text-primary cursor-pointer transition-colors">How it works</span></Link></li>
              <li><Link href="/pricing"><span className="text-sm hover:text-primary cursor-pointer transition-colors">Pricing</span></Link></li>
              <li><Link href="/faq"><span className="text-sm hover:text-primary cursor-pointer transition-colors">FAQ</span></Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about"><span className="text-sm hover:text-primary cursor-pointer transition-colors">About</span></Link></li>
              <li><Link href="/contact"><span className="text-sm hover:text-primary cursor-pointer transition-colors">Contact</span></Link></li>
              <li><Link href="/support"><span className="text-sm hover:text-primary cursor-pointer transition-colors">Support</span></Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/legal/terms"><span className="text-sm hover:text-primary cursor-pointer transition-colors">Terms of Use</span></Link></li>
              <li><Link href="/legal/privacy"><span className="text-sm hover:text-primary cursor-pointer transition-colors">Privacy Policy</span></Link></li>
              <li><Link href="/legal/refund"><span className="text-sm hover:text-primary cursor-pointer transition-colors">Refund Policy</span></Link></li>
              <li><Link href="/legal/disclaimer"><span className="text-sm hover:text-primary cursor-pointer transition-colors">AI Disclaimer</span></Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-white border border-border hover:border-primary/50 hover:text-primary transition-all shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white border border-border hover:border-primary/50 hover:text-primary transition-all shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white border border-border hover:border-primary/50 hover:text-primary transition-all shadow-sm">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© VisionAI – See your future on the wall.</p>
          <div className="flex gap-4">
            <Link href="/admin/dashboard"><span className="hover:text-primary cursor-pointer">Admin</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
