'use client';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addTodo } from '../lib/actions';

export default function Form() {
  const ref = useRef();
  return (
    <form
      action={async formData => {
        await addTodo(formData);
        ref.current?.reset();
      }}
      className="px-4 pb-4 border-b"
      ref={ref}
    >
      <div className="flex w-full items-center space-x-2">
        <Input name="title" type="text" placeholder="Enter a todo..." />
        <Button type="submit">Add Todo</Button>
      </div>
    </form>
  );
}
