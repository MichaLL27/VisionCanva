import { Link, useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setLocation] = useLocation();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    setLocation("/account");
  };

  return (
    <Layout hideFooter>
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md space-y-8">
          <Link href="/">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold">Welcome back</h1>
            <p className="text-muted-foreground mt-2">Sign in to your VisionAI account</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border bg-background" 
                placeholder="hello@example.com" 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Password</label>
                <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border bg-background" 
                placeholder="••••••••" 
              />
            </div>

            <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all">
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/sign-up">
              <span className="text-primary font-medium hover:underline cursor-pointer">Create one</span>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
