"use client";

import { useState } from "react";
import { locationSchema, UAE_EMIRATES, type LocationData } from "@/lib/validation";
import { Field } from "./DetailsStep";

export default function LocationStep({
  initial,
  onBack,
  onNext,
}: {
  initial: LocationData | null;
  onBack: () => void;
  onNext: (data: LocationData) => void;
}) {
  const [form, setForm] = useState<Partial<LocationData>>(
    initial || { emirate: undefined, address: "" }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof LocationData, string>>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = locationSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof LocationData;
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
      <h2 className="text-xl font-extrabold mb-1">Delivery details</h2>
      <p className="text-sm text-gray-500 mb-1">Step 2 of 3 — where should we deliver?</p>
      <p className="text-xs text-gray-400 mb-6">Your device ships within 2 days — no need to schedule a date.</p>

      <Field label="Emirate" error={errors.emirate}>
        <select
          value={form.emirate || ""}
          onChange={(e) => setForm({ ...form, emirate: e.target.value as any })}
          className="input"
        >
          <option value="" disabled>
            Select an emirate
          </option>
          {UAE_EMIRATES.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Delivery address" error={errors.address}>
        <input
          type="text"
          value={form.address || ""}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="input"
          placeholder="Street, building, apartment"
        />
      </Field>

      <div className="flex gap-3 mt-4">
        <button type="button" onClick={onBack} className="btn-secondary w-full">
          Back
        </button>
        <button type="submit" className="btn-primary w-full">
          Next
        </button>
      </div>
    </form>
  );
}
