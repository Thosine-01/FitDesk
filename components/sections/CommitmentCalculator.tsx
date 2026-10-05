"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DEFAULT_FEE,
  MAX,
  MIN,
  STEP,
  clampFee,
  monthsFor,
  pctFor,
} from "@/lib/commitment";
import { commitment as copy, whatsapp } from "@/lib/content";
import { naira } from "@/lib/format";
import {
  COMMITMENT_EVENT,
  hasWhatsapp,
  whatsappLink,
  type CommitmentEventDetail,
} from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Left: the control (number input + slider, synced both ways).
 * Right: the outcome card. The input only clamps to the step on blur, so
 * typing is never fought; the outcome follows the clamped value live.
 */
export function CommitmentCalculator() {
  const [fee, setFee] = useState(DEFAULT_FEE);
  const [text, setText] = useState(String(DEFAULT_FEE));
  const months = monthsFor(fee);

  const onType = (raw: string) => {
    setText(raw);
    const n = Number(raw);
    if (raw.trim() !== "" && Number.isFinite(n)) setFee(clampFee(n));
  };

  const onBlur = () => {
    const n = Number(text);
    const next = text.trim() !== "" && Number.isFinite(n) ? clampFee(n) : fee;
    setFee(next);
    setText(String(next));
  };

  const onSlide = (v: number) => {
    setFee(v);
    setText(String(v));
  };

  // No WhatsApp number: hand the amount to the form and let the link scroll.
  const onCta = () => {
    if (hasWhatsapp) return;
    window.dispatchEvent(
      new CustomEvent<CommitmentEventDetail>(COMMITMENT_EVENT, {
        detail: { fee },
      }),
    );
  };

  const r = copy.outcome.rows;

  return (
    <div className="mt-12 grid items-stretch gap-6 nav:grid-cols-2 nav:gap-10">
      {/* Control */}
      <div className="flex flex-col justify-center">
        <label
          htmlFor="commit-amount"
          className="text-sm font-bold text-on-dark-sec"
        >
          {copy.control.label}
        </label>
        <div className="mt-3 flex items-baseline gap-1 border-b-2 border-border-on-dark pb-2 transition-colors focus-within:border-accent-bright">
          <span
            aria-hidden="true"
            className="font-display text-[clamp(40px,7vw,64px)] leading-none font-bold text-on-dark-muted"
          >
            ₦
          </span>
          <input
            id="commit-amount"
            type="number"
            inputMode="numeric"
            min={MIN}
            max={MAX}
            step={STEP}
            value={text}
            onChange={(e) => onType(e.target.value)}
            onBlur={onBlur}
            aria-describedby="commit-helper"
            className="commit-number num w-full min-w-0 bg-transparent font-display text-[clamp(40px,7vw,64px)] leading-none font-bold tracking-[-0.035em] text-on-dark outline-none"
            style={{ fontVariationSettings: "'opsz' 32" }}
          />
        </div>

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={fee}
          onChange={(e) => onSlide(Number(e.target.value))}
          aria-label={copy.control.sliderLabel}
          aria-valuetext={naira(fee)}
          className="commit-range mt-8 w-full"
          style={{ "--pct": `${pctFor(fee)}%` } as React.CSSProperties}
        />
        <div className="num mt-3 flex justify-between text-sm text-on-dark-muted">
          <span>{copy.control.min}</span>
          <span>{copy.control.max}</span>
        </div>

        <p id="commit-helper" className="mt-6 text-[15px] text-on-dark-sec">
          {copy.control.helper}
        </p>
      </div>

      {/* Outcome */}
      <div className="on-light rounded-lg bg-card p-7 text-primary sm:p-9">
        <div aria-live="polite" aria-atomic="true">
          <p className="flex items-baseline gap-3">
            <span
              key={months}
              className="commit-pop num font-display text-[clamp(72px,11vw,112px)] leading-[0.9] font-bold tracking-[-0.05em] text-accent"
              style={{ fontVariationSettings: "'opsz' 32" }}
            >
              {months}
            </span>
            <span className="text-xl font-bold">
              {copy.outcome.monthsUnit(months)}
            </span>
          </p>
        </div>

        <ul className="mt-7 flex flex-col gap-3.5 border-t border-border-subtle pt-7 text-[15px] text-secondary">
          {[r.setup, r.access(months), r.pricing(months), r.rateLock].map(
            (row) => (
              <li key={row} className="flex gap-3">
                <Icon
                  name="check"
                  className="mt-0.5 size-5 shrink-0 text-accent"
                />
                {row}
              </li>
            ),
          )}
        </ul>

        <Button
          href={whatsappLink("commitment", whatsapp.commitPrefill(fee, months))}
          onClick={onCta}
          variant="primary"
          size="lg"
          className="num mt-8 w-full"
        >
          {hasWhatsapp && <Icon name="whatsapp" />}
          {copy.outcome.cta(fee)}
        </Button>

        <p className="mt-4 flex items-start gap-2.5 text-sm text-secondary">
          <Icon name="shield" className="mt-px size-5 shrink-0 text-accent" />
          <span>
            {copy.outcome.refund}{" "}
            <Link
              href={copy.outcome.termsLink.href}
              className="font-semibold text-accent underline underline-offset-4"
            >
              {copy.outcome.termsLink.label}
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
