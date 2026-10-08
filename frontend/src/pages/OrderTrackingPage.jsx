import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, PackageCheck, AlertCircle, Phone, Truck, CheckCircle2 } from 'lucide-react';
import OrderTimeline from '../components/OrderTimeline';
import { trackOrderPublic } from '../services/api';
import { useToast } from '../components/Toast';

const OrderTrackingPage = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [phone, setPhone] = useState(searchParams.get('phone') || '');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { showToast } = useToast();

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!orderId.trim()) {
      showToast('Please enter your Order ID', 'error');
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const res = await trackOrderPublic(orderId.trim(), phone.trim());
      if (res.success && res.order) {
        setOrder(res.order);
      } else {
        setOrder(null);
      }
    } catch (err) {
      setOrder(null);
      showToast('No order found matching this Order ID', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('orderId')) {
      handleTrack();
    }
  }, [searchParams]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
          All India Delivery Tracking
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-100">
          Track Your Festival Order
        </h1>
        <p className="text-xs sm:text-sm text-stone-400">
          Enter your Order Reference ID (e.g. SAC-2026-XXXX) to view live packing and dispatch progress.
        </p>
      </div>

      {/* Lookup Card */}
      <div className="p-6 rounded-3xl bg-[#180a26] border border-amber-500/30">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Order ID (e.g. SAC-2026-1024)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value.toUpperCase())}
            className="flex-1 bg-[#10051a] text-sm text-stone-100 placeholder-stone-500 px-4 py-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none uppercase font-bold"
          />
          <input
            type="tel"
            placeholder="Phone Number (Optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="sm:w-52 bg-[#10051a] text-sm text-stone-100 placeholder-stone-500 px-4 py-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shrink-0 transition-colors"
          >
            <Search className="w-4 h-4" />
            {loading ? 'Searching...' : 'Track Order'}
          </button>
        </form>
      </div>

      {/* Result Section */}
      {order ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#180a26] border border-amber-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
            <div>
              <span className="text-xs text-stone-400">Order ID:</span>
              <div className="text-xl font-black text-amber-300">{order.orderId}</div>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-400">Current Status:</span>
              <div className="text-sm font-bold text-green-400">{order.orderStatus}</div>
            </div>
          </div>

          <OrderTimeline
            currentStatus={order.orderStatus}
            statusHistory={order.statusHistory || []}
          />

          {/* Items & Shipping address breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-800 text-xs">
            <div>
              <h3 className="font-bold text-stone-200 uppercase tracking-wider mb-2">
                Order Items ({order.items?.length || 0}):
              </h3>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-stone-300">
                    <span>{item.quantity} × {item.name}</span>
                    <span className="font-bold text-amber-300">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-stone-200 uppercase tracking-wider mb-2">
                Shipping Details:
              </h3>
              <div className="space-y-1 text-stone-400">
                <div><span className="text-stone-300">Name:</span> {order.customerDetails?.name}</div>
                <div><span className="text-stone-300">Phone:</span> {order.customerDetails?.phone}</div>
                <div>
                  <span className="text-stone-300">Address:</span> {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pinCode}
                </div>
                <div className="pt-2 font-bold text-amber-300">
                  Total: ₹{order.total} ({order.paymentMethod})
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : searched && !loading ? (
        <div className="p-8 rounded-3xl bg-[#180a26] border border-stone-800 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-200">No Matching Order Found</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Please check the Order ID entered or contact Sri Amar Crackers Sivakasi office at 7094183836 for assistance.
          </p>
        </div>
      ) : null}

    </div>
  );
};

export default OrderTrackingPage;
