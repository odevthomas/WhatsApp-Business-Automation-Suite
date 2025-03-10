import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { t } from "@/lib/i18n";

interface LoginPageProps {
  onLogin: (email: string, password: string, remember: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular um atraso de login
    setTimeout(() => {
      onLogin(email, password, remember);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col items-center justify-center p-8">
          <div className="mb-8">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
              alt="WhatsApp Logo"
              className="h-24 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-4 text-center">
            WhatsApp Business Automation
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Gerencie suas conversas, automatize respostas e aumente suas vendas
            com nossa plataforma de automação para WhatsApp Business.
          </p>
          <div className="grid grid-cols-3 gap-4 w-full max-w-md">
            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-full shadow-md mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                  alt="Stripe"
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-xs text-gray-500 text-center">Pagamentos</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-full shadow-md mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                  alt="Google"
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-xs text-gray-500 text-center">Calendário</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-full shadow-md mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png"
                  alt="Salesforce"
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-xs text-gray-500 text-center">CRM</p>
            </div>
          </div>
        </div>

        <Card className="w-full max-w-md mx-auto shadow-xl border-green-100">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4 md:hidden">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
                alt="WhatsApp Logo"
                className="h-16 w-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Lembrar de mim
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Ou continue com
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                  alt="Google"
                  className="h-4 w-4"
                />
                Google
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/800px-2021_Facebook_icon.svg.png"
                  alt="Facebook"
                  className="h-4 w-4"
                />
                Facebook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <a
                href="#"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Registre-se
              </a>
            </div>
            <div className="text-center text-xs text-gray-500">
              Ao entrar, você concorda com nossos{" "}
              <a href="#" className="underline hover:text-gray-800">
                Termos de Serviço
              </a>{" "}
              e{" "}
              <a href="#" className="underline hover:text-gray-800">
                Política de Privacidade
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
