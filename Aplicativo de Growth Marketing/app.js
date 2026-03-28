// ============================================================
// GROWTH MARKETING ACADEMY — APP
// ============================================================

// ---------- STORE (localStorage) ----------
const Store = {
  KEY: 'gma_v1',
  defaults() {
    return {
      name: 'Estudante',
      xp: 0,
      level: 1,
      streak: 0,
      lastLogin: null,
      completedLessons: [],
      quizResults: {},       // moduleId → { score, total, perfect }
      toolsUsed: [],
      achievements: [],
      moduleProgress: {},    // moduleId → % lessons done
    };
  },
  get() {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? { ...this.defaults(), ...JSON.parse(raw) } : this.defaults();
    } catch { return this.defaults(); }
  },
  save(data) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  },
  update(fn) {
    const s = this.get();
    fn(s);
    this.save(s);
    return s;
  }
};

// ---------- XP / LEVELS ----------
function getLevel(xp) {
  let lv = LEVELS[0];
  for (const l of LEVELS) { if (xp >= l.xp) lv = l; else break; }
  return lv;
}
function getNextLevel(xp) {
  for (let i = 0; i < LEVELS.length - 1; i++) {
    if (xp < LEVELS[i + 1].xp) return LEVELS[i + 1];
  }
  return null;
}
function xpProgress(xp) {
  const cur = getLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  return Math.round(((xp - cur.xp) / (next.xp - cur.xp)) * 100);
}
function addXP(amount, reason) {
  let leveledUp = false;
  const newState = Store.update(s => {
    const oldLevel = s.level;
    s.xp += amount;
    const newLvl = getLevel(s.xp);
    s.level = newLvl.level;
    if (newLvl.level > oldLevel) leveledUp = true;
  });
  showToast(`+${amount} XP`, reason || 'Atividade concluída', '⚡');
  if (leveledUp) {
    const lv = getLevel(newState.xp);
    setTimeout(() => showToast('🎉 Level Up!', `Você chegou ao Nível ${lv.level}: ${lv.name}`, '🚀'), 600);
  }
  updateSidebar();
  updateHeader();
  checkAchievements();
}

