// Нужно написать функцию, которая переводит двумерный массив (массив массивов) 
// в CSV формат и возвращать строку 
// О формате: https://ru.wikipedia.org/wiki/CSV (детали в разделе "Спецификация")

// Допустимые значения в качестве элементов массива - числа и строки 
// Если встречается функция - выбрасывать ошибку с текстом "Unexpected value"

// Функция принимает: data - массив массивов, содержашие числа или строки

// Функция возвращает: Строку в формате CSV

// Пример:

// arraysToCsv([[1, 2], ['a', 'b']]) // '1,2
// a,b'
// arraysToCsv([[1, 2], ['a,b', 'c,d']]) // '1,2
// "a,b","c,d"'

function arrayToCsv(data) {
  //validation
  for (let row of data) {
    for (let value of row) {
        if (typeof value !== 'number' && typeof value !== 'string') {
            throw new TypeError("Unexpected value");
        }
    }
  }

  return data
    .map((row) =>
      row.map(value => {
          if (Number.isNaN(value) || value.length > 1) {
            return `"${value.replace(/\"/g, '""')}"`;
          } else if (typeof value === "number" || typeof value === "string") {
            return value;
          }
      })
        .join(",")
    )
    .join("\n");
}

console.log(arrayToCsv([[1, 2], ['a', 'b']]));
console.log(arrayToCsv([[1, 2], ['a,b', 'c,d']]))