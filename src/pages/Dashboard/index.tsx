import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ProjectList } from '@/components/dashboard/ProjectList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Дашборд</h1>
          <p className="text-muted-foreground">
            Добро пожаловать в панель управления AIGain
          </p>
        </div>
        
        <Separator />
        
        <StatsCards />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProjectList />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Последние активности</CardTitle>
              <CardDescription>
                Ваши недавние действия в системе
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="text-sm">
                  <p className="font-medium">Проект "Автоматизация CRM"</p>
                  <p className="text-muted-foreground">Обновлен 2 часа назад</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-sm">
                  <p className="font-medium">ИИ-ассистент запущен</p>
                  <p className="text-muted-foreground">Вчера в 14:30</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="text-sm">
                  <p className="font-medium">Консультация завершена</p>
                  <p className="text-muted-foreground">3 дня назад</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;