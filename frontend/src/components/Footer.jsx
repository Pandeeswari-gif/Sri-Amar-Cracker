import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Truck,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Clock
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0b0312] border-t border-amber-500/20 text-stone-300 pt-14 pb-8">
      {/* Traditional Tamil Invocations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-tamil text-sm sm:text-base font-semibold">
          <span>ஸ்ரீகொத்தாளசுவாமி துணை</span>
          <span className="text-amber-500">•</span>
          <span>ஶ்ரீஅங்காளஈஸ்வரி துணை</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-black text-amber-300 tracking-wider">
                SRI AMAR CRACKERS
              </span>
            </div>
            <p className="text-sm font-semibold text-amber-400/90 tracking-wide">
              QUALITY CRACKERS FOR A BRIGHTER TOMORROW
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              SIVAKASI • THE CRACKERS CAPITAL OF INDIA. Providing 100% genuine Sivakasi festival crackers direct to families across India at genuine 50% special offer prices.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-md text-xs font-bold">
                50% SPECIAL OFFER
              </span>
              <span className="px-2.5 py-1 bg-red-950 text-red-300 border border-red-800 rounded-md text-xs font-bold">
                ALL INDIA DELIVERY
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span>→</span> All 117 Products
                </Link>
              </li>
              <li>
                <Link to="/combos" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span>→</span> 50% Combo Packs
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span>→</span> Browse by Category
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span>→</span> Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/safety" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span>→</span> Safety & Responsible Use
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span>→</span> Ordering FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              Top Varieties
            </h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>• One Sound Crackers (Lakshmi, Kuruvi)</li>
              <li>• Ground Chakkars & Disco Wheels</li>
              <li>• Sparkling Pots & Asoka Fountains</li>
              <li>• Multi-Colour Aerial Repeater Shots</li>
              <li>• 100 to 10000 Wala Garlands</li>
              <li>• Special Gift Boxes (21 to 51 Items)</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              Contact Sivakasi Office
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-stone-300">
                  Sivakasi Mainroad, Thayilpatti, Sivakasi - 626126, Tamil Nadu
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:7094183836" className="text-stone-200 hover:text-amber-300 font-semibold">
                  7094183836
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:amargobi64@gmail.com" className="text-stone-200 hover:text-amber-300">
                  amargobi64@gmail.com
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/917094183836?text=Hello%20Sri%20Amar%20Crackers%2C%20I%20would%20like%20to%20inquire%20about%20crackers%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-950 text-green-300 border border-green-700 hover:bg-green-900 transition-colors text-xs font-bold"
                >
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  Chat on WhatsApp: 7094183836
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Closing Blessings & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="text-center sm:text-left">
            <span className="text-amber-300 font-bold tracking-wide">
              Let Happiness Sparkle Always! ✨
            </span>
            <p className="mt-1 text-stone-500">
              © {new Date().getFullYear()} Sri Amar Crackers. Sivakasi, Tamil Nadu. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-amber-300">About Store</Link>
            <Link to="/safety" className="hover:text-amber-300">Safety Guidelines</Link>
            <Link to="/faq" className="hover:text-amber-300">FAQ</Link>
            <Link to="/admin/login" className="text-stone-600 hover:text-stone-400">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
