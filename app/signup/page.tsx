"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { signupSchema, type SignupData } from "@/lib/validation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<SignupData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupData, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const result = signupSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof SignupData;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });

    let data: { error?: string } = {};
    try {
      data = await res.json();
    } catch {
      setServerError("Server error — check the terminal running `npm run dev`.");
      setSubmitting(false);
      return;
    }

    if (!res.ok) {
      setServerError(data.error || "Something went wrong.");
      setSubmitting(false);
      return;
    }

    const signInResult = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setSubmitting(false);

    if (signInResult?.ok) {
      router.push("/");
    } else {
      router.push("/signin");
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-extrabold text-center mb-1">Create your account</h1>
      <p className="text-sm text-gray-500 text-center mb-8">
        Sign up to track your orders and manage your account.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Full name" error={errors.fullName}>
          <input
            type="text"
            className="input"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </Field>

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
          <p className="text-xs text-gray-400 mt-1">8+ characters, with letters and numbers.</p>
        </Field>

        <Field label="Confirm password" error={errors.confirmPassword}>
          <input
            type="password"
            className="input"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />
        </Field>

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <button type="submit" disabled={submitting} className="btn-primary mt-2 disabled:opacity-50">
          {submitting ? "Creating account..." : "Sign up"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-2">
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm text-gray-600 block mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
