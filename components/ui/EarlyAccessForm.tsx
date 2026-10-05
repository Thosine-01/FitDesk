"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  cityOptions,
  earlyAccessForm as copy,
  memberBandOptions,
} from "@/lib/content";
import {
  fieldErrors,
  leadSchema,
  type LeadField,
  type EarlyAccessResponse,
  type LeadInput,
} from "@/lib/validation";
import { monthsFor } from "@/lib/commitment";
import {
  COMMITMENT_EVENT,
  hasWhatsapp,
  whatsappLink,
  type CommitmentEventDetail,
} from "@/lib/whatsapp";
import { Button, buttonClass } from "./Button";
import { Icon } from "./Icon";

type Values = Required<Omit<LeadInput, "source" | "commitmentFee">>;
type Status = "idle" | "submitting" | "success" | "error";

const empty: Values = {
  gymName: "",
  contactName: "",
  phone: "",
  email: "",
  city: "" as Values["city"],
  memberBand: "" as Values["memberBand"],
  website: "",
};

// Order used to focus the first invalid field.
const order: LeadField[] = [
  "gymName",
  "contactName",
  "phone",
  "email",
  "city",
  "memberBand",
];

/** utm params if present, else the external referrer, else "direct". */
function captureSource() {
  const q = new URLSearchParams(window.location.search);
  const utm = ["utm_source", "utm_medium", "utm_campaign"]
    .map((k) => q.get(k))
    .filter(Boolean);
  if (utm.length) return `utm:${utm.join("/")}`;
  try {
    const ref = document.referrer && new URL(document.referrer);
    if (ref && ref.host !== window.location.host) return `ref:${ref.host}`;
  } catch {}
  return "direct";
}

const inputBase =
  "h-12 w-full rounded-md border bg-card px-4 text-base text-primary placeholder:text-muted transition-colors focus-visible:border-accent";

