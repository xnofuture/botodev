import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, MessageSquare } from "lucide-react";
import { consultationSchema, ConsultationFormData } from "@/lib/validations";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

interface ConsultationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationDialog = ({ isOpen, onClose }: ConsultationDialogProps) => {
  const [isSending, setIsSending] = useState(false);
  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: ""
    }
  });

  const handleSubmit = async (data: ConsultationFormData) => {
    setIsSending(true);
    try {
      // Формируем текст сообщения для Telegram
      let message = `Новая заявка на консультацию:\n`;
      message += `Имя: ${data.name}\n`;
      message += `Телефон: ${data.phone}\n`;
      if (data.email) message += `Email: ${data.email}\n`;
      if (data.company) message += `Компания: ${data.company}\n`;
      if (data.service) message += `Услуга: ${data.service}\n`;
      message += `Сообщение: ${data.message}`;

      // Отправляем в Telegram (замените ТОКЕНБОТ и АЙДИЧАТ на реальные значения)
      const token = "ТОКЕНБОТ";
      const chatId = "АЙДИЧАТ";
      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Ошибка при отправке заявки');
      }
      
      toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      onClose();
    } catch (error) {
      console.error('Ошибка отправки:', error);
      toast.error('Ошибка при отправке заявки. Пожалуйста, попробуйте ещё раз.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glass max-h-[90vh] overflow-y-auto mobile:max-h-[80vh] mobile:mx-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            Получить консультацию
          </DialogTitle>
          <p className="text-muted-foreground">
            Расскажите о своих потребностях, и мы предложим лучшее решение
          </p>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Имя *</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="Ваше имя"
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Телефон *</FormLabel>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="+7 (999) 123-45-67"
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Интересующая услуга</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="chatbot">Чат-бот для поддержки</SelectItem>
                      <SelectItem value="automation">Автоматизация процессов</SelectItem>
                      <SelectItem value="analytics">AI-аналитика</SelectItem>
                      <SelectItem value="integration">Интеграция с CRM</SelectItem>
                      <SelectItem value="voice">Голосовой помощник</SelectItem>
                      <SelectItem value="custom">Кастомное решение</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Опишите ваш проект *</FormLabel>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Textarea
                        placeholder="Расскажите подробнее о ваших задачах и целях..."
                        className="pl-10 min-h-[100px] dialog-element"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 dialog-element"
                disabled={isSending}
              >
                {isSending ? "Отправка..." : "Отправить заявку"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-6 dialog-element"
              >
                Отмена
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              * Обязательные поля. Мы свяжемся с вами в течение 24 часов.
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationDialog;