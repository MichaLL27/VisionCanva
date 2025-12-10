import { Layout } from "@/components/Layout";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocalization } from "@/lib/localization";

export default function Shipping() {
  const [_, setLocation] = useLocation();
  const { t, language } = useLocalization();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "Israel",
    city: "",
    street: "",
    zip: "",
    notes: ""
  });

  const ArrowIcon = language === "he" ? ArrowRight : ArrowLeft;
  const NextIcon = language === "he" ? ArrowLeft : ArrowRight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/print/summary");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-12 w-full">
        <Link href="/print/options">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 cursor-pointer">
            <ArrowIcon className="w-4 h-4" /> {t("common.back")}
          </span>
        </Link>

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{t("print.shipping.title")}</h1>
          <p className="text-muted-foreground text-lg">{t("print.shipping.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input required type="text" className="w-full p-3 rounded-xl border bg-background" placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input required type="email" className="w-full p-3 rounded-xl border bg-background" placeholder="jane@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input required type="tel" className="w-full p-3 rounded-xl border bg-background" placeholder="+972 50..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <select className="w-full p-3 rounded-xl border bg-background">
                <option value="Israel">Israel</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Street & House Number</label>
              <input required type="text" className="w-full p-3 rounded-xl border bg-background" placeholder="123 Dream St" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Apartment / Floor (Optional)</label>
              <input type="text" className="w-full p-3 rounded-xl border bg-background" placeholder="Apt 4B" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Zip Code</label>
              <input required type="text" className="w-full p-3 rounded-xl border bg-background" placeholder="12345" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Notes for delivery (Optional)</label>
              <textarea className="w-full p-3 rounded-xl border bg-background resize-none h-24" placeholder="Leave at the door..." />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input type="checkbox" className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" id="save" />
            <label htmlFor="save" className="text-sm text-muted-foreground cursor-pointer">
              Use these details for future orders
            </label>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              {t("common.continue")} <NextIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
