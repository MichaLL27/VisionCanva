import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Star } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLocalization } from "@/lib/localization";

export default function Pricing() {
  const { t, language } = useLocalization();
  const isRTL = language === "he";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const plans = [
    {
      titleKey: "pricing.plan1.title",
      priceKey: "pricing.plan1.price",
      priceValue: "₪39",
      subKey: "pricing.plan1.sub",
      featuresKeys: [
        "pricing.plan1.feature1",
        "pricing.plan1.feature2",
        "pricing.plan1.feature3",
      ],
      buttonKey: "pricing.plan1.button",
      featured: false,
      href: "/create",
    },
    {
      titleKey: "pricing.plan2.title",
      priceKey: "pricing.plan2.price",
      priceValue: "₪89",
      subKey: "pricing.plan2.sub",
      featuresKeys: [
        "pricing.plan2.feature1",
        "pricing.plan2.feature2",
        "pricing.plan2.feature3",
      ],
      buttonKey: "pricing.plan2.button",
      featured: true,
      badgeKey: "pricing.plan2.badge",
      href: "/create",
    },
    {
      titleKey: "pricing.plan3.title",
      priceKey: "pricing.plan3.price",
      priceValue: "₪59",
      subKey: "pricing.plan3.sub",
      featuresKeys: [
        "pricing.plan3.feature1",
        "pricing.plan3.feature2",
        "pricing.plan3.feature3",
      ],
      buttonKey: "pricing.plan3.button",
      featured: false,
      href: "/print",
    },
  ];

  const printSizes = [
    { size: "A4", type: "poster", price: "₪49" },
    { size: "A3", type: "poster", price: "₪69" },
    { size: "A2", type: "poster", price: "₪119" },
    { size: "Canvas 40x60", type: "canvas", price: "₪179" },
    { size: "Canvas 60x90", type: "canvas", price: "₪249" },
  ];

  return (
    <Layout>
      <div className="bg-background text-foreground overflow-hidden">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold">
              {t("pricing.hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("pricing.hero.subtitle")}
            </p>
          </motion.div>
        </section>

        {/* One-Time Vision Board Packages */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-4xl font-display font-bold text-center mb-16">
            {t("pricing.packages.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl shadow-sm border transition-all hover:shadow-lg ${
                  plan.featured
                    ? "bg-primary/5 border-primary/30 md:scale-105"
                    : "bg-white border-border/50"
                }`}
              >
                {/* Popular Badge */}
                {plan.featured && plan.badgeKey && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {t(plan.badgeKey)}
                    </div>
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  {/* Title */}
                  <h3 className="font-display font-bold text-2xl mb-2">
                    {t(plan.titleKey)}
                  </h3>

                  {/* Sub Label */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {t(plan.subKey)}
                  </p>

                  {/* Price */}
                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.priceValue}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 flex-1 mb-8">
                    {plan.featuresKeys.map((featureKey, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <Link href={plan.href}>
                    <button
                      className={`w-full py-4 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        plan.featured
                          ? "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl"
                          : "bg-secondary hover:bg-secondary/80 text-foreground"
                      }`}
                    >
                      {t(plan.buttonKey)}
                      <ArrowIcon className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Print Pricing Table */}
        <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-display font-bold">
                {t("pricing.print.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("pricing.print.subtitle")}
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-start py-4 px-6 font-display font-bold">
                      {t("pricing.print.table.size")}
                    </th>
                    <th className="text-start py-4 px-6 font-display font-bold">
                      {t("pricing.print.table.type")}
                    </th>
                    <th className="text-start py-4 px-6 font-display font-bold">
                      {t("pricing.print.table.price")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {printSizes.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-secondary/30 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-foreground">
                        {row.size}
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {row.type === "poster"
                          ? t("pricing.print.poster")
                          : t("pricing.print.canvas")}
                      </td>
                      <td className="py-4 px-6 font-bold text-primary text-lg">
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Note */}
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
              <p className="text-sm text-muted-foreground text-center">
                {t("pricing.print.note")}
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-display font-bold">
              {t("pricing.final.title")}
            </h2>
            <Link href="/create">
              <button className="bg-primary hover:bg-primary/90 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer">
                {t("pricing.final.cta")}
                <ArrowIcon className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
}
