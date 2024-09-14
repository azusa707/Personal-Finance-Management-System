// app/dashboard/page.tsx
import React from 'react'; 
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant="ghost">This is authenticated</Button>
    </div>
  );
};

export default(Dashboard);