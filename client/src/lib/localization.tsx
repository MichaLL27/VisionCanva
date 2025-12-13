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
  "nav.print": { he: "הדפסה", en: "Print" },
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

  "create.style1": { he: "ראשון", en: "Option 1" },
  "create.style2": { he: "שני", en: "Option 2" },
  "create.style3": { he: "שלישי", en: "Option 3" },
  "create.style4": { he: "רביעי", en: "Option 4" },
  "create.style5": { he: "חמישי", en: "Option 5" },
  "create.style6": { he: "שישי", en: "Option 6" },
  "create.style7": { he: "שביעי", en: "Option 7" },
  "create.style8": { he: "שמיני", en: "Option 8" },
  "create.style9": { he: "תשיעי", en: "Option 9" },
  "create.style10": { he: "עשירי", en: "Option 10" },
  "create.style11": { he: "אחד עשר", en: "Option 11" },
  "create.style12": { he: "שנים עשר", en: "Option 12" },

  "create.style1Desc": { he: "קלאסי ואורגני", en: "Classic & Organic" },
  "create.style2Desc": { he: "נקי ומודרני", en: "Clean & Modern" },
  "create.style3Desc": { he: "עמוק ודרמטי", en: "Moody & Deep" },
  "create.style4Desc": { he: "יצירתי ואומנותי", en: "Creative & Artistic" },
  "create.style5Desc": { he: "עתידני וזוהר", en: "Futuristic & Glowing" },
  "create.style6Desc": { he: "רך וחלומי", en: "Soft & Dreamy" },
  "create.style7Desc": { he: "וינטג' ונוסטלגי", en: "Vintage & Nostalgic" },
  "create.style8Desc": { he: "מדע בדיוני והייטק", en: "Sci-Fi & High Tech" },
  "create.style9Desc": { he: "מדיה מעורבת וכיף", en: "Mixed Media & Fun" },
  "create.style10Desc": { he: "מיידי וכנה", en: "Instant & Candid" },
  "create.style11Desc": { he: "עריכתי ושיקי", en: "Editorial & Chic" },
  "create.style12Desc": { he: "צורות וצבעים", en: "Shapes & Colors" },

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

  // How It Works Page
  "howItWorks.hero.title": { he: "איך זה עובד?", en: "How It Works" },
  "howItWorks.hero.subtitle": { he: "תוך כמה דקות, החלומות שלכם הופכים ללוח חזון מוכן להדפסה.", en: "In just minutes, your dreams transform into a print-ready vision board." },
  "howItWorks.hero.point1": { he: "כותבים את החלומות והיעדים שלכם", en: "Write your dreams and goals" },
  "howItWorks.hero.point2": { he: "ה-AI יוצר פרומפט חכם ומדויק", en: "AI creates a smart, detailed prompt" },
  "howItWorks.hero.point3": { he: "ה-AI מעצב לוח חזון אחד חזק", en: "AI designs your powerful vision board" },
  "howItWorks.hero.point4": { he: "מוכנים להדפסה ולתלייה על הקיר", en: "Ready to print and hang on your wall" },
  "howItWorks.hero.cta": { he: "התחילו ליצור לוח חזון", en: "Start Creating Your Vision Board" },

  "howItWorks.steps.title": { he: "4 שלבים פשוטים", en: "4 Simple Steps" },
  "howItWorks.step1.title": { he: "כותבים את החלום", en: "Write your dreams" },
  "howItWorks.step1.desc": { he: "כתבו בצורה חופשית איך אתם רוצים שחייכם ייראו ויירגישו – בלי חוקים, פשוט מהלב.", en: "Write freely how you want your life to look and feel – no rules, straight from your heart." },

  "howItWorks.step2.title": { he: "ה-AI מנסח פרומפט חכם", en: "AI Creates a Smart Prompt" },
  "howItWorks.step2.desc": { he: "המערכת שולחת את הטקסט שלכם ל-ChatGPT, שיוצר פרומפט ארוך, ברור ומדויק ליצירת תמונה.", en: "Our system sends your text to ChatGPT, which creates a detailed, clear prompt perfect for image generation." },

  "howItWorks.step3.title": { he: "ה-AI מעצב את לוח החזון", en: "AI Designs Your Vision Board" },
  "howItWorks.step3.desc": { he: "הפרומפט נשלח למודל תמונה, שמייצר לוח חזון קולנועי ואיכותי שמייצג את החלומות שלכם.", en: "The prompt goes to an image model, which generates a cinematic, high-quality vision board that represents your dreams." },

  "howItWorks.step4.title": { he: "מוכנים להדפסה", en: "Ready to Print" },
  "howItWorks.step4.desc": { he: "אפשר להוריד את לוח החזון כתמונה/PDF, או לשלוח אותו לבית הדפוס להדפסה מקצועית.", en: "Download your vision board as an image or PDF, or send it to our printing partners for professional printing." },

  "howItWorks.demo.title": { he: "מילים הופכות לתמונה", en: "Words Become Images" },
  "howItWorks.demo.text": { he: "התהליך פשוט: אתם כותבים את החלומות שלכם, והבינה המלאכותית מתרגמת זאת לתמונה יפה ומשראית.", en: "It's simple: you write your dreams, and AI translates them into a beautiful, inspiring image." },
  "howItWorks.demo.highlight": { he: "המעבר בין מילים לתמונה נעשה אוטומטית – אתם רק כותבים, וה-AI עושה את השאר.", en: "The conversion from words to images happens automatically – you just write, and AI does the rest." },

  "howItWorks.faq.title": { he: "שאלות נפוצות", en: "Frequently Asked Questions" },
  "howItWorks.faq1.q": { he: "האם אני צריך לכתוב באנגלית?", en: "Do I need to write in English?" },
  "howItWorks.faq1.a": { he: "לא. אפשר לכתוב בעברית או בכל שפה אחרת – אנחנו ממירים את הכל לפרומפט באנגלית מאחורי הקלעים.", en: "No. You can write in Hebrew or any other language – we automatically convert it to an English prompt behind the scenes." },

  "howItWorks.faq2.q": { he: "האם אפשר ליצור כמה לוחות?", en: "Can I create multiple vision boards?" },
  "howItWorks.faq2.a": { he: "כן. אפשר ליצור כמה שתרצו, וליצור וריאציות שונות לאותו חלום.", en: "Yes. You can create as many as you want and generate different variations of the same dream." },

  "howItWorks.faq3.q": { he: "איך עובד עניין ההדפסה?", en: "How does printing work?" },
  "howItWorks.faq3.a": { he: "לאחר יצירת הלוח תוכלו לבחור להוריד אותו או לשלוח אותו להדפסה לבית דפוס שותף. אנחנו דואגים לכל הפרטים.", en: "After creating your board, you can choose to download it or send it to our printing partners for professional printing. We handle all the details." },

  "howItWorks.final.title": { he: "מוכנים לראות את החלומות שלכם על הקיר?", en: "Ready to See Your Dreams on the Wall?" },
  "howItWorks.final.cta": { he: "התחילו עכשיו", en: "Start Now" },

  // Pricing Page
  "pricing.hero.title": { he: "מחירים שקופים וישירים", en: "Simple, Transparent Pricing" },
  "pricing.hero.subtitle": { he: "בחרו את החבילה שמתאימה לכם – תשלום חד־פעמי לכל לוח חזון.", en: "Choose the package that fits you – one-time payment per vision board." },

  "pricing.packages.title": { he: "חבילות לוח חזון חד־פעמיות", en: "One-time Vision Board Packages" },

  // Plan 1
  "pricing.plan1.title": { he: "לוח חזון דיגיטלי", en: "Digital Vision Board" },
  "pricing.plan1.price": { he: "₪39", en: "₪39" },
  "pricing.plan1.sub": { he: "תשלום חד־פעמי", en: "One-time payment" },
  "pricing.plan1.feature1": { he: "יצירת לוח חזון אחד בעזרת AI", en: "Create one AI-powered vision board" },
  "pricing.plan1.feature2": { he: "הורדה באיכות גבוהה", en: "Download in high quality" },
  "pricing.plan1.feature3": { he: "ללא הדפסה", en: "No printing included" },
  "pricing.plan1.button": { he: "התחילו ליצור לוח", en: "Create a board" },

  // Plan 2 (Popular)
  "pricing.plan2.title": { he: "לוח חזון + הדפסה", en: "Vision Board + Print" },
  "pricing.plan2.price": { he: "₪89", en: "₪89" },
  "pricing.plan2.sub": { he: "תשלום חד־פעמי", en: "One-time payment" },
  "pricing.plan2.feature1": { he: "יצירת לוח חזון דיגיטלי אחד", en: "Create one digital vision board" },
  "pricing.plan2.feature2": { he: "הדפסה מקצועית בגודל A3", en: "Professional A3 size print" },
  "pricing.plan2.feature3": { he: "הכנה לתלייה על הקיר", en: "Ready to hang on your wall" },
  "pricing.plan2.badge": { he: "הכי פופולרי", en: "Most Popular" },
  "pricing.plan2.button": { he: "לוח + הדפסה", en: "Board + Print" },

  // Plan 3
  "pricing.plan3.title": { he: "הדפסת לוח קיים", en: "Print Existing Board" },
  "pricing.plan3.price": { he: "₪59", en: "₪59" },
  "pricing.plan3.sub": { he: "תשלום חד־פעמי", en: "One-time payment" },
  "pricing.plan3.feature1": { he: "הדפסה מלוח חזון שכבר יש לכם", en: "Print an existing vision board" },
  "pricing.plan3.feature2": { he: "העלאת קובץ או בחירה מהמערכת", en: "Upload a file or choose from our gallery" },
  "pricing.plan3.feature3": { he: "הדפסה מקצועית בגודל A3", en: "Professional A3 size print" },
  "pricing.plan3.button": { he: "שלחו לוח להדפסה", en: "Print a board" },

  // Print pricing section
  "pricing.print.title": { he: "מחירי הדפסה לפי גודל", en: "Print Pricing by Size" },
  "pricing.print.subtitle": { he: "מחיר לכל הדפסה בודדת (ללא מנוי).", en: "Price per individual print (no subscription required)." },
  "pricing.print.table.size": { he: "גודל", en: "Size" },
  "pricing.print.table.type": { he: "סוג", en: "Type" },
  "pricing.print.table.price": { he: "מחיר", en: "Price" },
  "pricing.print.poster": { he: "פוסטר נייר", en: "Paper Poster" },
  "pricing.print.canvas": { he: "קנבס", en: "Canvas" },
  "pricing.print.note": { he: "כל המחירים הם להזמנה חד־פעמית אחת. אפשר להזמין כמה פעמים שתרצו.", en: "All prices are for a single one-time order. You can order multiple times whenever you want." },

  // Final CTA
  "pricing.final.title": { he: "מוכנים ליצור את לוח החזון הראשון שלכם?", en: "Ready to Create Your First Vision Board?" },
  "pricing.final.cta": { he: "התחילו עכשיו", en: "Start now" },

  // Result Page - Action Cards
  "result.actions.title": { he: "מה תרצו לעשות עם לוח החזון הזה?", en: "What would you like to do with your vision board?" },
  "result.actions.subtitle": { he: "בחרו שימוש חד־פעמי – הורדה דיגיטלית, הדפסה או שניהם.", en: "Choose a one-time option – digital download, print, or both." },

  "result.digital.title": { he: "לוח חזון דיגיטלי", en: "Digital Vision Board" },
  "result.digital.priceLabel": { he: "תשלום חד־פעמי", en: "One-time payment" },
  "result.digital.description": { he: "הורדה באיכות גבוהה לשמירה, שיתוף והדפסה עצמאית.", en: "High-quality download for saving, sharing, and self-printing." },
  "result.digital.button": { he: "הורידו לוח דיגיטלי", en: "Download Digital Board" },

  "result.print.title": { he: "לוח חזון + הדפסה", en: "Vision Board + Print" },
  "result.print.priceLabel": { he: "תשלום חד־פעמי", en: "One-time payment" },
  "result.print.description": { he: "הורדה דיגיטלית + הדפסה מקצועית בגודל A3 לביתכם.", en: "Digital download + professional A3 print delivered to your home." },
  "result.print.button": { he: "הזמינו הדפסה", en: "Order Print" },
  "result.print.badge": { he: "הכי פופולרי", en: "Most Popular" },

  // Order Modals
  "order.digital.title": { he: "הורדת לוח חזון דיגיטלי", en: "Download Digital Vision Board" },
  "order.digital.text": { he: "עלות לוח חזון דיגיטלי אחד היא 39 ₪ לתשלום חד־פעמי. בשלב זה התשלום מתבצע ידנית לאחר ההזמנה.", en: "The cost of one digital vision board is ₪39 (one-time payment). Payment is currently processed manually after the order." },
  "order.digital.submit": { he: "אשרו וקבלו קישור להורדה", en: "Confirm and Get Download Link" },

  "order.print.title": { he: "הזמנת הדפסה ללוח החזון", en: "Order Vision Board Print" },
  "order.print.text": { he: "עלות לוח חזון דיגיטלי + הדפסה בגודל A3 היא 89 ₪ לתשלום חד־פעמי. בשלב זה התשלום מתבצע ידנית לאחר אישור ההזמנה.", en: "The cost of digital vision board + A3 print is ₪89 (one-time payment). Payment is currently processed manually after the order." },
  "order.print.submit": { he: "שלחו הזמנה להדפסה", en: "Send Print Order" },

  "order.form.fullName": { he: "שם מלא", en: "Full Name" },
  "order.form.email": { he: "אימייל", en: "Email" },
  "order.form.phone": { he: "טלפון", en: "Phone" },
  "order.form.address": { he: "כתובת מלאה למשלוח", en: "Full Shipping Address" },
  "order.form.city": { he: "עיר", en: "City" },
  "order.form.notes": { he: "הערות מיוחדות", en: "Special Notes" },
  "order.form.cancel": { he: "ביטול", en: "Cancel" },

  "order.success.title": { he: "ההזמנה התקבלה!", en: "Order Received!" },
  "order.success.digitalDesc": { he: "קיבלנו את הפרטים. תוכלו להוריד עכשיו.", en: "We received your details. You can download now." },
  "order.success.printDesc": { he: "קיבלנו את הפרטים להדפסה. ניצור אתכם קשר בקרוב.", en: "We received your print order. We'll contact you soon." },
  "order.success.digitalText": { he: "ההזמנה התקבלה. תוכלו להוריד את לוח החזון עכשיו, ונשלח לכם הוראות תשלום בהמשך.", en: "Order received. You can download your vision board now, and we'll send payment instructions soon." },
  "order.success.printText": { he: "קיבלנו את הפרטים להדפסה. ניצור אתכם קשר בקרוב להשלמת התשלום ושליחת הלוח המודפס.", en: "We received your print order details. We'll contact you soon to complete payment and ship your printed board." },
  "order.success.close": { he: "סגירה", en: "Close" },
  "order.success.createAnother": { he: "יצירת לוח נוסף", en: "Create Another Board" },
  "order.error": { he: "משהו השתבש בעת עיבוד ההזמנה. אנא נסו שוב.", en: "Something went wrong while processing your order. Please try again." },

  // Print Existing Page
  "print.title": { he: "הדפסת לוח חזון קיים", en: "Print Existing Vision Board" },
  "print.subtitle": { he: "כבר יש לכם לוח חזון מוכן? העלו אותו והזמינו הדפסה.", en: "Already have a vision board? Upload it and order a print." },
  "print.uploadLabel": { he: "העלו את לוח החזון שלכם", en: "Upload your vision board" },
  "print.uploadPlaceholder": { he: "לחצו להעלאת קובץ תמונה", en: "Click to upload an image file" },
  "print.priceLabel": { he: "הדפסה בגודל A3", en: "A3 Size Print" },
  "print.priceNote": { he: "תשלום חד־פעמי להדפסה מקצועית ומשלוח", en: "One-time payment for professional print and shipping" },
  "print.submitButton": { he: "שלחו לוח להדפסה", en: "Send Board to Print" },
  "print.errorNoFile": { he: "נא להעלות קובץ תמונה", en: "Please upload an image file" },
  "print.backHome": { he: "חזרה לדף הבית", en: "Back to Homepage" },
  "result.generatedBy": { he: "נוצר על ידי", en: "Generated by" },
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
