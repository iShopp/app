'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Zap, Lock, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function SignInPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);
    if (result.success) {
      window.location.href = '/users';
    } else {
      setError(result.error ?? 'Sign in failed');
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
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <div className="bg-[#111118] border border-[rgba(0,245,255,0.15)] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={`${inputCls} pl-10`} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-gray-400 text-sm">Password</label>
                <Link href="/auth/forgot" className="text-xs text-[#00f5ff] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={`${inputCls} pl-10 pr-10`} />
                <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button variant="primary" size="lg" className="w-full" type="submit" loading={loading}>Sign In</Button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[rgba(255,255,255,0.08)]" /></div>
            <div className="relative text-center"><span className="bg-[#111118] px-3 text-gray-600 text-sm">or</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Google', 'Apple'].map((provider) => (
              <button key={provider} className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[rgba(255,255,255,0.1)] text-gray-400 hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-colors text-sm">
                {provider}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-[#00f5ff] hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
