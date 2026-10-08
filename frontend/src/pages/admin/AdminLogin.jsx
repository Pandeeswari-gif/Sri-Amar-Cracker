import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/Toast';

const AdminLogin = () => {
  const [loginId, setLoginId] = useState('admin@sriamar.com');
  const [password, setPassword] = useState('AmarCrackers@2026');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await login({ loginId: loginId.trim(), password });
      if (res.user?.role === 'admin') {
        showToast('Admin authenticated successfully!', 'success');
        navigate('/admin');
      } else {
        showToast('Access denied: Customer account does not have Admin privileges', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Admin authentication failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-100">
          Admin Portal Access
        </h1>
        <p className="text-xs text-stone-400">
          Sri Amar Crackers Store & Inventory Management
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-[#180a26] border border-amber-500/30 space-y-6">
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Admin Email / Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full bg-[#10051a] text-sm text-stone-100 pl-10 pr-3 py-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
              />
              <User className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#10051a] text-sm text-stone-100 pl-10 pr-3 py-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 transition-colors"
          >
            {submitting ? 'Verifying Admin...' : 'Authenticate as Admin'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-stone-800 text-center text-xs text-stone-500">
          Return to <Link to="/" className="text-amber-400 font-bold hover:underline">Customer Store</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
