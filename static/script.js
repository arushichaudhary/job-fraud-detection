// ---------- Theme toggle (light "kiss" / dusk "kiss") ----------
const root = document.documentElement;
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');
document.getElementById('themeToggle').addEventListener('click', () => {
  root.classList.toggle('dark');
  const isDark = root.classList.contains('dark');
  iconSun.classList.toggle('hidden', isDark);
  iconMoon.classList.toggle('hidden', !isDark);
});

// ---------- Completion ring ----------
const form = document.getElementById('jobForm');
const fieldIds = ['title','location','department','ben','emptype','exp','edu','indu','func','profile','req','des'];
const ring = document.getElementById('ringFill');
const ringPct = document.getElementById('ringPct');
const ringNote = document.getElementById('ringNote');
const CIRC = 169.6;

function updateRing() {
  const filled = fieldIds.filter(id => {
    const el = document.getElementById(id);
    return el && el.value.trim().length > 0;
  }).length;
  const pct = Math.round((filled / fieldIds.length) * 100);
  ring.style.strokeDashoffset = CIRC - (CIRC * pct / 100);
  ringPct.textContent = pct;
  if (pct === 0) ringNote.textContent = 'Add a few details below to begin.';
  else if (pct < 40) ringNote.textContent = 'A good start — a few more details will sharpen the read.';
  else if (pct < 80) ringNote.textContent = 'Looking good, keep going for a sharper read.';
  else ringNote.textContent = 'Great detail — ready for an accurate check.';
}
fieldIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', updateRing);
});

// ---------- Character counters ----------
function bindCounter(fieldId, countId, suffix) {
  const field = document.getElementById(fieldId);
  const count = document.getElementById(countId);
  field.addEventListener('input', () => {
    count.textContent = field.value.length;
  });
}
bindCounter('profile', 'profileCount');
bindCounter('req', 'reqCount');
bindCounter('des', 'desCount');

// ---------- Sample data ----------
const goodSample = {
  title: 'Senior Backend Engineer',
  location: 'Bengaluru, Karnataka, India',
  department: 'Engineering',
  ben: 'Health insurance, paid time off, hybrid work options, annual learning budget',
  emptype: 'Fulltime',
  exp: 'Mid-senior level',
  edu: "Bachelor's degree in Computer Science or related field",
  indu: 'Information Technology',
  func: 'Engineering',
  profile: "We're a 200-person fintech company building payment infrastructure for small businesses across South Asia. Our engineering team is spread across three offices and ships weekly.",
  req: '5+ years building backend services in Python or Go, experience with distributed systems, comfortable owning a service end to end, strong communication with cross-functional teams.',
  des: "You'll design and maintain core payment APIs, mentor two junior engineers, and work closely with product on the roadmap. We run a paid two-week trial sprint before any offer, and interviews happen on video call with named team members."
};
const badSample = {
  title: 'Work From Home — Earn $5000/Week, No Experience Needed!!',
  location: 'Remote / Anywhere',
  department: '',
  ben: 'Unlimited earning potential, be your own boss',
  emptype: 'Other',
  exp: 'Not applicable',
  edu: '',
  indu: 'Other',
  func: 'Other',
  profile: 'Top international company looking for serious people only. Limited spots available, hiring today.',
  req: 'Must have a bank account. A small registration fee of $49 is required to access training materials before you start.',
  des: 'Click the link sent on WhatsApp to begin. You will need to provide your bank details to receive your first payment in advance. Hurry, this offer closes in 24 hours.'
};

function fillSample(data) {
  Object.entries(data).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.value = value;
  });
  updateRing();
  ['profile','req','des'].forEach(id => {
    document.getElementById(id).dispatchEvent(new Event('input'));
  });
  document.getElementById('check').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.getElementById('fillGood').addEventListener('click', () => fillSample(goodSample));
document.getElementById('fillBad').addEventListener('click', () => fillSample(badSample));
document.getElementById('clearForm').addEventListener('click', () => {
  form.reset();
  updateRing();
  ['profile','req','des'].forEach(id => document.getElementById(id).dispatchEvent(new Event('input')));
});

// ---------- Modal ----------
const modal = document.getElementById('myModal');
if (modal) {
  const closeModal = () => modal.remove();
  modal.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeModal));
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

updateRing();
