import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: input,
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="card-rim bg-bluelabs-surface/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5 h-full flex flex-col shadow-2xl shadow-black/20">
      <h2 className="text-xl font-bold mb-6 text-white tracking-tight">Tasks</h2>
      
      <form onSubmit={addTask} className="mb-6">
        <div className="flex gap-3 mb-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs focus?"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-bluelabs-primary focus:ring-1 focus:ring-bluelabs-primary transition text-white placeholder-slate-500 font-medium"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-bluelabs-primary hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-bluelabs-primary/25 hover:shadow-bluelabs-primary/40 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <Plus size={20} /> Add Task
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 text-bluelabs-muted">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} className="opacity-20" />
            </div>
            <p className="text-sm font-medium">No tasks yet. Stay focused!</p>
          </div>
        )}
        {tasks.map(task => (
          <div 
            key={task.id}
            className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${task.completed ? 'bg-white/5 border-transparent opacity-50' : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/5 hover:shadow-md'}`}
          >
            <button onClick={() => toggleTask(task.id)} className="text-slate-500 hover:text-bluelabs-primary transition-colors">
              {task.completed ? <CheckCircle2 size={22} className="text-emerald-500" /> : <Circle size={22} />}
            </button>
            <span className={`flex-1 text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
              {task.text}
            </span>
            <button 
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all transform hover:scale-110 p-1"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
