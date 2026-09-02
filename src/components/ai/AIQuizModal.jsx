import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Sparkles, X, ArrowRight, CheckCircle2, AlertCircle, Award, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const TOPIC_BANKS = {
  'SQL Indexing & Query Tuning': [
    {
      id: 1,
      question: 'Which index type is most suitable for range queries (e.g. BETWEEN, <, >) in relational databases?',
      options: ['B-Tree Index', 'Hash Index', 'Full-Text Index', 'Spatial Index'],
      correctAnswer: 0,
      explanation: 'B-Tree indexes store data in sorted order, making them optimal for equality and range-based lookups.'
    },
    {
      id: 2,
      question: 'What is the effect of using "SELECT *" on an indexed table in high-throughput systems?',
      options: [
        'It prevents using covering indexes and increases I/O overhead',
        'It automatically accelerates query speed',
        'It compresses the database table',
        'It disables disk caching'
      ],
      correctAnswer: 0,
      explanation: 'SELECT * fetches all columns from disk, bypassing covering index optimizations.'
    },
    {
      id: 3,
      question: 'Which SQL command analyzes the execution path and cost estimation of a query?',
      options: ['EXPLAIN ANALYZE', 'OPTIMIZE TABLE', 'CHECK INTEGRITY', 'INSPECT PATH'],
      correctAnswer: 0,
      explanation: 'EXPLAIN or EXPLAIN ANALYZE reveals the execution plan and scan strategies chosen by the query planner.'
    }
  ],
  'React Hooks & State Optimization': [
    {
      id: 1,
      question: 'When should you use the useMemo hook in React?',
      options: [
        'To memoize the result of expensive mathematical or filter calculations between re-renders',
        'To trigger DOM side effects after paint',
        'To manage global URL parameters',
        'To replace all useState declarations'
      ],
      correctAnswer: 0,
      explanation: 'useMemo caches the calculated value so it is not recomputed on every component render unless dependencies change.'
    },
    {
      id: 2,
      question: 'What happens when you pass an empty dependency array [] to useEffect?',
      options: [
        'The effect runs only once after the initial mount',
        'The effect runs on every state change',
        'The effect never executes',
        'The component causes an infinite loop'
      ],
      correctAnswer: 0,
      explanation: 'An empty dependency array indicates the effect does not depend on any props or state, running once on mount.'
    },
    {
      id: 3,
      question: 'Which hook is designed for memoizing callback functions to prevent child re-renders?',
      options: ['useCallback', 'useRef', 'useContext', 'useReducer'],
      correctAnswer: 0,
      explanation: 'useCallback returns a memoized version of the callback function that only changes when its dependencies change.'
    }
  ],
  'Machine Learning Loss Functions': [
    {
      id: 1,
      question: 'Which loss function is standard for binary classification models with sigmoid output?',
      options: ['Binary Cross-Entropy (Log Loss)', 'Mean Squared Error (MSE)', 'Hinge Loss', 'Huber Loss'],
      correctAnswer: 0,
      explanation: 'Binary Cross-Entropy quantifies the divergence between predicted probabilities and true binary labels.'
    },
    {
      id: 2,
      question: 'When training a regression model with significant outliers, which loss function is more robust than MSE?',
      options: ['Mean Absolute Error (MAE) or Huber Loss', 'Categorical Cross-Entropy', 'Kullback-Leibler Divergence', 'Softmax Loss'],
      correctAnswer: 0,
      explanation: 'MAE scales linearly with error rather than quadratically, making it much less sensitive to extreme outliers.'
    }
  ],
  'Docker Containers & Kubernetes Pods': [
    {
      id: 1,
      question: 'What is the fundamental unit of deployment in Kubernetes?',
      options: ['Pod', 'Container Image', 'Docker Daemon', 'Ingress Controller'],
      correctAnswer: 0,
      explanation: 'A Pod is the smallest deployable unit in Kubernetes that can contain one or more co-located containers.'
    },
    {
      id: 2,
      question: 'Which Dockerfile instruction creates a new cached image layer and installs packages?',
      options: ['RUN', 'CMD', 'ENTRYPOINT', 'EXPOSE'],
      correctAnswer: 0,
      explanation: 'RUN executes commands in a new layer and creates the intermediate image commit.'
    }
  ],
  'Cybersecurity OWASP Top 10': [
    {
      id: 1,
      question: 'How do you prevent SQL Injection vulnerabilities in backend applications?',
      options: [
        'Use parameterized queries / prepared statements and ORMs with bound variables',
        'Concatenate user strings directly in SQL statements',
        'Disable HTTPS encryption',
        'Use Base64 encoding on query strings'
      ],
      correctAnswer: 0,
      explanation: 'Parameterized queries ensure user input is treated strictly as data parameters, never executable SQL code.'
    },
    {
      id: 2,
      question: 'Which mechanism prevents Cross-Site Scripting (XSS) by restricting where scripts can load from?',
      options: ['Content Security Policy (CSP)', 'CORS headers', 'Bcrypt hashing', 'JSON Web Tokens'],
      correctAnswer: 0,
      explanation: 'CSP is an HTTP response header that restricts script domains and blocks unauthorized inline execution.'
    }
  ]
};

