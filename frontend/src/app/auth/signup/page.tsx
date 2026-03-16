'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Zap, User, Mail, Lock } from 'lucide-react';
import NeonButton from '@/components/ui/NeonButton';
import { useAuth } from '@/hooks/useAuth';

export default function SignUpPage() {
  const { signUp } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true);
    const result = await signUp(form.name, form.email, form.password);
    setLoading(false);
    if (result.success) {
      window.location.href = '/users';
    } else {
      setError(result.error ?? 'Sign up failed');
    }
  };

  const inputCls = 'w-full bg-[#0a0a0f] border border-[rgba(0,245,255,0.2)] rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#00f5ff] transition-colors';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <Zap className="h-6 w-6 text-[#00f5ff]" />
            <span className="text-2xl font-black text-white group-hover:text-[#00f5ff] transition-colors">
              i<span className="text-[#00f5ff]">SHOP</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
          <p className="text-gray-500">Join iSHOP NEON FX today</p>
        </div>

        <div className="bg-[#111118] border border-[rgba(0,245,255,0.15)] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" className={`${inputCls} pl-10`} />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" className={`${inputCls} pl-10`} />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="Min. 8 characters" className={`${inputCls} pl-10 pr-10`} />
                <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input type="password" value={form.confirm} onChange={(e) => update('confirm', e.target.value)} placeholder="Repeat password" className={`${inputCls} pl-10`} />
              </div>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <NeonButton variant="primary" size="lg" className="w-full" type="submit" loading={loading}>Create Account</NeonButton>
          </form>

          <p className="text-center text-gray-600 text-xs mt-5">
            By signing up you agree to our{' '}
            <Link href="/terms" className="text-[#00f5ff] hover:underline">Terms</Link>
            {' & '}
            <Link href="/privacy" className="text-[#00f5ff] hover:underline">Privacy Policy</Link>
          </p>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-[#00f5ff] hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
