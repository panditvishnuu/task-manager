"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignIn, SignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      {/* Auth Card */}
      <Card className="w-full max-w-md relative z-10">
        <CardHeader>
          <CardTitle>{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
          <CardDescription>
            {isLogin
              ? "Enter your credentials to access your account"
              : "Fill in your details to create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Show SignIn or SignUp based on state */}
          {isLogin ? (
            <SignIn
              routing="virtual"
              afterSignInUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-primary hover:bg-primary/90",
                  footerActionLink: "text-primary hover:text-primary/90",
                },
              }}
            />
          ) : (
            <SignUp
              routing="virtual"
              afterSignUpUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-primary hover:bg-primary/90",
                  footerActionLink: "text-primary hover:text-primary/90",
                },
              }}
            />
          )}

          {/* Divider for alternative auth options */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Toggle between Sign In and Sign Up */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </Button>
        </CardContent>
      </Card>

      {/* Background animation */}
      <BackgroundBeams />
    </div>
  );
}