export const AIQuizModal = ({ isOpen, onClose }) => {
  const { addQuiz, submitQuizResult, showToast } = useLMS();

  const [step, setStep] = useState('config'); // 'config' | 'taking' | 'result'
  const [topic, setTopic] = useState('SQL Indexing & Query Tuning');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [scoreData, setScoreData] = useState(null);

  const presetTopics = [
    'SQL Indexing & Query Tuning',
    'React Hooks & State Optimization',
    'Machine Learning Loss Functions',
    'Docker Containers & Kubernetes Pods',
    'Cybersecurity OWASP Top 10'
  ];

  const handleStartGeneration = (selectedTopic) => {
    const t = (selectedTopic || topic).trim();
    if (!t) return;

    const matchedQuestions = TOPIC_BANKS[t] || [
      {
        id: 1,
        question: `What is a fundamental best practice in ${t}?`,
        options: [
          `Modular design, loose coupling, and defensive error handling in ${t}`,
          `Writing monolithic code in a single file without functions`,
          `Disabling automated verification`,
          `Hardcoding secrets in public code`
        ],
        correctAnswer: 0,
        explanation: `Modular design promotes scalability and testability in ${t}.`
      },
      {
        id: 2,
        question: `Which practice ensures high performance and reliability for ${t}?`,
        options: [
          `Profiling bottleneck metrics and establishing automated tests`,
          `Ignoring memory leaks and production logs`,
          `Disabling query caches`,
          `Skipping code reviews`
        ],
        correctAnswer: 0,
        explanation: `Benchmarking and testing ensure continuous reliability in ${t}.`
      }
    ];

    setGeneratedQuestions(matchedQuestions);
    setUserAnswers({});
    setScoreData(null);
    setStep('taking');

    // Also persist into LMS quizzes
    addQuiz({
      title: `AI Exam: ${t}`,
      courseId: 'c_custom',
      courseTitle: `AI Generated: ${t}`,
      durationMinutes: 10,
      passingScore: 70,
      questions: matchedQuestions
    });
  };

  const handleSelectOption = (qId, optionIdx) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    generatedQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) correct++;
    });

    const percentage = Math.round((correct / generatedQuestions.length) * 100);
    const passed = percentage >= 70;

    setScoreData({
      correct,
      total: generatedQuestions.length,
      percentage,
      passed
    });
    setStep('result');

    if (passed) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      showToast(`Passed AI Assessment with ${percentage}%! +50 XP ⭐`, 'success');
    } else {
      showToast(`Assessment completed: ${percentage}%. Review answers below.`, 'info');
    }
  };

  const handleReset = () => {
    setStep('config');
    setUserAnswers({});
    setScoreData(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <Sparkles className="w-5 h-5 text-yellow-200" />
            </div>
            <div>
              <h3 className="font-bold text-base">RSR LMS AI Quiz Generator</h3>
              <p className="text-xs text-teal-100">
                {step === 'config' && 'Instant multiple-choice exam synthesis'}
                {step === 'taking' && `Active Exam: ${topic}`}
                {step === 'result' && 'Exam Evaluation & Results'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CONFIGURATION */}
        {step === 'config' && (
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Enter Any Topic or Skill
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. SQL Indexing, React Hooks, Docker, Kubernetes..."
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">
                Or select popular topics:
              </label>
              <div className="flex flex-wrap gap-2">
                {presetTopics.map((pt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setTopic(pt); }}
                    className={`text-xs px-3 py-1.5 rounded-xl transition-all font-medium border ${
                      topic === pt 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                        : 'bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border-slate-200 text-slate-700'
                    }`}
                  >
                    {pt}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl font-medium">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleStartGeneration(topic)}
                disabled={!topic.trim()}
                className="flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all"
              >
                <span>Generate Questions & Start</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: TAKING THE QUIZ */}
        {step === 'taking' && (
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-500">
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Topic: {topic}
              </span>
              <span>{generatedQuestions.length} Questions • Pass: 70%</span>
            </div>

            <div className="space-y-6">
              {generatedQuestions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                return (
                  <div key={q.id} className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200/90 space-y-3">
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                      {idx + 1}. {q.question}
                    </h4>
                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = userAns === oIdx;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectOption(q.id, oIdx)}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                              isSelected
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-1 ring-emerald-500 shadow-sm'
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="font-bold mr-2 text-slate-400">
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                ← Back to Topic
              </button>
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length < generatedQuestions.length}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all"
              >
                Submit Answers for Instant Evaluation
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: RESULT & EVALUATION */}
        {step === 'result' && scoreData && (
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            <div className={`p-5 rounded-2xl border text-center space-y-2 ${
              scoreData.passed 
                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200' 
                : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
            }`}>
              <div className="inline-flex p-3 rounded-full bg-white shadow-sm">
                {scoreData.passed ? (
                  <Award className="w-8 h-8 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-amber-600" />
                )}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Score: {scoreData.percentage}% ({scoreData.correct}/{scoreData.total} Correct)
              </h3>
              <p className="text-xs font-semibold text-slate-600">
                {scoreData.passed 
                  ? '🎉 Outstanding mastery! You have demonstrated strong competency.' 
                  : 'Score was below 70% passing threshold. Review the explanations below.'}
              </p>
            </div>

            {/* Answer Explanations */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Question Review & Explanations</h4>
              {generatedQuestions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{idx + 1}. {q.question}</span>
                      <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                      </span>
                    </div>
                    <p className="text-slate-600">
                      <strong>Correct Answer:</strong> {q.options[q.correctAnswer]}
                    </p>
                    <p className="text-slate-500 italic bg-white p-2 rounded-lg border border-slate-100">
                      💡 {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Another Topic</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
