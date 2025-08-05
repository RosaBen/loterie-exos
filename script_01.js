const entrepreneurs = [
  { first: 'Steve', last: 'Jobs', year: 1955 },
  { first: 'Oprah', last: 'Winfrey', year: 1954 },
  { first: 'Bill', last: 'Gates', year: 1955 },
  { first: 'Sheryl', last: 'Sandberg', year: 1969 },
  { first: 'Mark', last: 'Zuckerberg', year: 1984 },
  { first: 'Beyonce', last: 'Knowles', year: 1981 },
  { first: 'Jeff', last: 'Bezos', year: 1964 },
  { first: 'Diane', last: 'Hendricks', year: 1947 },
  { first: 'Elon', last: 'Musk', year: 1971 },
  { first: 'Marissa', last: 'Mayer', year: 1975 },
  { first: 'Walt', last: 'Disney', year: 1901 },
  { first: 'Larry', last: 'Page', year: 1973 },
  { first: 'Jack', last: 'Dorsey', year: 1976 },
  { first: 'Evan', last: 'Spiegel', year: 1990 },
  { first: 'Brian', last: 'Chesky', year: 1981 },
  { first: 'Travis', last: 'Kalanick', year: 1976 },
  { first: 'Marc', last: 'Andreessen', year: 1971 },
  { first: 'Peter', last: 'Thiel', year: 1967 }
];

// function fullnames() {
//   let fullnamesArray = [];
//   entrepreneurs.forEach(entrepreneur => {
//     fullnamesArray.push(`${entrepreneur.first} ${entrepreneur.last}`);
//   });
//   return fullnamesArray;
// }

// console.log(fullnames());

function filterArray() {
  let filteredArray = entrepreneurs.map(entrepreneur => {
    return {
      first_name: entrepreneur.first,
      last_name: entrepreneur.last
    };
  });
  return filteredArray;
}

console.log("seulement prenom et nom: ", filterArray());


function entrepreneurAge(array) {
  let ageEntrepreneurs = array.map(entrepreneur => {
    let current_year = new Date().getFullYear();
    let entrepreneur_age = current_year - entrepreneur.year;
    return {
      firstName: entrepreneur.first,
      lastName: entrepreneur.last,
      age: entrepreneur_age
    }
  })
  return ageEntrepreneurs;
}

console.log("remplacer année par age: ", entrepreneurAge(entrepreneurs));


function seventiesEntrepreneurs() {
  let seventies = entrepreneurs.filter(entrepreneur => {
    return entrepreneur.year >= 1970 && entrepreneur.year < 1980;
  });

  const entrepreneurs70s = entrepreneurAge(seventies);
  return entrepreneurs70s;
}

console.log("seulement les entrepreneurs des années 70:", seventiesEntrepreneurs())

