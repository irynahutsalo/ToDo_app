import { describe, it, expect } from 'vitest'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const addToDo = (todos: Todo[], text: string): Todo[] => {
  const newToDo:Todo = {
    id: 123,
    text,
    completed: false
  }
    return [...todos, newToDo]
}

const removeTodo = (todos: Todo[], id: number): Todo[] => {
  return todos.filter(todo => todo.id !== id)
}

describe('addTodo', () => {
    it('should add a new todo to the list', () => {
        const todos: Todo[] = [];
        const result = addToDo(todos, 'Test todo');
        expect(result.length).toBe(1);
        expect(result[0].text).toBe('Test todo');
        expect(result[0].completed).toBe(false);
    })
})


// Toggle todo completion status function (Option 1)
const toggleTodo = (todos: Todo[], id: number): Todo[] => {
  return todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
};

// Calculate progress percentage function (Option 10)
const calculateProgress = (todos: Todo[]): number => {
  if (todos.length === 0) return 0;
  const completedCount = todos.filter(t => t.completed).length;
  return Math.round((completedCount / todos.length) * 100);
};

// Unit test for completion toggle and progress calculation
describe('Todo Features Logic', () => {
  it('should toggle todo completion status (Option 1)', () => {
    const todos: Todo[] = [{ id: 1, text: 'Test task', completed: false }];
    const result = toggleTodo(todos, 1);
    expect(result[0].completed).toBe(true);
  });

  it('should calculate progress percentage correctly (Option 10)', () => {
    const todos: Todo[] = [
      { id: 1, text: 'Task 1', completed: true },
      { id: 2, text: 'Task 2', completed: false }
    ];
    const progress = calculateProgress(todos);
    expect(progress).toBe(50);
  });
});