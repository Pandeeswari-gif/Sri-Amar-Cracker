import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../components/Toast';

const ContactPage = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    setSent(true);
    showToast('Your message has been sent to our Sivakasi desk!', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
          Sivakasi Customer Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-100">
          Contact Sri Amar Crackers
        </h1>
        <p className="text-sm text-stone-400">
          Have questions about the 2026 catalog, bulk orders, or All India shipping? Reach out to our Sivakasi office directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Information & Action Buttons (Left 1 col) */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#180a26] border border-amber-500/30 space-y-6">
            <h2 className="text-lg font-black text-stone-100 border-b border-stone-800 pb-3">
              Store Information
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-200">Factory & Office Address</div>
                  <div className="text-stone-400 mt-0.5 leading-relaxed">
                    Sivakasi Mainroad, Thayilpatti,<br />
                    Sivakasi - 626126, Tamil Nadu, India
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-200">Phone Support</div>
                  <div className="text-stone-400 mt-0.5">7094183836</div>
                  <div className="text-[11px] text-amber-400">Mon - Sun (8:00 AM - 10:00 PM)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-200">Email Address</div>
                  <a href="mailto:amargobi64@gmail.com" className="text-stone-300 hover:text-amber-300">
                    amargobi64@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-stone-800">
              <a
                href="tel:7094183836"
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" /> Call: 7094183836
              </a>

              <a
                href="https://wa.me/917094183836?text=Hello%20Sri%20Amar%20Crackers%2C%20I%20have%20an%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Chat
              </a>

              <a
                href="mailto:amargobi64@gmail.com"
                className="w-full py-3 px-4 rounded-xl bg-[#220e36] hover:bg-[#2c1344] text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4" /> Email Us Directly
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form (Right 2 cols) */}
        <div className="lg:col-span-2">
          <div className="p-8 rounded-3xl bg-[#180a26] border border-amber-500/30 space-y-6">
            <h2 className="text-xl font-black text-stone-100 border-b border-stone-800 pb-3">
              Send an Online Inquiry
            </h2>

            {sent ? (
              <div className="p-8 text-center rounded-2xl bg-green-950/40 border border-green-800 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" />
                <h3 className="text-lg font-bold text-stone-100">Message Received!</h3>
                <p className="text-xs text-stone-300 max-w-md mx-auto">
                  Thank you, {formData.name}. Our Sivakasi sales desk has received your request and will get back to you shortly. Let happiness sparkle always!
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-5 py-2 bg-amber-500 text-black font-bold text-xs rounded-xl mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bulk order enquiry, Delivery status"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Your Message / Order Requirement *
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Describe your questions or required cracker quantities..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3.5 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ContactPage;
