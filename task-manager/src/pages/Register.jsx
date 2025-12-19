import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        // Create a user object
        const newUser = { name, email, password };

        // Save to localStorage
        localStorage.setItem('userAccount', JSON.stringify(newUser));

        // Automatically log them in after registration
        localStorage.setItem('isAuthenticated', 'true');

        // Send to dashboard
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-white to-indigo-100 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
                    <p className="text-slate-500 mt-2">Join us to start organizing your life</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 text-slate-400" size={20} />
                            <input
                                type="text" required
                                value={name} onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full bg-white border border-slate-200 p-3.5 pl-12 rounded-2xl focus:ring-2 ring-purple-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                            <input
                                type="email" required
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full bg-white border border-slate-200 p-3.5 pl-12 rounded-2xl focus:ring-2 ring-purple-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                            <input
                                type="password" required
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white border border-slate-200 p-3.5 pl-12 rounded-2xl focus:ring-2 ring-purple-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 flex items-center justify-center gap-2 group transition-all"
                    >
                        Create Account
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="text-center mt-8 text-slate-500 text-sm">
                    Already have an account?
                    <Link to="/login" className="text-purple-600 font-bold hover:underline ml-1">Log in</Link>
                </p>
            </motion.div>
        </div>
    );
}