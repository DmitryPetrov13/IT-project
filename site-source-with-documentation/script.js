// Переключатель темы
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

// Добавление обработчика события для переключения темы
themeSwitcher.addEventListener('click', () => {
  body.classList.toggle('dark-theme'); // Переключение класса dark-theme
  if (body.classList.contains('dark-theme')) {
    themeSwitcher.textContent = '☀️'; // Иконка солнца для светлой темы
  } else {
    themeSwitcher.textContent = '🌙'; // Иконка луны для темной темы
  }
});

// Функция для публикации результата в Telegram
document.getElementById('share-telegram').addEventListener('click', () => {
  const message = `Я набрал ${score} из ${questions.length} в этом опросе! Попробуй и ты: ${window.location.href}`;
  const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank'); // Открытие ссылки в новой вкладке
});

// Функция для публикации результата в VKontakte
document.getElementById('share-vk').addEventListener('click', () => {
  const message = `Я набрал ${score} из ${questions.length} в этом опросе! Попробуй и ты: ${window.location.href}`;
  const url = `https://vk.com/share.php?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('Результат опроса')}&comment=${encodeURIComponent(message)}`;
  window.open(url, '_blank'); // Открытие ссылки в новой вкладке
});

// Функция для отправки результата по SMS (для мобильных устройств)
document.getElementById('share-sms').addEventListener('click', () => {
  const message = `Я набрал ${score} из ${questions.length} в этом опросе! Попробуй и ты: ${window.location.href}`;
  const url = `sms:?body=${encodeURIComponent(message)}`;
  window.location.href = url; // Открытие SMS-клиента
});

// Функция для воспроизведения звуковых эффектов
function playSound(soundId) {
  const sound = document.getElementById(soundId);
  sound.currentTime = 0; // Сброс звука на начало
  sound.play(); // Воспроизведение звука
}

// Отключение правой кнопки мыши
document.addEventListener('contextmenu', (e) => {
  e.preventDefault(); // Предотвращение стандартного поведения
});

// Получение элементов страницы
const startPage = document.getElementById('start-page');
const quizPage = document.getElementById('quiz-page');
const endPage = document.getElementById('end-page');
const nameInput = document.getElementById('name');
const startBtn = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreMessage = document.getElementById('score-message');
const restartBtn = document.getElementById('restart-btn');
const greetingElement = document.getElementById('greeting');
const progressBar = document.getElementById('progress-bar');

// Переменные для хранения состояния
let currentQuestionIndex = 0;
let score = 0;
let userName = "";
let timerInterval; // Переменная для хранения интервала таймера

// Список вопросов и ответов
const questions = [
  {
    question: "Какая ОС была первой операционной системой для компьютеров?",
    options: ["Minix", "Linux", "MS-DOS", "GM-НАА"],
    answer: "GM-НАА"
  },
  {
    question: "Как зовут Основоположника проекта GNU?",
    options: ["Илон Маск", "Линус Торвальдс ", "Ричард Столлман", "Владимир Путин"],
    answer: "Ричард Столлман"
  },
  {
    question: "Какую просьбу Линус высказал ко всем, кто уже пользовался или тестировал Linux?",
    options: ["Подарить ему собаку", "Приготовить ему тортик", "Прислать ему открытку", "Отправить 1$ на чай"],
    answer: "Прислать ему открытку"
  },
  {
    question: "Почему к разработке Linux'a присоединились сотни, потом тысячи, потом сотни тысяч добровольных помощников?",
    options: ["Лунус им заплатил", "Линус опубликовал исходный код Linux'a", "Линус обещал всем участникам бесплатные автомобили", "Разработка Linux'a была частью глобального заговора по захвату мира"],
    answer: "Линус опубликовал исходный код Linux'a"
  },
  {
    question: "Что такое операционная система (ОС)?",
    options: ["Программа для редактирования текстов.", "Набор программ, обеспечивающих работу компьютера и взаимодействие с пользователем.", "Устройство для хранения данных.", "Вид компьютерного вируса."],
    answer: "Набор программ, обеспечивающих работу компьютера и взаимодействие с пользователем."
  },
  {
    question: "Какая операционная система была разработана Линусом Торвальдсом?",
    options: ["Windows", "UNIX", "Linux", "macOS"],
    answer: "Linux"
  },
  {
    question: "Какая операционная система использовалась как база для ранних версий Windows?",
    options: ["Linux", "MS-DOS", "UNIX", "Minix"],
    answer: "MS-DOS"
  },
  {
    question: "Какая версия Windows впервые представила голосовую помощницу Кортану?",
    options: ["Windows 7", "Windows 8", "Windows 10", "Windows XP"],
    answer: "Windows 10"
  }
];

