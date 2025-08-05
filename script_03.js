const usersList = users;
console.log("Nombre d'utilisateurs chargés :", usersList.length);
// ---------------------------------------------------------------------------------------
// Quel est le chiffre d'affaires moyen par utilisateur?

// total des revenus en EUROS du tableau users
function totalRevenue(array) {
  let sumTotalRevenus = 0;
  for (let index = 0; index < array.length; index++) {
    sumTotalRevenus += array[index].revenue;
  }
  return sumTotalRevenus = sumTotalRevenus / 100
}

// moyenne de CA sur tous les users
function avgRevenueAllUsers() {
  let sum = totalRevenue(usersList);
  let avgTotal = sum / usersList.length;
  return Math.round(avgTotal);
}

console.log("chiffre d'affaires moyen par utilisateur => ", `${avgRevenueAllUsers()}€`);

// ---------------------------------------------------------------------------------------------------

// Quel est le pourcentage d'utilisateurs ayant rapporté de l'argent (revenue supérieur à 0)?

// tableau avec users dont revenus > 0

function usersWithRevenue(array) {
  return array.filter(user => user.revenue > 0);
}


const onlyPayingClients = usersWithRevenue(usersList);

// pourcentage de users avec CA positif et non null
function usersWithBenefit() {
  const percentageUsers = Math.round((onlyPayingClients.length / usersList.length) * 100)
  return percentageUsers
}

console.log("pourcentage d'utilisateurs ayant rapporté de l'argent (revenue supérieur à 0) => ", `${usersWithBenefit()} % d'utilisateurs`)

// ----------------------------------------------------------------------------------------------

// Parmi les utilisateurs ayant rapporté de l'argent, quel est le chiffre d'affaires moyen d'un utilisateur?

function avgRevenueSelectedUsers() {
  let sum = totalRevenue(onlyPayingClients);
  let avgTotal = sum / onlyPayingClients.length;
  return Math.round(avgTotal)
}

console.log("utilisateurs ayant rapporté de l'argent, quel est le chiffre d'affaires moyen d'un utilisateur => ", `${avgRevenueSelectedUsers()} €`)

// ---------------------------------------------------------------------------------------------
// Combien avons-nous gagné d'argent au total?

console.log("Montant total gagné =>", `${totalRevenue(onlyPayingClients)}€`)

// ---------------------------------------------------------------------------------------------------

// Combien avons-nous d'utilisateurs en France?

function showUsersByCountry(country) {
  let filterArray = usersList.filter(user => {
    return user.country.toLowerCase() === country.toLowerCase()
  })
  return filterArray
}

console.log("nombre d'utilisateurs en France =>", `${showUsersByCountry("france").length} utilisateurs`)

// -----------------------------------------------------------------------------------------
// Parmi ces utilisateurs, combien avons-nous de clients payants en France?

function payingCustomers() {
  let array = showUsersByCountry("France");
  let frenchPayingClts = usersWithRevenue(array).length
  return frenchPayingClts
}

console.log("nombre de clients payants en France =>", `${payingCustomers()} clients payants en France`)

// ---------------------------------------------------------------------------------

// Donne-moi le chiffre d'affaires réparti dans nos 4 pays les plus représentés (Allemagne, États-Unis, France, Grande-Bretagne) (chiffre d'affaires total, en France, aux États-Unis, etc.)

// Création d'un tableau d'objets pour chaque pays
function showRevenuesSelectedCountries() {
  const userFrance = showUsersByCountry("france");
  const userGermany = showUsersByCountry("germany");
  const userUsa = showUsersByCountry("United States");
  const userUk = showUsersByCountry("Great Britain");
  return {
    france: totalRevenue(userFrance),
    germany: totalRevenue(userGermany),
    usa: totalRevenue(userUsa),
    uk: totalRevenue(userUk)
  };
}

// Récupère tableau d'objet afin de récupérer seulement les montants
const revenues = showRevenuesSelectedCountries();
console.log(
  `CA dans ces 4 pays =>\n France => ${revenues.france}€\n Allemagne => ${revenues.germany}€\n Grande-Bretagne => ${revenues.uk}€\n Etats-Unis => ${revenues.usa}€`
);

// --------------------------------------------------------
// Fais-moi la liste de tous les pays dans lesquels nous avons gagné de l'argent?

function showBenefitByCountry() {
   const listBenefitClts = onlyPayingClients;
  let listCountries = []
  listBenefitClts.forEach(user => {
    if (!listCountries.includes(user.country)) {
      listCountries.push(user.country);
    }
  })

  return listCountries.sort()
}

console.log("liste de tous les pays dans lesquels nous avons gagné de l'argent =>", showBenefitByCountry())

// -----------------------------------------------------------------
// Quels sont nos 5 utilisateurs qui nous ont rapporté le plus d'argent?

// classer les revenus du plus élévé au plus bas
function sortClients() {
  const listBestClients = onlyPayingClients
  let sortedBestClients = listBestClients.slice().sort(function (a, b) {
    return b.revenue - a.revenue
  })
  return sortedBestClients
}

//  Récupérer seulement les 5 premiers
function bestClients() {
  const topClients = sortClients()

  return topClients.slice(0, 5)
}

console.log("les 5 utilisateurs qui nous ont rapporté le plus d'argent =>", bestClients())

// -------------------------------------------------------
// Gagnons-nous plus d'argent auprès des hommes ou des femmes?

function revenueByWomen(array) {
  const revenueWomen = array.filter(user => {
    return user.sex === "F"
  })
  return totalRevenue(revenueWomen)
}

function revenueByMen(array) {
  const revenueMen = array.filter(user => {
    return user.sex === "M"
  })
  return totalRevenue(revenueMen)
}

function compareRevenusByGender() {
  const womenRevenus = revenueByWomen(onlyPayingClients);
  const menRevenus = revenueByMen(onlyPayingClients);
  if (womenRevenus > menRevenus) {
    return "Il y a plus de revenus avec les femmes"
  } else if (womenRevenus === menRevenus) {
    return "les hommes et les femmes apportent autant de revenus chacun"
  } else {
    return "Il y a plus de revenus avec les hommes"
  }
}


console.log("total revenues pour les femmes => ", `${revenueByWomen(onlyPayingClients)}€\n`, "total revenues pour les hommes => ", `${revenueByMen(onlyPayingClients)}€\n`, `${compareRevenusByGender()}`)


// -------------------------------------------------------------
// Sors-moi les utilisateurs ayant rapporté au moins 75€

function over75Revenue(){
  return onlyPayingClients.filter(user => user.revenue >= 75);
}

console.log(`${over75Revenue().length }`,"utilisateurs ont rapporté au moins 75€ de revenue => ", over75Revenue())
// ------------------------------------------------------------------------
// Parmi nos 100 premiers utilisateurs, quel est le pourcentage qui sont des clients payants?

function first100Clts(){
  const top100= usersList.slice(0,100);
  return top100
}

function percentTop100(){
  const payingTop100 = usersWithRevenue(first100Clts())
  const percentageUsers = Math.round((payingTop100.length / first100Clts().length) * 100)
  return percentageUsers
}

console.log("sur les 100 premiers utilisateurs =>", `il y a ${percentTop100() } % d'utilisateurs payants`)

// ----------------------------------------------------------