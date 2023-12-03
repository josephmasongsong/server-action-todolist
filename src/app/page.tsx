import prisma from '../lib/prisma';
import Todo from './Todo';
import Form from './Form';
import { Card } from '@/components/ui/card';

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  return (
    <Card className="max-w-lg mx-auto mt-12 pt-4">
      <Form />

      <div className="grid grid-cols-1 divide-y">
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </Card>
  );
}
