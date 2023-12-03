'use server';
import { revalidatePath } from 'next/cache';
import prisma from './prisma';

export async function addTodo(formData: FormData) {
  const title = formData.get('title');

  try {
    await prisma.todo.create({ data: { title } });
    revalidatePath('/');
  } catch (err) {
    console.log('Error:', err);
  }
}

export async function updateTodo(id: number, title: string) {
  try {
    await prisma.todo.update({ where: { id }, data: { title } });
    revalidatePath('/');
  } catch (err) {
    console.log('Error:', err);
  }
}

export async function deleteTodo(id: number) {
  try {
    await prisma.todo.delete({ where: { id } });
    revalidatePath('/');
  } catch (err) {
    console.log('Error:', err);
  }
}

export async function toggleComplete(id: number, complete: boolean) {
  try {
    await prisma.todo.update({ where: { id }, data: { complete: !complete } });
    revalidatePath('/');
  } catch (err) {
    console.log('Error:', err);
  }
}
