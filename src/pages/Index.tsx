import { useState } from "react";
import Icon from "@/components/ui/icon";

type Step = "amount" | "details" | "card" | "success";

const AMOUNTS = [500, 1000, 2500, 5000];

export default function Index() {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const finalAmount = amount !== "" ? amount : Number(customAmount);

  function formatCard(val: string) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2);
    return digits;
  }

  const canProceedAmount = finalAmount > 0;
  const canProceedDetails = name.trim().length > 1 && email.includes("@");
  const canProceedCard =
    card.replace(/\s/g, "").length === 16 &&
    expiry.replace(/[\s/]/g, "").length >= 4 &&
    cvv.length === 3;

  function handlePay() {
    setStep("success");
  }

  const stepIndex = (["amount", "details", "card"] as Step[]).indexOf(step);

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
          <div className="flex gap-1 mb-10">
            {(["amount", "details", "card"] as Step[]).map((s, i) => (
              <div
                key={s}
                className={`h-px flex-1 transition-all duration-500 ${
                  stepIndex >= i ? "bg-foreground" : "bg-border"
                }`}
              />
            ))}
          </div>
        )}

        {step === "amount" && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-5">
                Сумма, ₽
              </p>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => { setAmount(a); setCustomAmount(""); }}
                    className={`py-3 text-sm transition-all duration-200 border ${
                      amount === a
                        ? "border-foreground bg-foreground text-primary-foreground"
                        : "border-border text-foreground hover:border-foreground/40"
                    }`}
                  >
                    {a.toLocaleString("ru-RU")} ₽
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Другая сумма"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setAmount(""); }}
                className="field-line w-full py-2 text-sm placeholder:text-muted-foreground"
              />
            </div>

            <button
              disabled={!canProceedAmount}
              onClick={() => setStep("details")}
              className="w-full py-3.5 bg-foreground text-primary-foreground text-sm tracking-wide transition-opacity duration-200 disabled:opacity-30"
            >
              Далее
            </button>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-5">
                Ваши данные
              </p>
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Имя</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Петров"
                    className="field-line w-full py-2 text-sm placeholder:text-muted-foreground/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ivan@example.com"
                    className="field-line w-full py-2 text-sm placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("amount")}
                className="py-3.5 px-5 border border-border text-muted-foreground hover:border-foreground/40 transition-colors duration-200 flex items-center justify-center"
              >
                <Icon name="ArrowLeft" size={14} />
              </button>
              <button
                disabled={!canProceedDetails}
                onClick={() => setStep("card")}
                className="flex-1 py-3.5 bg-foreground text-primary-foreground text-sm tracking-wide transition-opacity duration-200 disabled:opacity-30"
              >
                Далее
              </button>
            </div>
          </div>
        )}

        {step === "card" && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-5">
                Карта
              </p>
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Номер карты</label>
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
                    <label className="text-xs text-muted-foreground block mb-1">Срок</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="ММ / ГГ"
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
                onClick={handlePay}
                className="flex-1 py-3.5 bg-foreground text-primary-foreground text-sm tracking-wide transition-opacity duration-200 disabled:opacity-30"
              >
                Оплатить {finalAmount > 0 ? finalAmount.toLocaleString("ru-RU") + " ₽" : ""}
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5">
              <Icon name="Lock" size={10} />
              Защищённое соединение
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="w-12 h-12 border border-foreground rounded-full flex items-center justify-center mx-auto">
              <Icon name="Check" size={18} />
            </div>
            <div className="space-y-1">
              <p className="font-display text-4xl font-light italic">Готово</p>
              <p className="text-sm text-muted-foreground">
                Платёж на {finalAmount.toLocaleString("ru-RU")} ₽ принят
              </p>
              {email && (
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Квитанция отправлена на {email}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setStep("amount");
                setAmount("");
                setCustomAmount("");
                setName("");
                setEmail("");
                setCard("");
                setExpiry("");
                setCvv("");
              }}
              className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors duration-200"
            >
              Новый платёж
            </button>
          </div>
        )}

      </div>
    </div>
  );
}