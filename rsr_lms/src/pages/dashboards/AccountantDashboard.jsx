import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { DollarSign, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

export const AccountantDashboard = ({ onOpenPayment }) => {
  const { fees, setActiveTab } = useLMS();

  const collected = fees.filter(f => f.status === 'Paid').reduce((a, c) => a + (c.paidAmount || c.amount), 0);
  const pending = fees.filter(f => f.status === 'Pending').reduce((a, c) => a + c.amount, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-purple-950 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold rounded-full">
            FINANCE & ACCOUNTS
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Fee Management & Billing</h1>
          <p className="text-sm text-amber-100 max-w-xl mt-1">
            Monitor institutional fee collections, pending student dues, automated receipts, and coupon discount campaigns.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total Collected Fees</span>
          <h3 className="text-2xl font-extrabold text-emerald-600 mt-2">₹{collected.toLocaleString()}</h3>
          <p className="text-xs text-slate-400 mt-1">Direct bank & UPI settlements</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Pending Dues Receivable</span>
          <h3 className="text-2xl font-extrabold text-amber-600 mt-2">₹{pending.toLocaleString()}</h3>
          <p className="text-xs text-slate-400 mt-1">1 active invoice pending</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Active Promo Coupons</span>
          <h3 className="text-2xl font-extrabold text-purple-600 mt-2">LMS50 • TECH2026</h3>
          <p className="text-xs text-slate-400 mt-1">Up to ₹100 instant discount</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-4">Student Invoices Ledger</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Invoice ID</th>
                <th className="p-3">Student</th>
                <th className="p-3">Course</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fees.map(f => (
                <tr key={f.invoiceId} className="hover:bg-slate-50/50">
                  <td className="p-3 font-mono font-bold text-purple-700">{f.invoiceId}</td>
                  <td className="p-3 font-semibold text-slate-800">{f.studentName}</td>
                  <td className="p-3 text-slate-600">{f.courseName}</td>
                  <td className="p-3 font-extrabold text-slate-900">₹{f.paidAmount || f.amount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      f.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {f.status === 'Pending' ? (
                      <button 
                        onClick={() => onOpenPayment(f)}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-slate-400">Settled (TXN Verified)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
