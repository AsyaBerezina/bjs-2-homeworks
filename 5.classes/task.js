// Задача 1. Печатное издание

class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.type = null;
    this.state = 100;
  }

  fix() {
    this.state = this.state * 1.5;
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = 'magazine';
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = 'book';
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'novel';
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'fantastic';
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'detective';
  }
}

// Проверка задачи 1
const sherlock = new PrintEditionItem(
  'Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе',
  2019,
  1008
);

console.log(sherlock.releaseDate); 
console.log(sherlock.state); 
sherlock.fix();
console.log(sherlock.state); 

const picknick = new FantasticBook(
  'Аркадий и Борис Стругацкие',
  'Пикник на обочине',
  1972,
  168
);

console.log(picknick.author);
picknick.state = 10;
console.log(picknick.state);
picknick.fix();
console.log(picknick.state); 

// Задача 2. Библиотека

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    for (let i = 0, iMax = this.books.length; i < iMax; ++i) {
      if (this.books[i][type] === value) {
        return this.books[i];
      }
    }

    return null;
  }

  giveBookByName(bookName) {
    for (let i = 0, iMax = this.books.length; i < iMax; ++i) {
      if (this.books[i].name === bookName) {
        return this.books.splice(i, 1)[0];
      }
    }

    return null;
  }
}

// Проверка задачи 2
const library = new Library('Библиотека имени Ленина');

library.addBook(
  new DetectiveBook(
    'Артур Конан Дойл',
    'Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе',
    2019,
    1008
  )
);
library.addBook(
  new FantasticBook(
    'Аркадий и Борис Стругацкие',
    'Пикник на обочине',
    1972,
    168
  )
);
library.addBook(new NovelBook('Герберт Уэллс', 'Машина времени', 1895, 138));
library.addBook(new Magazine('Мурзилка', 1924, 60));

console.log(library.findBookBy('name', 'Властелин колец'));
console.log(library.findBookBy('releaseDate', 1924).name); 

console.log('Количество книг до выдачи: ' + library.books.length); 
library.giveBookByName('Машина времени');
console.log('Количество книг после выдачи: ' + library.books.length); 

// Тестовый сценарий
const myLibrary = new Library('Районная библиотека');

myLibrary.addBook(
  new DetectiveBook('Агата Кристи', 'Десять негритят', 1939, 256)
);
myLibrary.addBook(
  new FantasticBook('Рэй Брэдбери', '451 градус по Фаренгейту', 1953, 158)
);
myLibrary.addBook(new NovelBook('Лев Толстой', 'Война и мир', 1869, 1225));
myLibrary.addBook(new Magazine('Наука и жизнь', 1934, 48));

// Ищем книгу, изданную в 1919 году
let bookFrom1919 = myLibrary.findBookBy('releaseDate', 1919);
console.log(bookFrom1919); // null — такой книги нет

// Создаём книгу 1919 года и добавляем в библиотеку
const kafkaBook = new NovelBook(
  'Франц Кафка',
  'В исправительной колонии',
  1919,
  48
);
myLibrary.addBook(kafkaBook);
bookFrom1919 = myLibrary.findBookBy('releaseDate', 1919);
console.log(bookFrom1919.name);

// Выдаём книгу читателю
let givenBook = myLibrary.giveBookByName('Десять негритят');
console.log('Выдана книга: ' + givenBook.name);

// Повреждаем выданную книгу
givenBook.state = 20;
console.log('Состояние после повреждения: ' + givenBook.state); 

// Восстанавливаем книгу
givenBook.fix();
console.log('Состояние после восстановления: ' + givenBook.state); 

myLibrary.addBook(givenBook);
console.log('Книг в библиотеке: ' + myLibrary.books.length);

// Задача 3. Журнал успеваемости

class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (mark < 2 || mark > 5) {
      return;
    }

    if (!this.marks[subject]) {
      this.marks[subject] = [];
    }

    this.marks[subject].push(mark);
  }

  getAverageBySubject(subject) {
    if (!this.marks[subject] || this.marks[subject].length === 0) {
      return 0;
    }

    let sum = this.marks[subject].reduce(function (acc, currentMark) {
      return acc + currentMark;
    }, 0);

    return sum / this.marks[subject].length;
  }

  getAverage() {
    let subjects = Object.keys(this.marks);

    if (subjects.length === 0) {
      return 0;
    }

    let sum = 0;
    for (let i = 0, iMax = subjects.length; i < iMax; ++i) {
      sum += this.getAverageBySubject(subjects[i]);
    }

    return sum / subjects.length;
  }
}

// Проверка задачи 3
const student = new Student('Олег Никифоров');
student.addMark(5, 'химия');
student.addMark(5, 'химия');
student.addMark(5, 'физика');
student.addMark(4, 'физика');
student.addMark(6, 'физика'); 
console.log(student.getAverageBySubject('физика')); 
console.log(student.getAverageBySubject('биология')); 
console.log(student.getAverage()); 