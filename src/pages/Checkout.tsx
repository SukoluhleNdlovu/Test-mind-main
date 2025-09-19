import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const luhnCheck = (value: string): boolean => {
  const sanitized = value.replace(/\s+/g, "");
  if (!/^\d{13,19}$/.test(sanitized)) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const Checkout = () => {
  const query = useQuery();
  const plan = query.get("plan") ?? "Starter";
  const { toast } = useToast();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [zip, setZip] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<null | { status: "success" | "declined"; id: string }>(null);

  const isValid = () => {
    const [mm, yy] = expiry.split("/");
    const month = Number(mm);
    const year = Number(yy);
    const validExpiry = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) && month >= 1 && month <= 12 && year >= 0;
    return (
      cardName.trim().length > 2 &&
      luhnCheck(cardNumber) &&
      validExpiry &&
      /^\d{3,4}$/.test(cvc) &&
      /\d{3,10}/.test(zip)
    );
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) {
      toast({ title: "Invalid details", description: "Please check your card details and try again." });
      return;
    }
    setIsProcessing(true);
    setResult(null);
    setTimeout(() => {
      const sanitized = cardNumber.replace(/\s+/g, "");
      const lastDigit = Number(sanitized[sanitized.length - 1]);
      const approved = lastDigit % 2 === 0; // mock gateway decision
      const paymentId = Math.random().toString(36).slice(2, 10).toUpperCase();
      setIsProcessing(false);
      setResult({ status: approved ? "success" : "declined", id: paymentId });
      toast({
        title: approved ? "Payment authorized" : "Payment declined",
        description: approved ? `Transaction ID ${paymentId}` : "Please use a different card or try again.",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-cover bg-center" style={{ backgroundImage: 'url(/src/assets/hero-bg.jpg)' }}>
      <Card className="w-full max-w-xl bg-background/85 backdrop-blur">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Complete your {plan} plan subscription.</CardDescription>
        </CardHeader>
        <CardContent>
          {result && (
            <div className={`mb-4 rounded-md border p-3 text-sm ${result.status === "success" ? "border-green-500 text-green-700 bg-green-50" : "border-red-500 text-red-700 bg-red-50"}`}>
              {result.status === "success" ? `Payment successful. ID ${result.id}` : "Payment was declined. Try another card."}
            </div>
          )}
          <form className="space-y-4" onSubmit={handlePay}>
            <div className="grid gap-2">
              <Label htmlFor="name">Cardholder name</Label>
              <Input id="name" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Full name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="number">Card number</Label>
              <Input id="number" inputMode="numeric" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" required />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" inputMode="numeric" value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zip">ZIP</Label>
                <Input id="zip" inputMode="numeric" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="10001" required />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? "Authorizing..." : "Authorize payment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;


