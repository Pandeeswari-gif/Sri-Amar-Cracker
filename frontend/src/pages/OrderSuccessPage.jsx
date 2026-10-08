import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Phone, MessageCircle, ArrowRight, Sparkles, Truck } from 'lucide-react';
import OrderTimeline from '../components/OrderTimeline';
import { fetchOrderById } from '../services/api';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await fetchOrderById(orderId);
        if (res && res.order) {
          setOrder(res.order);
        }
      } catch (err) {
        // Fallback demo order state
        setOrder({
          orderId,
          orderStatus: 'Order Placed',
          total: 1250,
          paymentMethod: 'COD',
          customerDetails: { name: 'Customer', phone: '7094183836' },
          statusHistory: [
            {
              status: 'Order Placed',
              timestamp: new Date(),
              note: 'Order successfully recorded. Awaiting store confirmation.'
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [orderId]);

  const whatsappMessage = encodeURIComponent(
    `Hello Sri Amar Crackers, I have placed order #${orderId}. Please confirm my order status and delivery schedule. Let Happiness Sparkle Always!`
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Success Badge */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-400 border border-green-500/40 flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider">
          Sri Amar Crackers Sivakasi
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-100">
          Order Successfully Placed!
        </h1>
        <p className="text-sm text-stone-300">
          Thank you for choosing Sri Amar Crackers. Your festival celebration order is registered.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#180a26] border border-amber-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
          <div>
            <span className="text-xs text-stone-400">Order Reference Number:</span>
            <div className="text-2xl font-black text-amber-300 tracking-wider">
              {orderId}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-stone-400">Status:</span>
            <div className="text-sm font-bold text-green-400">
              {order?.orderStatus || 'Order Placed'}
            </div>
          </div>
        </div>

        {/* Live Timeline Component */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
            Order Progress Timeline:
          </h3>
          <OrderTimeline
            currentStatus={order?.orderStatus || 'Order Placed'}
            statusHistory={order?.statusHistory || []}
          />
        </div>

        {/* Support & WhatsApp Actions */}
        <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/917094183836?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" /> Confirm on WhatsApp (7094183836)
          </a>
          <Link
            to={`/track?orderId=${encodeURIComponent(orderId)}`}
            className="flex-1 py-3 px-4 rounded-xl bg-[#220d36] hover:bg-[#2c1244] text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" /> Live Tracking Page
          </Link>
        </div>
      </div>

      {/* Closing blessings */}
      <div className="text-center text-sm font-bold text-amber-300">
        Let Happiness Sparkle Always! ✨
      </div>

    </div>
  );
};

export default OrderSuccessPage;
