"use client";
import Link from "next/link"
// Fallback for missing module '@data/action'.
// If your project provides actions via '@data/action', replace this with the real import.
const actions = { auth: { registerUserAction: "/api/register" } };

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ButtonHTMLAttributes } from "react";

// Local fallback Button to avoid missing module '@/components/ui/button'
const Button = (props: ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) => (
  <button {...props} />
);

const styles = {
  container: "w-full max-w-md",
  header: "space-y-1",
  title: "text-3xl font-bold text-blue-500",
  content: "space-y-4",
  fieldGroup: "space-y-2",
  footer: "flex flex-col",
  button: "w-full",
  prompt: "mt-4 text-center text-sm",
  link: "ml-2 text-blue-500",
};

export function SignupForm() {
  return (
    <div className={styles.container}>
      <form action={actions.auth.registerUserAction}>
        <Card>
          <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>RESET PASSWORD</CardTitle>
            <CardDescription>
              Enter your details to reset password.
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.content}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="username" className="text-darkgray-500">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
              />
            </div>
            <div className={styles.fieldGroup}>
              <Label htmlFor="email" className="text-black-500">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>
            <div className={styles.fieldGroup}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
            </div>
          </CardContent>
          <CardFooter className={styles.footer}>
            <Button className ={styles.button}>Reset</Button>
          </CardFooter>
        </Card>
        <div className={styles.prompt}>
          Have an account?
          <Link className={styles.link} href="/auth/login">
            login
          </Link>
        </div>
      </form>
    </div>
  );
}