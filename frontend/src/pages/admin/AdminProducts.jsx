import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Search,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';
import { fetchAdminProducts, updateProductApi, createProductApi } from '../../services/api';
import { productsData } from '../../data/productsData';
import { useToast } from '../../components/Toast';

const AdminProducts = () => {
  const [products, setProducts] = useState(productsData);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // Edit / Add Modal state
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'ONE SOUND CRACKERS',
    originalPrice: '',
    offerPrice: '',
    stock: 100,
    packType: '1 Box',
    packQuantity: '1 Box',
    description: '',
    isActive: true
  });

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminProducts();
      if (res && res.products && res.products.length > 0) {
        setProducts(res.products);
      } else {
        setProducts(productsData);
      }
    } catch (err) {
      setProducts(productsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenEdit = (prod) => {
    setIsAddMode(false);
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      category: prod.category,
      originalPrice: prod.originalPrice || '',
      offerPrice: prod.offerPrice || '',
      stock: prod.stock || 50,
      packType: prod.packType || '1 Box',
      packQuantity: prod.packQuantity || '1 Box',
      description: prod.description || '',
      isActive: prod.isActive !== false
    });
  };

  const handleOpenAdd = () => {
    setIsAddMode(true);
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'ONE SOUND CRACKERS',
      originalPrice: '',
      offerPrice: '',
      stock: 100,
      packType: '1 Box',
      packQuantity: '1 Box',
      description: '',
      isActive: true
    });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        offerPrice: formData.offerPrice ? Number(formData.offerPrice) : null,
        stock: Number(formData.stock)
      };

      if (isAddMode) {
        const res = await createProductApi(payload);
        showToast('New product created!', 'success');
        setProducts([...products, res.product || { ...payload, productNumber: products.length + 1 }]);
      } else {
        await updateProductApi(editingProduct._id || editingProduct.productNumber, payload);
        showToast('Product updated successfully!', 'success');
        setProducts(products.map(p =>
          (p._id === editingProduct._id || p.productNumber === editingProduct.productNumber)
            ? { ...p, ...payload }
            : p
        ));
      }
      setEditingProduct(null);
      setIsAddMode(false);
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  // Filtered products list
  const filteredProducts = products.filter(p => {
    const matchSearch = search.trim() === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      String(p.productNumber).includes(search) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link to="/admin" className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-100 flex items-center gap-2">
            <Package className="w-7 h-7 text-amber-400" /> Catalog & Inventory ({products.length} Products)
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Authoritative Sivakasi 2026 catalog items (1 to 117 + combos). Update stocks and pricing.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadProducts}
            className="p-3 bg-stone-900 border border-stone-800 rounded-xl text-stone-300 hover:text-amber-400"
            title="Reload"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#180a26] border border-amber-500/20 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name, number (#1 to #117) or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#10051a] text-sm text-stone-100 pl-9 pr-3 py-2.5 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
          />
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-3.5" />
        </div>
      </div>

      {/* Table */}
      <div className="p-6 rounded-3xl bg-[#180a26] border border-amber-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider">
                <th className="py-3 px-2">#</th>
                <th className="py-3 px-2">Product Name</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Original</th>
                <th className="py-3 px-2">50% Offer</th>
                <th className="py-3 px-2">Pack Info</th>
                <th className="py-3 px-2">Stock</th>
                <th className="py-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filteredProducts.map((p) => (
                <tr key={p.productNumber} className="hover:bg-amber-500/5 transition-colors">
                  <td className="py-3 px-2 font-bold text-amber-300">#{p.productNumber}</td>
                  <td className="py-3 px-2 font-bold text-stone-100 max-w-[200px] truncate">{p.name}</td>
                  <td className="py-3 px-2 text-stone-400">{p.category}</td>
                  <td className="py-3 px-2 text-stone-500">
                    {p.originalPrice ? `₹${p.originalPrice}` : '—'}
                  </td>
                  <td className="py-3 px-2 font-bold text-amber-400">
                    {p.isCall ? 'CALL' : (p.isNetNet ? 'NET NET' : `₹${p.offerPrice}`)}
                  </td>
                  <td className="py-3 px-2 text-stone-400">{p.packQuantity || p.packType || '1 Box'}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      p.stock <= 20 ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-green-950 text-green-400'
                    }`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-black text-stone-300 transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {(editingProduct || isAddMode) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#180a26] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h2 className="text-lg font-black text-stone-100">
                {isAddMode ? 'Add New Cracker Variety' : `Edit #${editingProduct.productNumber} ${editingProduct.name}`}
              </h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddMode(false);
                }}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-300 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#10051a] text-sm text-stone-100 p-2.5 rounded-xl border border-stone-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full bg-[#10051a] text-sm text-stone-100 p-2.5 rounded-xl border border-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-300 mb-1">50% Offer Price (₹)</label>
                  <input
                    type="number"
                    value={formData.offerPrice}
                    onChange={(e) => setFormData({ ...formData, offerPrice: e.target.value })}
                    className="w-full bg-[#10051a] text-sm text-stone-100 p-2.5 rounded-xl border border-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-[#10051a] text-sm text-stone-100 p-2.5 rounded-xl border border-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Pack Quantity Specification</label>
                  <input
                    type="text"
                    value={formData.packQuantity}
                    onChange={(e) => setFormData({ ...formData, packQuantity: e.target.value })}
                    className="w-full bg-[#10051a] text-sm text-stone-100 p-2.5 rounded-xl border border-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-300 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#10051a] text-sm text-stone-100 p-2.5 rounded-xl border border-stone-800"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddMode(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-stone-800 text-stone-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;
