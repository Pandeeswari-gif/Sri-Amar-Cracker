import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How do I place an order on Sri Amar Crackers?',
    a: 'You can browse our catalog of 117 crackers and 6 combo packs, add your desired products to the shopping cart, and proceed to checkout by providing your delivery address. Alternatively, you can use our instant WhatsApp Order button to send your cart details directly to 7094183836.'
  },
  {
    q: 'How is the 50% Special Offer calculated?',
    a: 'Our 50% Special Offer is calculated directly from the manufacturer list price (Price + Rs.10 updated rate) as stated in the authoritative Sivakasi 2026 catalog. The strike-through original rate and the discounted 50% rate are displayed clearly on each product.'
  },
  {
    q: 'What does "CALL FOR PRICE" mean on certain items?',
    a: 'For specialized aerial repeaters such as 15 SHOT RIDER and 25 SHOT RIDER, rates fluctuate based on market batches and raw material availability. You can call or WhatsApp our sales desk at 7094183836 for exact daily pricing.'
  },
  {
    q: 'What is "NET NET RATE" for Special Gift Boxes?',
    a: 'Our Special Gift Boxes (21, 31, 41, 50, and 51 items) are packaged with net wholesale discounted rates directly from the factory, offering exceptional festival value without additional markups.'
  },
  {
    q: 'What payment options are available?',
    a: 'We support Cash on Delivery (COD), Direct WhatsApp verification, and online digital payments via secure gateways. You can select your preferred payment mode during checkout.'
  },
  {
    q: 'How does All India Delivery work?',
    a: 'All orders are safely packed in moisture-resistant, heavy-duty carton boxes at our Sivakasi facility and dispatched through registered transport carriers to destinations across India. You will receive an Order ID to track the packing and transit status.'
  },
  {
    q: 'How can I track my placed order?',
    a: 'Use our "Track Order" page on the top navigation bar. Enter your Order ID (e.g., SAC-2026-XXXX) and your registered phone number to view the step-by-step progress from Order Placed to Shipped and Delivered.'
  },
  {
    q: 'What should I do if I need to modify my order?',
    a: 'Please reach out immediately to our Sivakasi customer support line at 7094183836 or email amargobi64@gmail.com with your Order Reference ID.'
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
          Help & Ordering Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-100">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-stone-400">
          Answers to common questions regarding catalog pricing, Sivakasi dispatch, and order tracking.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-[#180a26] border border-amber-500/20 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-stone-100 hover:text-amber-300 transition-colors"
              >
                <span className="text-sm sm:text-base flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 text-amber-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help banner */}
      <div className="p-6 rounded-3xl bg-[#1f0d33] border border-amber-500/30 text-center space-y-3">
        <h3 className="font-bold text-stone-100 text-sm">Still have questions?</h3>
        <p className="text-xs text-stone-400">Our Sivakasi store desk is happy to guide you.</p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="tel:7094183836"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" /> Call 7094183836
          </a>
          <a
            href="https://wa.me/917094183836"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support
          </a>
        </div>
      </div>

    </div>
  );
};

export default FAQPage;
