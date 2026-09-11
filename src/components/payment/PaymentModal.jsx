import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { CreditCard, CheckCircle2, ArrowRight, X } from 'lucide-react';

export const PaymentModal = ({ invoice, isOpen, onClose }) => {
  const { payFeeInvoice } = useLMS();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !invoice) return null;

  const applyCoupon = () => {
    const c = coupon.trim().toUpperCase();
    if (c === 'LMS50') setDiscount(50);
    else if (c === 'TECH2026') setDiscount(100);
    else setDiscount(0);
  };

  const finalPrice = Math.max(0, invoice.amount - discount);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      payFeeInvoice(invoice.invoiceId, coupon);
      setProcessing(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in zoom-in-95">
        <div className="p-5 bg-gradient-to-r from-purple-700 to-purple-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <CreditCard className="w-5 h-5" />
            <h3 className="font-bold text-base">Secure Fee Payment Gateway</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Invoice ID:</span>
              <span className="font-mono font-bold text-slate-800">{invoice.invoiceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Student:</span>
              <span className="font-bold text-slate-800">{invoice.studentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Course:</span>
              <span className="font-bold text-slate-800">{invoice.courseName}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Discount Coupon</label>
            <div className="flex space-x-2">
              <input autoComplete="off"
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Try 'LMS50' or 'TECH2026'"
                className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono uppercase focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button
                onClick={applyCoupon}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Apply
              </button>
            </div>
            {discount > 0 && (
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Coupon Applied! ₹{discount} Instant Discount</span>
              </p>
            )}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-1.5 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Course Fee:</span>
              <span>₹{invoice.amount}</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-medium">
              <span>Discounts:</span>
              <span>- ₹{discount}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Payable:</span>
              <span className="text-purple-700">₹{finalPrice}</span>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={processing}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            {processing ? (
              <span>Processing Payment Gateway...</span>
            ) : (
              <>
                <span>Pay ₹{finalPrice} & Confirm</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
