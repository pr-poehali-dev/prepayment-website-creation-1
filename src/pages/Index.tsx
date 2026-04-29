import { useState } from "react";
import Icon from "@/components/ui/icon";

type Step = "details" | "card" | "success";

const FIXED_AMOUNT = 5000;

export default function Index() {
  const [step, setStep] = useState<Step>("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  function formatCard(val: string) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2);
    return digits;
  }

  const canProceedDetails = name.trim().length > 1 && email.includes("@");
  const canProceedCard =
    card.replace(/\s/g, "").length === 16 &&
    expiry.replace(/[\s/]/g, "").length >= 4 &&
    cvv.length === 3;

  const stepIndex = (["details", "card"] as Step[]).indexOf(step);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {step !== "success" && (
          <div className="mb-12">
            <p className="font-display text-5xl font-light italic text-foreground/20 leading-none select-none">
              Prepayment 1xBet
            </p>
          </div>
        )}

        {step !== "success" && (
          <>
            <div className="flex gap-1 mb-10">
              {(["details", "card"] as Step[]).map((s, i) => (
                <div
                  key={s}
                  className={`h-px flex-1 transition-all duration-500 ${
                    stepIndex >= i ? "bg-foreground" : "bg-border"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-baseline justify-between mb-8">
              <span className="text-xs tracking-widest uppercase text-muted-foreground">Amount</span>
              <span className="text-2xl font-light tabular-nums">$5,000</span>
            </div>
          </>
        )}

        {step === "details" && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-5">
                Your details
              </p>
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Full name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    className="field-line w-full py-2 text-sm placeholder:text-muted-foreground/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="field-line w-full py-2 text-sm placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
            </div>

            <button
              disabled={!canProceedDetails}
              onClick={() => setStep("card")}
              className="w-full py-3.5 bg-foreground text-primary-foreground text-sm tracking-wide transition-opacity duration-200 disabled:opacity-30"
            >
              Continue
            </button>
          </div>
        )}

        {step === "card" && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-5">
                Card details
              </p>
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Card number</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={card}
                    onChange={(e) => setCard(formatCard(e.target.value))}
                    placeholder="0000 0000 0000 0000"
                    className="field-line w-full py-2 text-sm placeholder:text-muted-foreground/50 font-mono"
                  />
                </div>
                <div className="flex gap-6">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground block mb-1">Expiry</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM / YY"
                      className="field-line w-full py-2 text-sm placeholder:text-muted-foreground/50 font-mono"
                    />
                  </div>
                  <div className="w-20">
                    <label className="text-xs text-muted-foreground block mb-1">CVV</label>
                    <input
                      type="password"
                      inputMode="numeric"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      placeholder="•••"
                      className="field-line w-full py-2 text-sm placeholder:text-muted-foreground/50 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("details")}
                className="py-3.5 px-5 border border-border text-muted-foreground hover:border-foreground/40 transition-colors duration-200 flex items-center justify-center"
              >
                <Icon name="ArrowLeft" size={14} />
              </button>
              <button
                disabled={!canProceedCard}
                onClick={() => setStep("success")}
                className="flex-1 py-3.5 bg-foreground text-primary-foreground text-sm tracking-wide transition-opacity duration-200 disabled:opacity-30"
              >
                Pay $5,000
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5">
              <Icon name="Lock" size={10} />
              Secure connection
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="w-12 h-12 border border-foreground rounded-full flex items-center justify-center mx-auto">
              <Icon name="Check" size={18} />
            </div>
            <div className="space-y-1">
              <p className="font-display text-4xl font-light italic">Done</p>
              <p className="text-sm text-muted-foreground">
                Payment of ${FIXED_AMOUNT.toLocaleString("en-US")} accepted
              </p>
              {email && (
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Receipt sent to {email}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setStep("details");
                setName("");
                setEmail("");
                setCard("");
                setExpiry("");
                setCvv("");
              }}
              className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors duration-200"
            >
              New payment
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
