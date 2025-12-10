import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function Layout({ children, hideHeader = false, hideFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!hideHeader && <Header />}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
