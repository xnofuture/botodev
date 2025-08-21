import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MoreVertical, Calendar, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const projects = [
  {
    id: 1,
    name: 'Автоматизация CRM',
    description: 'ИИ-ассистент для обработки клиентских запросов',
    status: 'В разработке',
    progress: 75,
    dueDate: '2024-02-15',
    team: 3,
    priority: 'high'
  },
  {
    id: 2,
    name: 'Чат-бот поддержки',
    description: 'Интеллектуальный помощник для службы поддержки',
    status: 'Тестирование',
    progress: 90,
    dueDate: '2024-01-30',
    team: 2,
    priority: 'medium'
  },
  {
    id: 3,
    name: 'Анализ документов',
    description: 'ИИ для автоматической обработки документов',
    status: 'Планирование',
    progress: 25,
    dueDate: '2024-03-10',
    team: 4,
    priority: 'low'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'В разработке':
      return 'bg-blue-100 text-blue-800';
    case 'Тестирование':
      return 'bg-yellow-100 text-yellow-800';
    case 'Планирование':
      return 'bg-gray-100 text-gray-800';
    case 'Завершен':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-orange-100 text-orange-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function ProjectList() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Активные проекты</CardTitle>
            <CardDescription>
              Управляйте вашими проектами ИИ-ассистентов
            </CardDescription>
          </div>
          <Button size="sm">
            Новый проект
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{project.name}</h3>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
                <Badge className={getPriorityColor(project.priority)}>
                  {project.priority === 'high' ? 'Высокий' : 
                   project.priority === 'medium' ? 'Средний' : 'Низкий'}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(project.dueDate).toLocaleDateString('ru-RU')}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {project.team} участника
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Прогресс</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Редактировать</DropdownMenuItem>
                <DropdownMenuItem>Просмотр</DropdownMenuItem>
                <DropdownMenuItem>Дублировать</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}