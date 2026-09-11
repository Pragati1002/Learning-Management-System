import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  GraduationCap,
  Shield,
  BookOpen,
  Lock,
  Mail,
  User,
  ArrowRight,
  Building,
  Phone
} from 'lucide-react';

export const AuthPage = () => {
  const { login, signup, courses } = useLMS();

  const [portal, setPortal] = useState('student');
  const [mode, setMode] = useState('login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [orgName, setOrgName] = useState('');
  const [mobile, setMobile] = useState('');
  const [chosenCourse, setChosenCourse] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [error, setError] = useState('');

  const isAdmin = portal === 'admin';

  const handleSwitchPortal = (targetPortal) => {
    setPortal(targetPortal);
    setMode('login');
    setError('');

    setEmail('');
    setPassword('');
    setName('');
    setMobile('');
    setChosenCourse('');
    setAgreedToTerms(false);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setError('');

    setEmail('');
    setPassword('');
    setName('');
    setMobile('');
    setChosenCourse('');
    setAgreedToTerms(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // =========================
    // REGISTER
    // =========================
    if (mode === 'register') {
      if (
        !name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !mobile.trim()
      ) {
        setError('Please fill in all required fields.');
        return;
      }

      if (!isAdmin && !chosenCourse) {
        setError('Please choose a course to get started.');
        return;
      }

      if (!agreedToTerms) {
        setError('Please agree to the Terms & Conditions to continue.');
        return;
      }

      try {
        /*
         * IMPORTANT:
         * We send chosenCourse to signup so the backend/context
         * can enroll the new student in that course.
         */
       const result = await signup(
  name,
  email,
  password,
  portal,
  chosenCourse
);

        /*
         * Supports both:
         * { success: true, message: '...' }
         * and older boolean true/false responses.
         */
        const success =
          typeof result === 'boolean'
            ? result
            : result?.success;

        if (!success) {
          setError(
            typeof result === 'object' && result?.message
              ? result.message
              : 'Registration failed. Please try again.'
          );
        }
      } catch (err) {
        setError(err.message || 'Registration failed. Please try again.');
      }

      return;
    }

    // =========================
    // LOGIN
    // =========================
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      const result = await login(
        email.trim(),
        password
      );

      /*
       * Supports both:
       * { success: true, message: '...' }
       * and older boolean true/false responses.
       */
      const success =
        typeof result === 'boolean'
          ? result
          : result?.success;

      if (!success) {
        setError(
          typeof result === 'object' && result?.message
            ? result.message
            : 'Invalid email or password. Please try again.'
        );
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-purple-50/40 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">

      {/* =========================
          BRAND HEADER
      ========================== */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2 mb-4">

        <div className="inline-flex items-center space-x-2 p-3 bg-gradient-to-tr from-purple-600 via-purple-600 to-purple-600 text-white rounded-3xl shadow-xl shadow-purple-500/25">
          <GraduationCap className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-800 via-purple-800 to-purple-800 bg-clip-text text-transparent">
          RSR LMS
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto font-medium">
          Complete Learning Management System for Institutes & Online Learners
        </p>
      </div>

      {/* =========================
          MAIN CONTAINER
      ========================== */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">

        {/* =========================
            PORTAL SELECTOR
        ========================== */}
        <div className="bg-slate-200/80 p-1.5 rounded-2xl flex space-x-1.5 mb-6 shadow-inner">

          <button
            type="button"
            onClick={() => handleSwitchPortal('student')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
              !isAdmin
                ? 'bg-white text-purple-700 shadow-md shadow-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Student Portal</span>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchPortal('admin')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
              isAdmin
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4 text-purple-400" />
            <span>Admin / Trainer Portal</span>
          </button>

        </div>

        {/* =========================
            AUTH CARD
        ========================== */}
        <div className="bg-white py-8 px-6 sm:px-8 shadow-2xl rounded-3xl border border-purple-200 shadow-purple-500/5">

          {/* HEADER */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">

            <div className="flex items-center space-x-2.5">

              <div className="p-2 rounded-xl text-white bg-purple-600">
                {isAdmin ? (
                  <Shield className="w-5 h-5" />
                ) : (
                  <BookOpen className="w-5 h-5" />
                )}
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {isAdmin
                    ? 'Administrator Portal'
                    : 'Student Learner Portal'}
                </h2>

                <p className="text-xs text-slate-500">
                  {mode === 'login'
                    ? 'Sign in to access RSR LMS'
                    : 'Create a new account'}
                </p>
              </div>

            </div>

            {/* LOGIN / REGISTER */}
            <div className="bg-slate-100 p-1 rounded-xl flex text-xs font-bold">

              <button
                type="button"
                onClick={() => handleModeChange('login')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('register')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  mode === 'register'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Register
              </button>

            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* =========================
              FORM
          ========================== */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* REGISTER FIELDS */}
            {mode === 'register' && (
              <>
                {/* FULL NAME */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Full Name
                  </label>

                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

                    <input autoComplete="off"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={
                        isAdmin
                          ? 'e.g. Dr. Rajesh Sharma'
                          : 'e.g. Aarav Patel'
                      }
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* INSTITUTE NAME */}
                {isAdmin && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Institute / Academy Name
                    </label>

                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

                      <input autoComplete="off"
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="e.g. RSR Academy of Excellence"
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* MOBILE */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Mobile Number
                  </label>

                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

                    <input autoComplete="off"
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="9876543210"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* =========================
                    COURSE SELECTION
                ========================== */}
                {!isAdmin && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Choose Course
                    </label>

                    <div className="relative">
                      <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />

                      <select
                        required
                        value={chosenCourse}
                        onChange={(e) => setChosenCourse(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none bg-white"
                      >
                        <option value="" disabled>
                          {courses?.length
                            ? 'Select a course'
                            : 'Loading courses...'}
                        </option>

                        {(courses || []).map((course) => (
                          <option
                            key={course.id}
                            value={course.id}
                          >
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {!courses?.length && (
                      <p className="mt-1 text-[11px] text-amber-600">
                        Courses are loading. Please wait a moment and try again.
                      </p>
                    )}
                  </div>
                )}
              </>
            )}

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {isAdmin
                  ? 'Administrator Email'
                  : 'Student Email Address'}
              </label>

              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

                <input autoComplete="off"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    isAdmin
                      ? 'admin@lms.com'
                      : 'student@lms.com'
                  }
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Password
              </label>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

                <input autoComplete="off"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* TERMS */}
            {mode === 'register' && (
              <label className="flex items-start space-x-2 text-xs text-slate-600 cursor-pointer">

                <input autoComplete="off"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) =>
                    setAgreedToTerms(e.target.checked)
                  }
                  className="mt-0.5 w-3.5 h-3.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />

                <span>
                  I agree to the{' '}
                  <span className="font-semibold text-slate-800">
                    Terms & Conditions
                  </span>{' '}
                  and Privacy Policy
                </span>

              </label>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className={`w-full py-3 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 ${
                isAdmin
                  ? 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'
                  : 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20'
              }`}
            >
              <span>
                {mode === 'register'
                  ? isAdmin
                    ? 'Register Admin Account'
                    : 'Register Student Account'
                  : isAdmin
                    ? 'Sign In as Administrator'
                    : 'Sign In as Student'}
              </span>

              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* BOTTOM SWITCH */}
          <div className="text-center pt-4 border-t border-slate-100 mt-5">

            <button
              type="button"
              onClick={() =>
                handleModeChange(
                  mode === 'login'
                    ? 'register'
                    : 'login'
                )
              }
              className="text-xs text-purple-600 hover:underline font-semibold"
            >
              {mode === 'login'
                ? isAdmin
                  ? "Don't have an admin account? Register as Admin"
                  : 'New to RSR LMS? Create a free Student Account'
                : isAdmin
                  ? 'Already registered as Admin? Sign In'
                  : 'Already have a Student account? Sign In'}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};