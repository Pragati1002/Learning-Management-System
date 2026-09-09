const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const normalize = (value) => {
  if (Array.isArray(value)) return value.map(normalize);
  if (!value || typeof value !== 'object') return value;

  const out = {};
  for (const [key, val] of Object.entries(value)) out[key] = normalize(val);

  if (out._id !== undefined && out.id === undefined) out.id = String(out._id);
  if (out.lessonId !== undefined && out.id === undefined) out.id = String(out.lessonId);
  if (out.moduleId !== undefined && out.id === undefined) out.id = String(out.moduleId);
  if (out.student && typeof out.student === 'object' && out.student.id !== undefined && out.studentId === undefined) {
    out.studentId = String(out.student.id);
  } else if (out.student && typeof out.student !== 'object' && out.studentId === undefined) {
    out.studentId = String(out.student);
  }
  if (out.course && typeof out.course !== 'object' && out.courseId === undefined) out.courseId = String(out.course);
  if (out.quiz && typeof out.quiz !== 'object' && out.quizId === undefined) out.quizId = String(out.quiz);

  return out;
};

async function request(path, { method = 'GET', body, token } = {}) {
  const authToken = token || localStorage.getItem('lms_token');
  const headers = { 'Content-Type': 'application/json' };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  const text = await res.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = { message: text }; }
  }

  if (!res.ok) throw new Error(data?.message || `Request failed (${res.status})`);
  return normalize(data);
}

export default request;
