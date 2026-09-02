import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { CheckCircle2 } from 'lucide-react';

export const FeeManagementPage = ({ onOpenPayment }) => {
  const { fees } = useLMS();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Fee & Payment Processing</h1>
        <p className="text-sm text-slate-500 mt-1">Manage course fees, invoice receipts, and promo discounts.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Invoice Number</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Course</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fees.map(f => (
                <tr key={f.invoiceId} className="hover:bg-slate-50/50">
                  <td className="p-3 font-mono font-bold text-blue-700">{f.invoiceId}</td>
                  <td className="p-3 font-bold text-slate-900">{f.studentName}</td>
                  <td className="p-3 text-slate-600">{f.courseName}</td>
                  <td className="p-3 font-extrabold text-slate-900">₹{f.paidAmount || f.amount}</td>
                  <td className="p-3 text-emerald-600 font-semibold">{f.discount ? `-₹${f.discount}` : '₹0'}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      f.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{f.paymentMethod || 'Pending Gateway'}</td>
                  <td className="p-3 text-right">
                    {f.status === 'Pending' ? (
                      <button
                        onClick={() => onOpenPayment(f)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs"
                      >
                        Checkout / Pay
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold flex items-center justify-end space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Receipt Ready</span>
                      </span>
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
