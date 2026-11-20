import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Printer } from 'lucide-react';

const POS = () => {
  // සාම්පල නිෂ්පාදන ලැයිස්තුව
  const [products] = useState([
    { id: 1, name: 'කිරි පිටි 400g', price: 1050, stock: 25 },
    { id: 2, name: 'සීනි 1kg', price: 240, stock: 50 },
    { id: 3, name: 'පරිප්පු 1kg', price: 320, stock: 40 },
    { id: 4, name: 'තේ කොළ 100g', price: 280, stock: 30 },
  ]);

  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  // කාට් එකට එකතු කිරීම
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // ප්‍රමාණය වෙනස් කිරීම
  const updateQty = (id, delta) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // කාට් එකෙන් ඉවත් කිරීම
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // මුළු එකතුව ගණනය කිරීම
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // බිල්පත්ගත කිරීම (Checkout) සහ Print කිරීම
  const handleCheckout = () => {
    if (cart.length === 0) return;

    setMessage('බිල්පත සාර්ථකව මුද්‍රණය විය!');

    // බ්‍රව්සර් එකේ Print Dialog එක ඕපන් කිරීම
    setTimeout(() => {
      window.print();
    }, 300);

    // තත්පර 3 කට පසු කාට් එක හිස් කිරීම
    setTimeout(() => {
      setCart([]);
      setMessage('');
    }, 3000);
  };

  return (
    <div className="p-6 text-white min-h-screen">
      {/* ප්‍රින්ට් වෙන වෙලාවට විතරක් පෙනෙන Receipt Section එක */}
      <div className="hidden print:block print:text-black print:p-4 print:w-full">
        <h2 className="text-center text-xl font-bold mb-2">SSR POS Store</h2>
        <p className="text-center text-sm mb-4">ලැබීම් පත / Sales Receipt</p>
        <hr className="mb-2 border-black" />
        <table className="w-full text-left text-sm mb-4">
          <thead>
            <tr className="border-b border-black">
              <th className="py-1">භාණ්ඩය</th>
              <th className="py-1 text-center">ප්‍රමාණය</th>
              <th className="py-1 text-right">මිල (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b border-gray-300">
                <td className="py-1">{item.name}</td>
                <td className="py-1 text-center">{item.qty}</td>
                <td className="py-1 text-right">
                  {(item.price * item.qty).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr className="mb-2 border-black" />
        <div className="flex justify-between font-bold text-base">
          <span>මුළු එකතුව:</span>
          <span>Rs. {totalAmount.toFixed(2)}</span>
        </div>
        <p className="text-center text-xs mt-6">ස්තුතියි! නැවත පැමිණෙන්න!</p>
      </div>

      {/* සාමාන්‍ය ඩෑෂ්බෝඩ් UI එක (Print එකේදී මෙය සඟවයි) */}
      <div className="print:hidden">
        <h1 className="text-2xl font-bold mb-1">POS විකුණුම් කවුන්ටරය</h1>
        <p className="text-gray-400 mb-4 text-sm">
          භාණ්ඩයක් මත ක්ලික් කර බිල්පතගත කිරීමට එකතු කරන්න.
        </p>

        {message && (
          <div className="bg-emerald-900/50 border border-emerald-500 text-emerald-300 p-3 rounded-lg mb-4 flex items-center gap-2">
            <span>✓</span> {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* වම් පස - භාණ්ඩ ලැයිස්තුව */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">තොගය: {p.stock}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-emerald-400 font-bold">
                    Rs. {p.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(p)}
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* දකුණු පස - Cart සෙක්ෂන් එක */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between h-[500px]">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="text-indigo-400" />
                <h2 className="font-bold text-lg">වත්මන් බිල්පත (Cart)</h2>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[320px] pr-2">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-10 text-sm">
                    බිල්පත හිස් වේ. භාණ්ඩ තෝරන්න.
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-800/60 p-3 rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-emerald-400">
                          Rs. {item.price} x {item.qty}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="p-1 bg-slate-700 rounded hover:bg-slate-600"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-semibold">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="p-1 bg-slate-700 rounded hover:bg-slate-600"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-red-400 hover:bg-slate-700 rounded ml-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">මුළු එකතුව:</span>
                <span className="text-xl font-bold text-emerald-400">
                  Rs. {totalAmount.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Printer size={18} />
                බිල්පත්ගත කරන්න (Checkout)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;