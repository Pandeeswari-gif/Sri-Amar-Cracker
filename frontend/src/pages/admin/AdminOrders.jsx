import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PackageCheck,
  Search,
  Filter,
  ArrowLeft,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { fetchAdminOrders, updateOrderStatusApi } from '../../services/api';
import { useToast } from '../../components/Toast';

const STATUS_OPTIONS = [
  'Order Placed',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Cancelled'
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusNote, setStatusNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const { showToast } = useToast();

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminOrders({
        search: search.trim() || undefined,
        status: statusFilter !== 'All' ? statusFilter : undefined
      });
      if (res && res.orders) {
        setOrders(res.orders);
      }
    } catch (err) {
      console.warn('Orders fetch error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdating(true);
    try {
      await updateOrderStatusApi(orderId, newStatus, statusNote || `Status updated to ${newStatus}`);
      showToast(`Order status updated to "${newStatus}"`, 'success');
      setStatusNote('');
      loadOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(prev => ({ ...prev, orderStatus: newStatus }));
      }
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link to="/admin" className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-100 flex items-center gap-2">
            <PackageCheck className="w-7 h-7 text-amber-400" /> Order Fulfillment & Status Management
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Track customer shipments, mark dispatch, and update visual order delivery timelines.
          </p>
        </div>

        <button
          onClick={loadOrders}
          className="p-3 bg-stone-900 border border-stone-800 rounded-xl text-stone-300 hover:text-amber-400 flex items-center gap-2 text-xs font-bold"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-2xl bg-[#180a26] border border-amber-500/20 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by Order ID (e.g. SAC-2026), customer name, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadOrders()}
            className="w-full bg-[#10051a] text-sm text-stone-100 pl-9 pr-3 py-2.5 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
          />
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-3.5" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#10051a] text-xs font-bold text-stone-200 px-4 py-2.5 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
        >
          <option value="All">All Statuses</option>
          {STATUS_OPTIONS.map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="p-6 rounded-3xl bg-[#180a26] border border-amber-500/20 space-y-4">
        {loading ? (
          <div className="p-8 text-center text-stone-400">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-10 text-center text-stone-400">No customer orders found matching filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider">
                  <th className="py-3 px-2">Order ID</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Customer & Phone</th>
                  <th className="py-3 px-2">Items</th>
                  <th className="py-3 px-2">Total & Payment</th>
                  <th className="py-3 px-2">Current Status</th>
                  <th className="py-3 px-2 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {orders.map((ord) => (
                  <tr key={ord._id || ord.orderId} className="hover:bg-amber-500/5 transition-colors">
                    <td className="py-3 px-2 font-bold text-amber-300">{ord.orderId}</td>
                    <td className="py-3 px-2 text-stone-400">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-bold text-stone-100">{ord.customerDetails?.name}</div>
                      <div className="text-[11px] text-stone-400">{ord.customerDetails?.phone}</div>
                    </td>
                    <td className="py-3 px-2 text-stone-300">
                      {ord.items?.length} varieties
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-bold text-amber-400">₹{ord.total}</div>
                      <div className="text-[10px] text-stone-400">{ord.paymentMethod}</div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleUpdateStatus(ord._id, e.target.value)}
                        className="bg-[#10051a] text-xs font-bold text-amber-300 px-2 py-1.5 rounded-lg border border-stone-700"
                      >
                        {STATUS_OPTIONS.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminOrders;
