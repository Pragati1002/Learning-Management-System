const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// App.jsx
save('src/App.jsx', `import React, { useState } from 'react';
import { useLMS } from './context/LMSContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Modals & Drawers
import { AITutorDrawer } from './components/ai/AITutorDrawer';
import { AIQuizModal } from './components/ai/AIQuizModal';
import { CertificateModal } from './components/certificates/CertificateModal';
import { PaymentModal } from './components/payment/PaymentModal';
import { LiveClassModal } from './components/learning/LiveClassModal';

// Dashboards
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { TrainerDashboard } from './pages/dashboards/TrainerDashboard';
import { StudentDashboard } from './pages/dashboards/StudentDashboard';
import { AccountantDashboard } from './pages/dashboards/AccountantDashboard';
import { PlacementDashboard } from './pages/dashboards/PlacementDashboard';

// Pages
import { CourseCatalogPage } from './pages/courses/CourseCatalogPage';
import { CoursePlayerPage } from './pages/courses/CoursePlayerPage';
import { CourseManagerPage } from './pages/courses/CourseManagerPage';
import { BatchAttendancePage } from './pages/batches/BatchAttendancePage';
import { AssessmentPage } from './pages/assessments/AssessmentPage';
import { FeeManagementPage } from './pages/fees/FeeManagementPage';
import { LeadManagementPage } from './pages/crm/LeadManagementPage';
import { PlacementPortalPage } from './pages/crm/PlacementPortalPage';
import { DiscussionPage } from './pages/crm/DiscussionPage';
import { SupportTicketPage } from './pages/crm/SupportTicketPage';
import { CertificateVerifyPage } from './pages/certificates/CertificateVerifyPage';
import { AnalyticsPage } from './pages/reports/AnalyticsPage';

import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export function LMSApp() {
  const { currentUser, activeTab, toastMessage, certificates } = useLMS();

  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [aiQuizOpen, setAiQuizOpen] = useState(false);
  const [selectedCertModal, setSelectedCertModal] = useState(null);
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState(null);
  const [activeLiveClassModal, setActiveLiveClassModal] = useState(null);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        if (currentUser.role === 'admin') return <AdminDashboard />;
        if (currentUser.role === 'trainer') return <TrainerDashboard onOpenLiveClass={setActiveLiveClassModal} />;
        if (currentUser.role === 'student') return <StudentDashboard onOpenLiveClass={setActiveLiveClassModal} onOpenCertificate={setSelectedCertModal} />;
        if (currentUser.role === 'accountant') return <AccountantDashboard onOpenPayment={setSelectedInvoiceForPayment} />;
        if (currentUser.role === 'placement') return <PlacementDashboard />;
        return <StudentDashboard onOpenLiveClass={setActiveLiveClassModal} onOpenCertificate={setSelectedCertModal} />;

      case 'courses-catalog':
        return <CourseCatalogPage />;

      case 'my-learning':
      case 'course-player':
        return <CoursePlayerPage />;

      case 'courses-manage':
        return <CourseManagerPage />;

      case 'batches':
        return <BatchAttendancePage />;

      case 'assessments':
      case 'assessment-take':
        return <AssessmentPage />;

      case 'fees':
        return <FeeManagementPage onOpenPayment={setSelectedInvoiceForPayment} />;

      case 'leads':
        return <LeadManagementPage />;

      case 'placements':
        return <PlacementPortalPage />;

      case 'discussions':
        return <DiscussionPage />;

      case 'tickets':
        return <SupportTicketPage />;

      case 'verify-cert':
        return <CertificateVerifyPage onOpenCertificate={setSelectedCertModal} />;

      case 'certificates':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Earned Verified Credentials</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {certificates.map(c => (
                <div key={c.certificateId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Verified Credential</span>
                  <h3 className="font-bold text-slate-900 text-base">{c.courseName}</h3>
                  <p className="text-xs text-slate-500">Issued: {c.issueDate} • Grade: {c.grade}</p>
                  <p className="text-xs font-mono font-bold text-blue-700">Token: {c.certificateId}</p>
                  <button
                    onClick={() => setSelectedCertModal(c)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    View Official Certificate & Print
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return <AnalyticsPage />;

      default:
        return <StudentDashboard onOpenLiveClass={setActiveLiveClassModal} onOpenCertificate={setSelectedCertModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className={\`flex items-center space-x-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs sm:text-sm font-semibold \${
            toastMessage.type === 'error'
              ? 'bg-red-600 text-white border-red-700 shadow-red-500/20'
              : toastMessage.type === 'info'
              ? 'bg-slate-900 text-white border-slate-800 shadow-slate-900/30'
              : 'bg-emerald-600 text-white border-emerald-700 shadow-emerald-600/30'
          }\`}>
            {toastMessage.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onOpenAITutor={() => setAiTutorOpen(true)}
        onOpenAIQuiz={() => setAiQuizOpen(true)}
      />

      {/* App Body: Sidebar + Main Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Modals & AI Drawers */}
      <AITutorDrawer
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
      />

      <AIQuizModal
        isOpen={aiQuizOpen}
        onClose={() => setAiQuizOpen(false)}
      />

      <CertificateModal
        certificate={selectedCertModal}
        isOpen={!!selectedCertModal}
        onClose={() => setSelectedCertModal(null)}
      />

      <PaymentModal
        invoice={selectedInvoiceForPayment}
        isOpen={!!selectedInvoiceForPayment}
        onClose={() => setSelectedInvoiceForPayment(null)}
      />

      <LiveClassModal
        liveClass={activeLiveClassModal}
        isOpen={!!activeLiveClassModal}
        onClose={() => setActiveLiveClassModal(null)}
      />

      <Footer />
    </div>
  );
}

export default function App() {
  return <LMSApp />;
}
`);

// main.jsx
save('src/main.jsx', `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { LMSProvider } from './context/LMSContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LMSProvider>
      <App />
    </LMSProvider>
  </React.StrictMode>,
);
`);

console.log('Finished writing App.jsx and main.jsx');
