"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { signinSchema, type SigninData } from "@/lib/validation";
import { Field } from "@/components/Field";

export default function SigninPage() {
  const router = useRouter();
  const [form, setForm] = useState<SigninData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof SigninData, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const result = signinSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof SigninData;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setSubmitting(false);

    if (res?.ok) {
      router.push("/");
    } else {
      setServerError("Incorrect email or password.");
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-extrabold text-center mb-8">Sign in</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>

        <Field label="Password" error={errors.password}>
          <input
            type="password"
            className="input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Field>

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <button type="submit" disabled={submitting} className="btn-primary mt-2 disabled:opacity-50">
          {submitting ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
