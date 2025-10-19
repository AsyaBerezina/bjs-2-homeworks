'use strict';

// ========== ЗАДАЧА 1: РЕШЕНИЕ КВАДРАТНЫХ УРАВНЕНИЙ ==========

function solveEquation(a, b, c) {
  let roots = [];
  
  let discriminant = b ** 2 - 4 * a * c;
  
  if (discriminant < 0) {
    roots = [];
  }
  else if (discriminant === 0) {
    let root = -b / (2 * a);
    roots.push(root);
  }
  else {
    let root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    let root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    roots.push(root1);
    roots.push(root2);
  }
  
  return roots;
}

// ========== ЗАДАЧА 2: КАЛЬКУЛЯТОР ==========

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  percent = parseFloat(percent);
  contribution = parseFloat(contribution);
  amount = parseFloat(amount);
  countMonths = parseFloat(countMonths);
  
  if (isNaN(percent) || isNaN(contribution) || isNaN(amount) || isNaN(countMonths)) {
    return false;
  }
  
  let monthlyPercent = percent / 100 / 12;
  let creditBody = amount - contribution;
  
  if (creditBody <= 0) {
    return 0;
  }
  
  let monthlyPayment = creditBody * (monthlyPercent + (monthlyPercent / (((1 + monthlyPercent) ** countMonths) - 1)));
  let totalAmount = contribution + monthlyPayment * countMonths;
  
  totalAmount = Math.round(totalAmount * 100) / 100;
  
  return totalAmount;
}

// ========== ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ ==========

console.log('========== ЗАДАЧА 1: КВАДРАТНЫЕ УРАВНЕНИЯ ==========');
console.log('Пример 1: x² - 2x - 3 = 0');
console.log('Корни: ' + solveEquation(1, -2, -3));

console.log('\nПример 2: x² - 2x + 1 = 0');
console.log('Корни: ' + solveEquation(1, -2, 1));

console.log('\nПример 3: x² + 2x + 5 = 0');
console.log('Корни: ' + solveEquation(1, 2, 5));

console.log('\n========== ЗАДАЧА 2: КАЛЬКУЛЯТОР ==========');
console.log('Пример 1: Процент: 10, Взнос: 0, Сумма: 50000, Срок: 12');
console.log('Итого: ' + calculateTotalMortgage(10, 0, 50000, 12));

console.log('\nПример 2: Процент: 10, Взнос: 1000, Сумма: 50000, Срок: 12');
console.log('Итого: ' + calculateTotalMortgage(10, 1000, 50000, 12));

console.log('\nПример 3: Процент: 10, Взнос: 20000, Сумма: 20000, Срок: 24');
console.log('Итого: ' + calculateTotalMortgage(10, 20000, 20000, 24));

console.log('\nПример 4: Процент: 15, Взнос: 0, Сумма: 10000, Срок: 36');
console.log('Итого: ' + calculateTotalMortgage(15, 0, 10000, 36));
