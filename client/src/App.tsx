import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocalizationProvider } from "@/lib/localization";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Create from "@/pages/create";
import Result from "@/pages/result";
import Success from "@/pages/success";
import HowItWorks from "@/pages/how-it-works";
import Pricing from "@/pages/pricing";

// New Pages
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import Account from "@/pages/account/index";
import OrderDetails from "@/pages/account/order";
import PrintOptions from "@/pages/print/options";
import Shipping from "@/pages/print/shipping";
import Summary from "@/pages/print/summary";
import PrintSuccess from "@/pages/print/success";
import AdminDashboard from "@/pages/admin/dashboard";
import Terms from "@/pages/legal/terms";
import Privacy from "@/pages/legal/privacy";
import Refund from "@/pages/legal/refund";
import Disclaimer from "@/pages/legal/disclaimer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/create" component={Create}/>
      <Route path="/result" component={Result}/>
      <Route path="/success" component={Success}/> {/* Keeping old success for backward compatibility or direct link */}
      <Route path="/how-it-works" component={HowItWorks}/>
      <Route path="/pricing" component={Pricing}/>
      
      {/* Auth */}
      <Route path="/auth/sign-in" component={SignIn}/>
      <Route path="/auth/sign-up" component={SignUp}/>
      
      {/* Account */}
      <Route path="/account" component={Account}/>
      <Route path="/account/orders/:id" component={OrderDetails}/>
      
      {/* Print Flow */}
      <Route path="/print/options" component={PrintOptions}/>
      <Route path="/print/shipping" component={Shipping}/>
      <Route path="/print/summary" component={Summary}/>
      <Route path="/print/success" component={PrintSuccess}/>
      
      {/* Admin */}
      <Route path="/admin/dashboard" component={AdminDashboard}/>
      
      {/* Legal */}
      <Route path="/legal/terms" component={Terms}/>
      <Route path="/legal/privacy" component={Privacy}/>
      <Route path="/legal/refund" component={Refund}/>
      <Route path="/legal/disclaimer" component={Disclaimer}/>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
