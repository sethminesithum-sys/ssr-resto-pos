import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Package } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [barcode, setBarcode] = useState('');
  const [loading, setLoading] = useState(false);

  // ඩේටබේස් එකෙන් Products ලෝඩ් කිරීම
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Products fetch error:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ඩේටබේස් එකට අලුත් Product එකක් එකතු කිරීම
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !price || !stock) return;

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/products', {
        name,
        barcode: barcode || 'N/A',
        price: parseFloat(price),
        stock: parseInt(stock),
      });

      setName('');
      setPrice('');
      setStock('');
      setBarcode('');
      fetchProducts(); // ලැයිස්තුව Refresh කිරීම
    } catch (err) {
      alert('භාණ්ඩය එකතු කිරීමට අපොහොසත් විය');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">භාණ්ඩ කළමනාකරණය (Products)</h1>
          <p className="text-slate-400 text-sm">ස්ටොක් එකට අලුත් භාණ්ඩ ඇතුළත් කරන්න සහ පවතින තොග පරීක්ෂා කරන්න.</p>
        </div>
      </div>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">භාණ්ඩයේ නම</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="උදා: සෝයා මීට්"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">බාර්කෝඩ් එක (Barcode)</label>
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="479..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">විකුණුම් මිල (Rs.)</label>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">ප්‍රමාණය (Stock)</label>
          <input
            type="number"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="10"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-xl transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>{loading ? 'එකතු වෙමින්...' : 'එකතු කරන්න'}</span>
          </button>
        </div>
      </form>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">භාණ්ඩයේ නම</th>
              <th className="px-6 py-4">බාර්කෝඩ්</th>
              <th className="px-6 py-4">මිල (Rs.)</th>
              <th className="px-6 py-4">තොගය (Stock)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-slate-500">
                  තවම භාණ්ඩ ඇතුළත් කර නැත.
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-100 flex items-center space-x-3">
                    <Package className="w-4 h-4 text-indigo-400" />
                    <span>{item.name}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{item.barcode}</td>
                  <td className="px-6 py-4 text-emerald-400 font-semibold">{parseFloat(item.price).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.stock > 10 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {item.stock} Units
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;