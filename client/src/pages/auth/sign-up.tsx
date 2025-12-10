import { Link, useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLocalization } from "@/lib/localization";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setLocation] = useLocation();
  const { t, language } = useLocalization();

  const ArrowIcon = language === "he" ? ArrowRight : ArrowLeft;

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup
    setLocation("/account");
  };

  return (
    <Layout hideFooter>
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md space-y-8">
          <Link href="/">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 cursor-pointer">
              <ArrowIcon className="w-4 h-4" /> {t("common.back")}
            </span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold">{t("auth.createAccount")}</h1>
            <p className="text-muted-foreground mt-2">{t("auth.createSubtitle")}</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("auth.fullName")}</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl border bg-background" 
                placeholder="Jane Doe" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("auth.email")}</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border bg-background" 
                placeholder="hello@example.com" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("auth.password")}</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border bg-background" 
                placeholder="••••••••" 
              />
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" required className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" id="terms" />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                {t("auth.agreeTerms")} <Link href="/legal/terms"><span className="text-primary hover:underline cursor-pointer">{t("footer.terms")}</span></Link> {t("auth.and")} <Link href="/legal/privacy"><span className="text-primary hover:underline cursor-pointer">{t("footer.privacy")}</span></Link>
              </label>
            </div>

            <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all">
              {t("auth.createAccount")}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {t("auth.alreadyAccount")}{" "}
            <Link href="/auth/sign-in">
              <span className="text-primary font-medium hover:underline cursor-pointer">{t("nav.signIn")}</span>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
