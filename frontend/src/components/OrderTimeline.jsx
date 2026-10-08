import React from 'react';
import { CheckCircle2, Clock, Package, Truck, Check, AlertTriangle, Send } from 'lucide-react';

const ORDER_STEPS = [
  'Order Placed',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

const OrderTimeline = ({ currentStatus, statusHistory = [] }) => {
  const isCancelled = currentStatus === 'Cancelled';

  const currentIndex = ORDER_STEPS.indexOf(currentStatus);

  if (isCancelled) {
    return (
      <div className="p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-200 flex items-center gap-3">
        <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
        <div>
          <div className="font-bold text-sm">Order Cancelled</div>
          <p className="text-xs text-red-300">This order has been cancelled. Please contact support at 7094183836 for assistance.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      {/* Desktop Step Bar */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-stone-800 z-0" />
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-amber-500 z-0 transition-all duration-500"
          style={{
            width: currentIndex >= 0 ? `${(currentIndex / (ORDER_STEPS.length - 1)) * 90}%` : '0%'
          }}
        />

        {ORDER_STEPS.map((step, idx) => {
          const isPassed = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isCurrent
                    ? 'bg-amber-500 text-black ring-4 ring-amber-500/30 scale-110 shadow-lg shadow-amber-500/50'
                    : isPassed
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-800 text-stone-500 border border-stone-700'
                }`}
              >
                {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
              </div>
              <span
                className={`text-[11px] font-semibold mt-2 text-center max-w-[80px] leading-tight ${
                  isCurrent ? 'text-amber-400 font-extrabold' : isPassed ? 'text-stone-200' : 'text-stone-600'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Step List */}
      <div className="sm:hidden space-y-3 pl-2">
        {ORDER_STEPS.map((step, idx) => {
          const isPassed = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          const historyEntry = statusHistory.find(h => h.status === step);

          return (
            <div key={step} className="flex items-start gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                  isCurrent
                    ? 'bg-amber-500 text-black ring-2 ring-amber-400'
                    : isPassed
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-800 text-stone-500'
                }`}
              >
                {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
              </div>
              <div>
                <div className={`text-xs font-bold ${isCurrent ? 'text-amber-400' : isPassed ? 'text-stone-200' : 'text-stone-500'}`}>
                  {step}
                </div>
                {historyEntry && (
                  <div className="text-[10px] text-stone-400">
                    {new Date(historyEntry.timestamp).toLocaleString()}
                    {historyEntry.note && ` — ${historyEntry.note}`}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Latest Note */}
      {statusHistory.length > 0 && (
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200">
          <span className="font-bold">Latest Status Update: </span>
          {statusHistory[statusHistory.length - 1].note || `Status is currently: ${currentStatus}`}
          <span className="text-stone-400 ml-2">
            ({new Date(statusHistory[statusHistory.length - 1].timestamp).toLocaleDateString()})
          </span>
        </div>
      )}
    </div>
  );
};

export default OrderTimeline;
