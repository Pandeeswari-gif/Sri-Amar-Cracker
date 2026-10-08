import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, User, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const LoginPage = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/account';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginId.trim() || !password) {
      showToast('Please enter both username/email and password', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await login({ loginId: loginId.trim(), password });
      showToast(res.message || 'Logged in successfully!', 'success');
      if (res.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from);
      }
    } catch (err) {
      showToast(err.message || 'Invalid credentials', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Customer Account
        </div>
        <h1 className="text-3xl font-black text-stone-100">
          Sign In to Sri Amar
        </h1>
        <p className="text-xs text-stone-400">
          Access your festival cracker orders, saved wishlist and delivery addresses.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-[#180a26] border border-amber-500/30 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Username or Email *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="Username or email"
                className="w-full bg-[#10051a] text-sm text-stone-100 placeholder-stone-500 pl-10 pr-3 py-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
              />
              <User className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#10051a] text-sm text-stone-100 placeholder-stone-500 pl-10 pr-3 py-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 transition-colors mt-2"
          >
            {submitting ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
          <span className="text-stone-400">Don't have an account?</span>
          <Link to="/register" className="text-amber-400 font-bold hover:underline">
            Register here →
          </Link>
        </div>

        {/* Demo Accounts Helper */}
        <div className="p-3 rounded-xl bg-[#12051d] border border-stone-800/80 text-[11px] text-stone-400 space-y-1">
          <div className="font-bold text-amber-300">Quick Evaluation Accounts:</div>
          <div>👤 Customer: <code className="text-stone-300">customer@sriamar.com</code> / <code className="text-stone-300">CustomerPass@123</code></div>
          <div>🛡️ Admin: <code className="text-stone-300">admin@sriamar.com</code> / <code className="text-stone-300">AmarCrackers@2026</code></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
