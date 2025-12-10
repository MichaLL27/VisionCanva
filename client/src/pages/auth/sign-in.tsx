import { Link, useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { useState } from "react";
import { useLocalization } from "@/lib/localization";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setLocation] = useLocation();
  const { t, language } = useLocalization();

  const ArrowIcon = language === "he" ? ArrowRight : ArrowLeft;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
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
            <h1 className="text-3xl font-display font-bold">{t("auth.welcomeBack")}</h1>
            <p className="text-muted-foreground mt-2">{t("auth.signInSubtitle")}</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
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
              <div className="flex justify-between">
                <label className="text-sm font-medium">{t("auth.password")}</label>
                <a href="#" className="text-sm text-primary hover:underline">{t("auth.forgotPassword")}</a>
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border bg-background" 
                placeholder="••••••••" 
              />
            </div>

            <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all">
              {t("nav.signIn")}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {t("auth.noAccount")}{" "}
            <Link href="/auth/sign-up">
              <span className="text-primary font-medium hover:underline cursor-pointer">{t("auth.createOne")}</span>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
