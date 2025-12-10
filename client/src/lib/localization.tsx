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
  "create.dreamsTitle": { he: "תארו את החזון שלכם", en: "Describe Your Dream Life" },
  "create.dreamsSubtitle": { he: "כתבו את מה שאתם רוצים, את המטרות שלכם, וכיצד אתם רוצים שהחיים שלכם ירגישו. הבינה המלאכותית תהפוך זאת ללוח חזון חזק.", en: "Write what you desire, your goals, and how you want your life to feel. The AI will turn this into a powerful vision board." },
  "create.dreamsPlaceholder": { he: "כתבו את החלומות שלכם כאן...", en: "Write your dreams here..." },
  "create.dreamsHelper": { he: "אתם יכולים לכתוב בכל שפה. הבינה המלאכותית תהמיר זאת לפרומפט בעברית ואנגלית.", en: "You can write in any language. The AI will convert it to an English image prompt." },
  "create.generatePrompt": { he: "צרו פרומפט", en: "Generate Prompt" },
  "create.errorTooShort": { he: "נא להזין תיאור ארוך יותר של החזון שלכם", en: "Please write a longer description of your dreams" },

  "create.promptTitle": { he: "פרומפט AI ללוח החזון שלך", en: "AI Prompt for Your Vision Board" },
  "create.promptSubtitle": { he: "זה הפרומפט שהבינה המלאכותית תשתמש בו ליצירת לוח החזון שלך.", en: "This is the prompt the AI will use to create your vision board image." },
  "create.generateBoard": { he: "צרו לוח חזון", en: "Generate Vision Board" },
  "create.newPrompt": { he: "צרו פרומפט חדש", en: "Generate New Prompt" },

  "loading.manifesting": { he: "יוצרים את לוח החזון שלכם…", en: "Manifesting your vision…" },
  "loading.creatingBoard": { he: "יוצרים את לוח החזון שלכם…", en: "Creating your vision board…" },
  "loading.creatingPrompt": { he: "יוצרים פרומפט עבור לוח החזון שלכם…", en: "Creating AI prompt for your vision board…" },
  "loading.curating": { he: "הבינה המלאכותית בונה עבורכם את לוח החזון המושלם…", en: "Our AI is creating the perfect vision board for you..." },
  "loading.thinkingPrompt": { he: "הבינה המלאכותית חושבת על הפרומפט הטוב ביותר…", en: "AI is thinking about the perfect prompt..." },

  // Result Screen
  "result.yourVision": { he: "לוח החזון שלך", en: "Your Vision" },
  "result.nextSteps": { he: "השלבים הבאים", en: "Next Steps" },
  "result.sendToPrint": { he: "שלחו להדפסה", en: "Send to Print" },
  "result.generateVariation": { he: "צרו לוח חדש", en: "Create Another" },
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
  "print.success.text": { he: "קיבלנו את ההזמנה ושלחנו אותה לסטודיו ההדפסות שלנו. תקבלו מייל עם פרטי מעקב בקרוב.", en: "We've received your order and sent it to our print studio. You'll receive an email with tracking details soon." },
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
    const savedLang = localStorage.getItem("visionai-lang") as Language;
    if (savedLang) {
      setLanguageState(savedLang);
    }
  }, []);

  useEffect(() => {
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
