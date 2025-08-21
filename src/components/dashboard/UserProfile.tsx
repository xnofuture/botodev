import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const UserProfile: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src="/placeholder-user.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h2 className="text-xl font-bold">Иван Иванов</h2>
          <p className="text-gray-500">ivan@example.com</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="name">Имя</Label>
          <Input id="name" defaultValue="Иван" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="ivan@example.com" />
        </div>
        <div>
          <Label htmlFor="phone">Телефон</Label>
          <Input id="phone" defaultValue="+7 (999) 123-45-67" />
        </div>
        <div>
          <Label htmlFor="company">Компания</Label>
          <Input id="company" defaultValue="ООО Ромашка" />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button>Сохранить изменения</Button>
      </div>
    </div>
  );
};

export default UserProfile;