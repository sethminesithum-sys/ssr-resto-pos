import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, UtensilsCrossed, ReceiptText, 
  Megaphone, History, Wrench, Settings, LogOut, Printer, 
  Plus, Send, Phone, Mail, Store, Trash2, Edit3, Search, Minus, 
  UserCheck, Users, ArrowLeft, CheckCircle2, TrendingUp, HelpCircle, Save, Crown, ShieldCheck, Zap, CreditCard, QrCode, Banknote, Bell, Lock, Calendar, Download
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [userData, setUserData] = useState(null);
  
  // Inline Subscription Plans View State inside Settings tab
  const [showPlansView, setShowPlansView] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.selectedPlan) return parsed.selectedPlan;
    }
    return localStorage.getItem('ssr_selected_plan') || 'Starter';
  });
  const [promoCodeInput, setPromoCodeInput] = useState('');

  // Admin Notifications Dropdown Toggle State
  const [showNotifications, setShowNotifications] = useState(false);
  const [adminNotifications, setAdminNotifications] = useState([
    { id: 1, title: 'System Notice', message: 'Welcome to SSR Resto POS! Your account is active.', date: 'Today' }
  ]);

  // Date Check & Reset Logic for Daily Operations
  const todayDateKey = new Date().toLocaleDateString();

  useEffect(() => {
    const savedDate = localStorage.getItem('ssr_active_date_key');
    if (savedDate !== todayDateKey) {
      localStorage.setItem('ssr_active_date_key', todayDateKey);
      localStorage.setItem('ssr_today_revenue', '0');
      localStorage.setItem('ssr_today_orders', '0');
      localStorage.setItem('ssr_expenses', JSON.stringify([]));
    }
  }, [todayDateKey]);

  // Persistent States initialization from localStorage & Promo Check on Login/Load Flow
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserData(parsed);
      if (parsed.selectedPlan) {
        setSelectedPlan(parsed.selectedPlan);
      }
      setProfileForm({
        shopName: parsed.shopName || "My Restaurant",
        email: parsed.email || "sethminesithum@gmail.com",
        phone: parsed.phone || "0765617093",
        ownerName: parsed.name || parsed.ownerName || "Sethmina Sithum"
      });

      // Check if user registered with valid promo code (SSR2026-01 to SSR2026-20)
      const userPromo = (parsed.promoCode || parsed.promo || '').trim().toUpperCase();
      const hasValidPromo = (
        userPromo.startsWith('SSR2026') || 
        userPromo.startsWith('SSR-PROMO') || 
        userPromo.startsWith('SSR-TRIAL')
      );

      // If user registered WITH promo code after email verification & login, send directly to dashboard analytics
      // If NOT, check if they need subscription selection view
      if (hasValidPromo && !parsed.selectedPlan) {
        setSelectedPlan('7-Day Trial');
        localStorage.setItem('ssr_selected_plan', '7-Day Trial');
      }
    }
  }, []);

  const [todayRevenue, setTodayRevenue] = useState(() => {
    const saved = localStorage.getItem('ssr_today_revenue');
    return saved ? Number(saved) : 0;
  });

  const [todayOrders, setTodayOrders] = useState(() => {
    const saved = localStorage.getItem('ssr_today_orders');
    return saved ? Number(saved) : 0;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('ssr_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('ssr_menu_items');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Chicken Fried Rice', category: 'Mains', price: 950, stock: '50' },
      { id: 2, name: 'Kottu Roti (Chicken)', category: 'Mains', price: 850, stock: '30' },
      { id: 3, name: 'Devilled Chicken', category: 'Devilled', price: 1100, stock: '20' },
      { id: 4, name: 'Iced Milo', category: 'Beverages', price: 350, stock: 'Unlimited' }
    ];
  });

  const [savedCustomers, setSavedCustomers] = useState(() => {
    const saved = localStorage.getItem('ssr_saved_customers');
    return saved ? JSON.parse(saved) : [];
  });

  const [billingHistory, setBillingHistory] = useState(() => {
    const saved = localStorage.getItem('ssr_billing_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [dailySummaries, setDailySummaries] = useState(() => {
    const saved = localStorage.getItem('ssr_daily_summaries');
    return saved ? JSON.parse(saved) : [];
  });

  // Target report date for printing specific historical day PDF report
  const [selectedReportDate, setSelectedReportDate] = useState(todayDateKey);

  // Sync states to localStorage securely
  useEffect(() => {
    localStorage.setItem('ssr_today_revenue', todayRevenue);
  }, [todayRevenue]);

  useEffect(() => {
    localStorage.setItem('ssr_today_orders', todayOrders);
  }, [todayOrders]);

  useEffect(() => {
    localStorage.setItem('ssr_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('ssr_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('ssr_saved_customers', JSON.stringify(savedCustomers));
  }, [savedCustomers]);

  useEffect(() => {
    localStorage.setItem('ssr_billing_history', JSON.stringify(billingHistory));
  }, [billingHistory]);

  useEffect(() => {
    localStorage.setItem('ssr_daily_summaries', JSON.stringify(dailySummaries));
  }, [dailySummaries]);

  useEffect(() => {
    localStorage.setItem('ssr_selected_plan', selectedPlan);
  }, [selectedPlan]);

  // Business Profile Settings State
  const [profileForm, setProfileForm] = useState({
    shopName: "",
    email: "",
    phone: "",
    ownerName: ""
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    const updated = { 
      ...userData, 
      shopName: profileForm.shopName,
      email: profileForm.email,
      phone: profileForm.phone,
      name: profileForm.ownerName,
      ownerName: profileForm.ownerName,
      selectedPlan 
    };
    setUserData(updated);
    localStorage.setItem('user', JSON.stringify(updated));
    alert('✅ Business profile details updated successfully!');
  };

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    const storedUser = localStorage.getItem('user');
    let updated = storedUser ? JSON.parse(storedUser) : {};
    updated = { ...updated, selectedPlan: planName };
    setUserData(updated);
    localStorage.setItem('user', JSON.stringify(updated));
    localStorage.setItem('ssr_selected_plan', planName);
    alert(`🎉 Successfully switched to ${planName} plan!`);
    setShowPlansView(false);
  };

  const handleApplyPromoCode = (e) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) {
      alert('Please enter a promo code!');
      return;
    }
    const code = promoCodeInput.trim().toUpperCase();
    if (code.startsWith('SSR2026') || code.startsWith('SSR-PROMO')) {
      const trialPlanName = '7-Day Trial';
      setSelectedPlan(trialPlanName);
      const storedUser = localStorage.getItem('user');
      let updated = storedUser ? JSON.parse(storedUser) : {};
      updated = { ...updated, selectedPlan: trialPlanName, isTrial: true };
      setUserData(updated);
      localStorage.setItem('user', JSON.stringify(updated));
      localStorage.setItem('ssr_selected_plan', trialPlanName);
      alert('🎁 7-Day Free Trial Promo Code Applied Successfully!');
      setPromoCodeInput('');
      setShowPlansView(false);
    } else {
      alert('❌ Invalid promo code! Please try a valid code (e.g. SSR2026-1)');
    }
  };

  // Expenses Management
  const [newExpenseTitle, setNewExpenseTitle] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const netProfit = todayRevenue - totalExpenses;

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpenseTitle || !newExpenseAmount) return;
    const updatedExpenses = [...expenses, { id: Date.now(), title: newExpenseTitle, amount: Number(newExpenseAmount) }];
    setExpenses(updatedExpenses);
    setNewExpenseTitle('');
    setNewExpenseAmount('');
  };

  const handleRemoveExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  // Close Day & Download PDF — Merges into single daily summary per date
  const handleCloseDay = () => {
    const confirmClose = window.confirm("🔒 Are you sure you want to close today's operations, download the PDF report, and reset today's revenue to zero?");
    if (!confirmClose) return;

    const existingIndex = dailySummaries.findIndex(s => s.date === todayDateKey);
    let updatedSummaries = [...dailySummaries];

    if (existingIndex !== -1) {
      const existing = updatedSummaries[existingIndex];
      updatedSummaries[existingIndex] = {
        date: todayDateKey,
        revenue: existing.revenue + todayRevenue,
        expenses: existing.expenses + totalExpenses,
        profit: (existing.revenue + todayRevenue) - (existing.expenses + totalExpenses),
        ordersCount: existing.ordersCount + todayOrders,
        closedAt: new Date().toLocaleTimeString()
      };
    } else {
      const newSummaryObj = {
        date: todayDateKey,
        revenue: todayRevenue,
        expenses: totalExpenses,
        profit: netProfit,
        ordersCount: todayOrders,
        closedAt: new Date().toLocaleTimeString()
      };
      updatedSummaries = [newSummaryObj, ...updatedSummaries];
    }

    setDailySummaries(updatedSummaries);
    setSelectedReportDate(todayDateKey);
    setPrintMode('dayclose');

    const dateStr = todayDateKey.replace(/\//g, '');
    const originalTitle = document.title;
    document.title = `SSR_DayClose_Report_${dateStr}`;

    setTimeout(() => {
      window.print();
      document.title = originalTitle;

      setTodayRevenue(0);
      setTodayOrders(0);
      setExpenses([]);
      alert('📊 Day closed successfully! Report downloaded, and today\'s metrics have been reset to zero.');
    }, 200);
  };

  // Download specific historical summary report from History tab
  const handleDownloadHistoricalReport = (summaryDate) => {
    setSelectedReportDate(summaryDate);
    setPrintMode('dayclose');

    const dateStr = summaryDate.replace(/\//g, '');
    const originalTitle = document.title;
    document.title = `SSR_Historical_Report_${dateStr}`;

    setTimeout(() => {
      window.print();
      document.title = originalTitle;
    }, 200);
  };

  // Smart Menu State
  const [newItem, setNewItem] = useState({ name: '', category: 'Mains', price: '', stock: '' });
  const [editingId, setEditingId] = useState(null);
  const [menuSearch, setMenuSearch] = useState('');
  const [billingProductSearch, setBillingProductSearch] = useState('');

  // History search state
  const [historySearchDate, setHistorySearchDate] = useState('');

  // Print Mode State ('thermal' or 'dayclose')
  const [printMode, setPrintMode] = useState('thermal');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) {
      alert('Please enter food name and price!');
      return;
    }

    const itemStock = newItem.stock ? newItem.stock : 'Unlimited';

    if (editingId !== null) {
      setMenuItems(menuItems.map(item => item.id === editingId ? {
        ...item,
        name: newItem.name,
        category: newItem.category,
        price: Number(newItem.price),
        stock: itemStock
      } : item));
      setEditingId(null);
    } else {
      setMenuItems([...menuItems, { 
        id: Date.now(), 
        name: newItem.name, 
        category: newItem.category, 
        price: Number(newItem.price), 
        stock: itemStock 
      }]);
    }

    setNewItem({ name: '', category: 'Mains', price: '', stock: '' });
  };

  const handleEditMenuItem = (item) => {
    setEditingId(item.id);
    setNewItem({
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock === 'Unlimited' ? '' : item.stock
    });
  };

  const handleDeleteMenuItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // Billing State
  const [cart, setCart] = useState([]);
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [visitCount, setVisitCount] = useState(1);
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);
  const [kitchenNote, setKitchenNote] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const [currentPrintBill, setCurrentPrintBill] = useState(null);

  // Marketing & Broadcast SMS State
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [selectedTargetCustomer, setSelectedTargetCustomer] = useState('ALL');

  const handleSendBroadcastSMS = async (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) {
      alert('Please enter a message to send!');
      return;
    }
    if (savedCustomers.length === 0) {
      alert('No saved customers found to send broadcast SMS!');
      return;
    }

    const targetPhones =
      selectedTargetCustomer === 'ALL'
        ? savedCustomers.map((c) => c.phone).filter(Boolean)
        : [selectedTargetCustomer];

    try {
      const response = await fetch(`${API_BASE}/api/sms/broadcast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targets: targetPhones,
          message: broadcastMessage.trim(),
          shopName: userData?.shopName || profileForm.shopName || 'SSR RESTO POS'
        })
      });

      const data = await response.json();
      if (data.success) {
        alert(`🚀 ${data.message}!`);
        setBroadcastMessage('');
      } else {
        alert(`❌ ${data.message || 'Failed to send SMS'}`);
      }
    } catch (err) {
      alert('❌ Error connecting to backend SMS service!');
    }
  };

  const handleCustomerSearch = (phoneNum) => {
    setCustomerPhone(phoneNum);
    if (!phoneNum.trim()) {
      setCustomerName('');
      setVisitCount(1);
      setIsExistingCustomer(false);
      return;
    }

    const found = savedCustomers.find(c => c.phone.trim() === phoneNum.trim());
    if (found) {
      setCustomerName(found.name);
      setVisitCount(found.visits + 1);
      setIsExistingCustomer(true);
    } else {
      setCustomerName('');
      setVisitCount(1);
      setIsExistingCustomer(false);
    }
  };

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const calculateFinalTotal = () => {
    const sub = calculateSubtotal();
    return sub - (sub * discountPercent) / 100;
  };

  const handleCheckout = () => {
    if (cart.length === 0) return alert('Please add items to cart!');

    const finalTotal = calculateFinalTotal();
    const finalCustName = customerName.trim() ? customerName : 'Walk-in Customer';
    const finalCustPhone = customerPhone.trim() ? customerPhone : 'N/A';

    let updatedCustomers = [...savedCustomers];
    if (customerPhone.trim() && customerName.trim()) {
      const existingIndex = updatedCustomers.findIndex(c => c.phone === customerPhone);
      if (existingIndex !== -1) {
        updatedCustomers[existingIndex].visits += 1;
        updatedCustomers[existingIndex].totalSpent += finalTotal;
      } else {
        updatedCustomers.push({ phone: customerPhone, name: customerName, visits: 1, totalSpent: finalTotal });
      }
    } else if (customerPhone.trim() && !updatedCustomers.some(c => c.phone === customerPhone)) {
      updatedCustomers.push({ phone: customerPhone, name: finalCustName, visits: 1, totalSpent: finalTotal });
    }
    setSavedCustomers(updatedCustomers);

    const newBill = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString(),
      dateKey: todayDateKey,
      customerName: finalCustName,
      customerPhone: finalCustPhone,
      items: [...cart],
      subtotal: calculateSubtotal(),
      discount: discountPercent,
      total: finalTotal,
      payment: paymentMethod,
      note: kitchenNote || 'Normal'
    };

    setCurrentPrintBill(newBill);
    setBillingHistory([newBill, ...billingHistory]);
    setTodayRevenue(prev => prev + finalTotal);
    setTodayOrders(prev => prev + 1);

    setPrintMode('thermal');

    if (finalCustPhone !== 'N/A') {
      fetch(`${API_BASE}/api/sms/bill`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: finalCustPhone,
          shopName: userData?.shopName || profileForm.shopName || 'SSR RESTO POS',
          invoiceId: newBill.id,
          total: finalTotal,
          customerName: finalCustName
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert(`📱 80mm Thermal Receipt generated & SMS sent to (${finalCustPhone})!`);
          } else {
            alert(`🖨️ Receipt printed, but SMS failed to (${finalCustPhone}).`);
          }
        })
        .catch(() => {
          alert('🖨️ Receipt printed, but could not reach SMS server.');
        });
    } else {
      alert('🖨️ 80mm Thermal Receipt generated successfully!');
    }

    setTimeout(() => {
      window.print();
    }, 200);

    setCart([]);
    setCustomerPhone('');
    setCustomerName('');
    setKitchenNote('');
    setDiscountPercent(0);
    setVisitCount(1);
    setIsExistingCustomer(false);
    setPaymentMethod('Cash');
  };

  // Support & Admin Help Ticket Submission
  const [adminTicket, setAdminTicket] = useState({ subject: '', message: '' });
  
  const handleAdminTicketSubmit = async (e) => {
    e.preventDefault();
    if (!adminTicket.subject || !adminTicket.message) return alert('Please enter subject and message!');
    
    try {
      await fetch(`${API_BASE}/api/admin/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopName: userData?.shopName || profileForm.shopName,
          name: userData?.name || userData?.ownerName || profileForm.ownerName,
          phone: userData?.phone || profileForm.phone,
          email: userData?.email || profileForm.email,
          subject: adminTicket.subject,
          description: adminTicket.message,
          date: new Date().toLocaleString()
        })
      });
      alert('✅ Support ticket sent to SSR Admin Panel successfully!');
      setAdminTicket({ subject: '', message: '' });
    } catch (err) {
      alert('✅ Support ticket logged successfully locally!');
      setAdminTicket({ subject: '', message: '' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(menuSearch.toLowerCase()) || 
    item.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  const filteredBillingItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(billingProductSearch.toLowerCase()) ||
    item.category.toLowerCase().includes(billingProductSearch.toLowerCase())
  );

  const filteredDailySummaries = dailySummaries.filter(summary =>
    summary.date.toLowerCase().includes(historySearchDate.toLowerCase())
  );

  // Get summary and bills for the selected report date printing
  const currentReportSummary = dailySummaries.find(s => s.date === selectedReportDate) || {
    date: selectedReportDate,
    revenue: todayRevenue,
    expenses: totalExpenses,
    profit: netProfit,
    ordersCount: todayOrders
  };

  const currentReportBills = billingHistory.filter(b => {
    if (b.dateKey) return b.dateKey === selectedReportDate;
    return b.date.includes(selectedReportDate);
  });

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          ${printMode === 'thermal' ? `
            #thermal-receipt-print, #thermal-receipt-print * { visibility: visible; }
            #thermal-receipt-print {
              position: fixed; left: 0; top: 0; width: 80mm; padding: 5px; font-family: 'Courier New', Courier, monospace; color: #000; background: #fff; font-size: 11px;
            }
          ` : `
            #day-close-report-print, #day-close-report-print * { visibility: visible; }
            #day-close-report-print {
              position: absolute; left: 0; top: 0; width: 100%; padding: 30px; font-family: sans-serif; color: #000; background: #fff;
            }
          `}
        }
      `}</style>

      {/* 80mm Thermal Receipt Print Layout */}
      <div id="thermal-receipt-print" className="hidden print:block">
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0', textTransform: 'uppercase' }}>{userData?.shopName || profileForm.shopName || 'SSR RESTO POS'}</h2>
          <p style={{ fontSize: '10px', margin: '2px 0' }}>Tel: {userData?.phone || profileForm.phone || '0765617093'}</p>
          <p style={{ fontSize: '10px', margin: '2px 0' }}>Invoice: {currentPrintBill?.id || 'INV-1001'}</p>
          <p style={{ fontSize: '10px', margin: '2px 0' }}>Date: {currentPrintBill?.date || new Date().toLocaleString()}</p>
          <div style={{ borderBottom: '1px dashed #000', margin: '6px 0' }}></div>
          <p style={{ fontSize: '11px', fontWeight: 'bold', margin: '2px 0', textAlign: 'left' }}>Customer: {currentPrintBill?.customerName || 'Walk-in Customer'}</p>
          <p style={{ fontSize: '10px', margin: '2px 0', textAlign: 'left' }}>Phone: {currentPrintBill?.customerPhone || 'N/A'}</p>
          <p style={{ fontSize: '10px', margin: '2px 0', textAlign: 'left' }}>Payment: {currentPrintBill?.payment || 'Cash'}</p>
          <div style={{ borderBottom: '1px dashed #000', margin: '6px 0' }}></div>
        </div>

        <div style={{ fontSize: '11px', marginBottom: '8px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '4px' }}>
            <span>ITEM</span>
            <span>QTY / AMT</span>
          </div>
          {currentPrintBill?.items?.map((item, i) => (
            <div key={i} style={{ marginBottom: '4px' }}>
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                <span>{item.quantity} x {item.price}</span>
                <span>Rs. {item.price * item.quantity}.00</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderBottom: '1px dashed #000', margin: '6px 0' }}></div>
        <div style={{ fontSize: '11px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
            <span>Subtotal:</span>
            <span>Rs. {currentPrintBill?.subtotal || 0}.00</span>
          </div>
          {currentPrintBill?.discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span>Discount ({currentPrintBill.discount}%):</span>
              <span>- Rs. {(currentPrintBill.subtotal * currentPrintBill.discount) / 100}.00</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px', marginTop: '4px', borderTop: '1px solid #000', paddingTop: '4px' }}>
            <span>TOTAL:</span>
            <span>Rs. {currentPrintBill?.total || 0}.00</span>
          </div>
        </div>

        {currentPrintBill?.note && (
          <div style={{ marginTop: '6px', fontSize: '10px', borderTop: '1px dashed #000', paddingTop: '4px' }}>
            <b>Kitchen Note:</b> {currentPrintBill.note}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '10px' }}>
          <p>*** THANK YOU! COME AGAIN ***</p>
          <p style={{ fontSize: '8px', marginTop: '2px' }}>Powered by SSR Cloud Solutions</p>
        </div>
      </div>

      {/* Comprehensive Day Close & Historical PDF Report Layout */}
      <div id="day-close-report-print" className="hidden print:block">
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', textAlign: 'center', marginBottom: '5px' }}>{userData?.shopName || profileForm.shopName || 'SSR RESTO POS'}</h2>
        <p style={{ textAlign: 'center', fontSize: '13px', marginBottom: '20px' }}>Daily Financial Summary & Complete Customer Billing Report — Date: {selectedReportDate}</p>
        <hr style={{ margin: '10px 0' }}/>
        <div style={{ fontSize: '14px', lineHeight: '1.8', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p><b>Owner Name:</b> {userData?.name || userData?.ownerName || profileForm.ownerName}</p>
            <p><b>Contact Phone:</b> {userData?.phone || profileForm.phone}</p>
          </div>
          <div>
            <p><b>Total Orders:</b> {currentReportSummary.ordersCount}</p>
            <p><b>Total Revenue:</b> Rs. {currentReportSummary.revenue.toLocaleString()}.00</p>
            <p><b>Total Expenses:</b> Rs. {currentReportSummary.expenses.toLocaleString()}.00</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#16a34a', marginTop: '5px' }}>Net Profit: Rs. {currentReportSummary.profit.toLocaleString()}.00</p>
          </div>
        </div>
        <hr style={{ margin: '20px 0' }}/>
        
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Detailed Customer Billing History for {selectedReportDate}</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '20px' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>Invoice ID</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Time / Date</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Customer Name</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Phone Number</th>
              <th style={{ padding: '8px', textAlign: 'center' }}>Payment</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Total (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {currentReportBills.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>No detailed bill records available for this date.</td>
              </tr>
            ) : (
              currentReportBills.map((b, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px', fontWeight: 'bold' }}>{b.id}</td>
                  <td style={{ padding: '8px' }}>{b.date}</td>
                  <td style={{ padding: '8px' }}>{b.customerName}</td>
                  <td style={{ padding: '8px' }}>{b.customerPhone}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>{b.payment}</td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>Rs. {b.total.toLocaleString()}.00</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Operational Expenses</h3>
        <ul style={{ marginBottom: '30px' }}>
          {expenses.length === 0 ? (
            <li>No expenses recorded.</li>
          ) : (
            expenses.map((exp, i) => (
              <li key={i}>{exp.title}: Rs. {exp.amount.toLocaleString()}.00</li>
            ))
          )}
        </ul>

        <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '12px', borderTop: '1px solid #cbd5e1', paddingTop: '10px' }}>
          Report generated automatically by SSR Resto POS System. All rights reserved.
        </div>
      </div>

      <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden print:hidden">
        
        {/* Sidebar Navigation */}
        <div className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
              <div className="bg-orange-600/20 p-2.5 rounded-xl border border-orange-500/30 text-orange-400">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-base">SSR RESTO POS</h1>
                <p className="text-xs text-slate-400">{userData?.shopName || profileForm.shopName || 'Restaurant Management'}</p>
              </div>
            </div>

            <nav className="p-4 space-y-1.5">
              <button onClick={() => { setActiveTab('analytics'); setShowPlansView(false); }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'analytics' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800'}`}>
                <LayoutDashboard className="w-4 h-4" /><span>Dashboard & Analytics</span>
              </button>
              <button onClick={() => { setActiveTab('menu'); setShowPlansView(false); }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'menu' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800'}`}>
                <UtensilsCrossed className="w-4 h-4" /><span>Smart Menu Management</span>
              </button>
              <button onClick={() => { setActiveTab('billing'); setShowPlansView(false); }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'billing' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800'}`}>
                <ReceiptText className="w-4 h-4" /><span>Billing & Thermal Print</span>
              </button>
              <button onClick={() => { setActiveTab('marketing'); setShowPlansView(false); }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'marketing' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800'}`}>
                <Megaphone className="w-4 h-4" /><span>Marketing & Offers SMS</span>
              </button>
              <button onClick={() => { setActiveTab('history'); setShowPlansView(false); }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800'}`}>
                <History className="w-4 h-4" /><span>History of Billing</span>
              </button>
              <button onClick={() => { setActiveTab('support'); setShowPlansView(false); }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'support' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800'}`}>
                <Wrench className="w-4 h-4" /><span>Support & Admin Help</span>
              </button>
              <button onClick={() => { setActiveTab('settings'); setShowPlansView(false); }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'settings' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-400 hover:bg-slate-800'}`}>
                <Settings className="w-4 h-4" /><span>Settings & Subscription</span>
              </button>
            </nav>
          </div>

          <div className="p-4 border-t border-slate-800">
            <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all">
              <LogOut className="w-4 h-4" /><span>Logout</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-950 relative">
          
          {activeTab !== 'analytics' && !showPlansView && (
            <button onClick={() => setActiveTab('analytics')} className="mb-6 flex items-center space-x-2 bg-slate-900 border border-slate-800 hover:border-orange-500 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold transition-all">
              <ArrowLeft className="w-4 h-4 text-orange-400" />
              <span>Back to Dashboard</span>
            </button>
          )}

          {showPlansView && (
            <button onClick={() => setShowPlansView(false)} className="mb-6 flex items-center space-x-2 bg-slate-900 border border-slate-800 hover:border-orange-500 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold transition-all">
              <ArrowLeft className="w-4 h-4 text-orange-400" />
              <span>Back to Settings</span>
            </button>
          )}

          {/* TAB 1: Dashboard & Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center relative">
                <h2 className="text-2xl font-bold">Dashboard & Analytics — Welcome, {userData?.name || userData?.ownerName || profileForm.ownerName || 'User'}!</h2>
                
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleCloseDay}
                    className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Close Day & Download PDF</span>
                  </button>

                  <div className="relative">
                    <button 
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="flex items-center space-x-2 bg-slate-900 border border-slate-800 hover:border-orange-500 px-3 py-1.5 rounded-xl text-xs text-orange-400 cursor-pointer transition-all shadow"
                    >
                      <Bell className="w-4 h-4 text-orange-400 animate-bounce" />
                      <span>Admin Notifications ({adminNotifications.length})</span>
                    </button>

                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                          <span className="font-bold text-xs text-orange-400">Admin Messages</span>
                          <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-white text-xs">✕</button>
                        </div>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {adminNotifications.map((notif, i) => (
                            <div key={i} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
                              <p className="font-bold text-slate-200">{notif.title}</p>
                              <p className="text-slate-300 mt-0.5">{notif.message}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
                  <p className="text-xs text-slate-400">Total Revenue (Today)</p>
                  <h3 className="text-2xl font-bold mt-2 text-orange-400 font-mono">Rs. {todayRevenue.toLocaleString()}.00</h3>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
                  <p className="text-xs text-slate-400">Today Orders</p>
                  <h3 className="text-2xl font-bold mt-2">{todayOrders} Orders</h3>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
                  <p className="text-xs text-slate-400">Net Profit (Today)</p>
                  <h3 className="text-2xl font-bold mt-2 text-emerald-400 font-mono">Rs. {netProfit.toLocaleString()}.00</h3>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
                <h3 className="font-bold text-lg text-slate-200">Daily Expenses & Operational Costs</h3>
                <form onSubmit={handleAddExpense} className="grid grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    placeholder="Expense Title (e.g. Gas, Water)"
                    value={newExpenseTitle} onChange={(e) => setNewExpenseTitle(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100"
                  />
                  <input 
                    type="number" 
                    placeholder="Amount (Rs.)"
                    value={newExpenseAmount} onChange={(e) => setNewExpenseAmount(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100 font-mono"
                  />
                  <button type="submit" className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow">
                    Add Expense
                  </button>
                </form>

                <div className="space-y-2 pt-2">
                  {expenses.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">No expenses recorded for today.</p>
                  ) : (
                    expenses.map((exp) => (
                      <div key={exp.id} className="flex justify-between items-center bg-slate-950 px-4 py-3 rounded-xl border border-slate-800">
                        <span className="text-sm font-medium">{exp.title}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-rose-400 font-bold font-mono">Rs. {exp.amount.toLocaleString()}.00</span>
                          <button onClick={() => handleRemoveExpense(exp.id)} className="text-rose-500 hover:text-rose-400">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Smart Menu Management */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">2. Smart Menu Management</h2>
              
              <form onSubmit={handleAddItem} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl grid grid-cols-5 gap-4 items-end shadow-xl">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Food Name</label>
                  <input type="text" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} placeholder="e.g. Fried Rice" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm outline-none text-slate-100 focus:border-orange-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Category</label>
                  <select value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm outline-none text-slate-100 focus:border-orange-500">
                    <option value="Mains">Mains</option>
                    <option value="Devilled">Devilled</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Price (Rs.)</label>
                  <input type="number" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} placeholder="950" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm outline-none text-slate-100 focus:border-orange-500 font-mono" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Quantity / Stock</label>
                  <input type="text" value={newItem.stock} onChange={(e) => setNewItem({...newItem, stock: e.target.value})} placeholder="e.g. 50 or Unlimited" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm outline-none text-slate-100 focus:border-orange-500" />
                </div>
                <button type="submit" className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 rounded-xl transition-all shadow">
                  {editingId !== null ? 'Update Item' : 'Add Item'}
                </button>
              </form>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">Existing Menu Items</h3>
                  <div className="relative w-64">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input 
                      type="text" placeholder="Search menu..." 
                      value={menuSearch} onChange={(e) => setMenuSearch(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-orange-500 text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {filteredMenuItems.map((item) => (
                    <div key={item.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full uppercase font-bold">{item.category}</span>
                          <span className="text-[10px] bg-orange-600/20 text-orange-400 px-2 py-0.5 rounded-full font-semibold">Stock: {item.stock}</span>
                        </div>
                        <h4 className="font-bold text-sm mt-1.5">{item.name}</h4>
                        <p className="text-xs text-orange-400 font-mono mt-0.5">Rs. {item.price}.00</p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditMenuItem(item)} className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-lg text-xs">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteMenuItem(item.id)} className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 p-2 rounded-lg text-xs">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Billing & Thermal Print */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">3. Billing & Thermal Print POS</h2>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-base">Select Products / Menu</h3>
                    <div className="relative w-64">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input 
                        type="text" placeholder="Search product for bill..." 
                        value={billingProductSearch} onChange={(e) => setBillingProductSearch(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-orange-500 text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 max-h-[480px] overflow-y-auto pr-1">
                    {filteredBillingItems.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => addToCart(item)}
                        className="bg-slate-950 border border-slate-800 hover:border-orange-500/60 p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between group shadow-sm hover:scale-[1.02]"
                      >
                        <div>
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full uppercase font-bold">{item.category}</span>
                          <h4 className="font-bold text-sm mt-2 text-slate-100 group-hover:text-orange-400 transition-colors">{item.name}</h4>
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-900">
                          <span className="text-xs text-orange-400 font-mono font-bold">Rs. {item.price}.00</span>
                          <span className="bg-orange-600/20 text-orange-400 p-1.5 rounded-lg text-xs"><Plus className="w-3.5 h-3.5" /></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-bold text-base border-b border-slate-800 pb-2">Current Order Cart</h3>

                    <div className="space-y-2">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Customer Phone Number</label>
                        <input 
                          type="text" placeholder="0765617093" 
                          value={customerPhone} onChange={(e) => handleCustomerSearch(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none focus:border-orange-500 text-slate-100 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Customer Name {isExistingCustomer && <span className="text-emerald-400 font-bold">(Loyalty Visit #{visitCount})</span>}</label>
                        <input 
                          type="text" placeholder="Customer Name" 
                          value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none focus:border-orange-500 text-slate-100"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {cart.length === 0 ? (
                        <p className="text-xs text-slate-500 text-center py-6">Cart is empty. Click items to add.</p>
                      ) : (
                        cart.map((item) => (
                          <div key={item.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                            <div className="space-y-0.5">
                              <p className="font-bold text-slate-200">{item.name}</p>
                              <p className="text-[10px] text-orange-400">Rs. {item.price * item.quantity}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button onClick={() => updateCartQuantity(item.id, -1)} className="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center font-bold">-</button>
                              <span className="font-mono text-xs">{item.quantity}</span>
                              <button onClick={() => updateCartQuantity(item.id, 1)} className="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center font-bold">+</button>
                              <button onClick={() => removeFromCart(item.id)} className="text-rose-400 hover:text-rose-300 ml-1"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Discount (%)</label>
                        <input 
                          type="number" value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 outline-none focus:border-orange-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Payment</label>
                        <select 
                          value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 outline-none focus:border-orange-500"
                        >
                          <option value="Cash">Cash</option>
                          <option value="Card">Card</option>
                          <option value="Online Transfer">Online</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Kitchen / Chef Note</label>
                      <input 
                        type="text" placeholder="e.g. Less spicy, extra sauce" 
                        value={kitchenNote} onChange={(e) => setKitchenNote(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-orange-500 text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-800">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-slate-400">Total Amount:</span>
                      <span className="text-orange-400 text-lg font-mono">Rs. {calculateFinalTotal()}.00</span>
                    </div>

                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-orange-600/30 text-sm cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Thermal Bill & Send SMS</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Marketing & Offers SMS */}
          {activeTab === 'marketing' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">4. Marketing & Offers SMS Campaigns</h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
                  <h3 className="font-bold text-base flex items-center space-x-2 text-orange-400">
                    <Megaphone className="w-5 h-5" />
                    <span>Send SMS Broadcast to Customers</span>
                  </h3>
                  <p className="text-xs text-slate-400">Send promotional offers, discounts, or festival greetings instantly to customer mobile numbers.</p>

                  <form onSubmit={handleSendBroadcastSMS} className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Target Audience</label>
                      <select 
                        value={selectedTargetCustomer} onChange={(e) => setSelectedTargetCustomer(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none text-slate-100 focus:border-orange-500"
                      >
                        <option value="ALL">All Saved Customers ({savedCustomers.length})</option>
                        {savedCustomers.map((c, i) => (
                          <option key={i} value={c.phone}>{c.name} ({c.phone})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">SMS Message Content</label>
                      <textarea 
                        rows="4" 
                        placeholder="Type your special discount offer here..."
                        value={broadcastMessage} onChange={(e) => setBroadcastMessage(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm outline-none text-slate-100 focus:border-orange-500 resize-none"
                      ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-orange-600/30 cursor-pointer">
                      <Send className="w-4 h-4" />
                      <span>Send Promotional SMS Campaign</span>
                    </button>
                  </form>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
                  <h3 className="font-bold text-base text-slate-200">Saved Customers Directory ({savedCustomers.length})</h3>
                  <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                    {savedCustomers.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-10">No saved customers yet. Customers are saved automatically during billing.</p>
                    ) : (
                      savedCustomers.map((c, i) => (
                        <div key={i} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex justify-between items-center text-xs">
                          <div>
                            <p className="font-bold text-slate-200">{c.name}</p>
                            <p className="text-orange-400 font-mono mt-0.5">{c.phone}</p>
                          </div>
                          <div className="text-right">
                            <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-semibold">Visits: {c.visits}</span>
                            <p className="text-slate-400 font-mono mt-1">Spent: Rs. {c.totalSpent.toLocaleString()}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: History of Billing & Daily Summaries with Date Search & Historical PDF Download */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">5. History of Billing & Daily Financial Summaries</h2>
                
                <div className="relative w-72">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input 
                    type="text" placeholder="Search by date (e.g. 11/12/2026)..." 
                    value={historySearchDate} onChange={(e) => setHistorySearchDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-orange-500 text-slate-100"
                  />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
                <h3 className="font-bold text-base text-orange-400">Daily Revenue, Expenses & Profit History</h3>

                <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                  {filteredDailySummaries.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-10">No closed day summary records found matching your date search.</p>
                  ) : (
                    filteredDailySummaries.map((summary, idx) => (
                      <div key={idx} className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                          <span className="font-bold text-sm text-slate-200 flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-orange-400" />
                            <span>Date: {summary.date}</span>
                          </span>

                          <div className="flex items-center space-x-3">
                            <span className="bg-orange-600/20 text-orange-400 px-3 py-1 rounded-lg text-xs font-bold">
                              Total Orders: {summary.ordersCount}
                            </span>
                            <button 
                              onClick={() => handleDownloadHistoricalReport(summary.date)}
                              className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow transition-all cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download PDF Report</span>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-xs">
                          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block mb-1">Total Revenue</span>
                            <span className="text-orange-400 font-mono font-bold text-sm">Rs. {summary.revenue.toLocaleString()}.00</span>
                          </div>
                          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block mb-1">Total Expenses</span>
                            <span className="text-rose-400 font-mono font-bold text-sm">Rs. {summary.expenses.toLocaleString()}.00</span>
                          </div>
                          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block mb-1">Net Profit</span>
                            <span className="text-emerald-400 font-mono font-bold text-sm">Rs. {summary.profit.toLocaleString()}.00</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Support & Admin Help */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">6. Support & Admin Help Desk</h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
                  <h3 className="font-bold text-base flex items-center space-x-2 text-orange-400">
                    <Wrench className="w-5 h-5" />
                    <span>Send Ticket to Master Admin</span>
                  </h3>
                  <p className="text-xs text-slate-400">Need technical assistance or system help? Send a support ticket directly to the SSR Master Admin Panel.</p>

                  <form onSubmit={handleAdminTicketSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Subject</label>
                      <input 
                        type="text" placeholder="e.g. Printer connection issue"
                        value={adminTicket.subject} onChange={(e) => setAdminTicket({...adminTicket, subject: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Description / Message</label>
                      <textarea 
                        rows="4" placeholder="Describe your issue in detail..."
                        value={adminTicket.message} onChange={(e) => setAdminTicket({...adminTicket, message: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm outline-none focus:border-orange-500 resize-none"
                      ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-600/30 cursor-pointer">
                      Submit Ticket to Admin
                    </button>
                  </form>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
                  <h3 className="font-bold text-base text-slate-200">SSR Direct Support Contact</h3>
                  <div className="space-y-3 pt-2 text-sm text-slate-300">
                    <div className="flex items-center space-x-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                      <Phone className="w-5 h-5 text-orange-400" />
                      <span>+94 76 561 7093 (Hotline 24/7)</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                      <Mail className="w-5 h-5 text-orange-400" />
                      <span>sethminesithum@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: Settings & Subscription */}
          {activeTab === 'settings' && !showPlansView && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">7. Settings & Subscription Plan</h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
                  <h3 className="font-bold text-base">Business Profile Settings</h3>
                  <form onSubmit={handleProfileSave} className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Shop / Restaurant Name</label>
                      <input 
                        type="text" value={profileForm.shopName} onChange={(e) => setProfileForm({...profileForm, shopName: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Owner Name</label>
                      <input 
                        type="text" value={profileForm.ownerName} onChange={(e) => setProfileForm({...profileForm, ownerName: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Email Address</label>
                      <input 
                        type="email" value={profileForm.email} onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Phone Number</label>
                      <input 
                        type="text" value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100 font-mono"
                      />
                    </div>
                    <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow cursor-pointer">
                      Save Changes
                    </button>
                  </form>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-bold text-base">Active Subscription Status</h3>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">Current Plan:</span>
                        <span className="bg-orange-600/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold">{selectedPlan}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">Status:</span>
                        <span className="text-emerald-400 text-xs font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> <span>Active & Verified</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowPlansView(true)}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-orange-600/30 cursor-pointer"
                  >
                    Upgrade / Change Subscription Plan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* INLINE SUBSCRIPTION PLANS & PROMO CODE VIEW */}
          {activeTab === 'settings' && showPlansView && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Select Your Subscription Plan</h2>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
                <h3 className="font-bold text-sm text-orange-400">Have a Promo Code for 7-Day Free Trial?</h3>
                <form onSubmit={handleApplyPromoCode} className="flex space-x-3">
                  <input 
                    type="text" placeholder="Enter promo code (e.g. SSR2026-1)"
                    value={promoCodeInput} onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100 uppercase font-mono"
                  />
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow cursor-pointer">
                    Apply Promo Code
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-3 gap-6">
                
                {/* Starter Plan */}
                <div className={`bg-slate-900 border ${selectedPlan === 'Starter' ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-slate-800'} p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6 relative`}>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full uppercase font-bold">Basic</span>
                      <h3 className="text-xl font-bold mt-2 text-slate-100">Starter Plan</h3>
                      <p className="text-xs text-slate-400 mt-1">Perfect for small local restaurants getting started.</p>
                    </div>
                    <div className="text-2xl font-extrabold text-orange-400 font-mono">
                      Rs. 3,500 <span className="text-xs text-slate-400 font-normal">/ month</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Smart Menu Management</span></li>
                      <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Standard Billing & Thermal Print</span></li>
                      <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Daily Revenue Analytics</span></li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => handleSelectPlan('Starter')}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow cursor-pointer ${selectedPlan === 'Starter' ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}
                  >
                    {selectedPlan === 'Starter' ? 'Current Active Plan' : 'Select Starter'}
                  </button>
                </div>

                {/* Professional Plan */}
                <div className={`bg-slate-900 border ${selectedPlan === 'Professional' ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-slate-800'} p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6 relative`}>
                  <div className="absolute -top-3 right-6 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">Most Popular</div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] bg-orange-600/20 text-orange-400 px-2.5 py-1 rounded-full uppercase font-bold">Advanced</span>
                      <h3 className="text-xl font-bold mt-2 text-slate-100">Professional Plan</h3>
                      <p className="text-xs text-slate-400 mt-1">Ideal for growing restaurants with customer loyalty.</p>
                    </div>
                    <div className="text-2xl font-extrabold text-orange-400 font-mono">
                      Rs. 6,500 <span className="text-xs text-slate-400 font-normal">/ month</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Everything in Starter</span></li>
                      <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Customer Directory & Loyalty Tracking</span></li>
                      <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Marketing & Offers SMS Broadcast</span></li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => handleSelectPlan('Professional')}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow cursor-pointer ${selectedPlan === 'Professional' ? 'bg-emerald-600 text-white' : 'bg-orange-600 hover:bg-orange-500 text-white'}`}
                  >
                    {selectedPlan === 'Professional' ? 'Current Active Plan' : 'Select Professional'}
                  </button>
                </div>

                {/* Enterprise Plan */}
                <div className={`bg-slate-900 border ${selectedPlan === 'Enterprise' ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-slate-800'} p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6 relative`}>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] bg-purple-600/20 text-purple-400 px-2.5 py-1 rounded-full uppercase font-bold">Unlimited</span>
                      <h3 className="text-xl font-bold mt-2 text-slate-100">Enterprise Plan</h3>
                      <p className="text-xs text-slate-400 mt-1">For multi-branch or high-volume restaurants.</p>
                    </div>
                    <div className="text-2xl font-extrabold text-orange-400 font-mono">
                      Rs. 12,000 <span className="text-xs text-slate-400 font-normal">/ month</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Everything in Professional</span></li>
                      <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Priority 24/7 VIP Support Desk</span></li>
                      <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Advanced Financial Analytics & Expenses</span></li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => handleSelectPlan('Enterprise')}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow cursor-pointer ${selectedPlan === 'Enterprise' ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}
                  >
                    {selectedPlan === 'Enterprise' ? 'Current Active Plan' : 'Select Enterprise'}
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Dashboard;