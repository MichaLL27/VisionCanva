import { Link } from "wouter";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { useLocalization } from "@/lib/localization";

export function Footer() {
  const { t } = useLocalization();

  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">{t("footer.product")}</h4>
            <ul className="space-y-3">
              <li><Link href="/how-it-works"><span className="text-sm hover:text-primary cursor-pointer transition-colors">{t("nav.howItWorks")}</span></Link></li>
              <li><Link href="/pricing"><span className="text-sm hover:text-primary cursor-pointer transition-colors">{t("nav.pricing")}</span></Link></li>
              <li><Link href="/faq"><span className="text-sm hover:text-primary cursor-pointer transition-colors">{t("footer.faq")}</span></Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">{t("footer.company")}</h4>
            <ul className="space-y-3">
              <li><Link href="/about"><span className="text-sm hover:text-primary cursor-pointer transition-colors">{t("footer.about")}</span></Link></li>
              <li><Link href="/contact"><span className="text-sm hover:text-primary cursor-pointer transition-colors">{t("footer.contact")}</span></Link></li>
              <li><Link href="/support"><span className="text-sm hover:text-primary cursor-pointer transition-colors">{t("footer.support")}</span></Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">{t("footer.legal")}</h4>
            <ul className="space-y-3">
              <li><Link href="/legal/terms"><span className="text-sm hover:text-primary cursor-pointer transition-colors">{t("footer.terms")}</span></Link></li>
              <li><Link href="/legal/privacy"><span className="text-sm hover:text-primary cursor-pointer transition-colors">{t("footer.privacy")}</span></Link></li>
              <li><Link href="/legal/refund"><span className="text-sm hover:text-primary cursor-pointer transition-colors">{t("footer.refund")}</span></Link></li>
              <li><Link href="/legal/disclaimer"><span className="text-sm hover:text-primary cursor-pointer transition-colors">{t("footer.disclaimer")}</span></Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">{t("footer.social")}</h4>
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
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-4">
            <Link href="/admin/dashboard"><span className="hover:text-primary cursor-pointer">Admin</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
