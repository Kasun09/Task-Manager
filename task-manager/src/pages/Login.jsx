import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // 1. Get the stored user from localStorage
        const storedUser = JSON.parse(localStorage.getItem('userAccount'));

        // 2. Simple Validation
        if (!storedUser) {
            setError("No account found. Please register first!");
            return;
        }

        if (storedUser.email === email && storedUser.password === password) {
            // 3. Success! Save a "session" and go to dashboard
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/dashboard');
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-indigo-100 via-white to-purple-100 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
                    <p className="text-slate-500 mt-2">Log in to manage your daily flow</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-xl">
                            {error}
                        </motion.p>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full bg-white border border-slate-200 p-3.5 pl-12 rounded-2xl focus:ring-2 ring-indigo-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white border border-slate-200 p-3.5 pl-12 rounded-2xl focus:ring-2 ring-indigo-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group transition-all"
                    >
                        Sign In
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="text-center mt-8 text-slate-500 text-sm">
                    Don't have an account?
                    <Link to="/register" className="text-indigo-600 font-bold hover:underline ml-1">Create one</Link>
                </p>
            </motion.div>
        </div>
    );
}