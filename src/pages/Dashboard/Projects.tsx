import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Projects = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Проекты</h1>
            <p className="text-muted-foreground">
              Управление вашими проектами
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Новый проект
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Список проектов</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Здесь будет список ваших проектов</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Projects;