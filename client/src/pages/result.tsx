import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Download, Printer, RefreshCw, X, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/Layout";
import { useLocalization } from "@/lib/localization";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";

type ModalType = "digital" | "print" | null;

interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  notes?: string;
}

export default function Result() {
  const { toast } = useToast();
  const { t, language } = useLocalization();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [orderComplete, setOrderComplete] = useState(false);

  // Get image URL and prompt from query params
  const searchParams = new URLSearchParams(window.location.search);
  const imageUrl = decodeURIComponent(searchParams.get("imageUrl") || "");
  const prompt = decodeURIComponent(searchParams.get("prompt") || "");
  const provider = decodeURIComponent(searchParams.get("provider") || "");

  // Digital order mutation
  const digitalOrderMutation = useMutation({
    mutationFn: async (data: OrderFormData) => {
      return apiRequest<{ success: boolean; downloadUrl: string }>(
        "POST",
        "/api/order-digital-board",
        {
          ...data,
          price: 39,
          currency: "ILS",
          imageUrl,
          aiPrompt: prompt,
          type: "digital",
        }
      );
    },
    onSuccess: (data) => {
      setOrderComplete(true);
      toast({
        title: t("order.success.title"),
        description: t("order.success.digitalDesc"),
      });
      // Trigger download
      if (data.downloadUrl) {
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = "vision-board.png";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    onError: () => {
      toast({
        title: t("common.error"),
        description: t("order.error"),
        variant: "destructive",
      });
    },
  });

  // Print order mutation
  const printOrderMutation = useMutation({
    mutationFn: async (data: OrderFormData) => {
      return apiRequest<{ success: boolean }>(
        "POST",
        "/api/order-print-board",
        {
          ...data,
          price: 89,
          currency: "ILS",
          imageUrl,
          aiPrompt: prompt,
          size: "A3",
          type: "digital+print",
        }
      );
    },
    onSuccess: () => {
      setOrderComplete(true);
      toast({
        title: t("order.success.title"),
        description: t("order.success.printDesc"),
      });
    },
    onError: () => {
      toast({
        title: t("common.error"),
        description: t("order.error"),
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeModal === "digital") {
      digitalOrderMutation.mutate(formData);
    } else if (activeModal === "print") {
      printOrderMutation.mutate(formData);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setOrderComplete(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      notes: "",
    });
  };

  const isLoading = digitalOrderMutation.isPending || printOrderMutation.isPending;

  return (
    <Layout>
      <div className="bg-background pb-12">
        <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
          {/* Vision Board Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-3xl shadow-2xl max-w-3xl mx-auto"
          >
            {imageUrl && (
              <div className="relative">
                {provider && (
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-10">
                    {t("result.generatedBy")} {provider}
                  </div>
                )}
                <img
                  src={imageUrl}
                  alt="לוח החזון שלך"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            )}
          </motion.div>

          {/* Action Cards Section */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-display font-bold">
              {t("result.actions.title")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("result.actions.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Digital Only Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-border/50 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-2xl">
                  {t("result.digital.title")}
                </h3>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold">₪39</span>
                <span className="text-muted-foreground ms-2">
                  {t("result.digital.priceLabel")}
                </span>
              </div>

              <p className="text-muted-foreground mb-6 flex-1">
                {t("result.digital.description")}
              </p>

              <button
                onClick={() => {
                  // Direct download for now
                  const link = document.createElement("a");
                  link.href = imageUrl;
                  link.download = "vision-board.png";
                  link.target = "_blank";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                {t("result.digital.downloadNow") || "Download Now"}
              </button>
            </motion.div>

            {/* Digital + Print Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-primary/5 p-8 rounded-2xl shadow-lg border border-primary/30 flex flex-col relative"
            >
              {/* Popular Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {t("result.print.badge")}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4 mt-2">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <Printer className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-2xl">
                  {t("result.print.title")}
                </h3>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold">₪89</span>
                <span className="text-muted-foreground ms-2">
                  {t("result.print.priceLabel")}
                </span>
              </div>

              <p className="text-muted-foreground mb-6 flex-1">
                {t("result.print.description")}
              </p>

              <button
                onClick={() => setActiveModal("print")}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-5 h-5" />
                {t("result.print.button")}
              </button>
            </motion.div>
          </div>

          {/* Additional Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/create">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <RefreshCw className="w-4 h-4" />
                {t("result.generateVariation")}
              </button>
            </Link>
          </div>
        </main>
      </div>

      {/* Order Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-display font-bold text-xl">
                {activeModal === "digital"
                  ? t("order.digital.title")
                  : t("order.print.title")}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {orderComplete ? (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-display font-bold text-2xl">
                    {t("order.success.title")}
                  </h4>
                  <p className="text-muted-foreground">
                    {activeModal === "digital"
                      ? t("order.success.digitalText")
                      : t("order.success.printText")}
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={closeModal}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl"
                    >
                      {t("order.success.close")}
                    </button>
                    <Link href="/create">
                      <button className="w-full text-primary font-medium py-3">
                        {t("order.success.createAnother")}
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground mb-6">
                    {activeModal === "digital"
                      ? t("order.digital.text")
                      : t("order.print.text")}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("order.form.fullName")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full p-3 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("order.form.email")} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full p-3 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("order.form.phone")} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full p-3 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>

                    {activeModal === "print" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t("order.form.address")} *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.address}
                            onChange={(e) =>
                              setFormData({ ...formData, address: e.target.value })
                            }
                            className="w-full p-3 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t("order.form.city")} *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) =>
                              setFormData({ ...formData, city: e.target.value })
                            }
                            className="w-full p-3 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t("order.form.notes")}
                          </label>
                          <textarea
                            value={formData.notes}
                            onChange={(e) =>
                              setFormData({ ...formData, notes: e.target.value })
                            }
                            rows={3}
                            className="w-full p-3 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-3 px-6 rounded-xl transition-all"
                      >
                        {t("order.form.cancel")}
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : activeModal === "digital" ? (
                          t("order.digital.submit")
                        ) : (
                          t("order.print.submit")
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}
