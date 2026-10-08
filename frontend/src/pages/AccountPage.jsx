import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Plus,
  Trash2,
  Clock,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { fetchMyOrders, addAddress, deleteAddress, updateProfile } from '../services/api';
import OrderTimeline from '../components/OrderTimeline';

const AccountPage = () => {
  const { user, isAuthenticated, logout, updateUserProfile } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'addresses'
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Profile Edit State
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Add Address State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    district: '',
    state: 'Tamil Nadu',
    pinCode: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadOrders = async () => {
      try {
        const res = await fetchMyOrders();
        if (res.success && res.orders) {
          setOrders(res.orders);
        }
      } catch (err) {
        console.error('Failed to load user orders:', err);
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders();
  }, [isAuthenticated]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const res = await updateProfile({ name: editName, phone: editPhone });
      if (res.success && res.user) {
        updateUserProfile(res.user);
        showToast('Profile updated successfully!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update profile', 'error');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await addAddress(newAddress);
      if (res.success && res.addresses) {
        updateUserProfile({ ...user, addresses: res.addresses });
        showToast('Address added!', 'success');
        setShowAddressModal(false);
        setNewAddress({
          fullName: user?.name || '',
          phone: user?.phone || '',
          street: '',
          city: '',
          district: '',
          state: 'Tamil Nadu',
          pinCode: ''
        });
      }
    } catch (err) {
      showToast(err.message || 'Could not save address', 'error');
    }
  };

  const handleDeleteAddress = async (addrId) => {
    try {
      const res = await deleteAddress(addrId);
      if (res.success && res.addresses) {
        updateUserProfile({ ...user, addresses: res.addresses });
        showToast('Address deleted', 'info');
      }
    } catch (err) {
      showToast(err.message || 'Failed to delete address', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#180a26] border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-black text-2xl">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="text-xs text-stone-400">Welcome to your dashboard</div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-100">{user?.name}</h1>
            <div className="text-xs text-amber-400 font-semibold">@{user?.username} • {user?.email}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" /> Admin Panel
            </Link>
          )}
          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 text-red-400 hover:text-red-300 font-bold text-xs flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Tabs */}
        <div className="space-y-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between transition-colors ${
              activeTab === 'orders'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-[#180a26] text-stone-300 hover:bg-[#200e33]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-amber-400" /> My Orders
            </span>
            <span className="text-xs font-black">{orders.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between transition-colors ${
              activeTab === 'profile'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-[#180a26] text-stone-300 hover:bg-[#200e33]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-amber-400" /> Profile Details
            </span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between transition-colors ${
              activeTab === 'addresses'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-[#180a26] text-stone-300 hover:bg-[#200e33]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400" /> Saved Addresses
            </span>
            <span className="text-xs font-black">{user?.addresses?.length || 0}</span>
          </button>

          <Link
            to="/wishlist"
            className="w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between bg-[#180a26] text-stone-300 hover:bg-[#200e33] transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-red-400" /> Saved Wishlist
            </span>
            <span>→</span>
          </Link>
        </div>

        {/* Tab Content Panel (Right 3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* TAB 1: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-lg font-black text-stone-100 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-400" /> Order History & Live Tracking
              </h2>

              {loadingOrders ? (
                <div className="p-8 text-center text-stone-400">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="p-8 rounded-3xl bg-[#180a26] border border-amber-500/20 text-center space-y-3">
                  <Package className="w-10 h-10 text-amber-400 mx-auto" />
                  <p className="text-sm font-bold text-stone-200">You haven't placed any orders yet.</p>
                  <Link to="/shop" className="inline-block px-5 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs">
                    Shop 117 Sivakasi Crackers
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order._id || order.orderId}
                    className="p-6 rounded-3xl bg-[#180a26] border border-amber-500/20 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
                      <div>
                        <span className="text-xs text-stone-400">Order Ref:</span>
                        <div className="text-lg font-black text-amber-300">{order.orderId}</div>
                        <div className="text-[11px] text-stone-500">
                          {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-stone-400">Total:</span>
                        <div className="text-lg font-black text-amber-400">₹{order.total}</div>
                        <span className="text-[11px] text-green-400 font-bold bg-green-950/60 px-2 py-0.5 rounded border border-green-800">
                          {order.paymentMethod} • {order.orderStatus}
                        </span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <OrderTimeline
                      currentStatus={order.orderStatus}
                      statusHistory={order.statusHistory || []}
                    />

                    {/* Items List */}
                    <div className="pt-2 border-t border-stone-800 space-y-1.5 text-xs text-stone-300">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{item.quantity} × {item.name} ({item.packType || '1 Box'})</span>
                          <span className="font-bold text-amber-300">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-right">
                      <Link
                        to={`/order-success/${order.orderId}`}
                        className="text-xs text-amber-400 font-bold hover:underline"
                      >
                        View Full Invoice Details →
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Profile */}
          {activeTab === 'profile' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#180a26] border border-amber-500/20 space-y-6">
              <h2 className="text-lg font-black text-stone-100 flex items-center gap-2 pb-3 border-b border-stone-800">
                <User className="w-5 h-5 text-amber-400" /> Edit Profile Information
              </h2>

              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 mb-1">
                    Username (Immutable)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={user?.username || ''}
                    className="w-full bg-[#10051a] text-sm text-stone-400 p-3 rounded-xl border border-stone-800 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-[#10051a] text-sm text-stone-100 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-400 mb-1">
                    Email Address (Immutable)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full bg-[#10051a] text-sm text-stone-400 p-3 rounded-xl border border-stone-800 cursor-not-allowed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={updatingProfile}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs"
                >
                  {updatingProfile ? 'Saving...' : 'Update Profile'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-stone-100 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" /> Saved Delivery Addresses
                </h2>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Address
                </button>
              </div>

              {/* Addresses List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user?.addresses?.map((addr) => (
                  <div
                    key={addr._id}
                    className="p-5 rounded-2xl bg-[#180a26] border border-amber-500/20 flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1 text-xs">
                      <div className="font-bold text-stone-100 text-sm flex items-center justify-between">
                        <span>{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-stone-300">{addr.street}</div>
                      <div className="text-stone-400">{addr.city}, {addr.district}</div>
                      <div className="text-stone-400">{addr.state} - {addr.pinCode}</div>
                      <div className="text-stone-400 pt-1">Phone: {addr.phone}</div>
                    </div>

                    <div className="pt-2 border-t border-stone-800 flex justify-end">
                      <button
                        onClick={() => handleDeleteAddress(addr._id)}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Address Form Modal */}
              {showAddressModal && (
                <div className="p-6 rounded-3xl bg-[#1f0d33] border border-amber-500/40 space-y-4">
                  <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                    Add New Delivery Address
                  </h3>
                  <form onSubmit={handleAddAddress} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Recipient Name"
                        required
                        value={newAddress.fullName}
                        onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                        className="bg-[#10051a] text-xs text-stone-100 p-2.5 rounded-xl border border-stone-800"
                      />
                      <input
                        type="tel"
                        placeholder="Recipient Phone"
                        required
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        className="bg-[#10051a] text-xs text-stone-100 p-2.5 rounded-xl border border-stone-800"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Street Address / Door No."
                      required
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      className="w-full bg-[#10051a] text-xs text-stone-100 p-2.5 rounded-xl border border-stone-800"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="bg-[#10051a] text-xs text-stone-100 p-2.5 rounded-xl border border-stone-800"
                      />
                      <input
                        type="text"
                        placeholder="District"
                        value={newAddress.district}
                        onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
                        className="bg-[#10051a] text-xs text-stone-100 p-2.5 rounded-xl border border-stone-800"
                      />
                      <input
                        type="text"
                        placeholder="PIN Code"
                        required
                        value={newAddress.pinCode}
                        onChange={(e) => setNewAddress({ ...newAddress, pinCode: e.target.value })}
                        className="bg-[#10051a] text-xs text-stone-100 p-2.5 rounded-xl border border-stone-800"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 text-black font-bold text-xs rounded-xl"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddressModal(false)}
                        className="px-5 py-2 bg-stone-800 text-stone-300 text-xs rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default AccountPage;
