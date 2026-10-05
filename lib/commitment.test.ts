import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  BASE_MONTHS,
  MAX,
  MAX_MONTHS,
  MIN,
  STEP,
  clampFee,
  isValidFee,
  monthsFor,
  pctFor,
  toKobo,
} from "./commitment.ts";

describe("monthsFor", () => {
  it("gives the base months at the minimum", () => {
    assert.equal(monthsFor(MIN), BASE_MONTHS);
  });

  it("adds 2 months per ₦5,000 step", () => {
    assert.equal(monthsFor(20000), 8);
    assert.equal(monthsFor(25000), 10);
    assert.equal(monthsFor(30000), 12);
  });

  it("caps at the maximum months", () => {
    assert.equal(monthsFor(45000), 18);
    assert.equal(monthsFor(MAX), MAX_MONTHS);
  });

  it("does not round partial steps up", () => {
    assert.equal(monthsFor(19999), BASE_MONTHS);
  });
});

describe("clampFee", () => {
  it("clamps below the minimum and above the maximum", () => {
    assert.equal(clampFee(0), MIN);
    assert.equal(clampFee(-5), MIN);
    assert.equal(clampFee(1_000_000), MAX);
  });

  it("rounds to the nearest step", () => {
    assert.equal(clampFee(22400), 20000);
    assert.equal(clampFee(22500), 25000);
    assert.equal(clampFee(31000), 30000);
  });

  it("leaves valid fees alone", () => {
    for (let f = MIN; f <= MAX; f += STEP) assert.equal(clampFee(f), f);
  });
});

describe("helpers", () => {
  it("isValidFee accepts only in-range step values", () => {
    assert.equal(isValidFee(30000), true);
    assert.equal(isValidFee(31000), false);
    assert.equal(isValidFee(10000), false);
    assert.equal(isValidFee(65000), false);
  });

  it("pctFor maps the range to 0–100", () => {
    assert.equal(pctFor(MIN), 0);
    assert.equal(pctFor(MAX), 100);
    assert.equal(pctFor(37500), (25000 / 45000) * 100); // clamps to 40,000 first
  });

  it("toKobo multiplies by 100", () => {
    assert.equal(toKobo(15000), 1_500_000);
  });
});
