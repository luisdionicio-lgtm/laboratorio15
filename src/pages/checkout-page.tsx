import { CheckCircle, CreditCard, Lock, Minus, Plus, ShieldCheck, Ticket } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMovieDetails } from "@/hooks/use-movies";
import { usePurchasesStore } from "@/store/purchases-store";

const TICKET_TYPES = [
  { key: "child",  label: "Niño",        desc: "Hasta 11 años",   price: 2.50 },
  { key: "adult",  label: "Adulto",       desc: "12 a 59 años",    price: 4.99 },
  { key: "senior", label: "Adulto Mayor", desc: "60 años a más",   price: 3.50 },
] as const;

type TicketKey = (typeof TICKET_TYPES)[number]["key"];

function formatCardNumber(value: string) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

function getCardBrand(number: string): "visa" | "mastercard" | null {
  const n = number.replace(/\s/g, "");
  if (n.startsWith("4")) return "visa";
  if (n.startsWith("5") || n.startsWith("2")) return "mastercard";
  return null;
}

function QuantityControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value === 0}
        className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted transition-colors hover:bg-muted/70 disabled:opacity-30"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-5 text-center text-base font-bold tabular-nums">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(10, value + 1))}
        disabled={value === 10}
        className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted transition-colors hover:bg-muted/70 disabled:opacity-30"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function CheckoutPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { data: movie, isLoading, isError } = useMovieDetails(movieId);
  const { purchaseMovie, isMoviePurchased } = usePurchasesStore();

  const [quantities, setQuantities] = useState<Record<TicketKey, number>>({
    child: 0,
    adult: 1,
    senior: 0,
  });

  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusCvv, setFocusCvv] = useState(false);

  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);
  const total = TICKET_TYPES.reduce(
    (sum, t) => sum + t.price * quantities[t.key],
    0
  ).toFixed(2);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="py-12 space-y-6">
          <Skeleton className="h-6 w-36" />
          <div className="grid lg:grid-cols-[1fr_460px] gap-8">
            <Skeleton className="h-80 rounded-2xl" />
            <Skeleton className="h-96 rounded-2xl" />
          </div>
        </div>
      </PageContainer>
    );
  }

  if (isError || !movie) {
    return (
      <PageContainer>
        <div className="py-10">
          <p className="text-sm text-destructive">No se pudo cargar la película.</p>
          <Link to="/movies" className="mt-4 inline-flex text-sm font-medium text-blue-600 hover:underline">
            ← Volver a películas
          </Link>
        </div>
      </PageContainer>
    );
  }

  const alreadyPurchased = isMoviePurchased(movie.id);
  const cardBrand = getCardBrand(cardNumber);

  const validate = () => {
    const e: Record<string, string> = {};
    if (totalTickets === 0) e.tickets = "Selecciona al menos una entrada.";
    if (!cardHolder.trim()) e.cardHolder = "El nombre es requerido.";
    if (cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "Ingresa 16 dígitos.";
    const [mm, yy] = expiry.split("/");
    if (!mm || !yy || Number(mm) < 1 || Number(mm) > 12 || yy.length !== 2)
      e.expiry = "Formato inválido (MM/YY).";
    if (cvv.length < 3) e.cvv = "CVV inválido.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setProcessing(true);
    setTimeout(() => {
      purchaseMovie(movie);
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => navigate("/my-movies"), 1600);
    }, 2000);
  };

  return (
    <PageContainer>
      <div className="py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

        <Link
          to={`/movies/${movie.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← Volver al detalle
        </Link>

        {/* Success overlay */}
        {success && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="flex flex-col items-center gap-4 animate-in zoom-in-75 duration-500">
              <CheckCircle className="h-20 w-20 text-green-500" strokeWidth={1.5} />
              <p className="text-2xl font-bold text-white">¡Compra exitosa!</p>
              <p className="text-white/60 text-sm">Redirigiendo a tus películas...</p>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_460px] items-start">

          {/* Left */}
          <div className="space-y-5">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
              <p className="text-muted-foreground text-sm mt-1">Completa tu compra de forma segura</p>
            </div>

            {/* Movie card */}
            <div className="flex gap-5 rounded-2xl border bg-card p-5 shadow-sm">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="h-28 w-20 rounded-xl object-cover shadow-md ring-1 ring-border flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-bold text-foreground text-lg leading-tight">{movie.title}</p>
                <p className="text-muted-foreground text-sm mt-0.5">{movie.releaseDate?.slice(0, 4)}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  ⭐ {movie.rating.toFixed(1)} / 10
                </Badge>
              </div>
            </div>

            {/* Ticket selector */}
            <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 border-b px-5 py-3">
                <Ticket className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-semibold">Selecciona tus entradas</p>
              </div>

              <div className="divide-y">
                {TICKET_TYPES.map((t) => (
                  <div
                    key={t.key}
                    className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-muted/30"
                  >
                    <div>
                      <p className="font-semibold text-sm">{t.label}</p>
                      <p className="text-xs text-muted-foreground">{t.desc}</p>
                      <p className="text-blue-600 font-bold text-sm mt-0.5">${t.price.toFixed(2)}</p>
                    </div>
                    <QuantityControl
                      value={quantities[t.key]}
                      onChange={(n) => setQuantities((prev) => ({ ...prev, [t.key]: n }))}
                    />
                  </div>
                ))}
              </div>

              {errors.tickets && (
                <p className="px-5 pb-3 text-xs text-destructive">{errors.tickets}</p>
              )}
            </div>

            {/* Security badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Lock className="h-4 w-4" />, label: "SSL Seguro" },
                { icon: <ShieldCheck className="h-4 w-4" />, label: "Pago Protegido" },
                { icon: <CreditCard className="h-4 w-4" />, label: "Datos Cifrados" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-1.5 rounded-xl border bg-muted/40 p-3 text-center"
                >
                  <span className="text-blue-600">{b.icon}</span>
                  <span className="text-[11px] text-muted-foreground">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resumen del pedido</p>

              {TICKET_TYPES.filter((t) => quantities[t.key] > 0).map((t) => (
                <div key={t.key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t.label} × {quantities[t.key]}
                  </span>
                  <span className="font-medium text-foreground">
                    ${(t.price * quantities[t.key]).toFixed(2)}
                  </span>
                </div>
              ))}

              {totalTickets === 0 && (
                <p className="text-sm text-muted-foreground italic">Sin entradas seleccionadas</p>
              )}

              <div className="h-px bg-border" />
              <div className="flex justify-between font-bold text-foreground text-base">
                <span>Total ({totalTickets} entrada{totalTickets !== 1 ? "s" : ""})</span>
                <span className="text-blue-600 text-lg">${total}</span>
              </div>
            </div>
          </div>

          {/* Right — Payment form */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">

            {alreadyPurchased ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <CheckCircle className="h-14 w-14 text-green-500" strokeWidth={1.5} />
                <p className="font-bold text-foreground text-xl">Ya tienes esta película</p>
                <p className="text-muted-foreground text-sm">Puedes verla en tu biblioteca.</p>
                <Button asChild className="mt-2 w-full">
                  <Link to="/my-movies">Ir a Mis Películas</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <p className="text-lg font-bold text-foreground">Datos de pago</p>
                  <p className="text-muted-foreground text-xs mt-0.5">Tu información está cifrada y segura</p>
                </div>

                {/* Card visual */}
                <div className="relative h-44" style={{ perspective: "1000px" }}>
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: focusCvv ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 55%, #06b6d4 100%)",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-7 rounded bg-yellow-300/80" />
                        {cardBrand === "visa" && (
                          <span className="text-white font-black italic text-xl tracking-tight">VISA</span>
                        )}
                        {cardBrand === "mastercard" && (
                          <div className="flex">
                            <div className="w-7 h-7 rounded-full bg-red-500/90" />
                            <div className="w-7 h-7 rounded-full bg-yellow-400/90 -ml-3" />
                          </div>
                        )}
                        {!cardBrand && <CreditCard className="h-6 w-6 text-white/50" />}
                      </div>
                      <div>
                        <p className="text-white font-mono text-lg tracking-widest drop-shadow">
                          {cardNumber || "•••• •••• •••• ••••"}
                        </p>
                        <div className="flex justify-between mt-3">
                          <div>
                            <p className="text-white/60 text-[10px] uppercase">Titular</p>
                            <p className="text-white text-sm font-semibold truncate max-w-36">
                              {cardHolder || "NOMBRE APELLIDO"}
                            </p>
                          </div>
                          <div>
                            <p className="text-white/60 text-[10px] uppercase">Vence</p>
                            <p className="text-white text-sm font-semibold">{expiry || "MM/YY"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 rounded-2xl flex flex-col justify-center shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%)",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="h-10 bg-black/50 w-full mb-5" />
                      <div className="px-5 flex items-center gap-3">
                        <div className="flex-1 h-8 bg-white/20 rounded" />
                        <div className="bg-white rounded px-3 py-1.5 font-mono text-gray-800 font-bold text-sm min-w-14 text-center">
                          {cvv || "CVV"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fields */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Nombre en la tarjeta
                  </label>
                  <Input
                    placeholder="Juan Pérez"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-blue-500/20"
                  />
                  {errors.cardHolder && <p className="text-xs text-destructive">{errors.cardHolder}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Número de tarjeta
                  </label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    className="font-mono transition-all focus:ring-2 focus:ring-blue-500/20"
                  />
                  {errors.cardNumber && <p className="text-xs text-destructive">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Vencimiento
                    </label>
                    <Input
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                      className="font-mono transition-all focus:ring-2 focus:ring-blue-500/20"
                    />
                    {errors.expiry && <p className="text-xs text-destructive">{errors.expiry}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      CVV
                    </label>
                    <Input
                      placeholder="•••"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      onFocus={() => setFocusCvv(true)}
                      onBlur={() => setFocusCvv(false)}
                      maxLength={4}
                      type="password"
                      className="font-mono transition-all focus:ring-2 focus:ring-blue-500/20"
                    />
                    {errors.cvv && <p className="text-xs text-destructive">{errors.cvv}</p>}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={processing || totalTickets === 0}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
                >
                  {processing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      {totalTickets === 0
                        ? "Selecciona entradas"
                        : `Pagar $${total} · ${totalTickets} entrada${totalTickets !== 1 ? "s" : ""}`}
                    </span>
                  )}
                </Button>

                <p className="text-center text-[11px] text-muted-foreground">
                  Al continuar aceptas nuestros términos. Pago 100% seguro con cifrado SSL.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
