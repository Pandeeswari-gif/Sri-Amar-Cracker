import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, MapPin, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    street: '',
    city: '',
    pinCode: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';

    const usernameRegex = /^[a-zA-Z0-9._]{3,50}$/;
    if (!formData.username.trim()) {
      errs.username = 'Username is required';
    } else if (!usernameRegex.test(formData.username.trim())) {
      errs.username = 'Username must be 3-50 characters containing only letters, numbers, dots, and underscores';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email is required';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      errs.phone = '10-digit mobile number required';
    }

    if (!formData.password || formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await register({
        name: formData.name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        address: {
          street: formData.street.trim(),
          city: formData.city.trim(),
          pinCode: formData.pinCode.trim()
        }
      });

      showToast(res.message || 'Account registered successfully!', 'success');
      navigate('/account');
    } catch (err) {
      showToast(err.message || 'Registration failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> 50% Festival Offer Registration
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-100">
          Create Customer Account
        </h1>
        <p className="text-xs text-stone-400">
          Sign up to track Sivakasi shipments, save festival cracker wishlists and checkout in 1 click.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#180a26] border border-amber-500/30">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Meenakshi Sundaram"
              className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
            />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Username * (3–50 chars: letters, numbers, dots, underscores only)
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g. sundaram_diwali"
              className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
            />
            {errors.username && <p className="text-xs text-red-400 mt-1">{errors.username}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@gmail.com"
                className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Mobile Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit number"
                className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
              />
              {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Password * (min 6 chars)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
              />
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
              />
              {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800">
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              Default Delivery Address (Optional)
            </label>
            <div className="space-y-3">
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street Address / House No."
                className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  placeholder="PIN Code"
                  className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 transition-colors mt-4"
          >
            {submitting ? 'Creating Account...' : 'Complete Registration'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-stone-800 text-center text-xs text-stone-400">
          Already registered?{' '}
          <Link to="/login" className="text-amber-400 font-bold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
