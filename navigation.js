// ЕДИНЫЙ СПИСОК УРОКОВ
// Когда добавляешь новый урок — просто допиши его в этот массив!
const LESSONS_DATA = [
  {
    id: 1,
    title: "Урок 1. Базовые понятия и термины",
    desc: "Что такое бухгалтерский учет, актив, пассив и баланс.",
    file: "lesson1.html"
  },
  {
    id: 2,
    title: "Урок 2. Структура баланса",
    desc: "Разбор статей актива и пассива, внеоборотные и оборотные активы.",
    file: "lesson2.html"
  },
  {
    id: 3,
    title: "Урок 3. Четыре типа изменений в балансе",
    desc: "Как хозяйственные операции влияют на актив, пассив и валюту баланса.",
    file: "lesson3.html"
  }
  // Задел на будущее (просто раскомментируешь или допишешь строчку):
  // { id: 4, title: "Урок 4. Счета и двойная запись", desc: "Дебет, кредит и проводки.", file: "lesson4.html" }
];

// Функция автоматической сборки оглавления на Главной странице
function renderMenu() {
  const container = document.getElementById('lessons-grid');
  if (!container) return;

  container.innerHTML = LESSONS_DATA.map(lesson => `
    <a href="${lesson.file}" class="card-link">
      <div class="card">
        <h3>${lesson.title}</h3>
        <p>${lesson.desc}</p>
        <span class="btn-read">Читать урок →</span>
      </div>
    </a>
  `).join('');
}

// Запускаем сборку при загрузке страницы
document.addEventListener('DOMContentLoaded', renderMenu);
