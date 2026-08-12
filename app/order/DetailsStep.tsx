"use client";

import { useState } from "react";
import { detailsSchema, type DetailsData } from "@/lib/validation";

export default function DetailsStep({
  initial,
  onNext,
}: {
  initial: DetailsData | null;
  onNext: (data: DetailsData) => void;
}) {
  const [form, setForm] = useState<DetailsData>(
    initial || { fullName: "", email: "", phone: "" }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof DetailsData, string>>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = detailsSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof DetailsData;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onNext(result.data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-extrabold mb-1">Your details</h2>
      <p className="text-sm text-gray-500 mb-6">Step 1 of 3 — tell us who this is for.</p>

      <Field label="Full name" error={errors.fullName}>
        <input
          type="text"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="input"
          placeholder="Sara Al Mansoori"
        />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input"
          placeholder="sara@email.com"
        />
      </Field>

      <Field label="Phone number" error={errors.phone}>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="input"
          placeholder="+971 50 123 4567"
        />
      </Field>

      <button type="submit" className="btn-primary w-full mt-4">
        Next
      </button>
    </form>
  );
}

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="text-xs font-semibold text-gray-600 block mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
