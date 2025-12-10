import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "he" | "en";

interface Translations {
  [key: string]: {
    he: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation & General
  "nav.logo": { he: "VisionAI", en: "VisionAI" },
  "nav.howItWorks": { he: "איך זה עובד", en: "How it works" },
  "nav.pricing": { he: "מחירים", en: "Pricing" },
  "nav.myAccount": { he: "החשבון שלי", en: "My Account" },
  "nav.signIn": { he: "התחברות", en: "Sign In" },
  "nav.signOut": { he: "התנתקות", en: "Log out" },
  "common.back": { he: "חזרה", en: "Back" },
  "common.continue": { he: "המשך", en: "Continue" },
  "common.loading": { he: "טוען...", en: "Loading..." },
  "common.error": { he: "משהו השתבש", en: "Something went wrong" },

  // Landing Page
  "landing.title": { he: "צרו לוח חזון אישי בעזרת בינה מלאכותית", en: "Create your personal vision board with AI." },
  "landing.subtitle": { he: "הפסיקו לגזור ממגזינים. ענו על כמה שאלות על החלומות שלכם וקבלו לוח חזון מוכן להדפסה תוך שניות.", en: "Stop cutting magazines. Answer a few questions about your dreams, and get a beautiful, print-ready vision board in seconds." },
  "landing.cta": { he: "התחילו עכשיו", en: "Start Now" },
  "landing.badge": { he: "מניפסטציה בעזרת AI", en: "AI-Powered Manifestation" },
  "landing.feature.ready": { he: "מוכן תוך 30 שניות", en: "Ready in 30 seconds" },
  "landing.feature.print": { he: "הדפסה באיכות גבוהה", en: "High-quality print" },

  // Auth
  "auth.welcomeBack": { he: "ברוכים השבים", en: "Welcome back" },
  "auth.signInSubtitle": { he: "התחברו לחשבון VisionAI שלכם", en: "Sign in to your VisionAI account" },
  "auth.createAccount": { he: "יצירת חשבון", en: "Create account" },
  "auth.createSubtitle": { he: "התחילו ליצור את לוחות החזון שלכם היום", en: "Start creating your vision boards today" },
  "auth.email": { he: "אימייל", en: "Email" },
  "auth.password": { he: "סיסמה", en: "Password" },
  "auth.fullName": { he: "שם מלא", en: "Full Name" },
  "auth.forgotPassword": { he: "שכחתם סיסמה?", en: "Forgot password?" },
  "auth.noAccount": { he: "אין לכם חשבון?", en: "Don't have an account?" },
  "auth.createOne": { he: "צרו אחד", en: "Create one" },
  "auth.alreadyAccount": { he: "כבר יש לכם חשבון?", en: "Already have an account?" },
  "auth.agreeTerms": { he: "אני מסכים/ה ל", en: "I agree to the" },
  "auth.and": { he: "ו", en: "and" },

  // Create Flow
  "create.focusAreas": { he: "תחומי מיקוד", en: "Focus Areas" },
  "create.focusSubtitle": { he: "אילו תחומים בחיים תרצו לשדרג השנה?", en: "Which areas of your life do you want to elevate this year?" },
  "create.area.money": { he: "כסף ושפע", en: "Money & Wealth" },
  "create.area.career": { he: "קריירה ועסקים", en: "Career & Business" },
  "create.area.love": { he: "אהבה וזוגיות", en: "Love & Relationships" },
  "create.area.health": { he: "בריאות וכושר", en: "Health & Fitness" },
  "create.area.family": { he: "משפחה ובית", en: "Family & Home" },
  "create.area.spirituality": { he: "רוחניות", en: "Spirituality" },
  "create.area.social": { he: "חיי חברה וכיף", en: "Social Life & Fun" },
  "create.area.travel": { he: "טיולים והרפתקאות", en: "Travel & Adventure" },

  "create.vision": { he: "החזון שלך", en: "Your Vision" },
  "create.visionSubtitle": { he: "תארו איך נראים ונשמעים חיי החלומות שלכם בעוד שנה מהיום. היו ספציפיים.", en: "Describe how your dream life looks and feels one year from now. Be specific." },
  "create.visionPlaceholder": { he: "אני מתעורר/ת בחדר שינה שטוף שמש המשקיף לים. אני מרגיש/ה רגוע/ה, בריא/ה וחופשי/ה כלכלית. אני מנהל/ת עסק יצירתי מצליח...", en: "I am waking up in a sun-filled bedroom overlooking the ocean. I feel calm, healthy, and financially free. I run a successful creative business..." },

  "create.style": { he: "בחרו סגנון", en: "Choose a Style" },
  "create.styleSubtitle": { he: "איזו תחושה תהיה ללוח החזון שלכם?", en: "How should your vision board feel?" },
  "create.style.modern": { he: "מודרני ונקי", en: "Modern & Clean" },
  "create.style.modernDesc": { he: "מינימליסטי, מאורגן ורענן.", en: "Minimalist, organized, and fresh." },
  "create.style.colorful": { he: "צבעוני ואנרגטי", en: "Colorful & Energetic" },
  "create.style.colorfulDesc": { he: "נועז, תוסס ומלא אנרגיה.", en: "Bold, vibrant, and high energy." },
  "create.style.spiritual": { he: "רגוע ורוחני", en: "Calm & Spiritual" },
  "create.style.spiritualDesc": { he: "רך, אורגני ושלו.", en: "Soft, organic, and peaceful." },
  "create.button": { he: "צור את לוח החזון שלי", en: "Create My Vision Board" },

  // Prompt Generation Step
  "create.prompt.title": { he: "ה־AI יצר פרומפט ללוח החזון שלך", en: "AI generated a prompt for your vision board" },
  "create.prompt.subtitle": { he: "כך הבינה המלאכותית מתארת את לוח החזון שלך לפני יצירת התמונה", en: "This is how the AI describes your vision board before generating the image" },
  "create.prompt.approve": { he: "אישור ויצירת תמונה", en: "Approve and Generate Image" },
  "create.prompt.regenerate": { he: "צרו פרומפט חדש", en: "Generate New Prompt" },
  "create.step.details": { he: "פרטים", en: "Details" },
  "create.step.prompt": { he: "פרומפט", en: "Prompt" },
  "create.step.image": { he: "תמונה", en: "Image" },

  "loading.manifesting": { he: "יוצרים את לוח החזון שלכם…", en: "Manifesting your vision…" },
  "loading.curating": { he: "הבינה המלאכותית בונה עבורכם את לוח החזון המושלם…", en: "Our AI is curating the perfect images to align with your goals..." },

  // Result Screen
  "result.yourVision": { he: "לוח החזון שלך", en: "Your Vision" },
  "result.nextSteps": { he: "השלבים הבאים", en: "Next Steps" },
  "result.sendToPrint": { he: "שלחו להדפסה", en: "Send to Print" },
  "result.generateVariation": { he: "צרו גרסה נוספת", en: "Generate Variation" },
  "result.downloadPdf": { he: "הורדה כ-PDF", en: "Download as PDF" },
  "result.printIncludes": { he: "ההדפסה כוללת:", en: "Print Includes:" },
  "result.include.paper": { he: "נייר פוטו מט איכותי", en: "High-quality matte photo paper" },
  "result.include.shipping": { he: "משלוח חינם לכל העולם", en: "Free shipping worldwide" },
  "result.include.packaging": { he: "אריזה מאובטחת", en: "Secure packaging" },

  // Print Flow
  "print.options.title": { he: "בחרו גודל הדפסה", en: "Choose your print size" },
  "print.options.subtitle": { he: "בחרו באיזה גודל תרצו את לוח החזון שלכם על הקיר.", en: "Select how big you want your vision board on the wall." },
  "print.shipping.title": { he: "פרטי משלוח", en: "Shipping details" },
  "print.shipping.subtitle": { he: "אנו נשלח את לוח החזון המודפס ישירות לפתח ביתכם.", en: "We'll send your printed vision board straight to your door." },
  "print.summary.title": { he: "סיכום הזמנה", en: "Order summary" },
  "print.summary.subtitle": { he: "בדקו את ההזמנה לפני התשלום.", en: "Review your order before payment." },
  "print.payButton": { he: "לתשלום ושליחה להדפסה", en: "Pay and send to print" },
  "print.success.title": { he: "ההזמנה נשלחה בהצלחה ✨", en: "Your print order is on its way ✨" },
  "print.success.text": { he: "קיבלנו את ההזמנה ושלחנו אותה לסטודיו ההדפסות שלנו. תקבלו מייל עם פרטי מעקב בקרוב.", en: "We’ve received your order and sent it to our print studio. You’ll receive an email with tracking details soon." },
  "print.success.viewOrders": { he: "ההזמנות שלי", en: "View my orders" },
  "print.success.createAnother": { he: "יצירת לוח נוסף", en: "Create another" },

  // Account
  "account.welcome": { he: "ברוכים הבאים", en: "Welcome back" },
  "account.myBoards": { he: "לוחות החזון שלי", en: "My Vision Boards" },
  "account.myOrders": { he: "ההזמנות שלי", en: "My Orders" },
  "account.createNew": { he: "יצירת לוח חדש", en: "Create New Board" },
  "account.view": { he: "צפייה", en: "View" },
  "account.orderDetails": { he: "פרטי הזמנה", en: "Order Details" },
  "account.status.processing": { he: "בטיפול", en: "Processing" },
  "account.status.printing": { he: "בהדפסה", en: "Printing" },
  "account.status.shipped": { he: "נשלח", en: "Shipped" },
  "account.status.delivered": { he: "נמסר", en: "Delivered" },

  // Footer
  "footer.faq": { he: "שאלות נפוצות", en: "FAQ" },
  "footer.about": { he: "אודות", en: "About" },
  "footer.contact": { he: "צור קשר", en: "Contact" },
  "footer.support": { he: "תמיכה", en: "Support" },
  "footer.terms": { he: "תנאי שימוש", en: "Terms of Use" },
  "footer.privacy": { he: "מדיניות פרטיות", en: "Privacy Policy" },
  "footer.refund": { he: "מדיניות החזרים", en: "Refund Policy" },
  "footer.disclaimer": { he: "הצהרת שימוש בבינה מלאכותית", en: "AI Disclaimer" },
  "footer.copyright": { he: "© VisionAI – תראו את העתיד שלכם על הקיר.", en: "© VisionAI – See your future on the wall." },
  "footer.product": { he: "מוצר", en: "Product" },
  "footer.company": { he: "חברה", en: "Company" },
  "footer.legal": { he: "משפטי", en: "Legal" },
  "footer.social": { he: "חברתי", en: "Social" },
};

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const LocalizationContext = createContext<LocalizationContextType | null>(null);

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("he");

  useEffect(() => {
    // Check local storage on mount
    const savedLang = localStorage.getItem("visionai-lang") as Language;
    if (savedLang) {
      setLanguageState(savedLang);
    }
  }, []);

  useEffect(() => {
    // Update document direction and lang attribute
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    localStorage.setItem("visionai-lang", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string) => {
    if (!translations[key]) return key;
    return translations[key][language];
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t, dir: language === "he" ? "rtl" : "ltr" }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
}