// ---------- STREAK ----------
function updateStreak() {
  Store.update(s => {
    const today = new Date().toDateString();
    if (s.lastLogin === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (s.lastLogin === yesterday) s.streak = (s.streak || 0) + 1;
    else if (s.lastLogin !== today) s.streak = 1;
    s.lastLogin = today;
  });
}

// ---------- ACHIEVEMENTS ----------
function checkAchievements() {
  const s = Store.get();
  const stats = {
    totalLessons: s.completedLessons.length,
    totalQuizzes: Object.keys(s.quizResults).length,
    hasPerfectQuiz: Object.values(s.quizResults).some(r => r.perfect),
    completedModules: MODULES.filter(m => {
      const lessons = m.lessons.map(l => l.id);
      return lessons.every(id => s.completedLessons.includes(id));
    }).length,
    toolsUsed: s.toolsUsed.length,
    streak: s.streak,
    xp: s.xp,
    level: s.level,
  };
  for (const ach of ACHIEVEMENTS) {
    if (!s.achievements.includes(ach.id) && ach.condition(stats)) {
      Store.update(st => { st.achievements.push(ach.id); st.xp += ach.xp; });
      setTimeout(() => {
        showToast(`🏆 Conquista: ${ach.name}`, ach.desc, ach.icon);
      }, 800);
      updateSidebar();
      updateHeader();
    }
  }
}

// ---------- TOASTS ----------
function showToast(title, desc, icon) {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<div class="toast-icon">${icon}</div><div><div class="toast-title">${title}</div><div class="toast-desc">${desc}</div></div>`;
  container.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'slideOut .3s ease forwards';
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

// ---------- SIDEBAR / HEADER ----------
function updateSidebar() {
  const s = Store.get();
  const lv = getLevel(s.xp);
  const next = getNextLevel(s.xp);
  const pct = xpProgress(s.xp);
  const initial = s.name ? s.name[0].toUpperCase() : 'G';
  document.getElementById('sb-avatar').textContent = initial;
  document.getElementById('sb-name').textContent = s.name;
  document.getElementById('sb-level').textContent = `Nível ${lv.level} · ${lv.name}`;
  document.getElementById('sb-xp-cur').textContent = `${s.xp} XP`;
  document.getElementById('sb-xp-next').textContent = next ? `${next.xp} XP` : 'MAX';
  document.getElementById('sb-xp-bar').style.width = pct + '%';
  document.getElementById('sb-streak').textContent = s.streak || 0;
  const newAch = ACHIEVEMENTS.filter(a => !s.achievements.includes(a.id)).length;
  const achBadge = document.getElementById('nav-ach-badge');
  if (achBadge) achBadge.textContent = '';
  const modBadge = document.getElementById('nav-modules-badge');
  if (modBadge) {
    const done = MODULES.filter(m => {
      const lessons = m.lessons.map(l => l.id);
      return lessons.every(id => s.completedLessons.includes(id));
    }).length;
    modBadge.textContent = done > 0 ? done : '';
  }
}
function updateHeader() {
  const s = Store.get();
  document.getElementById('hdr-xp').textContent = s.xp.toLocaleString();
  document.getElementById('hdr-lessons').textContent = s.completedLessons.length;
  document.getElementById('hdr-ach').textContent = s.achievements.length;
}
function setActiveNav(page) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const active = document.querySelector(`[data-page="${page}"]`);
  if (active) active.classList.add('active');
}

// ---------- MOBILE SIDEBAR ----------
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

// ---------- ROUTER ----------
let currentPage = 'dashboard';
let currentParams = {};
function navigate(page, params = {}) {
  closeSidebar();
  currentPage = page;
  currentParams = params;
  setActiveNav(page);
  const titles = {
    dashboard: 'Dashboard', modules: 'Módulos de Aprendizado',
    module: 'Módulo', quiz: 'Quiz', tools: 'Ferramentas',
    tool: 'Ferramenta', achievements: 'Conquistas', profile: 'Meu Perfil'
  };
  document.getElementById('header-title').textContent = titles[page] || page;
  render();
}

function render() {
  const content = document.getElementById('content');
  switch (currentPage) {
    case 'dashboard':    content.innerHTML = renderDashboard(); break;
    case 'modules':      content.innerHTML = renderModules(); break;
    case 'module':       renderModule(currentParams.id); bindModuleEvents(currentParams.id); return;
    case 'quiz':         renderQuiz(currentParams.id); return;
    case 'tools':        content.innerHTML = renderTools(); break;
    case 'tool':         content.innerHTML = renderTool(currentParams.id); bindToolEvents(currentParams.id); return;
    case 'achievements': content.innerHTML = renderAchievements(); break;
    case 'profile':      content.innerHTML = renderProfile(); break;
    default:             content.innerHTML = renderDashboard();
  }
}

// ---------- DASHBOARD ----------
function renderDashboard() {
  const s = Store.get();
  const lv = getLevel(s.xp);
  const next = getNextLevel(s.xp);
  const pct = xpProgress(s.xp);
  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const totalQuizzes = MODULES.length;
  const completedMods = MODULES.filter(m => m.lessons.every(l => s.completedLessons.includes(l.id))).length;

  const recentModules = MODULES
    .filter(m => !isModuleLocked(m, s))
    .sort((a, b) => {
      const aDone = a.lessons.filter(l => s.completedLessons.includes(l.id)).length;
      const bDone = b.lessons.filter(l => s.completedLessons.includes(l.id)).length;
      const aComplete = aDone === a.lessons.length;
      const bComplete = bDone === b.lessons.length;
      if (aComplete && !bComplete) return 1;
      if (!aComplete && bComplete) return -1;
      return bDone - aDone;
    })
    .slice(0, 4);

  return `
<div class="hero-card">
  <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
    <div class="avatar" style="width:56px;height:56px;font-size:22px;">${s.name[0]?.toUpperCase()}</div>
    <div>
      <div style="font-size:22px;font-weight:800;">Olá, ${s.name}! 👋</div>
      <div style="color:var(--text-secondary);font-size:14px;">Continue sua jornada de Growth Marketing</div>
    </div>
    <div class="level-badge" style="margin-left:auto;">Nível ${lv.level} · ${lv.name}</div>
  </div>
  <div style="margin-bottom:8px;font-size:13px;color:var(--text-secondary);">Progresso para Nível ${lv.level+1} ${next?`(${next.name})`:''}</div>
  <div class="xp-bar-bg" style="height:10px;border-radius:5px;">
    <div class="xp-bar-fill" style="width:${pct}%;height:10px;"></div>
  </div>
  <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-secondary);margin-top:6px;">
    <span>${s.xp} XP</span><span>${next ? next.xp + ' XP' : 'Máximo!'}</span>
  </div>
</div>

<div class="progress-overview">
  <div class="stat-card">
    <div class="stat-card-icon">📚</div>
    <div>
      <div class="stat-card-val" style="color:var(--brand-light);">${s.completedLessons.length}<span style="color:var(--text-muted);font-size:16px;">/${totalLessons}</span></div>
      <div class="stat-card-label">Lições Concluídas</div>
    </div>
  </div>
  <div class="stat-card">
    <div class="stat-card-icon">🧠</div>
    <div>
      <div class="stat-card-val" style="color:var(--cyan);">${Object.keys(s.quizResults).length}<span style="color:var(--text-muted);font-size:16px;">/${totalQuizzes}</span></div>
      <div class="stat-card-label">Quizzes Feitos</div>
    </div>
  </div>
  <div class="stat-card">
    <div class="stat-card-icon">🏅</div>
    <div>
      <div class="stat-card-val" style="color:var(--yellow);">${completedMods}<span style="color:var(--text-muted);font-size:16px;">/${MODULES.length}</span></div>
      <div class="stat-card-label">Módulos Completos</div>
    </div>
  </div>
  <div class="stat-card">
    <div class="stat-card-icon">🔥</div>
    <div>
      <div class="stat-card-val" style="color:var(--red);">${s.streak || 0}</div>
      <div class="stat-card-label">Dias de Streak</div>
    </div>
  </div>
</div>

<div class="section-header">
  <div>
    <div class="section-title">Continuar Aprendendo</div>
    <div class="section-subtitle">Seus módulos de estudo</div>
  </div>
  <button class="btn btn-outline btn-sm" onclick="navigate('modules')">Ver todos →</button>
</div>

<div class="grid-2" style="margin-bottom:28px;">
  ${recentModules.map(m => renderModuleCard(m, s)).join('')}
</div>

<div class="section-header">
  <div>
    <div class="section-title">Ferramentas Práticas</div>
    <div class="section-subtitle">Calcule e visualize métricas reais</div>
  </div>
  <button class="btn btn-outline btn-sm" onclick="navigate('tools')">Ver todas →</button>
</div>
<div class="grid-4">
  ${TOOLS.slice(0,4).map(t => `
    <div class="tool-card" onclick="navigate('tool',{id:'${t.id}'})">
      <div class="tool-icon">${t.icon}</div>
      <div class="tool-name">${t.name}</div>
      <div class="tool-desc">${t.desc}</div>
    </div>
  `).join('')}
</div>
`;
}

// ---------- MODULES LIST ----------
function renderModules() {
  const s = Store.get();
  return `
<div class="page-title">Módulos de Aprendizado</div>
<div class="page-subtitle">10 módulos completos com lições, quizzes e ferramentas práticas</div>
<div class="grid-2">
  ${MODULES.map(m => renderModuleCard(m, s)).join('')}
</div>
`;
}

function isModuleLocked(m, s) {
  if (!m.prereqs || m.prereqs.length === 0) return false;
  return m.prereqs.some(prereqId => {
    const prereq = MODULES.find(x => x.id === prereqId);
    if (!prereq) return false;
    return !prereq.lessons.every(l => s.completedLessons.includes(l.id));
  });
}

function openModule(id) {
  const m = MODULES.find(x => x.id === id);
  if (!m) return;
  const s = Store.get();
  if (isModuleLocked(m, s)) {
    const prereqNames = m.prereqs.map(pid => MODULES.find(x => x.id === pid)?.title || pid).join(', ');
    showToast('🔒 Bloqueado', 'Complete primeiro: ' + prereqNames, '⚠️');
    return;
  }
  navigate('module', { id });
}

function renderModuleCard(m, s) {
  const total = m.lessons.length;
  const done = m.lessons.filter(l => s.completedLessons.includes(l.id)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const isComplete = done === total;
  const qResult = s.quizResults[m.id];
  const locked = isModuleLocked(m, s);
  const prereqNames = locked
    ? m.prereqs.map(pid => MODULES.find(x => x.id === pid)?.title || pid).join(', ')
    : '';

  return `
<div class="module-card ${isComplete ? 'completed' : ''} ${locked ? 'locked' : ''}"
     style="--module-color:${m.color};--module-color-bg:${m.colorBg};"
     onclick="openModule('${m.id}')">
  <div class="module-icon">${locked ? '🔒' : m.icon}</div>
  <div class="module-title">${m.title}</div>
  <div class="module-desc">${locked ? 'Pré-requisito: ' + prereqNames : m.desc}</div>
  <div class="module-progress-bar"><div class="module-progress-fill" style="width:${pct}%"></div></div>
  <div class="module-meta">
    <span>${locked ? 'Bloqueado' : (done + '/' + total + ' lições')}</span>
    <div style="display:flex;gap:6px;align-items:center;">
      ${isComplete ? '<span class="badge badge-green">✓ Completo</span>' : ''}
      ${qResult ? '<span class="badge badge-brand">Quiz: ' + qResult.score + '%</span>' : ''}
      <span style="color:var(--text-muted)">⏱ ${m.time}</span>
    </div>
  </div>
</div>`;
}

// ---------- MODULE DETAIL ----------
function renderModule(id) {
  const m = MODULES.find(x => x.id === id);
  if (!m) { navigate('modules'); return; }
  const s = Store.get();
  if (isModuleLocked(m, s)) {
    const prereqNames = m.prereqs.map(pid => MODULES.find(x => x.id === pid)?.title || pid).join(', ');
    showToast('🔒 Bloqueado', `Complete primeiro: ${prereqNames}`, '⚠️');
    navigate('modules');
    return;
  }
  const done = m.lessons.filter(l => s.completedLessons.includes(l.id)).length;
  const total = m.lessons.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const qResult = s.quizResults[m.id];

  document.getElementById('header-title').textContent = m.title;
  document.getElementById('content').innerHTML = `
<div class="back-btn" onclick="navigate('modules')">← Voltar aos Módulos</div>

<div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
  <div style="font-size:48px;">${m.icon}</div>
  <div>
    <div class="page-title" style="margin-bottom:4px;">${m.title}</div>
    <div style="color:var(--text-secondary);font-size:14px;margin-bottom:8px;">${m.desc}</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <span class="badge badge-gray">⏱ ${m.time}</span>
      <span class="badge badge-brand">⚡ ${m.xp} XP</span>
      <span class="badge ${done===total?'badge-green':'badge-yellow'}">${pct}% completo</span>
      ${qResult ? `<span class="badge badge-cyan">Quiz: ${qResult.score}%</span>` : ''}
    </div>
  </div>
</div>

<div class="tabs" id="module-tabs">
  <div class="tab active" onclick="switchTab('lessons')">📖 Lições</div>
  <div class="tab" onclick="switchTab('quiz')">🧠 Quiz</div>
  <div class="tab" onclick="switchTab('tool')">🛠️ Ferramenta</div>
</div>

<div id="tab-lessons">
  <div style="margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;">
    <div style="font-size:14px;color:var(--text-secondary);">${done}/${total} lições concluídas</div>
    <div class="xp-bar-bg" style="width:200px;">
      <div class="xp-bar-fill" style="width:${pct}%"></div>
    </div>
  </div>
  ${m.lessons.map((l, i) => renderLesson(l, i + 1, s.completedLessons.includes(l.id))).join('')}
</div>

<div id="tab-quiz" style="display:none;">
  ${qResult ? `
    <div class="card" style="margin-bottom:16px;text-align:center;">
      <div style="font-size:14px;color:var(--text-secondary);margin-bottom:4px;">Seu resultado mais recente</div>
      <div style="font-size:36px;font-weight:800;color:var(--brand-light);">${qResult.score}%</div>
      <div style="font-size:13px;color:var(--text-secondary);">${qResult.correct}/${qResult.total} corretas</div>
    </div>
  ` : ''}
  <div class="card">
    <div class="card-title">Quiz: ${m.title}</div>
    <div class="card-subtitle" style="margin-bottom:16px;">${m.quiz.length} questões · ${m.quiz.reduce((a,q)=>a+q.xp,0)} XP disponíveis</div>
    <button class="btn btn-primary" onclick="navigate('quiz',{id:'${m.id}'})">
      ${qResult ? '🔄 Refazer Quiz' : '▶ Iniciar Quiz'}
    </button>
  </div>
</div>

<div id="tab-tool" style="display:none;">
  <div class="card">
    <div class="card-title">Ferramenta Prática</div>
    <div class="card-subtitle" style="margin-bottom:16px;">Pratique os conceitos com ferramentas interativas</div>
    <button class="btn btn-primary" onclick="navigate('tool',{id:'${m.tool}'})">🛠️ Abrir Ferramenta</button>
  </div>
</div>
`;
}

function bindModuleEvents(id) { /* eventos gerenciados via onclick inline */ }

function switchTab(name) {
  document.querySelectorAll('[id^="tab-"]').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + name).style.display = 'block';
  const idx = {lessons:0, quiz:1, tool:2}[name];
  document.querySelectorAll('.tab')[idx]?.classList.add('active');
}

function renderLesson(l, num, done) {
  return `
<div class="lesson-card ${done ? 'completed' : ''}" id="lc-${l.id}" onclick="toggleLesson('${l.id}')">
  <div class="lesson-header">
    <div class="lesson-num">${done ? '✓' : num}</div>
    <div>
      <div class="lesson-title">${l.title}</div>
      <div class="lesson-meta">+${l.xp} XP</div>
    </div>
    <div class="lesson-expand">▼</div>
  </div>
  <div class="lesson-body">
    ${l.content}
    ${!done ? `
      <div class="lesson-actions">
        <button class="btn btn-success btn-sm" onclick="completeLesson(event,'${l.id}',${l.xp})">✓ Marcar como concluída (+${l.xp} XP)</button>
      </div>
    ` : `<div style="color:var(--green);font-size:13px;margin-top:12px;">✓ Lição concluída</div>`}
  </div>
</div>`;
}

function toggleLesson(id) {
  const el = document.getElementById('lc-' + id);
  if (!el) return;
  el.classList.toggle('open');
}

function completeLesson(e, id, xp) {
  e.stopPropagation();
  const s = Store.get();
  if (s.completedLessons.includes(id)) return;
  Store.update(st => { if (!st.completedLessons.includes(id)) st.completedLessons.push(id); });
  addXP(xp, `Lição concluída`);
  // Re-render the lesson card
  const el = document.getElementById('lc-' + id);
  if (el) {
    el.classList.add('completed');
    el.querySelector('.lesson-num').textContent = '✓';
    el.querySelector('.lesson-actions').innerHTML = '<div style="color:var(--green);font-size:13px;margin-top:12px;">✓ Lição concluída</div>';
  }
  checkAchievements();
}

// ---------- QUIZ ----------
let quizState = { moduleId: null, questions: [], current: 0, answers: [], answered: false };

function renderQuiz(moduleId) {
  const m = MODULES.find(x => x.id === moduleId);
  if (!m) { navigate('modules'); return; }
  quizState = { moduleId, questions: [...m.quiz], current: 0, answers: [], answered: false };
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const { questions, current, answers } = quizState;
  const q = questions[current];
  const isLast = current === questions.length - 1;
  const letters = ['A','B','C','D'];

  document.getElementById('header-title').textContent = 'Quiz';
  document.getElementById('content').innerHTML = `
<div class="back-btn" onclick="navigate('module',{id:'${quizState.moduleId}'})">← Voltar ao Módulo</div>
<div class="quiz-container">
  <div class="quiz-header">
    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${((current+1)/questions.length)*100}%"></div></div>
    <div class="quiz-progress-text"><span>Questão ${current+1} de ${questions.length}</span><span>${answers.length} respondidas</span></div>
  </div>
  <div class="quiz-question">
    <div class="quiz-q-num">QUESTÃO ${current+1}</div>
    <div class="quiz-q-text">${q.text}</div>
    <div class="quiz-options" id="quiz-options">
      ${q.options.map((opt, i) => `
        <div class="quiz-option" id="qopt-${i}" onclick="selectAnswer(${i})">
          <div class="quiz-option-letter">${letters[i]}</div>
          <div>${opt}</div>
        </div>
      `).join('')}
    </div>
    <div class="quiz-explanation" id="quiz-explanation">${q.explanation}</div>
  </div>
  <div class="quiz-nav">
    <div></div>
    <button class="btn btn-primary" id="quiz-next-btn" style="display:none;" onclick="quizNext()">
      ${isLast ? '📊 Ver Resultado' : 'Próxima →'}
    </button>
  </div>
</div>
`;
  quizState.answered = false;
}

function selectAnswer(idx) {
  if (quizState.answered) return;
  quizState.answered = true;
  const q = quizState.questions[quizState.current];
  const correct = q.correct;
  quizState.answers.push({ selected: idx, correct: idx === correct, xp: idx === correct ? q.xp : 0 });

  document.querySelectorAll('.quiz-option').forEach((el, i) => {
    el.classList.add('disabled');
    if (i === correct) el.classList.add('correct');
    if (i === idx && idx !== correct) el.classList.add('wrong');
    if (i === idx && idx === correct) el.classList.add('selected');
  });
  document.getElementById('quiz-explanation').classList.add('show');
  document.getElementById('quiz-next-btn').style.display = 'inline-flex';

  if (idx === correct) {
    addXP(q.xp, 'Resposta correta!');
  }
}

function quizNext() {
  quizState.current++;
  if (quizState.current >= quizState.questions.length) {
    showQuizResult();
  } else {
    renderQuizQuestion();
  }
}

function showQuizResult() {
  const { moduleId, questions, answers } = quizState;
  const correct = answers.filter(a => a.correct).length;
  const total = questions.length;
  const pct = Math.round((correct / total) * 100);
  const perfect = pct === 100;
  const xpEarned = answers.reduce((a, b) => a + b.xp, 0);
  if (pct >= 60) {
    Store.update(s => {
      s.quizResults[moduleId] = { score: pct, correct, total, perfect };
    });
  }
  checkAchievements();

  const msgs = perfect ? ['🎉 Perfeito! Incrível!', 'Você dominou este módulo!'] :
               pct >= 80 ? ['🌟 Excelente!', 'Resultado impressionante!'] :
               pct >= 60 ? ['👍 Bom trabalho!', 'Continue praticando!'] :
               ['💪 Continue tentando!', 'Revise as lições e tente de novo.'];

  document.getElementById('content').innerHTML = `
<div class="quiz-container">
  <div class="quiz-result">
    <div class="result-score-circle">
      <div class="result-score-num">${pct}%</div>
      <div class="result-score-label">${correct}/${total}</div>
    </div>
    <div class="result-title">${msgs[0]}</div>
    <div class="result-subtitle">${msgs[1]}</div>
    <div class="result-xp">⚡ +${xpEarned} XP ganhos neste quiz</div>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <button class="btn btn-outline" onclick="navigate('quiz',{id:'${moduleId}'})">🔄 Refazer</button>
      <button class="btn btn-primary" onclick="navigate('module',{id:'${moduleId}'})">📖 Voltar ao Módulo</button>
      <button class="btn btn-outline" onclick="navigate('modules')">📚 Todos os Módulos</button>
    </div>
  </div>
</div>
`;
}

// ---------- TOOLS ----------
const TOOLS = [
  { id:'cac', icon:'💰', name:'Calculadora de CAC', desc:'Calcule o Custo de Aquisição por Cliente e por canal' },
  { id:'ltv', icon:'📈', name:'Calculadora de LTV', desc:'Calcule o Lifetime Value e a razão LTV/CAC' },
  { id:'viral-coefficient', icon:'🦠', name:'Coeficiente Viral', desc:'Calcule o coeficiente K e visualize o crescimento viral' },
  { id:'ab-test', icon:'🔬', name:'Calculadora A/B Test', desc:'Calcule significância estatística e tamanho de amostra' },
  { id:'churn', icon:'📉', name:'Calculadora de Churn', desc:'Calcule churn rate e projete a perda de receita' },
  { id:'funnel', icon:'🔻', name:'Visualizador de Funil', desc:'Visualize e calcule a conversão em cada etapa do funil' },
  { id:'aarrr', icon:'🏴‍☠️', name:'Canvas AARRR', desc:'Mapeie as métricas de cada pilar do framework pirata' },
  { id:'north-star', icon:'⭐', name:'North Star Worksheet', desc:'Defina e valide sua North Star Metric' },
  { id:'channel-matrix', icon:'📡', name:'Matriz de Canais', desc:'Compare canais de aquisição por múltiplas dimensões' },
];

function renderTools() {
  return `
<div class="page-title">Ferramentas Práticas</div>
<div class="page-subtitle">Calculadoras e frameworks interativos para aplicar os conceitos</div>
<div class="grid-3">
  ${TOOLS.map(t => `
    <div class="tool-card" onclick="navigate('tool',{id:'${t.id}'})">
      <div class="tool-icon">${t.icon}</div>
      <div class="tool-name">${t.name}</div>
      <div class="tool-desc">${t.desc}</div>
    </div>
  `).join('')}
</div>
`;
}

function trackTool(id) {
  const s = Store.get();
  if (!s.toolsUsed.includes(id)) {
    Store.update(st => { if (!st.toolsUsed.includes(id)) st.toolsUsed.push(id); });
    addXP(25, 'Nova ferramenta usada!');
    checkAchievements();
  }
}

function renderTool(id) {
  trackTool(id);
  switch(id) {
    case 'cac':             return renderCAC();
    case 'ltv':             return renderLTV();
    case 'viral-coefficient': return renderViral();
    case 'ab-test':         return renderABTest();
    case 'churn':           return renderChurn();
    case 'funnel':          return renderFunnel();
    case 'aarrr':           return renderAARRR();
    case 'north-star':      return renderNorthStar();
    case 'channel-matrix':  return renderChannelMatrix();
    default:                return '<div class="empty-state"><div class="empty-icon">🔧</div><div class="empty-title">Ferramenta em breve</div></div>';
  }
}

function bindToolEvents(id) {
  if (id === 'cac') { calcCAC(); }
  if (id === 'ltv') { calcLTV(); }
  if (id === 'viral-coefficient') { calcViral(); }
  if (id === 'ab-test') { calcAB(); }
  if (id === 'churn') { calcChurn(); }
  if (id === 'funnel') { calcFunnel(); }
  if (id === 'aarrr') { loadAARRRData(); }
  if (id === 'north-star') { loadNorthStarData(); }
}

// --- CAC ---
function renderCAC() {
  return `
<div class="back-btn" onclick="navigate('tools')">← Ferramentas</div>
<div class="page-title">💰 Calculadora de CAC</div>
<div class="page-subtitle">Custo de Aquisição de Cliente</div>
<div class="calc-layout">
  <div class="card calc-inputs">
    <div class="card-title">Parâmetros</div>
    <div class="form-group">
      <label class="form-label">Gasto Total com Marketing (R$)</label>
      <input class="form-input" id="cac-mkt" type="number" value="10000" oninput="calcCAC()">
      <div class="form-hint">Inclua salários, ferramentas, agências e mídia paga</div>
    </div>
    <div class="form-group">
      <label class="form-label">Gasto Total com Vendas (R$)</label>
      <input class="form-input" id="cac-sales" type="number" value="5000" oninput="calcCAC()">
    </div>
    <div class="form-group">
      <label class="form-label">Novos Clientes Adquiridos</label>
      <input class="form-input" id="cac-clients" type="number" value="50" oninput="calcCAC()">
    </div>
    <div class="card" style="background:var(--bg-tertiary);margin-top:12px;">
      <div style="font-size:13px;color:var(--text-secondary);margin-bottom:8px;">🎯 Benchmarks de CAC por setor</div>
      <div style="font-size:12px;line-height:1.8;">
        SaaS B2B: R$ 500–5.000<br>
        E-commerce: R$ 30–150<br>
        Fintech: R$ 200–1.000<br>
        App mobile: R$ 10–80
      </div>
    </div>
  </div>
  <div class="calc-result">
    <div class="result-metric" id="cac-result">
      <div class="result-metric-val">R$ 0</div>
      <div class="result-metric-label">CAC Total</div>
    </div>
    <div class="result-metric">
      <div class="result-metric-val" id="cac-mkt-r">R$ 0</div>
      <div class="result-metric-label">CAC de Marketing</div>
    </div>
    <div class="result-metric">
      <div class="result-metric-val" id="cac-sales-r">R$ 0</div>
      <div class="result-metric-label">CAC de Vendas</div>
    </div>
    <div class="card" style="background:var(--bg-tertiary);" id="cac-insight">
      <div style="font-size:13px;color:var(--text-secondary);">Insira os valores para ver a análise</div>
    </div>
    <div class="chart-wrapper"><canvas id="cacChart"></canvas></div>
  </div>
</div>`;
}
function calcCAC() {
  const mkt = parseFloat(document.getElementById('cac-mkt')?.value) || 0;
  const sales = parseFloat(document.getElementById('cac-sales')?.value) || 0;
  const clients = parseFloat(document.getElementById('cac-clients')?.value) || 1;
  const total = mkt + sales;
  const cac = total / clients;
  const cacMkt = mkt / clients;
  const cacSales = sales / clients;
  const fmt = v => 'R$ ' + v.toFixed(2).replace('.', ',');
  if (document.getElementById('cac-result')) {
    document.getElementById('cac-result').querySelector('.result-metric-val').textContent = fmt(cac);
    document.getElementById('cac-mkt-r').textContent = fmt(cacMkt);
    document.getElementById('cac-sales-r').textContent = fmt(cacSales);
    document.getElementById('cac-insight').innerHTML = `
      <div style="font-size:13px;font-weight:700;margin-bottom:6px;">💡 Análise</div>
      <div style="font-size:12px;color:var(--text-secondary);line-height:1.6;">
        Marketing representa <strong style="color:var(--text-primary)">${total>0?Math.round(mkt/total*100):0}%</strong> do CAC.<br>
        Para ser saudável, seu LTV deve ser ≥ <strong style="color:var(--cyan)">${fmt(cac*3)}</strong> (3× CAC).
      </div>`;
    const ctx = document.getElementById('cacChart')?.getContext('2d');
    if (ctx) {
      if (window._cacChart) window._cacChart.destroy();
      window._cacChart = new Chart(ctx, {
        type: 'doughnut',
        data: { labels: ['Marketing', 'Vendas'], datasets: [{ data: [mkt, sales], backgroundColor: ['#6366f1','#a855f7'], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8' } } } }
      });
    }
  }
}

// --- LTV ---
function renderLTV() {
  return `
<div class="back-btn" onclick="navigate('tools')">← Ferramentas</div>
<div class="page-title">📈 Calculadora de LTV</div>
<div class="page-subtitle">Lifetime Value e razão LTV/CAC</div>
<div class="calc-layout">
  <div class="card calc-inputs">
    <div class="card-title">Parâmetros</div>
    <div class="form-group">
      <label class="form-label">Ticket Médio (R$)</label>
      <input class="form-input" id="ltv-ticket" type="number" value="200" oninput="calcLTV()">
    </div>
    <div class="form-group">
      <label class="form-label">Frequência de Compra (por ano)</label>
      <input class="form-input" id="ltv-freq" type="number" value="4" oninput="calcLTV()">
    </div>
    <div class="form-group">
      <label class="form-label">Tempo de Retenção (anos)</label>
      <input class="form-input" id="ltv-retention" type="number" value="3" oninput="calcLTV()">
    </div>
    <div class="form-group">
      <label class="form-label">Margem Bruta (%)</label>
      <input class="form-input" id="ltv-margin" type="number" value="60" oninput="calcLTV()">
    </div>
    <div class="form-group">
      <label class="form-label">CAC atual (R$) — para calcular razão</label>
      <input class="form-input" id="ltv-cac" type="number" value="300" oninput="calcLTV()">
    </div>
  </div>
  <div class="calc-result">
    <div class="result-metric" id="ltv-result">
      <div class="result-metric-val">R$ 0</div>
      <div class="result-metric-label">LTV Bruto</div>
    </div>
    <div class="result-metric" id="ltv-margin-result">
      <div class="result-metric-val">R$ 0</div>
      <div class="result-metric-label">LTV por Margem</div>
    </div>
    <div class="result-metric" id="ltv-ratio">
      <div class="result-metric-val">0×</div>
      <div class="result-metric-label">Razão LTV/CAC</div>
    </div>
    <div class="card" style="background:var(--bg-tertiary);" id="ltv-insight">
      <div style="font-size:13px;color:var(--text-secondary);">Insira os valores para ver a análise</div>
    </div>
  </div>
</div>`;
}
function calcLTV() {
  const ticket = parseFloat(document.getElementById('ltv-ticket')?.value) || 0;
  const freq = parseFloat(document.getElementById('ltv-freq')?.value) || 1;
  const ret = parseFloat(document.getElementById('ltv-retention')?.value) || 1;
  const margin = parseFloat(document.getElementById('ltv-margin')?.value) || 100;
  const cac = parseFloat(document.getElementById('ltv-cac')?.value) || 1;
  const ltv = ticket * freq * ret;
  const ltvM = ltv * (margin / 100);
  const ratio = ltvM / cac;
  const fmt = v => 'R$ ' + v.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const ratioEl = document.getElementById('ltv-ratio');
  if (ratioEl) {
    document.getElementById('ltv-result').querySelector('.result-metric-val').textContent = fmt(ltv);
    document.getElementById('ltv-margin-result').querySelector('.result-metric-val').textContent = fmt(ltvM);
    ratioEl.querySelector('.result-metric-val').textContent = ratio.toFixed(1) + '×';
    const status = ratio >= 3 ? 'success' : ratio >= 1 ? 'warning' : 'danger';
    ratioEl.className = 'result-metric ' + status;
    const statusText = ratio >= 5 ? '🚀 Excelente — pode investir mais em aquisição' :
                       ratio >= 3 ? '✅ Saudável — negócio viável' :
                       ratio >= 1 ? '⚠️ Apertado — otimize retenção ou reduza CAC' :
                       '🔴 Insustentável — você perde dinheiro em cada cliente';
    document.getElementById('ltv-insight').innerHTML = `
      <div style="font-size:13px;font-weight:700;margin-bottom:6px;">Diagnóstico LTV/CAC</div>
      <div style="font-size:13px;">${statusText}</div>`;
  }
}

// --- VIRAL ---
function renderViral() {
  return `
<div class="back-btn" onclick="navigate('tools')">← Ferramentas</div>
<div class="page-title">🦠 Coeficiente Viral (K)</div>
<div class="page-subtitle">Calcule e simule o crescimento viral</div>
<div class="calc-layout">
  <div class="card calc-inputs">
    <div class="card-title">Parâmetros</div>
    <div class="form-group">
      <label class="form-label">Usuários iniciais</label>
      <input class="form-input" id="vk-initial" type="number" value="1000" oninput="calcViral()">
    </div>
    <div class="form-group">
      <label class="form-label">Convites enviados por usuário</label>
      <input class="form-input" id="vk-invites" type="number" value="3" oninput="calcViral()">
      <div class="form-hint">Quantos amigos cada usuário convida em média</div>
    </div>
    <div class="form-group">
      <label class="form-label">Taxa de conversão dos convites (%)</label>
      <input class="form-input" id="vk-conv" type="number" value="20" oninput="calcViral()">
      <div class="form-hint">% dos convidados que se cadastram</div>
    </div>
    <div class="form-group">
      <label class="form-label">Ciclos a simular</label>
      <input class="form-input" id="vk-cycles" type="number" value="10" min="1" max="20" oninput="calcViral()">
    </div>
  </div>
  <div class="calc-result">
    <div class="viral-info">
      <div class="viral-metric result-metric" id="vk-k-box">
        <div class="viral-k" id="vk-k">0</div>
        <div class="result-metric-label">Coeficiente K</div>
        <div class="viral-status" id="vk-status">—</div>
      </div>
      <div class="result-metric" id="vk-final">
        <div class="result-metric-val" id="vk-final-users">0</div>
        <div class="result-metric-label">Usuários após <span id="vk-cycles-label">10</span> ciclos</div>
      </div>
    </div>
    <div class="chart-wrapper" style="height:200px;"><canvas id="viralChart"></canvas></div>
  </div>
</div>`;
}
function calcViral() {
  const initial = parseFloat(document.getElementById('vk-initial')?.value) || 1000;
  const invites = parseFloat(document.getElementById('vk-invites')?.value) || 0;
  const conv = parseFloat(document.getElementById('vk-conv')?.value) || 0;
  const cycles = parseInt(document.getElementById('vk-cycles')?.value) || 10;
  const k = invites * (conv / 100);
  const labels = [];
  const data = [];
  let users = initial;
  for (let i = 0; i <= cycles; i++) {
    labels.push('Ciclo ' + i);
    data.push(Math.round(users));
    users = users * (1 + k);
  }
  const kBox = document.getElementById('vk-k-box');
  if (kBox) {
    document.getElementById('vk-k').textContent = k.toFixed(2);
    document.getElementById('vk-final-users').textContent = data[data.length-1].toLocaleString('pt-BR');
    document.getElementById('vk-cycles-label').textContent = cycles;
    const status = k > 1 ? ['🚀 Crescimento Viral Exponencial!','success'] :
                   k > 0.5 ? ['📈 Crescimento positivo (não viral)','warning'] :
                   ['📉 Sem viralidade significativa','danger'];
    document.getElementById('vk-status').textContent = status[0];
    kBox.className = 'viral-metric result-metric ' + status[1];
    const ctx = document.getElementById('viralChart')?.getContext('2d');
    if (ctx) {
      if (window._viralChart) window._viralChart.destroy();
      window._viralChart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets: [{ label: 'Usuários', data, borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,.1)', tension: 0.3, fill: true }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8' } } }, scales: { x: { ticks: { color: '#94a3b8' } }, y: { ticks: { color: '#94a3b8' }, beginAtZero: true } } }
      });
    }
  }
}

// --- A/B TEST ---
function renderABTest() {
  return `
<div class="back-btn" onclick="navigate('tools')">← Ferramentas</div>
<div class="page-title">🔬 Calculadora A/B Test</div>
<div class="page-subtitle">Significância estatística e resultado do teste</div>
<div class="calc-layout">
  <div class="card calc-inputs">
    <div class="card-title">Grupo A (Controle)</div>
    <div class="form-group">
      <label class="form-label">Visitantes (A)</label>
      <input class="form-input" id="ab-va" type="number" value="5000" oninput="calcAB()">
    </div>
    <div class="form-group">
      <label class="form-label">Conversões (A)</label>
      <input class="form-input" id="ab-ca" type="number" value="100" oninput="calcAB()">
    </div>
    <div class="divider"></div>
    <div class="card-title">Grupo B (Variante)</div>
    <div class="form-group">
      <label class="form-label">Visitantes (B)</label>
      <input class="form-input" id="ab-vb" type="number" value="5000" oninput="calcAB()">
    </div>
    <div class="form-group">
      <label class="form-label">Conversões (B)</label>
      <input class="form-input" id="ab-cb" type="number" value="130" oninput="calcAB()">
    </div>
  </div>
  <div class="calc-result">
    <div class="result-metric" id="ab-rate-a">
      <div class="result-metric-val">0%</div>
      <div class="result-metric-label">Taxa de Conversão A</div>
    </div>
    <div class="result-metric" id="ab-rate-b">
      <div class="result-metric-val">0%</div>
      <div class="result-metric-label">Taxa de Conversão B</div>
    </div>
    <div class="result-metric" id="ab-lift">
      <div class="result-metric-val">0%</div>
      <div class="result-metric-label">Uplift (Melhora)</div>
    </div>
    <div class="result-metric" id="ab-conf">
      <div class="result-metric-val">—</div>
      <div class="result-metric-label">Confiança Estatística</div>
    </div>
    <div class="card" style="background:var(--bg-tertiary);" id="ab-verdict">
      <div style="font-size:13px;color:var(--text-secondary);">Insira os valores para ver o resultado</div>
    </div>
  </div>
</div>`;
}
function calcAB() {
  const va = parseInt(document.getElementById('ab-va')?.value) || 1;
  const ca = parseInt(document.getElementById('ab-ca')?.value) || 0;
  const vb = parseInt(document.getElementById('ab-vb')?.value) || 1;
  const cb = parseInt(document.getElementById('ab-cb')?.value) || 0;
  const ra = ca / va; const rb = cb / vb;
  const lift = ra > 0 ? ((rb - ra) / ra) * 100 : 0;
  // Z-test approximation
  const pooled = (ca + cb) / (va + vb);
  const se = Math.sqrt(pooled * (1 - pooled) * (1/va + 1/vb));
  const z = se > 0 ? Math.abs(rb - ra) / se : 0;
  const conf = Math.min(99.9, (1 - Math.exp(-0.717 * z - 0.416 * z * z)) * 100);
  const fmt = v => v.toFixed(2) + '%';

  if (document.getElementById('ab-rate-a')) {
    document.getElementById('ab-rate-a').querySelector('.result-metric-val').textContent = fmt(ra * 100);
    document.getElementById('ab-rate-b').querySelector('.result-metric-val').textContent = fmt(rb * 100);
    const liftEl = document.getElementById('ab-lift');
    liftEl.querySelector('.result-metric-val').textContent = (lift >= 0 ? '+' : '') + lift.toFixed(1) + '%';
    liftEl.className = 'result-metric ' + (lift > 0 ? 'success' : lift < 0 ? 'danger' : '');
    const confEl = document.getElementById('ab-conf');
    confEl.querySelector('.result-metric-val').textContent = conf.toFixed(1) + '%';
    confEl.className = 'result-metric ' + (conf >= 95 ? 'success' : conf >= 80 ? 'warning' : 'danger');
    const winner = rb > ra ? 'B' : rb < ra ? 'A' : 'empate';
    const significant = conf >= 95;
    document.getElementById('ab-verdict').innerHTML = `
      <div style="font-size:14px;font-weight:700;margin-bottom:6px;">
        ${significant && lift > 0 ? '🎉 Variante B é a vencedora!' : conf >= 95 && lift < 0 ? '⚠️ Variante A performa melhor' : conf < 95 ? '⏳ Resultado ainda não significativo' : '🤝 Sem diferença real'}
      </div>
      <div style="font-size:12px;color:var(--text-secondary);">
        Confiança de ${conf.toFixed(0)}% — ${significant ? 'resultado estatisticamente válido' : 'continue coletando dados (precisa ≥95%)'}.
        ${!significant ? '<br>Precisa de mais ' + Math.round((va + vb) * 0.3).toLocaleString() + ' amostras estimadas.' : ''}
      </div>`;
  }
}

// --- CHURN ---
function renderChurn() {
  return `
<div class="back-btn" onclick="navigate('tools')">← Ferramentas</div>
<div class="page-title">📉 Calculadora de Churn</div>
<div class="page-subtitle">Taxa de cancelamento e projeção de base de clientes</div>
<div class="calc-layout">
  <div class="card calc-inputs">
    <div class="card-title">Parâmetros</div>
    <div class="form-group">
      <label class="form-label">Clientes no início do período</label>
      <input class="form-input" id="churn-start" type="number" value="1000" oninput="calcChurn()">
    </div>
    <div class="form-group">
      <label class="form-label">Clientes perdidos no período</label>
      <input class="form-input" id="churn-lost" type="number" value="50" oninput="calcChurn()">
    </div>
    <div class="form-group">
      <label class="form-label">MRR por cliente (R$)</label>
      <input class="form-input" id="churn-mrr" type="number" value="100" oninput="calcChurn()">
    </div>
    <div class="form-group">
      <label class="form-label">Meses para projetar</label>
      <input class="form-input" id="churn-months" type="number" value="12" min="3" max="36" oninput="calcChurn()">
    </div>
  </div>
  <div class="calc-result">
    <div class="result-metric" id="churn-rate-box">
      <div class="result-metric-val">0%</div>
      <div class="result-metric-label">Churn Rate Mensal</div>
    </div>
    <div class="result-metric">
      <div class="result-metric-val" id="churn-mrr-lost">R$ 0</div>
      <div class="result-metric-label">MRR Perdido</div>
    </div>
    <div class="result-metric">
      <div class="result-metric-val" id="churn-half">0 meses</div>
      <div class="result-metric-label">Meses até perder 50% da base</div>
    </div>
    <div class="chart-wrapper"><canvas id="churnChart"></canvas></div>
  </div>
</div>`;
}
function calcChurn() {
  const start = parseFloat(document.getElementById('churn-start')?.value) || 1;
  const lost = parseFloat(document.getElementById('churn-lost')?.value) || 0;
  const mrr = parseFloat(document.getElementById('churn-mrr')?.value) || 0;
  const months = parseInt(document.getElementById('churn-months')?.value) || 12;
  const rate = lost / start;
  const mrrLost = lost * mrr;
  const half = rate > 0 ? Math.ceil(Math.log(0.5) / Math.log(1 - rate)) : 999;

  if (document.getElementById('churn-rate-box')) {
    const rateEl = document.getElementById('churn-rate-box');
    rateEl.querySelector('.result-metric-val').textContent = (rate * 100).toFixed(1) + '%';
    rateEl.className = 'result-metric ' + (rate <= 0.02 ? 'success' : rate <= 0.05 ? 'warning' : 'danger');
    document.getElementById('churn-mrr-lost').textContent = 'R$ ' + mrrLost.toLocaleString('pt-BR');
    document.getElementById('churn-half').textContent = half < 999 ? half + ' meses' : '> 100 meses';

    const labels = [], data = [];
    let cur = start;
    for (let i = 0; i <= months; i++) {
      labels.push('Mês ' + i);
      data.push(Math.round(cur));
      cur *= (1 - rate);
    }
    const ctx = document.getElementById('churnChart')?.getContext('2d');
    if (ctx) {
      if (window._churnChart) window._churnChart.destroy();
      window._churnChart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets: [{ label: 'Clientes', data, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,.1)', tension: 0.3, fill: true }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8' } } }, scales: { x: { ticks: { color: '#94a3b8' } }, y: { ticks: { color: '#94a3b8' }, beginAtZero: true } } }
      });
    }
  }
}

// --- FUNNEL ---
function renderFunnel() {
  const steps = [
    { name: 'Visitantes', val: 10000, color: '#6366f1' },
    { name: 'Leads', val: 2000, color: '#8b5cf6' },
    { name: 'Prospects', val: 600, color: '#a855f7' },
    { name: 'Oportunidades', val: 150, color: '#ec4899' },
    { name: 'Clientes', val: 30, color: '#ef4444' },
  ];
  return `
<div class="back-btn" onclick="navigate('tools')">← Ferramentas</div>
<div class="page-title">🔻 Visualizador de Funil</div>
<div class="page-subtitle">Configure as etapas e veja as taxas de conversão</div>
<div class="grid-2">
  <div class="card">
    <div class="card-title">Etapas do Funil</div>
    <div style="display:flex;flex-direction:column;gap:12px;margin-top:12px;" id="funnel-inputs">
      ${steps.map((s,i) => `
        <div class="form-group" style="flex-direction:row;align-items:center;gap:10px;">
          <input class="form-input" style="flex:1;" id="fn-name-${i}" value="${s.name}" oninput="calcFunnel()">
          <input class="form-input" style="width:120px;" id="fn-val-${i}" type="number" value="${s.val}" oninput="calcFunnel()">
        </div>
      `).join('')}
    </div>
  </div>
  <div class="card">
    <div class="card-title">Visualização</div>
    <div class="funnel-container" id="funnel-viz" style="margin-top:16px;"></div>
    <div id="funnel-stats" style="margin-top:16px;"></div>
  </div>
</div>`;
}
function calcFunnel() {
  const colors = ['#6366f1','#8b5cf6','#a855f7','#ec4899','#ef4444'];
  const steps = [];
  for (let i = 0; i < 5; i++) {
    const name = document.getElementById(`fn-name-${i}`)?.value || '';
    const val = parseFloat(document.getElementById(`fn-val-${i}`)?.value) || 0;
    steps.push({ name, val, color: colors[i] });
  }
  const max = steps[0]?.val || 1;
  const viz = document.getElementById('funnel-viz');
  if (!viz) return;
  viz.innerHTML = steps.map((s, i) => {
    const pct = Math.max(5, (s.val / max) * 100);
    const conv = i > 0 && steps[i-1].val > 0 ? ((s.val / steps[i-1].val) * 100).toFixed(1) : '100';
    return `
      <div class="funnel-step">
        <div class="funnel-label">${s.name}</div>
        <div class="funnel-bar-wrap">
          <div class="funnel-bar-fill" style="width:${pct}%;background:${s.color};">
            ${s.val.toLocaleString('pt-BR')}
          </div>
        </div>
        <div class="funnel-pct">${i===0?'100%':conv+'%'}</div>
      </div>`;
  }).join('');
  const total = steps[steps.length-1].val;
  const totalConv = max > 0 ? ((total / max) * 100).toFixed(2) : 0;
  document.getElementById('funnel-stats').innerHTML = `
    <div style="text-align:center;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-sm);">
      <div style="font-size:24px;font-weight:800;color:var(--brand-light);">${totalConv}%</div>
      <div style="font-size:12px;color:var(--text-secondary);">Conversão total do funil</div>
    </div>`;
}

// --- AARRR CANVAS ---
function renderAARRR() {
  const pillars = [
    { letter:'A', name:'Aquisição', color:'#6366f1', metric:'Visitantes únicos/mês', placeholder:'ex: 10.000' },
    { letter:'A', name:'Ativação', color:'#8b5cf6', metric:'Taxa de ativação', placeholder:'ex: 25%' },
    { letter:'R', name:'Retenção', color:'#a855f7', metric:'Retenção D30', placeholder:'ex: 40%' },
    { letter:'R', name:'Receita', color:'#ec4899', metric:'MRR', placeholder:'ex: R$ 50.000' },
    { letter:'R', name:'Referência', color:'#ef4444', metric:'Coeficiente K', placeholder:'ex: 0.5' },
  ];
  return `
<div class="back-btn" onclick="navigate('tools')">← Ferramentas</div>
<div class="page-title">🏴‍☠️ Canvas AARRR</div>
<div class="page-subtitle">Mapeie as métricas de cada pilar do framework</div>
<div class="aarrr-grid" style="margin-bottom:24px;">
  ${pillars.map((p,i) => `
    <div class="aarrr-card" style="border-color:${p.color}33;">
      <div class="aarrr-letter" style="color:${p.color};">${p.letter}</div>
      <div class="aarrr-name">${p.name}</div>
      <div class="aarrr-desc">${p.metric}</div>
      <input class="form-input aarrr-input" placeholder="${p.placeholder}" id="aarrr-${i}">
    </div>
  `).join('')}
</div>
<div class="card">
  <div class="card-title">🎯 Análise Qualitativa</div>
  <div class="grid-2" style="margin-top:16px;gap:12px;">
    ${pillars.map((p,i) => `
      <div>
        <div class="form-label" style="margin-bottom:6px;">${p.name} — Status atual</div>
        <select class="form-select" style="width:100%;" id="aarrr-status-${i}">
          <option value="">Selecione...</option>
          <option value="red">🔴 Precisa de atenção urgente</option>
          <option value="yellow">🟡 Pode melhorar</option>
          <option value="green">🟢 Saudável</option>
        </select>
      </div>
    `).join('')}
  </div>
  <button class="btn btn-primary" style="margin-top:16px;" onclick="showAARRRAnalysis()">📊 Ver Análise</button>
  <div id="aarrr-analysis" style="margin-top:16px;"></div>
</div>`;
}

function saveAARRRData() {
  const data = {};
  for (let i = 0; i < 5; i++) {
    data[`val_${i}`] = document.getElementById(`aarrr-${i}`)?.value || '';
    data[`status_${i}`] = document.getElementById(`aarrr-status-${i}`)?.value || '';
  }
  Store.update(s => { s.aarrrData = data; });
}

function loadAARRRData() {
  const s = Store.get();
  if (!s.aarrrData) return;
  for (let i = 0; i < 5; i++) {
    const inp = document.getElementById(`aarrr-${i}`);
    const sel = document.getElementById(`aarrr-status-${i}`);
    if (inp) inp.value = s.aarrrData[`val_${i}`] || '';
    if (sel) sel.value = s.aarrrData[`status_${i}`] || '';
  }
}

function showAARRRAnalysis() {
  saveAARRRData();
  const names = ['Aquisição','Ativação','Retenção','Receita','Referência'];
  let html = '<div class="card-title" style="margin-bottom:12px;">📊 Diagnóstico AARRR</div>';
  let bottleneck = null;
  for (let i = 0; i < 5; i++) {
    const val = document.getElementById(`aarrr-${i}`)?.value;
    const status = document.getElementById(`aarrr-status-${i}`)?.value;
    if (status === 'red' && !bottleneck) bottleneck = names[i];
    const icon = status === 'red' ? '🔴' : status === 'yellow' ? '🟡' : status === 'green' ? '🟢' : '⚪';
    html += `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px;">
      <span><strong>${names[i]}</strong>${val ? ': ' + val : ''}</span>
      <span>${icon}</span>
    </div>`;
  }
  if (bottleneck) html += `<div class="highlight-box" style="margin-top:12px;">💡 <strong>Gargalo identificado: ${bottleneck}</strong> — Priorize experimentos aqui antes de aumentar investimento em aquisição.</div>`;
  document.getElementById('aarrr-analysis').innerHTML = html;
  showToast('💾 Salvo', 'Dados do AARRR Canvas salvos', '🏴‍☠️');
}

// --- NORTH STAR ---
function renderNorthStar() {
  return `
<div class="back-btn" onclick="navigate('tools')">← Ferramentas</div>
<div class="page-title">⭐ North Star Worksheet</div>
<div class="page-subtitle">Defina sua North Star Metric em 5 passos</div>
<div style="max-width:700px;">
  <div class="ns-step">
    <div class="ns-step-title"><div class="ns-step-num">1</div>Qual é o valor central que seu produto entrega?</div>
    <textarea class="form-input" style="width:100%;height:80px;resize:vertical;" id="ns-1" placeholder="Ex: Ajudamos freelancers a encontrar clientes e gerenciar seus projetos com facilidade"></textarea>
  </div>
  <div class="ns-step">
    <div class="ns-step-title"><div class="ns-step-num">2</div>Liste 3 candidatas à North Star Metric</div>
    ${[1,2,3].map(i=>`<input class="form-input" style="width:100%;margin-bottom:8px;" id="ns-cand-${i}" placeholder="Candidata ${i}: ex: Projetos concluídos por mês">`).join('')}
  </div>
  <div class="ns-step">
    <div class="ns-step-title"><div class="ns-step-num">3</div>Validação — cada candidata...</div>
    <div style="font-size:13px;color:var(--text-secondary);line-height:2;">
      ✅ Representa valor para o cliente (não só receita)?<br>
      ✅ É mensurável com seus dados atuais?<br>
      ✅ As equipes conseguem influenciá-la diretamente?<br>
      ✅ Crescer essa métrica prevê crescimento de receita?
    </div>
  </div>
  <div class="ns-step">
    <div class="ns-step-title"><div class="ns-step-num">4</div>Sua North Star Metric escolhida</div>
    <input class="form-input" style="width:100%;font-size:16px;font-weight:600;" id="ns-final" placeholder="Ex: Número de projetos concluídos por usuário ativo por mês">
    <div class="form-hint" style="margin-top:6px;">Esta deve ser UMA métrica única e clara para toda a empresa</div>
  </div>
  <div class="ns-step">
    <div class="ns-step-title"><div class="ns-step-num">5</div>Input Metrics (alavancas)</div>
    ${[1,2,3].map(i=>`<input class="form-input" style="width:100%;margin-bottom:8px;" id="ns-input-${i}" placeholder="Input metric ${i}: ex: Taxa de aceite de propostas">`).join('')}
    <div class="form-hint">Estas são as métricas que cada time pode influenciar para mover a NSM</div>
  </div>
  <button class="btn btn-primary" onclick="showNSCard()">⭐ Gerar Cartão da NSM</button>
  <div id="ns-card" style="margin-top:16px;"></div>
</div>`;
}
function saveNorthStarData() {
  Store.update(s => {
    s.northStarData = {
      val1: document.getElementById('ns-1')?.value || '',
      cand1: document.getElementById('ns-cand-1')?.value || '',
      cand2: document.getElementById('ns-cand-2')?.value || '',
      cand3: document.getElementById('ns-cand-3')?.value || '',
      final: document.getElementById('ns-final')?.value || '',
      inp1: document.getElementById('ns-input-1')?.value || '',
      inp2: document.getElementById('ns-input-2')?.value || '',
      inp3: document.getElementById('ns-input-3')?.value || '',
    };
  });
}

function loadNorthStarData() {
  const s = Store.get();
  if (!s.northStarData) return;
  const d = s.northStarData;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  set('ns-1', d.val1); set('ns-cand-1', d.cand1); set('ns-cand-2', d.cand2); set('ns-cand-3', d.cand3);
  set('ns-final', d.final); set('ns-input-1', d.inp1); set('ns-input-2', d.inp2); set('ns-input-3', d.inp3);
}

function showNSCard() {
  const nsm = document.getElementById('ns-final')?.value?.trim();
  if (!nsm) {
    showToast('⚠️ Campo vazio', 'Preencha a North Star Metric no passo 4', '⭐');
    return;
  }
  saveNorthStarData();
  const value = document.getElementById('ns-1')?.value || '';
  const inputs = [1,2,3].map(i => document.getElementById(`ns-input-${i}`)?.value).filter(Boolean);
  document.getElementById('ns-card').innerHTML = `
    <div class="hero-card" style="text-align:center;">
      <div style="font-size:48px;margin-bottom:12px;">⭐</div>
      <div style="font-size:20px;font-weight:800;margin-bottom:8px;">North Star Metric</div>
      <div style="font-size:24px;font-weight:900;color:var(--yellow);margin-bottom:16px;">"${nsm}"</div>
      ${value ? `<div style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">${value}</div>` : ''}
      ${inputs.length ? `<div style="font-size:13px;color:var(--text-secondary);">Input Metrics: ${inputs.join(' · ')}</div>` : ''}
    </div>`;
  showToast('💾 Salvo', 'North Star Metric salva com sucesso', '⭐');
}

// --- CHANNEL MATRIX ---
function renderChannelMatrix() {
  const channels = ['SEO','Google Ads','Meta Ads','Email','Referência','LinkedIn','Conteúdo/Blog'];
  const dims = ['Custo','Velocidade','Escalável','Controle','Segmentação'];
  const defaultScores = [
    [2,1,4,4,3],[4,5,5,5,4],[4,4,5,5,5],[3,3,4,5,2],[3,4,4,4,3],[2,3,4,5,5],[2,2,5,4,3]
  ];
  const s = Store.get();
  const saved = s.channelMatrixData || defaultScores;

  return `
<div class="back-btn" onclick="navigate('tools')">← Ferramentas</div>
<div class="page-title">📡 Matriz de Canais de Aquisição</div>
<div class="page-subtitle">Compare canais por múltiplas dimensões — clique nos dots para editar (1=baixo, 5=alto)</div>
<div class="card" style="overflow-x:auto;">
  <table class="channel-table" id="channel-table">
    <thead>
      <tr>
        <th>Canal</th>
        ${dims.map(d=>`<th>${d}</th>`).join('')}
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      ${channels.map((ch,i) => `
        <tr>
          <td><strong>${ch}</strong></td>
          ${dims.map((d,j)=>`
            <td>
              <div class="score-dots" style="cursor:pointer;">
                ${[1,2,3,4,5].map(n=>`<div class="score-dot ${n<=saved[i][j]?'filled':''}" onclick="setChannelScore(${i},${j},${n})" title="${n}" style="cursor:pointer;"></div>`).join('')}
              </div>
            </td>
          `).join('')}
          <td><strong style="color:var(--brand-light);" id="ch-score-${i}">${saved[i].reduce((a,b)=>a+b,0)}/25</strong></td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</div>
<div class="card" style="margin-top:16px;">
  <div class="card-title">💡 Legenda dos Critérios</div>
  <div class="grid-2" style="margin-top:12px;font-size:13px;color:var(--text-secondary);">
    <div><strong style="color:var(--text-primary);">Custo:</strong> Baixo custo = pontuação alta</div>
    <div><strong style="color:var(--text-primary);">Velocidade:</strong> Resultados rápidos = pontuação alta</div>
    <div><strong style="color:var(--text-primary);">Escalável:</strong> Cresce sem limite = pontuação alta</div>
    <div><strong style="color:var(--text-primary);">Controle:</strong> Você controla totalmente = pontuação alta</div>
    <div><strong style="color:var(--text-primary);">Segmentação:</strong> Precisão de segmentação = pontuação alta</div>
  </div>
  <button class="btn btn-outline btn-sm" style="margin-top:12px;" onclick="resetChannelMatrix()">🔄 Restaurar padrões</button>
</div>`;
}

function setChannelScore(row, col, val) {
  const s = Store.get();
  const defaults = [[2,1,4,4,3],[4,5,5,5,4],[4,4,5,5,5],[3,3,4,5,2],[3,4,4,4,3],[2,3,4,5,5],[2,2,5,4,3]];
  const matrix = s.channelMatrixData ? s.channelMatrixData.map(r=>[...r]) : defaults.map(r=>[...r]);
  matrix[row][col] = val;
  Store.update(st => { st.channelMatrixData = matrix; });
  // Update dots visually
  const cell = document.querySelectorAll('#channel-table tbody tr')[row]?.querySelectorAll('td')[col+1];
  if (cell) {
    cell.querySelectorAll('.score-dot').forEach((dot,n) => {
      dot.classList.toggle('filled', (n+1) <= val);
    });
  }
  const scoreEl = document.getElementById(`ch-score-${row}`);
  if (scoreEl) scoreEl.textContent = matrix[row].reduce((a,b)=>a+b,0) + '/25';
}

function resetChannelMatrix() {
  Store.update(s => { delete s.channelMatrixData; });
  navigate('tool', {id:'channel-matrix'});
}

// ---------- ACHIEVEMENTS ----------
function renderAchievements() {
  const s = Store.get();
  const unlocked = s.achievements;
  return `
<div class="page-title">🏆 Conquistas</div>
<div class="page-subtitle">${unlocked.length}/${ACHIEVEMENTS.length} desbloqueadas · ${ACHIEVEMENTS.filter(a=>unlocked.includes(a.id)).reduce((t,a)=>t+a.xp,0)} XP de conquistas</div>
<div class="achievement-grid">
  ${ACHIEVEMENTS.map(a => `
    <div class="achievement-card ${unlocked.includes(a.id)?'unlocked':'locked'}">
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-name">${a.name}</div>
      <div class="achievement-desc">${a.desc}</div>
      <div class="achievement-xp">+${a.xp} XP</div>
    </div>
  `).join('')}
</div>
`;
}

// ---------- PROFILE ----------
function renderProfile() {
  const s = Store.get();
  const lv = getLevel(s.xp);
  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const completedMods = MODULES.filter(m => m.lessons.every(l => s.completedLessons.includes(l.id))).length;
  const avgQuiz = Object.values(s.quizResults).length ? Math.round(Object.values(s.quizResults).reduce((a,b)=>a+b.score,0) / Object.values(s.quizResults).length) : 0;

  return `
<div class="profile-header">
  <div class="profile-avatar">${s.name[0]?.toUpperCase()}</div>
  <div>
    <div class="profile-name">${s.name}</div>
    <div class="profile-level">Nível ${lv.level} — ${lv.name}</div>
    <div class="profile-joined">Growth Marketing Academy</div>
  </div>
</div>

<div class="grid-4" style="margin-bottom:24px;">
  <div class="stat-card"><div class="stat-card-icon">⚡</div><div><div class="stat-card-val">${s.xp.toLocaleString()}</div><div class="stat-card-label">XP Total</div></div></div>
  <div class="stat-card"><div class="stat-card-icon">📚</div><div><div class="stat-card-val">${s.completedLessons.length}/${totalLessons}</div><div class="stat-card-label">Lições</div></div></div>
  <div class="stat-card"><div class="stat-card-icon">🏅</div><div><div class="stat-card-val">${completedMods}</div><div class="stat-card-label">Módulos</div></div></div>
  <div class="stat-card"><div class="stat-card-icon">🧠</div><div><div class="stat-card-val">${avgQuiz}%</div><div class="stat-card-label">Média Quizzes</div></div></div>
</div>

<div class="grid-2">
  <div class="card">
    <div class="card-title">⚙️ Configurações</div>
    <div class="form-group" style="margin-top:16px;">
      <label class="form-label">Seu nome</label>
      <input class="form-input" id="profile-name" value="${s.name}">
    </div>
    <button class="btn btn-primary btn-sm" style="margin-top:12px;" onclick="saveName()">Salvar</button>
    <div class="divider"></div>
    <div class="card-title" style="margin-bottom:12px;">⚠️ Zona de Perigo</div>
    <button class="btn btn-danger btn-sm" onclick="if(confirm('Tem certeza? Isso apagará todo o seu progresso.')) resetProgress()">🗑️ Resetar Progresso</button>
  </div>
  <div class="card">
    <div class="card-title">📊 Progresso por Módulo</div>
    <div style="margin-top:12px;">
      ${MODULES.map(m => {
        const done = m.lessons.filter(l => s.completedLessons.includes(l.id)).length;
        const pct = Math.round((done / m.lessons.length) * 100);
        return `
          <div style="margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
              <span>${m.icon} ${m.title}</span><span style="color:var(--text-secondary);">${pct}%</span>
            </div>
            <div class="xp-bar-bg"><div class="xp-bar-fill" style="width:${pct}%;background:${m.color};"></div></div>
          </div>`;
      }).join('')}
    </div>
  </div>
</div>
`;
}

function saveName() {
  const name = document.getElementById('profile-name')?.value?.trim();
  if (name) {
    Store.update(s => { s.name = name; });
    updateSidebar();
    showToast('✅ Salvo!', 'Nome atualizado com sucesso', '👤');
  }
}
function resetProgress() {
  localStorage.removeItem(Store.KEY);
  location.reload();
}

// ---------- INIT ----------
window.navigate = navigate;
window.openModule = openModule;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.switchTab = switchTab;
window.toggleLesson = toggleLesson;
window.completeLesson = completeLesson;
window.selectAnswer = selectAnswer;
window.quizNext = quizNext;
window.calcCAC = calcCAC;
window.calcLTV = calcLTV;
window.calcViral = calcViral;
window.calcAB = calcAB;
window.calcChurn = calcChurn;
window.calcFunnel = calcFunnel;
window.showAARRRAnalysis = showAARRRAnalysis;
window.showNSCard = showNSCard;
window.setChannelScore = setChannelScore;
window.resetChannelMatrix = resetChannelMatrix;
window.saveName = saveName;
window.resetProgress = resetProgress;

document.addEventListener('DOMContentLoaded', () => {
  updateStreak();
  updateSidebar();
  updateHeader();
  navigate('dashboard');
  checkAchievements();
});
