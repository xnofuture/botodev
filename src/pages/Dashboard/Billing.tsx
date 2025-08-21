import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Billing = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Биллинг</h1>
          <p className="text-muted-foreground">
            Управление подпиской и платежами
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Текущий план</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Профессиональный</h3>
                <p className="text-muted-foreground">$29/месяц</p>
              </div>
              <Button variant="outline">Изменить план</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>История платежей</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Здесь будет история ваших платежей</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Billing;