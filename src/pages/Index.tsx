import { useState } from "react";
import Icon from "@/components/ui/icon";

type Step = "details" | "payment";

export default function Index() {
  const [step, setStep] = useState<Step>("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const canProceedDetails = name.trim().length > 1 && email.includes("@");

  const stepIndex = (["details", "payment"] as Step[]).indexOf(step);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="mb-12">
          <p className="font-sans text-4xl font-semibold not-italic text-blue-600 leading-none select-none tracking-tight">
            Prepayment 1xBet
          </p>
        </div>

        <div className="flex gap-1 mb-10">
          {(["details", "payment"] as Step[]).map((s, i) => (
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
              onClick={() => setStep("payment")}
              className="w-full py-3.5 bg-foreground text-primary-foreground text-sm tracking-wide transition-opacity duration-200 disabled:opacity-30"
            >
              Continue
            </button>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-5">
                Payment
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                Make your prepayment here through{" "}
                <a
                  href="https://s.binance.com/6xiFAOVG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-muted-foreground transition-colors duration-200"
                >
                  USDT TRC20
                </a>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("details")}
                className="py-3.5 px-5 border border-border text-muted-foreground hover:border-foreground/40 transition-colors duration-200 flex items-center justify-center"
              >
                <Icon name="ArrowLeft" size={14} />
              </button>
              <a
                href="https://s.binance.com/6xiFAOVG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 bg-foreground text-primary-foreground text-sm tracking-wide text-center transition-opacity duration-200"
              >
                Pay $5,000
              </a>
            </div>

            <p className="text-center text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5">
              <Icon name="Lock" size={10} />
              Secure connection
            </p>
          </div>
        )}

      </div>
    </div>
  );
}