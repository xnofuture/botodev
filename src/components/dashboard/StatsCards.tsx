import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Bot, Clock } from 'lucide-react';

const stats = [
  {
    title: 'Активные проекты',
    value: '12',
    description: '+20.1% от прошлого месяца',
    icon: TrendingUp,
    trend: 'up'
  },
  {
    title: 'ИИ-ассистенты',
    value: '8',
    description: '+180.1% от прошлого месяца',
    icon: Bot,
    trend: 'up'
  },
  {
    title: 'Время экономии',
    value: '573',
    description: 'часов в месяц',
    icon: Clock,
    trend: 'neutral'
  },
  {
    title: 'Пользователи',
    value: '+2,350',
    description: '+19% от прошлого месяца',
    icon: Users,
    trend: 'up'
  }
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${
              stat.trend === 'up' 
                ? 'text-green-600' 
                : stat.trend === 'down' 
                ? 'text-red-600' 
                : 'text-muted-foreground'
            }`}>
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}