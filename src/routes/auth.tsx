import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Loader2, ArrowLeft, ShieldCheck, Ruler, Sparkles } from "lucide-react";
import logoAgil from "@/assets/agil-logo.png";
import authScene from "@/assets/hero-2026-bedroom.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Acesso · Ágil Persianas" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/admin" });
  }, [user, loading, navigate]);

  async function handle(e: React.FormEvent, mode: "in" | "up") {
    e.preventDefault();
    setSubmitting(true);
    const fn = mode === "in" ? signIn : signUp;
    const { error } = await fn(email, password);
    setSubmitting(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success(mode === "in" ? "Bem-vindo!" : "Conta criada. Confirme seu e-mail se necessário.");
    }
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2 bg-background">
      {/* Painel de marca — visível a partir de lg, imagem real de ambiente + prova social */}
      <div className="relative hidden lg:block overflow-hidden" style={{ background: "#1E1C18" }}>
        <img
          src={authScene}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C18] via-[#1E1C18]/70 to-[#1E1C18]/20" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(245,124,0,0.35), transparent)" }}
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Link to="/" className="inline-flex w-fit items-center gap-2 text-sm text-white/70 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Voltar à loja
          </Link>
          <div className="max-w-md">
            <div className="rounded-xl bg-white/95 px-4 py-3 inline-block shadow-elevated">
              <img src={logoAgil} alt="Ágil Persianas" className="h-9 w-auto" />
            </div>
            <h1 className="mt-6 text-display text-4xl leading-[1.1] text-balance">
              Gestão completa do seu ambiente de venda.
            </h1>
            <p className="mt-4 text-white/75 text-[15px] leading-relaxed">
              Pedidos, produção, leads e financeiro — tudo em um painel só, sob medida para a Ágil.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-primary-glow shrink-0" /> Acesso protegido por conta individual
              </li>
              <li className="flex items-center gap-2.5">
                <Ruler className="h-4 w-4 text-primary-glow shrink-0" /> Controle de pedidos sob medida ponta a ponta
              </li>
              <li className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-primary-glow shrink-0" /> Insights automáticos da Lumi e da ORION
              </li>
            </ul>
          </div>
          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} Ágil Persianas — Painel administrativo
          </div>
        </div>
      </div>

      {/* Painel de formulário */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground lg:hidden">
            <ArrowLeft className="h-4 w-4" /> Voltar à loja
          </Link>
          <div className="mb-8">
            <h2 className="font-display text-2xl">Acessar o painel</h2>
            <p className="text-sm text-muted-foreground mt-1.5">Entre com sua conta de administrador da Ágil Persianas.</p>
          </div>
          <Tabs defaultValue="in">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="in">Entrar</TabsTrigger>
              <TabsTrigger value="up">Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value="in">
              <form onSubmit={(e) => handle(e, "in")} className="space-y-4 mt-6">
                <div className="space-y-1.5">
                  <Label htmlFor="email-in">Email</Label>
                  <Input id="email-in" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pass-in">Senha</Label>
                  <Input id="pass-in" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />} Entrar
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="up">
              <form onSubmit={(e) => handle(e, "up")} className="space-y-4 mt-6">
                <div className="space-y-1.5">
                  <Label htmlFor="email-up">Email</Label>
                  <Input id="email-up" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pass-up">Senha (mín. 8 caracteres)</Label>
                  <Input id="pass-up" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />} Criar conta
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Após criar a conta, peça ao administrador master para liberar permissões.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
