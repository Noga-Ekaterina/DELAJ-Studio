export function getShuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Генерируем случайный индекс
    [array[i], array[j]] = [array[j], array[i]]; // Меняем местами элементы
  }
  return array;
}
