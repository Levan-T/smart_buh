// ==========================================
// ДАННЫЕ КУРСА
// ==========================================
const courseStructure = {
  sections: [
    {
      id: 1,
      title: "Раздел 1. Основы бухгалтерского учета",
      icon: "📚",
      lessons: [
        { id: 1, title: "Сущность и предмет бухгалтерского учета", file: "lesson1.html", status: "completed" },
        { id: 2, title: "Понятие бухгалтерского счета и плана счетов", file: "lesson2.html", status: "completed" },
        { id: 3, title: "Бухгалтерский баланс и отчетность", file: "lesson3.html", status: "completed" },
        { id: 4, title: "Формы бухгалтерского учета", file: "lesson4.html", status: "completed" },
        { id: 5, title: "Практическое задание по Разделу 1", file: "lesson5.html", status: "completed" }
      ]
    },
    {
      id: 2,
      title: "Раздел 2. Учет денежных средств и расчетов",
      icon: "💰",
      lessons: [
        { id: 6, title: "Учет кассовых операций", file: "lesson6.html", status: "completed" },
        { id: 7, title: "Учет расчетного и валютного счетов", file: "lesson7.html", status: "completed" },
        { id: 8, title: "Учет расчетов с подотчетными лицами", file: "lesson8.html", status: "completed" },
        { id: 9, title: "Учет расчетов с поставщиками и покупателями", file: "lesson9.html", status: "completed" },
        { id: 10, title: "Учет расчетов с персоналом по оплате труда", file: "lesson10.html", status: "current" },
        { id: 11, title: "Учет расчетов с бюджетом и внебюджетными фондами", file: "lesson11.html", status: "locked" },
        { id: 12, title: "Прочие расчеты с дебиторами и кредиторами", file: "lesson12.html", status: "locked" },
        { id: 13, title: "Практическое задание по Разделу 2", file: "lesson13.html", status: "locked" }
      ]
    },
    {
      id: 3,
      title: "Раздел 3. Учет имущества и финансовых вложений",
      icon: "🏢",
      lessons: [
        { id: 14, title: "Учет материалов", file: "lesson14.html", status: "locked" },
        { id: 15, title: "Учет основных средств", file: "lesson15.html", status: "locked" }
      ]
    }
  ]
};

// ==========================================
// ЛОГИКА ОТРИСОВКИ
// ==========================================

function getCurrentFile() {
  const path = window.location.pathname;
  return path.split('/').pop() || 'index.html';
}

function getAllLessonsFlat() {
  let all = [];
  courseStructure.sections.forEach(sec => {
    sec.lessons.forEach(les => all.push({ ...les, sectionTitle: sec.title }));
  });
  return all;
}

function renderHeader() {
  const container = document.getElementById('smart-header');
  if (!container) return;

  const currentFile = getCurrentFile();
  const allLessons = getAllLessonsFlat();
  const currentIndex = allLessons.findIndex(l => l.file === currentFile);
  
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const currentLesson = allLessons[currentIndex];

  let dropdownHTML = '';
  courseStructure.sections.forEach(sec => {
    const icon = sec.icon || '';
    dropdownHTML += `<div class="px-4 py-2 bg-slate-50 dark:bg-slate-900/50">
      <p class="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">${icon} ${sec.title}</p>
      <div class="space-y-1">`;
    sec.lessons.forEach(les => {
      const isActive = les.file === currentFile ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/20' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700';
      dropdownHTML += `<a href="${les.file}" class="block px-3 py-1.5 rounded text-xs transition ${isActive}">
        <span class="text-slate-400 mr-2">${les.id}.</span>${les.title}
      </a>`;
    });
    dropdownHTML += `</div></div>`;
  });

  const headerHTML = `
    <header class="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 sticky top-0 z-50 backdrop-blur-md">
      <div class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <a href="index.html" class="text-xl font-black text-blue-600 dark:text-emerald-400">smart_buh</a>
          ${currentLesson ? `<span class="hidden sm:inline text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-mono">Урок ${currentLesson.id}</span>` : ''}
        </div>
        <nav class="flex items-center space-x-2 md:space-x-4 text-sm font-medium">
          <a href="index.html" class="text-slate-600 dark:text-slate-400 hover:text-emerald-400 transition">Оглавление</a>
          <div class="relative group">
            <button class="flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-emerald-400 transition py-2">
              <span>Уроки</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div class="absolute right-0 mt-0 w-72 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right max-h-[80vh] overflow-y-auto">
              <div class="py-2">
                ${dropdownHTML}
              </div>
            </div>
          </div>
          ${prevLesson ? `<a href="${prevLesson.file}" class="text-slate-500 hover:text-blue-600 dark:hover:text-emerald-400 transition hidden sm:block" title="${prevLesson.title}">←</a>` : '<span class="text-slate-300 hidden sm:block">←</span>'}
          ${nextLesson ? `<a href="${nextLesson.file}" class="text-slate-500 hover:text-blue-600 dark:hover:text-emerald-400 transition hidden sm:block" title="${nextLesson.title}">→</a>` : '<span class="text-slate-300 hidden sm:block">→</span>'}
          <button id="theme-toggle" class="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-orange-200 dark:from-indigo-900 dark:to-slate-800 p-0.5 transition-all duration-500 hover:scale-110 shadow-md" title="Сменить тему">
            <div class="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-900 transition-all duration-500">
              <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 opacity-0 dark:opacity-100 scale-75 dark:scale-100">
                <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                </svg>
              </div>
              <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 opacity-100 dark:opacity-0 scale-100 dark:scale-75">
                <svg class="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </button>
        </nav>
      </div>
    </header>
  `;

  container.innerHTML = headerHTML;
}

function renderFooter() {
  const container = document.getElementById('smart-footer');
  if (!container) return;

  const currentFile = getCurrentFile();
  const allLessons = getAllLessonsFlat();
  const currentIndex = allLessons.findIndex(l => l.file === currentFile);
  
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const footerHTML = `
    <footer class="border-t border-slate-200 dark:border-slate-800 py-8 mt-12 bg-white dark:bg-slate-950">
      <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <p class="text-xs text-slate-500">© 2026 smart_buh. Курс по бухгалтерскому учету Республики Абхазия.</p>
        <div class="flex space-x-4 w-full md:w-auto justify-between md:justify-end">
          ${prevLesson ? `<a href="${prevLesson.file}" class="flex-1 md:flex-none text-center px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition">← Урок ${prevLesson.id}</a>` : '<div class="flex-1 md:flex-none"></div>'}
          ${nextLesson ? `<a href="${nextLesson.file}" class="flex-1 md:flex-none text-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition">Урок ${nextLesson.id} →</a>` : '<div class="flex-1 md:flex-none"></div>'}
        </div>
      </div>
    </footer>
  `;

  container.innerHTML = footerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
});

document.addEventListener('click', (e) => {
  if (e.target.closest('#theme-toggle')) {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }
});