export function EarlyAccessForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<LeadField, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<"server" | "rate_limited">("server");
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Move focus to the success / error message when it appears.
  // Commitment handed over by the calculator (only when WhatsApp isn't set).
  const [commitFee, setCommitFee] = useState<number | null>(null);
  useEffect(() => {
    const onCommit = (e: Event) =>
      setCommitFee((e as CustomEvent<CommitmentEventDetail>).detail.fee);
    window.addEventListener(COMMITMENT_EVENT, onCommit);
    return () => window.removeEventListener(COMMITMENT_EVENT, onCommit);
  }, []);

  useEffect(() => {
    if (status === "success" || status === "error") resultRef.current?.focus();
  }, [status]);

  const set = (k: keyof Values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k])
      setErrors((prev) => {
        const next = { ...prev };
        delete next[k];
        return next;
      });
  };

  const focusFirstError = (errs: Partial<Record<LeadField, string>>) => {
    const first = order.find((k) => errs[k]);
    if (first)
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const payload = {
      ...values,
      source: captureSource(),
      ...(commitFee ? { commitmentFee: commitFee } : {}),
    };
    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      focusFirstError(errs);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as EarlyAccessResponse;
      if (data.ok) {
        setStatus("success");
        return;
      }
      if (data.error === "validation" && data.fields) {
        setErrors(data.fields);
        setStatus("idle");
        focusFirstError(data.fields);
        return;
      }
      setFailure(data.error === "rate_limited" ? "rate_limited" : "server");
      setStatus("error");
    } catch {
      setFailure("server");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="on-light rounded-lg bg-card p-7 text-center text-primary sm:p-9">
        <div
          ref={resultRef}
          tabIndex={-1}
          role="status"
          className="rounded-sm outline-none"
        >
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent-muted text-accent">
            <Icon name="check" className="size-6" />
          </span>
          <h3 className="mt-5">{copy.success.title}</h3>
          <p className="mt-2 text-secondary">
            {hasWhatsapp ? copy.success.body : copy.success.bodyNoWhatsapp}
          </p>
        </div>
        {hasWhatsapp && (
          <Button
            href={whatsappLink("form_success")}
            variant="primary"
            size="lg"
            className="mt-6"
          >
            <Icon name="whatsapp" />
            {copy.success.whatsappLabel}
          </Button>
        )}
      </div>
    );
  }

  const fieldProps = (name: LeadField) => ({
    id: `ea-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `ea-${name}-error` : undefined,
    className: `${inputBase} ${errors[name] ? "border-coral" : "border-border-default"}`,
  });

  const label = (name: LeadField, text: string, optional?: string) => (
    <label htmlFor={`ea-${name}`} className="mb-1.5 block text-sm font-bold">
      {text}
      {optional ? (
        <span className="font-medium text-muted"> ({optional})</span>
      ) : (
        <span className="sr-only"> ({copy.required})</span>
      )}
    </label>
  );

  const error = (name: LeadField) =>
    errors[name] ? (
      <p
        id={`ea-${name}-error`}
        className="mt-2 inline-block rounded-sm bg-coral-tint px-2 py-1 text-sm font-semibold text-coral"
      >
        {errors[name]}
      </p>
    ) : null;

  const select = (
    name: "city" | "memberBand",
    options: readonly string[],
    placeholder: string,
  ) => (
    <div className="relative">
      <select
        {...fieldProps(name)}
        value={values[name]}
        onChange={(e) => set(name, e.target.value)}
        className={`${fieldProps(name).className} appearance-none pr-10 ${values[name] ? "" : "text-muted"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-primary">
            {o}
          </option>
        ))}
      </select>
      <Icon
        name="chevron"
        className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-muted"
      />
    </div>
  );

  const f = copy.fields;
  const submitting = status === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="ea-title"
      className="on-light relative rounded-lg bg-card p-6 text-left text-primary sm:p-8"
    >
      <h3 id="ea-title">{copy.title}</h3>
      <p className="mt-1 text-[15px] text-secondary">{copy.intro}</p>

      {commitFee && (
        <div className="mt-5 flex items-center justify-between gap-3 rounded-md bg-accent-muted px-4 py-3 text-[15px] font-semibold text-accent">
          <span className="num">
            {copy.commitment.note(commitFee, monthsFor(commitFee))}
          </span>
          <button
            type="button"
            onClick={() => setCommitFee(null)}
            className="shrink-0 rounded-sm text-sm underline underline-offset-4"
          >
            {copy.commitment.remove}
          </button>
        </div>
      )}

      {status === "error" && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="mt-5 rounded-md bg-coral-tint p-4 text-coral outline-none"
        >
          <p className="font-bold">{copy.error.title}</p>
          <p className="mt-1 text-[15px]">
            {failure === "rate_limited"
              ? copy.error.rateLimited
              : hasWhatsapp
                ? copy.error.body
                : copy.error.bodyNoWhatsapp}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="submit" className={buttonClass("primary", "md")}>
              {copy.error.retry}
            </button>
            {hasWhatsapp && (
              <Button href={whatsappLink("form_error")} variant="outline">
                <Icon name="whatsapp" />
                {copy.error.whatsappLabel}
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          {label("gymName", f.gymName.label)}
          <input
            {...fieldProps("gymName")}
            type="text"
            autoComplete="organization"
            value={values.gymName}
            onChange={(e) => set("gymName", e.target.value)}
          />
          {error("gymName")}
        </div>

        <div>
          {label("contactName", f.contactName.label)}
          <input
            {...fieldProps("contactName")}
            type="text"
            autoComplete="name"
            value={values.contactName}
            onChange={(e) => set("contactName", e.target.value)}
          />
          {error("contactName")}
        </div>

        <div>
          {label("phone", f.phone.label)}
          <input
            {...fieldProps("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={f.phone.placeholder}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
          {error("phone")}
        </div>

        <div className="sm:col-span-2">
          {label("email", f.email.label, f.email.optional)}
          <input
            {...fieldProps("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
          />
          {error("email")}
        </div>

        <div>
          {label("city", f.city.label)}
          {select("city", cityOptions, f.city.placeholder)}
          {error("city")}
        </div>

        <div>
          {label("memberBand", f.memberBand.label)}
          {select("memberBand", memberBandOptions, f.memberBand.placeholder)}
          {error("memberBand")}
        </div>
      </div>

      {/* Honeypot: off-screen, skipped by keyboard and screen readers. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="ea-website">{f.honeypot.label}</label>
        <input
          id="ea-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        aria-disabled={submitting}
        className={buttonClass(
          "primary",
          "lg",
          "mt-7 w-full disabled:opacity-70",
        )}
      >
        {submitting ? copy.submitting : copy.submit}
      </button>

      <p className="mt-4 text-center text-sm text-muted">
        {copy.privacy.before}
        <Link
          href={copy.privacy.link.href}
          className="font-semibold text-accent underline underline-offset-4"
        >
          {copy.privacy.link.label}
        </Link>
      </p>
    </form>
  );
}
