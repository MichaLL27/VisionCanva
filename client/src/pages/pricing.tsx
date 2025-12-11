import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useLocalization } from "@/lib/localization";

export default function Pricing() {
  const { t, language } = useLocalization();
  const isRTL = language === "he";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const digitalPlans = [
    {
      id: "free",
      price: "0 ₪",
      priceEn: "Free",
      featuresKey: [
        "pricing.free.feature1",
        "pricing.free.feature2",
        "pricing.free.feature3",
      ],
      buttonKey: "pricing.free.button",
      highlighted: false,
    },
    {
      id: "creator",
      price: "29 ₪",
      priceEn: "$10",
      period: "pricing.perMonth",
      featuresKey: [
        "pricing.creator.feature1",
        "pricing.creator.feature2",
        "pricing.creator.feature3",
      ],
      buttonKey: "pricing.creator.button",
      highlighted: true,
    },
    {
      id: "pro",
      price: "59 ₪",
      priceEn: "$20",
      period: "pricing.perMonth",
      featuresKey: [
        "pricing.pro.feature1",
        "pricing.pro.feature2",
        "pricing.pro.feature3",
      ],
      buttonKey: "pricing.pro.button",
      highlighted: false,
    },
  ];

  const printOptions = [
    { size: "A4", type: "pricing.print.paperPoster", price: "49 ₪", priceEn: "$17" },
    { size: "A3", type: "pricing.print.paperPoster", price: "89 ₪", priceEn: "$30" },
    { size: "A2", type: "pricing.print.paperPoster", price: "139 ₪", priceEn: "$47" },
    { size: "40x60", type: "pricing.print.canvas", price: "199 ₪", priceEn: "$67" },
    { size: "60x90", type: "pricing.print.canvas", price: "279 ₪", priceEn: "$94" },
  ];

  const faqs = [
    {
      questionKey: "pricing.faq1.q",
      answerKey: "pricing.faq1.a",
    },
    {
      questionKey: "pricing.faq2.q",
      answerKey: "pricing.faq2.a",
    },
    {
      questionKey: "pricing.faq3.q",
      answerKey: "pricing.faq3.a",
    },
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

            <Link href="/create">
              <button className="bg-primary hover:bg-primary/90 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer">
                {t("pricing.hero.cta")}
                <ArrowIcon className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </section>

        {/* Digital Plans Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-4xl font-display font-bold text-center mb-16">
            {t("pricing.digital.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {digitalPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-3xl overflow-hidden transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary shadow-2xl scale-105"
                    : "bg-white border border-border/50 shadow-sm"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold">
                    {t("pricing.featured")}
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  <h3 className="font-display font-bold text-2xl mb-2">
                    {t(`pricing.${plan.id}.name`)}
                  </h3>

                  <div className="mb-8">
                    <div className="text-5xl font-bold text-primary">
                      {language === "he" ? plan.price : plan.priceEn}
                    </div>
                    {plan.period && (
                      <p className="text-muted-foreground text-sm">
                        {t(plan.period)}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 mb-8 flex-1">
                    {plan.featuresKey.map((featureKey, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{t(featureKey)}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/create">
                    <button
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        plan.highlighted
                          ? "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl"
                          : "bg-secondary hover:bg-secondary/80 text-foreground"
                      }`}
                    >
                      {t(plan.buttonKey)}
                      <ArrowIcon className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Print Pricing Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-display font-bold mb-4">
                {t("pricing.print.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("pricing.print.subtitle")}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-sm border border-border/50 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="px-6 py-4 text-start font-display font-bold">
                        {t("pricing.print.size")}
                      </th>
                      <th className="px-6 py-4 text-start font-display font-bold">
                        {t("pricing.print.type")}
                      </th>
                      <th className="px-6 py-4 text-start font-display font-bold">
                        {t("pricing.print.price")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {printOptions.map((option, index) => (
                      <tr
                        key={index}
                        className="border-t border-border/50 hover:bg-secondary/20 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium">{option.size}</td>
                        <td className="px-6 py-4">{t(option.type)}</td>
                        <td className="px-6 py-4 font-bold text-primary">
                          {language === "he" ? option.price : option.priceEn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <p className="text-sm text-muted-foreground text-center">
              {t("pricing.print.note")}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-4xl font-display font-bold text-center mb-16">
            {t("pricing.faq.title")}
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-secondary/30 transition-colors text-start"
                >
                  <h3 className="font-display font-bold text-lg text-primary">
                    {t(faq.questionKey)}
                  </h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-8 pb-6 border-t border-border/50 text-muted-foreground leading-relaxed"
                  >
                    {t(faq.answerKey)}
                  </motion.div>
                )}
              </motion.div>
            ))}
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
