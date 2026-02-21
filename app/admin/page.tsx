"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AlertCircle, Mail, Lock } from "lucide-react";
import { useLoginMutation } from "@/store/services/api";

export default function AdminLoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email, password }).unwrap();
      router.push("/admin/products");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-background to-muted/20">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Sign in to manage your store
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
            <div className="p-8 space-y-6">
              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <div className="flex gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="bg-background h-11 px-4"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-foreground flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs text-primary hover:text-primary/80 transition-colors"
                      onClick={() => {
                        /* Add forgot password logic if needed */
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="bg-background h-11 px-4"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-11 text-base font-medium mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </Button>
              </form>

              {/* Security Note */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-card text-muted-foreground">
                    Secure Access
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  This area is restricted to authorized administrators only. All
                  login attempts are monitored and logged.
                </p>

                {/* Quick Tips */}
                <div className="flex items-center justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span>2FA Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Store Link */}
          <div className="text-center mt-6">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to Store
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
