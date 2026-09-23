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
        { id: 1, title: "Сущность и предмет бухгалтерского учета", file: "lesson1.html" },
        { id: 2, title: "Понятие бухгалтерского счета и плана счетов", file: "lesson2.html" },
        { id: 3, title: "Бухгалтерский баланс и отчетность", file: "lesson3.html" },
        { id: 4, title: "Формы бухгалтерского учета", file: "lesson4.html" },
        { id: 5, title: "Практическое задание по Разделу 1", file: "lesson5.html" }
      ]
    },
    {
      id: 2,
      title: "Раздел 2. Учет денежных средств и расчетов",
      icon: "💰",
      lessons: [
        { id: 6, title: "Учет кассовых операций", file: "lesson6.html" },
        { id: 7, title: "Учет расчетного и валютного счетов", file: "lesson7.html" },
        { id: 8, title: "Учет расчетов с подотчетными лицами", file: "lesson8.html" },
        { id: 9, title: "Учет расчетов с поставщиками и покупателями", file: "lesson9.html" },
        { id: 10, title: "Учет расчетов с персоналом по оплате труда", file: "lesson10.html" },
        { id: 11, title: "Учет расчетов с бюджетом и внебюджетными фондами", file: "lesson11.html" },
        { id: 12, title: "Прочие расчеты с дебиторами и кредиторами", file: "lesson12.html" },
        { id: 13, title: "Практическое задание по Разделу 2", file: "lesson13.html" }
      ]
    },
    {
      id: 3,
      title: "Раздел 3. Учет имущества и финансовых вложений",
      icon: "",
      lessons: [
        { id: 14, title: "Учет материалов", file: "lesson14.html" },
        { id: 15, title: "Учет основных средств", file: "lesson15.html" }
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

  // Генерация выпадающего меню с иконками
  let dropdownHTML = '';
  courseStructure.sections.forEach(sec => {
    const icon = sec.icon || '📄'; // Если иконки нет, используем 📄
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
          <button id="theme-toggle" class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-emerald-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition" title="Сменить тему">
            <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
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