// Функция для получения текущего времени в UTC+5
function getCurrentTimeInUTC5() {
  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000); // Преобразование в UTC
  const utc5Time = new Date(utcTime + (5 * 3600000)); // Добавление 5 часов для UTC+5
  return utc5Time;
}

// Функция для отображения приветствия в зависимости от времени суток
function displayGreeting() {
  const utc5Time = getCurrentTimeInUTC5();
  const hour = utc5Time.getHours();
  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Доброе утро!";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Добрый день!";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Добрый вечер!";
  } else {
    greeting = "Доброй ночи!";
  }

  greetingElement.textContent = greeting; // Установка текста приветствия
}

// Вызов функции приветствия при загрузке страницы
displayGreeting();

// Алгоритм Фишера-Йетса для перемешивания массива
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Обмен элементами
  }
  return array;
}

// Перемешивание вопросов и вариантов ответов
function shuffleQuestions() {
  shuffleArray(questions);
  questions.forEach((question) => {
    shuffleArray(question.options); // Перемешивание вариантов ответов
  });
}

// Начало опроса
startBtn.addEventListener('click', () => {
  if (nameInput.value.trim() === "") {
    alert("Пожалуйста, введите свое имя!"); // Проверка на пустое имя
    return;
  }
  playSound('button-click-sound'); // Воспроизведение звука клика
  userName = nameInput.value.trim();
  shuffleQuestions(); // Перемешивание вопросов
  startPage.classList.remove('active');
  startPage.classList.add('hidden');
  setTimeout(() => {
    quizPage.classList.remove('hidden');
    quizPage.classList.add('active');
  }, 500); // Задержка для анимации
  loadQuestion(); // Загрузка первого вопроса
});

// Функция для запуска таймера
function startTimer() {
  let timeLeft = 15; // 15 секунд на вопрос
  const timerElement = document.getElementById('timer');
  const progressCircle = document.getElementById('timer-circle-progress');
  const circumference = 157; // Длина окружности (2 * π * r, где r = 25)

  // Обновление таймера и прогресса круга
  const updateTimer = () => {
    timerElement.textContent = timeLeft;
    const offset = circumference - (timeLeft / 15) * circumference;
    progressCircle.style.strokeDashoffset = offset;
  };

  updateTimer(); // Начальное обновление

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();

    // Если время вышло, переход к следующему вопросу
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      moveToNextQuestion();
    }
  }, 1000); // Обновление каждую секунду
}

// Функция для остановки таймера
function stopTimer() {
  clearInterval(timerInterval); // Остановка интервала
}

// Функция для перехода к следующему вопросу
function moveToNextQuestion() {
  stopTimer(); // Остановка таймера
  quizPage.classList.remove('fade-in');
  quizPage.classList.add('fade-out');

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion(); // Загрузка следующего вопроса
    } else {
      endQuiz(); // Завершение опроса, если вопросы закончились
    }
  }, 500); // Задержка для анимации
}

