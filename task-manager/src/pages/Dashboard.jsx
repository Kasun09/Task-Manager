import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, User, Plus, Trash2, AlertCircle, CheckCircle2, Circle, LogOut, Settings, Sparkles } from 'lucide-react';

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
        <div className={`${darkMode ? 'dark bg-slate-950 text-white' : 'bg-indigo-50 text-slate-900'} min-h-screen transition-all duration-700 relative overflow-hidden`}>

            {/* BACKGROUND ANIMATIONS & DOODLES */}
            <div className="absolute inset-0 doodle-overlay opacity-20 pointer-events-none" />
            <div className={`absolute inset-0 transition-colors duration-1000 ${darkMode ? 'bg-gradient-to-tr from-slate-950 via-purple-900/20 to-indigo-950/40' : 'bg-gradient-to-tr from-indigo-100 via-white to-purple-100'}`} />

            {/* Animated Glow Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />

            <div className="max-w-xl mx-auto p-6 pb-24 space-y-8 relative z-10">

                {/* HEADER */}
                <header className="flex justify-between items-center relative">
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <h1 className="text-4xl font-black tracking-tighter italic flex items-center gap-2">
                            Focus. <Sparkles className="text-yellow-400 w-6 h-6" />
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">User Dashboard</p>
                    </motion.div>

                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ rotate: 15 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl shadow-2xl border border-white/20"
                        >
                            {darkMode ? <Sun size={22} className="text-amber-400" /> : <Moon size={22} className="text-indigo-600" />}
                        </motion.button>

                        <div className="relative">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-2 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-2 pr-4 rounded-2xl shadow-2xl border border-white/20 transition-all"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg">U</div>
                                <span className="text-sm font-black hidden sm:inline">PROFILE</span>
                            </motion.button>

                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.9 }}
                                        className="absolute right-0 mt-4 w-56 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 p-3 z-50 overflow-hidden"
                                    >
                                        <div className="px-4 py-3 mb-2 border-b border-slate-100 dark:border-slate-800">
                                            <p className="text-xs font-bold text-slate-400 uppercase">Logged in as</p>
                                            <p className="font-black text-indigo-500 truncate">User@Focus.app</p>
                                        </div>
                                        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold hover:bg-indigo-500 hover:text-white rounded-2xl transition-all group">
                                            <Settings size={18} className="group-hover:rotate-90 transition-transform" /> Settings
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all mt-1"
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
                            initial={{ x: 50, opacity: 0, scale: 0.9 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            className="bg-red-500/10 backdrop-blur-2xl border-2 border-red-500/30 p-6 rounded-[2.5rem] flex items-center gap-5 shadow-xl shadow-red-500/10"
                        >
                            <div className="bg-red-500 p-3 rounded-2xl text-white shadow-lg animate-bounce"><AlertCircle size={24} /></div>
                            <div className="flex-1">
                                <p className="text-red-600 dark:text-red-400 font-black text-sm uppercase tracking-tighter">Action Required</p>
                                <p className="text-red-500/70 text-xs font-bold">You have {missedTasks.length} ghost tasks from yesterday!</p>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="bg-white dark:bg-slate-800 text-red-500 text-[10px] font-black px-5 py-2.5 rounded-full uppercase tracking-widest shadow-lg border border-red-100 dark:border-red-900/40"
                            >
                                Resolve
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MAIN TASK CARD */}
                <motion.section layout className="bg-white/40 dark:bg-white/5 backdrop-blur-3xl p-8 rounded-[3.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border border-white/20 dark:border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 pointer-events-none">
                        <Plus size={100} className="dark:text-white" />
                    </div>

                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h3 className="text-3xl font-black italic tracking-tighter dark:text-white">Daily Quests</h3>
                            <p className="text-indigo-500 font-black text-xs uppercase tracking-[0.3em]">{selectedDate.toDateString()}</p>
                        </div>
                    </div>

                    <form onSubmit={addTask} className="relative mb-10 group">
                        <input
                            value={taskInput} onChange={(e) => setTaskInput(e.target.value)}
                            placeholder="Add a new challenge..."
                            className="w-full bg-white/50 dark:bg-black/20 p-6 pr-20 rounded-[2rem] focus:ring-4 ring-indigo-500/30 outline-none dark:text-white transition-all border border-slate-200 dark:border-white/5 font-bold shadow-inner"
                        />
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.8 }}
                            className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white w-14 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40"
                        >
                            <Plus size={28} />
                        </motion.button>
                    </form>

                    <div className="space-y-5">
                        <AnimatePresence mode='popLayout'>
                            {activeTasks.length === 0 ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                                    <div className="bg-indigo-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-indigo-500/30">
                                        <CheckCircle2 size={32} className="text-indigo-500 opacity-50" />
                                    </div>
                                    <p className="text-slate-400 font-black italic uppercase tracking-widest text-sm">All cleared for today</p>
                                </motion.div>
                            ) : (
                                activeTasks.map((task, idx) => (
                                    <motion.div
                                        key={task.id}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="flex items-center justify-between p-6 bg-white/60 dark:bg-white/5 rounded-[2.2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group border border-transparent hover:border-indigo-500/30"
                                    >
                                        <div className="flex items-center gap-5">
                                            <motion.button
                                                whileTap={{ scale: 1.4 }}
                                                onClick={() => toggleTask(task.id)}
                                                className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors"
                                            >
                                                <Circle size={30} strokeWidth={3} />
                                            </motion.button>
                                            <span className="font-black text-lg text-slate-700 dark:text-slate-200 tracking-tight">{task.text}</span>
                                        </div>
                                        <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 transition-all">
                                            <Trash2 size={20} />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </motion.section>

                {/* STICKY NOTE */}
                <motion.div
                    whileHover={{ scale: 1.02, rotate: -1 }}
                    className="bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-950/40 p-10 rounded-[3.5rem] border border-amber-300/50 dark:border-amber-500/20 shadow-2xl relative"
                >
                    <div className="absolute top-4 right-8 opacity-20"><Sparkles className="text-amber-800 dark:text-amber-400" /></div>
                    <h3 className="font-black text-amber-800 dark:text-amber-500 text-sm mb-4 uppercase tracking-[0.4em]">Quick Scratchpad</h3>
                    <textarea
                        value={note} onChange={(e) => setNote(e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0 text-amber-900 dark:text-amber-100 placeholder:text-amber-700/30 font-bold text-lg leading-relaxed italic"
                        placeholder="Dump your wild ideas here..."
                        rows="3"
                    />
                </motion.div>

                {/* CALENDAR */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
               run de     className="bg-white/40 dark:bg-slate-900/60 backdrop-blur-3xl p-8 rounded-[3.5rem] shadow-2xl border border-white/20 custom-calendar"
                >
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