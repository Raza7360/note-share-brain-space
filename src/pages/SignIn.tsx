
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in a real app, you'd validate credentials
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <Link to="/" className="flex items-center gap-2 justify-center mb-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-400 dark:to-gray-600"></div>
          <span className="text-xl font-bold">Brainly</span>
        </Link>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="text-sm text-gray-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full">Sign In</Button>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignIn;
