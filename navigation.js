// ЕДИНЫЙ СПИСОК УРОКОВ
// Чтобы добавить новый урок, просто скопируйте блок {...} и поменяйте данные.
// Чтобы переименовать урок, просто поменяйте текст в поле 'title'.

const lessonsData = [
  {
    id: 1,
    title: "Введение в бухгалтерский учет",
    description: "Что такое бухучет, хозяйственные операции, активы, пассивы и зачем это нужно бизнесу.",
    icon: "📖"
  },
  {
    id: 2,
    title: "Понятие бухгалтерского счета и плана счетов", // Обновлено по вашему запросу
    description: "Счета, Дебет, Кредит, активные и пассивные счета. План счетов Республики Абхазия.",
    icon: "🧮"
  },
  {
    id: 3,
    title: "Двойная запись и корреспонденция счетов",
    description: "Как составлять бухгалтерские проводки и понимать взаимосвязь счетов (скоро).",
    icon: "⚖️",
    locked: true // Флаг для будущих уроков
  },
  {
    id: 4,
    title: "Первичные документы и документооборот",
    description: "Реквизиты, виды документов и правила их оформления (скоро).",
    icon: "📄",
    locked: true
  }
];

// ФУНКЦИЯ ОТРИСОВКИ ОГЛАВЛЕНИЯ
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('lessons-grid');
  
  lessonsData.forEach(lesson => {
    // Создаем ссылку-обертку
    const link = document.createElement('a');
    link.className = 'card-link';
    
    // Если урок "заблокирован" (еще не готов), ссылка неактивна
    if (lesson.locked) {
      link.style.pointerEvents = 'none';
      link.style.opacity = '0.6';
    } else {
      link.href = `lesson${lesson.id}.html`; // Ссылка на lesson1.html, lesson2.html и т.д.
    }

    // Формируем HTML карточки
    link.innerHTML = `
      <div class="card">
        <div>
          <div style="font-size: 2.5em; margin-bottom: 10px;">${lesson.icon}</div>
          <h3>Урок ${lesson.id}. ${lesson.title}</h3>
          <p>${lesson.description}</p>
        </div>
        <span class="btn-read">${lesson.locked ? 'В разработке' : 'Перейти к уроку →'}</span>
      </div>
    `;
    
    grid.appendChild(link);
  });
});
