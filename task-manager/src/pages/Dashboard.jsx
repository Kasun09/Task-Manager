import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, User, Plus, Trash2, AlertCircle, CheckCircle2, Circle, LogOut, Settings } from 'lucide-react';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [note, setNote] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [darkMode, setDarkMode] = useState(false);
    const [taskInput, setTaskInput] = useState("");
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Load Data
    useEffect(() => {
        const saved = localStorage.getItem('taskAppData');
        if (saved) {
            const parsed = JSON.parse(saved);
            setTasks(parsed.tasks || []);
            setNote(parsed.note || "");
        }
    }, []);

    // Save Data
    useEffect(() => {
        localStorage.setItem('taskAppData', JSON.stringify({ tasks, note }));
    }, [tasks, note]);

    const addTask = (e) => {
        e.preventDefault();
        if (!taskInput.trim()) return;
        const newTask = {
            id: Date.now(),
            text: taskInput,
            date: selectedDate.toDateString(),
            completed: false
        };
        setTasks([newTask, ...tasks]);
        setTaskInput("");
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/login';
    };

    // Logic
    const todayStr = selectedDate.toDateString();
    const activeTasks = tasks.filter(t => t.date === todayStr && !t.completed);
    const doneTasks = tasks.filter(t => t.completed);
    const missedTasks = tasks.filter(t => {
        const d = new Date(t.date);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return d < now && !t.completed;
    });

    return (
        <div className={`${darkMode ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} min-h-screen transition-all duration-700 animate-mesh bg-gradient-to-br ${darkMode ? 'from-slate-950 via-indigo-950 to-slate-950' : 'from-indigo-100 via-white to-purple-100'}`}>

            <div className="max-w-xl mx-auto p-6 pb-24 space-y-8 relative z-10">

                {/* HEADER */}
                <header className="flex justify-between items-center relative">
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <h1 className="text-3xl font-black tracking-tight">Focus.</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Welcome back, User</p>
                    </motion.div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-3 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md shadow-xl border border-white/20 hover:scale-110 transition-transform"
                        >
                            {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-indigo-600" />}
                        </button>

                        {/* PROFILE DROPDOWN */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-2 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md p-2 pr-4 rounded-2xl shadow-xl border border-white/20 transition-all hover:bg-white/60"
                            >
                                <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold">U</div>
                                <span className="text-sm font-bold">Profile</span>
                            </button>

                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-2 overflow-hidden z-50"
                                    >
                                        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">
                                            <Settings size={18} /> Settings
                                        </button>
                                        <div className="h-[1px] bg-slate-100 dark:bg-slate-700 my-1" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                        >
                                            <LogOut size={18} /> Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* MISSED TASKS ALERT */}
                <AnimatePresence>
                    {missedTasks.length > 0 && (
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-red-500/10 backdrop-blur-md border border-red-500/20 p-5 rounded-[2.5rem] flex items-center gap-4 group hover:bg-red-500/20 transition-colors"
                        >
                            <div className="bg-red-500 p-3 rounded-2xl text-white shadow-lg shadow-red-500/30 ring-4 ring-red-500/10"><AlertCircle size={22} /></div>
                            <div className="flex-1">
                                <p className="text-red-600 dark:text-red-400 font-bold text-sm">Action Required</p>
                                <p className="text-red-500/70 text-xs">You have {missedTasks.length} tasks from yesterday.</p>
                            </div>
                            <button className="bg-white dark:bg-slate-800 text-red-500 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-tighter shadow-sm">Solve</button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MAIN TASK CARD */}
                <motion.section layout className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[3rem] shadow-2xl border border-white/40 dark:border-slate-800/50">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h3 className="text-2xl font-black italic">Daily List</h3>
                            <p className="text-indigo-500 font-bold text-xs uppercase tracking-widest">{selectedDate.toDateString()}</p>
                        </div>
                    </div>

                    <form onSubmit={addTask} className="relative mb-8 group">
                        <input
                            value={taskInput} onChange={(e) => setTaskInput(e.target.value)}
                            placeholder="Type something to do..."
                            className="w-full bg-slate-100/50 dark:bg-slate-800/50 p-5 pr-16 rounded-[1.8rem] focus:ring-4 ring-indigo-500/20 outline-none dark:text-white transition-all border border-transparent focus:border-indigo-500/30"
                        />
                        <button className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-4 rounded-[1.4rem] hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/40">
                            <Plus size={24} />
                        </button>
                    </form>

                    <div className="space-y-4">
                        <AnimatePresence mode='popLayout'>
                            {activeTasks.length === 0 ? (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-slate-400 py-10 italic">No tasks for this day. Rest easy.</motion.p>
                            ) : (
                                activeTasks.map(task => (
                                    <motion.div
                                        key={task.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex items-center justify-between p-5 bg-white/80 dark:bg-slate-800/80 rounded-[1.8rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-slate-100 dark:border-slate-700"
                                    >
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => toggleTask(task.id)} className="text-indigo-200 group-hover:text-indigo-500 transition-colors">
                                                <Circle size={26} />
                                            </button>
                                            <span className="font-bold text-slate-700 dark:text-slate-200">{task.text}</span>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </motion.section>

                {/* STICKY NOTE */}
                <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-8 rounded-[3rem] border border-amber-200/50 dark:border-amber-900/30 shadow-lg">
                    <h3 className="font-black text-amber-600 dark:text-amber-500 text-xs mb-4 uppercase tracking-[0.2em]">Notes & Ideas</h3>
                    <textarea
                        value={note} onChange={(e) => setNote(e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0 text-amber-900 dark:text-amber-200 placeholder:text-amber-700/30 font-medium leading-relaxed"
                        placeholder="Write down a thought..."
                        rows="3"
                    />
                </motion.div>

                {/* CALENDAR */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-6 rounded-[3rem] shadow-2xl border border-white/40 dark:border-slate-800/50">
                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        next2Label={null}
                        prev2Label={null}
                    />
                </motion.div>

            </div>
        </div>
    );
}