'use client';
import { useState, useTransition, useOptimistic } from 'react';
import { deleteTodo, toggleComplete, updateTodo } from '../lib/actions';
// import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export type Todo = {
  id: number;
  title: string;
  complete: boolean;
};

export default function Todo({ todo }: { todo: Todo }) {
  const [editable, setEditable] = useState<true | false>(false);
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState<true | false>(todo.complete);
  const [title, setTitle] = useState<string>(todo.title);

  const [optimisticTodo, addOptimisticTodo] = useOptimistic(
    { title: todo.title, complete: todo.complete },
    (state, newTodo: Omit<Todo, 'id'>) => ({
      ...state,
      title: newTodo.title,
      complete: newTodo.complete,
    })
  );

  const handleSave = () => {
    startTransition(() =>
      addOptimisticTodo({ title: title, complete: isChecked })
    );
    updateTodo(todo.id, title);
    setEditable(false);
  };

  const handleCheck = () => {
    startTransition(() =>
      addOptimisticTodo({ title: title, complete: !isChecked })
    );
    toggleComplete(todo.id, isChecked);
    setIsChecked(!isChecked);
  };

  const handleDelete = () => {
    startTransition(() => deleteTodo(todo.id));
  };

  const handleSaveOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleSave();
    }
  };

  return (
    <>
      {editable ? (
        <div className="flex p-4 justify-between">
          <Input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={handleSaveOnKeyDown}
          />
          <Button
            variant="secondary"
            className="ml-1"
            onClick={() => setEditable(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="ml-1">
            Update
          </Button>
        </div>
      ) : (
        <div className="flex p-4 justify-between">
          <div
            className="py-2"
            style={isChecked ? { textDecoration: 'line-through' } : {}}
          >
            <small className="text-sm">{optimisticTodo.title}</small>
          </div>
          <div className="flex">
            {!todo.complete && (
              <>
                <Button
                  variant="secondary"
                  className="ml-1"
                  onClick={() => setEditable(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="ml-1"
                >
                  Delete
                </Button>
              </>
            )}
            <div className="ml-1 flex items-center">
              <Checkbox
                id={`complete-${todo.id}`}
                name={`complete-${todo.id}`}
                checked={isChecked}
                onCheckedChange={handleCheck}
              />
              <Label htmlFor={`complete-${todo.id}`} className="ml-1">
                {isChecked ? 'complete' : 'incomplete'}
              </Label>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
