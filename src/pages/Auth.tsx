import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, registerSchema, LoginFormData, RegisterFormData } from "@/lib/validations";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { login, register, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Login form with enhanced validation
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Register form with enhanced validation
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      await login({
        email: data.email,
        password: data.password
      });
      navigate('/dashboard');
    } catch (error) {
      // Отображаем ошибку в форме
      loginForm.setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Ошибка входа'
      });
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password
      });
      navigate('/dashboard');
    } catch (error) {
      // Отображаем ошибку в форме
      registerForm.setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Ошибка регистрации'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background/90 to-primary/5 relative">
      {/* Full-page loader during authentication */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 z-50 flex items-center justify-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
        </div>
      )}

      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-60 h-60 rounded-full bg-primary/5 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-accent/5 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Вернуться на главную
          </Link>
        </div>

        <Card className="glass-card">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gradient">
              Добро пожаловать в AIGain
            </CardTitle>
            <CardDescription>
              Войдите в аккаунт или создайте новый для начала работы
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => !isLoading && setActiveTab(value)} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" disabled={isLoading}>Вход</TabsTrigger>
                <TabsTrigger value="register" disabled={isLoading}>Регистрация</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...loginForm.register('email')}
                        id="login-email"
                        type="email"
                        placeholder="demo@aigain.ru"
                        className="pl-10"
                        disabled={isLoading || loginForm.formState.isSubmitting}
                      />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Пароль</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...loginForm.register('password')}
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="demo123"
                        className="pl-10 pr-10"
                        disabled={isLoading || loginForm.formState.isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        disabled={isLoading || loginForm.formState.isSubmitting}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 glow-primary" disabled={isLoading}>
                    Войти
                  </Button>
                  
                  {loginForm.formState.errors.root && (
                    <p className="text-sm text-destructive text-center">
                      {loginForm.formState.errors.root.message}
                    </p>
                  )}
                </form>
                
                <p className="text-center text-sm text-muted-foreground">
                  Демо аккаунт: demo@aigain.ru / demo123
                </p>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4 mt-6">
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Имя</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...registerForm.register('name')}
                        id="register-name"
                        type="text"
                        placeholder="Ваше имя"
                        className="pl-10"
                        disabled={isLoading || registerForm.formState.isSubmitting}
                      />
                    </div>
                    {registerForm.formState.errors.name && (
                      <p className="text-sm text-destructive">{registerForm.formState.errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...registerForm.register('email')}
                        id="register-email"
                        type="email"
                        placeholder="example@email.com"
                        className="pl-10"
                        disabled={isLoading || registerForm.formState.isSubmitting}
                      />
                    </div>
                    {registerForm.formState.errors.email && (
                      <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Пароль</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...registerForm.register('password')}
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        disabled={isLoading || registerForm.formState.isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        disabled={isLoading || registerForm.formState.isSubmitting}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {registerForm.formState.errors.password && (
                      <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 glow-primary" disabled={isLoading}>
                    Зарегистрироваться
                  </Button>
                  
                  {registerForm.formState.errors.root && (
                    <p className="text-sm text-destructive text-center">
                      {registerForm.formState.errors.root.message}
                    </p>
                  )}
                </form>
                
                <p className="text-center text-sm text-muted-foreground">
                  Регистрируясь, вы соглашаетесь с{" "}
                  <a href="#" className="text-primary hover:underline">
                    условиями использования
                  </a>
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;