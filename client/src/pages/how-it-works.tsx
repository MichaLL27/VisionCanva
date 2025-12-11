import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, MessageSquare, Wand2, Image, Printer } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLocalization } from "@/lib/localization";
import visionBoardExample from "@assets/2323E69C-C32D-471B-B21E-FCF5AA675014_1765373308633.png";

export default function HowItWorks() {
  const { t, language } = useLocalization();
  const isRTL = language === "he";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const steps = [
    {
      id: 1,
      icon: MessageSquare,
      titleKey: "howItWorks.step1.title",
      descriptionKey: "howItWorks.step1.desc",
    },
    {
      id: 2,
      icon: Wand2,
      titleKey: "howItWorks.step2.title",
      descriptionKey: "howItWorks.step2.desc",
    },
    {
      id: 3,
      icon: Image,
      titleKey: "howItWorks.step3.title",
      descriptionKey: "howItWorks.step3.desc",
    },
    {
      id: 4,
      icon: Printer,
      titleKey: "howItWorks.step4.title",
      descriptionKey: "howItWorks.step4.desc",
    },
  ];

  const faqs = [
    {
      questionKey: "howItWorks.faq1.q",
      answerKey: "howItWorks.faq1.a",
    },
    {
      questionKey: "howItWorks.faq2.q",
      answerKey: "howItWorks.faq2.a",
    },
    {
      questionKey: "howItWorks.faq3.q",
      answerKey: "howItWorks.faq3.a",
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
              {t("howItWorks.hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("howItWorks.hero.subtitle")}
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex flex-col gap-3 text-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <span>{t("howItWorks.hero.point1")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <span>{t("howItWorks.hero.point2")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <span>{t("howItWorks.hero.point3")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <span>{t("howItWorks.hero.point4")}</span>
                </div>
              </div>
            </div>

            <Link href="/create">
              <button className="bg-primary hover:bg-primary/90 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer">
                {t("howItWorks.hero.cta")}
                <ArrowIcon className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </section>

        {/* Step-by-Step Timeline */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-4xl font-display font-bold text-center mb-16">
            {t("howItWorks.steps.title")}
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                      {step.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute right-0 translate-x-1/2 translate-y-12 w-px h-24 bg-border" />
                    )}
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3">
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(step.descriptionKey)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Visual Demo Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-display font-bold">
                {t("howItWorks.demo.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("howItWorks.demo.text")}
              </p>
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <p className="text-foreground font-medium">
                  {t("howItWorks.demo.highlight")}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-4 rounded-2xl shadow-lg"
            >
              <img
                src={visionBoardExample}
                alt="Vision Board Example"
                className="w-full rounded-xl"
              />
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-4xl font-display font-bold text-center mb-16">
            {t("howItWorks.faq.title")}
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-border/50"
              >
                <h3 className="font-display font-bold text-lg mb-3 text-primary">
                  {t(faq.questionKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(faq.answerKey)}
                </p>
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
              {t("howItWorks.final.title")}
            </h2>
            <Link href="/create">
              <button className="bg-primary hover:bg-primary/90 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer">
                {t("howItWorks.final.cta")}
                <ArrowIcon className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
}
