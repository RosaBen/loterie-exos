const books = [
  { title: 'Gatsby le magnifique', id: 133712, rented: 39 },
  { title: 'A la recherche du temps,perdu', id: 237634, rented: 28 },
  { title: 'Orgueil & Préjugés', id: 873495, rented: 67 },
  { title: 'Les frères Karamazov', id: 450911, rented: 55 },
  { title: 'Dans les forêts de Sibérie', id: 8376365, rented: 15 },
  { title: 'Pourquoi j\'ai mangé mon père', id: 450911, rented: 45 },
  { title: 'Et on tuera tous les affreux', id: 67565, rented: 36 },
  { title: 'Le meilleur des mondes', id: 88847, rented: 58 },
  { title: 'La disparition', id: 364445, rented: 33 },
  { title: 'La lune seule le sait', id: 63541, rented: 43 },
  { title: 'Voyage au centre de la Terre', id: 4656388, rented: 38 },
  { title: 'Guerre et Paix', id: 748147, rented: 19 }
];


function titleList(array) {
  let book_titles = array.map(book => {
    return {
      title: book.title
    };

  });
  return book_titles;
}

console.log("juste les titres de livres:", titleList(books))


function borrowedMoreOnce() {
  let filteredArray = books.filter(book => {
    return book.rented >= 1;
  })
  const onceBorrowedBooks = titleList(filteredArray);
  return onceBorrowedBooks;

}

console.log("livres empruntés au moins 1 fois: ", borrowedMoreOnce());


function mostOrLeastBorrowed() {
  let filteredArray = books.slice().sort(function (a, b) {
    return a.rented - b.rented
  });
  // console.log("du plus petit au plus grand", filteredArray);
  console.log("livre le plus emprunté", filteredArray[filteredArray.length - 1]);
  console.log("livre le moins emprunté", filteredArray[0]);
}

mostOrLeastBorrowed()


function removeBook() {
  const bookIndex = books.findIndex(book => book.id === 133712);
  console.log("infos du livre à supprimer: ", bookIndex)
  books.splice(bookIndex, 1) // supprime à l'index(bookIndex), 1 seul element
  console.log("liste sans l'id 133712: ", books)
}

removeBook()