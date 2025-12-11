import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Upload, Printer, Check, Loader2, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLocalization } from "@/lib/localization";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

export default function PrintExisting() {
  const { t, language } = useLocalization();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const isRTL = language === "he";
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [orderComplete, setOrderComplete] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const printOrderMutation = useMutation({
    mutationFn: async (data: OrderFormData) => {
      return apiRequest<{ success: boolean }>(
        "POST",
        "/api/order-print-existing",
        {
          ...data,
          price: 59,
          currency: "ILS",
          uploadedFileInfo: uploadedFile ? {
            name: uploadedFile.name,
            size: uploadedFile.size,
            type: uploadedFile.type,
          } : null,
          type: "print-only",
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
    if (!uploadedFile) {
      toast({
        title: t("common.error"),
        description: t("print.errorNoFile"),
        variant: "destructive",
      });
      return;
    }
    printOrderMutation.mutate(formData);
  };

  if (orderComplete) {
    return (
      <Layout>
        <div className="bg-background min-h-screen flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="font-display font-bold text-2xl">
              {t("order.success.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("order.success.printText")}
            </p>
            <div className="flex flex-col gap-3 pt-4">
              <Link href="/">
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl">
                  {t("print.backHome")}
                </button>
              </Link>
              <Link href="/create">
                <button className="w-full text-primary font-medium py-3">
                  {t("order.success.createAnother")}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-background min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <BackIcon className="w-4 h-4" />
            {t("common.back")}
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-display font-bold">
                {t("print.title")}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t("print.subtitle")}
              </p>
            </div>

            {/* Upload Section */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-border/50">
              {/* File Upload */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-4">
                  {t("print.uploadLabel")}
                </label>

                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full max-h-64 object-contain rounded-xl border border-border"
                    />
                    <button
                      onClick={() => {
                        setUploadedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="absolute top-2 end-2 bg-white p-2 rounded-full shadow-lg hover:bg-secondary transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                    <span className="text-muted-foreground font-medium">
                      {t("print.uploadPlaceholder")}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Price Info */}
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mb-8">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t("print.priceLabel")}</span>
                  <span className="text-2xl font-bold">₪59</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("print.priceNote")}
                </p>
              </div>

              {/* Order Form */}
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

                <button
                  type="submit"
                  disabled={printOrderMutation.isPending || !uploadedFile}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {printOrderMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Printer className="w-5 h-5" />
                      {t("print.submitButton")}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