// Загрузка вопроса
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${userName}, ${currentQuestion.question}`; // Отображение вопроса
  optionsElement.innerHTML = '';
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option');
    button.style.setProperty('--index', index);
    button.addEventListener('click', () => selectAnswer(option)); // Обработчик выбора ответа
    optionsElement.appendChild(button);
  });
  nextBtn.classList.add('hidden');

  // Обновление полосы прогресса
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;

  // Запуск таймера для текущего вопроса
  startTimer();
}

// Выбор ответа
function selectAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.disabled = true; // Блокировка кнопок после выбора
    if (option.textContent === currentQuestion.answer) {
      option.classList.add('correct'); // Подсветка правильного ответа
      playSound('correct-answer-sound'); // Воспроизведение звука правильного ответа
    } else if (option.textContent === selectedOption) {
      option.classList.add('wrong'); // Подсветка неправильного ответа
      playSound('wrong-answer-sound'); // Воспроизведение звука неправильного ответа
    }
  });

  if (selectedOption === currentQuestion.answer) {
    score++; // Увеличение счета при правильном ответе
  }

  stopTimer(); // Остановка таймера
  nextBtn.classList.remove('hidden'); // Отображение кнопки "Далее"
}

// Переход к следующему вопросу
nextBtn.addEventListener('click', () => {
  stopTimer(); // Остановка таймера
  moveToNextQuestion(); // Переход к следующему вопросу
});

// Завершение опроса
function endQuiz() {
  quizPage.classList.remove('active');
  quizPage.classList.add('hidden');
  setTimeout(() => {
    endPage.classList.remove('hidden');
    endPage.classList.add('active');
  }, 500); // Задержка для анимации

  scoreMessage.textContent = `Поздравляем, ${userName}! Ваша оценка ${score} из ${questions.length}.`;
  triggerConfetti(); // Запуск конфетти
  saveScore(userName, score); // Сохранение результата
}

// Функция для запуска конфетти
function triggerConfetti() {
  const emojis = ["🎉", "🎊", "🌟", "⭐", "💫", "✨", "🥳", "👏"]; // Список эмодзи
  const confettiContainer = document.createElement('div');
  confettiContainer.style.position = 'fixed';
  confettiContainer.style.top = '0';
  confettiContainer.style.left = '0';
  confettiContainer.style.width = '100%';
  confettiContainer.style.height = '100%';
  confettiContainer.style.pointerEvents = 'none'; // Игнорирование кликов
  document.body.appendChild(confettiContainer);

  const scoreMultiplier = Math.ceil(score / 2); // Множитель для количества эмодзи
  const emojiCount = 10 + scoreMultiplier * 5; // Базовое количество + дополнительные эмодзи

  for (let i = 0; i < emojiCount; i++) {
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]; // Случайный эмодзи
    emoji.style.position = 'absolute';
    emoji.style.fontSize = `${Math.random() * 24 + 16}px`; // Случайный размер
    emoji.style.left = `${Math.random() * 100}vw`; // Случайная горизонтальная позиция
    emoji.style.top = `${Math.random() * -20}vh`; // Начальная позиция выше экрана
    emoji.style.transform = `rotate(${Math.random() * 360}deg)`; // Случайный поворот
    emoji.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`; // Анимация падения
    confettiContainer.appendChild(emoji);

    // Удаление эмодзи после завершения анимации
    emoji.addEventListener('animationend', () => {
      emoji.remove();
      if (confettiContainer.children.length === 0) {
        confettiContainer.remove(); // Удаление контейнера, если все эмодзи исчезли
      }
    });
  }
}

// Добавление ключевых кадров для анимации падения
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Сохранение результата в LocalStorage
function saveScore(name, score) {
  const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
  const existingUserIndex = scores.findIndex(entry => entry.name === name);

  if (existingUserIndex !== -1) {
    if (score > scores[existingUserIndex].score) {
      scores[existingUserIndex].score = score; // Обновление счета, если он выше
    }
  } else {
    scores.push({ name, score }); // Добавление нового результата
  }

  localStorage.setItem('quizScores', JSON.stringify(scores)); // Сохранение в LocalStorage
  displayHighScores(); // Отображение таблицы лучших результатов
}

// Отображение таблицы лучших результатов
function displayHighScores() {
  const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
  if (scores.length > 0) {
    scoreMessage.innerHTML += `<br><br><strong>Таблица лучших результатов:</strong><br>`;
    scores.sort((a, b) => b.score - a.score).forEach((entry, index) => {
      scoreMessage.innerHTML += `${index + 1}. ${entry.name}: ${entry.score}<br>`;
    });
  }
}

// Перезапуск опроса
restartBtn.addEventListener('click', () => {
  playSound('button-click-sound'); // Воспроизведение звука клика
  endPage.classList.remove('active');
  endPage.classList.add('hidden');
  setTimeout(() => {
    startPage.classList.remove('hidden');
    startPage.classList.add('active');
  }, 500); // Задержка для анимации
  currentQuestionIndex = 0;
  score = 0;
  progressBar.style.width = '0%'; // Сброс полосы прогресса
});
