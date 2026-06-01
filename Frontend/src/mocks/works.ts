type WorkItem = {
  id: number;
  work: string;
  dimension_type: string;
  dimension_value: number;
  executor: string;
  date: string; // Добавляем новое поле
};

/**
 * Генерирует случайную дату в прошлом в формате 'YYYY-MM-DD'.
 * @returns Строка с датой.
 */
function getRandomPastDate(): string {
    const currentDate = new Date(); // Текущая дата
    // Вычитаем случайное количество дней (до 2 лет)
    const pastDate = new Date(
        currentDate.getTime() - Math.random() * (1000 * 60 * 60 * 24 * 365 * 2)
    );

    const year = pastDate.getFullYear();
    // Месяцы в JS нумеруются с 0 (январь - 0), поэтому +1
    const month = String(pastDate.getMonth() + 1).padStart(2, '0'); // Добавляем ведущий ноль, если нужно
    const day = String(pastDate.getDate()).padStart(2, '0'); // Добавляем ведущий ноль, если нужно

    return `${year}-${month}-${day}`;
}

/**
 * Генерирует массив с тестовыми данными для таблицы.
 * @param count - Количество объектов для генерации (по умолчанию 40).
 * @returns Массив объектов типа WorkItem.
 */
export function generateMockData(count: number = 50): WorkItem[] {
  const workNames: string[] = [
    'Земляные работы', 'Бетонирование фундамента', 'Кладка стен',
    'Монтаж кровли', 'Установка окон', 'Штукатурные работы',
    'Малярные работы', 'Укладка плитки', 'Монтаж электрики',
    'Монтаж сантехники'
  ];

  const dimensionTypes: string[] = ['м2', 'м3', 'шт', 'пог. м', 'кг'];
  const firstNames: string[] = ['Иван', 'Алексей', 'Дмитрий', 'Сергей', 'Андрей'];
  const lastNames: string[] = ['Иванов', 'Петров', 'Смирнов', 'Волков', 'Соколов'];
  const getRandomElement = <T>(arr: T[]): T => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  const data: WorkItem[] = [];

  for (let i: number = 1; i <= count; i++) {
    const executor = `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
    data.push({
      id: i,
      work: getRandomElement(workNames),
      dimension_type: getRandomElement(dimensionTypes),
      dimension_value: Math.floor(Math.random() * 100) + 1,
      executor: executor,
      date: getRandomPastDate(),
    });
  }

  return data;
}