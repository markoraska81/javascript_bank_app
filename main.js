var dataBase = [
  {
    id: 1,
    name: "Marko Milenkovic",
    deposit: 13000 + " €",
    cCard: "Visa Electron"
  },
  {
    id: 2,
    name: "Sladjana Roganovic",
    deposit: 24000 + " €",
    cCard: "Master Card"
  }
];

var mainTbody = document.querySelector('#mainTbody');
var editTbody = document.querySelector('#editTbody');

var accBtn = document.querySelector('#accBtn');
var addBtn = document.querySelector('#addBtn');
var editDelBtn = document.querySelector('#editDelBtn');
var saveAddBtn = document.querySelector('#saveAddBtn');

var accountPage = document.querySelector('#accountPage');
var addAccountPage = document.querySelector('#addAccountPage');
var editDelAccountPage = document.querySelector('#editDelAccountPage');
var editAccountPage = document.querySelector('#editAccountPage');

var accId = document.querySelector('#accId');
var accName = document.querySelector('#accName');
var accDeposit = document.querySelector('#accDeposit');
var accCard = document.querySelector('#accCard');

var editAccId = document.querySelector('#editAccId');
var editAccName = document.querySelector('#editAccName');
var editAccDeposit = document.querySelector('#editAccDeposit');
var editAccCard = document.querySelector('#editAccCard');

var id;


accBtn.addEventListener('click', openAccountForm);
addBtn.addEventListener('click', addAccountForm);
editDelBtn.addEventListener('click', editDelAccountForm);
saveAddBtn.addEventListener('click', saveAddAccount);
saveEditBtn.addEventListener('click', changeSaveAccount);

createTable();

function createTable() {
  var text = "";
  dataBase.forEach(function(item, i) {
    text += '<tr>';
    text += '<td>' + dataBase[i].id + '</td>';
    text += '<td>' + dataBase[i].name + '</td>';
    text += '<td>' + dataBase[i].deposit + '</td>';
    text += '<td>' + dataBase[i].cCard + '</td>';
    text += '</tr>';
  });
  mainTbody.innerHTML = text;
};

function createEditTable() {
  var text = "";
  dataBase.forEach(function(item, i) {
    text += '<tr>';
    text += '<td>' + dataBase[i].id + '</td>';
    text += '<td>' + dataBase[i].name + '</td>';
    text += '<td>' + dataBase[i].deposit + '</td>';
    text += '<td>' + dataBase[i].cCard + '</td>';
    text += '<td><button id="' + i + '" class="edit">Edit</button></td>';
    // u okviru button dugmeta moramo odrediti ID,
    // kako bi mogli da izbrisemo navedeni account
    text += '<td><button id="' + i + '" class="delete">Delete</button></td>'
    text += '</tr>';
  });
  editTbody.innerHTML = text;
  var deleteBtn = document.querySelectorAll('.delete');
  var editBtn = document.querySelectorAll('.edit');
  deleteBtn.forEach(function(item, i) {
    deleteBtn[i].addEventListener('click', deleteAccount);
    editBtn[i].addEventListener('click', editAccount);
  });

};


// dugme SAVE kojim sacuvamo vrednosti
// koje unesemo na stranici ADD ACCOUNT
function saveAddAccount() {
  // definisemo vrednosti koje ce biti unesena u INPUT polja
  // a koja ce se sacuvati
  var id = accId.value;
  var name = accName.value;
  var deposit = accDeposit.value;
  var card = accCard.value;
  // kreiramo novi account, koji ce da sadrzi elemente
  // sa vrednostima koje su unesene u INPUT polja
  var newAccount = {
    id: id,
    name: name,
    deposit: deposit + " €",
    card: card
  }
  // na glavnu Bazu dodajemo novi account koji smo kreirali
  dataBase.push(newAccount);
  // pozivamo funkciju koja ce napraviti novi account u nasu bazu
  createTable();
  // pozivamo funkciju gde ce se videti novi podaci
  openAccountForm();
}


// klikom na dugme EDIT na stranici EDIT/DELETE,
// otvara se stranica za promenu podataka
function editAccount() {
  // prvo klikom na dugme EDIT moramo otvoriti stranicu,
  // za promenu podataka
  accountPage.style.display = "none";
  addAccountPage.style.display = "none";
  editDelAccountPage.style.display = "none";
  editAccountPage.style.display = "block";
  // potrebno je da definisemo ID kako bi mogli,
  // da izmenimo podatke za zadati accounta
  var id = this.getAttribute('id')
  // zatim treba da da izmenimo vrednosti
  // u INPUT poljima
  editAccId.value = dataBase[id].id;
  editAccName.value = dataBase[id].name;
  editAccDeposit.value = dataBase[id].deposit;
  editAccCard.value = dataBase[id].cCard;
}


// klikom na dugme SAVE na stranici EDIT ACCOUNT,
// cuvamo izmenjene podatke
function changeSaveAccount() {
  // prvo unesemo nove vrednosti koje cemo unet,
  // i koje ce zameniti stare vrednosti
  var accId = editAccId.value;
  var accName = editAccName.value;
  var accDeposit = editAccDeposit.value;
  var accCard = editAccCard.value;
  // u postojecoj bazi te nove vrednosti cemo sacuvti,
  // koristeci ID accounta kojem menjamo vrednostima
  // ID, mozemo definisati lokalno, ali posto ga koristimo na vise mesta,
  // mozemo definisati globalno
  dataBase[id] = {
    id: accId,
    name: accName,
    deposit: accDeposit,
    cCard: accCard
  };
  // zatim te nove vrednosti kreiramo u novu bazu
  // pozivanjem funkcije za dodavanje accounta u bazu
  createTable();
  // pozovemo funkcija koja ce nam prikazati bazu
  // sa izmenjenim podacima
  openAccountForm()
}



// klikom na dugme DELETE na
// stranici EDIT/DELETE brisemo klijenta
function deleteAccount() {
  // odredjujemo ID accounta koji cemo da brisemo
  var id = this.id;
  // metodom splice sa definisanim ID,
  // izbacujemo taj account koji ima navedeni ID
  dataBase.splice(id, 1);
  // zatim pozivamo funkciju koja ce kreirati novu bazu,
  // bez accounta koji smo izbrisali
  createTable();
  // pozivamo funkciju koja ce prikazati novu Bazu
  // bez elementa koji smo izbrisali
  editDelAccountForm();
}


// klikom na dugme ACCOUNTS idemo na stranicu ACCOUNTS
function openAccountForm() {
  accountPage.style.display = "block";
  addAccountPage.style.display = "none";
  editDelAccountPage.style.display = "none";
  editAccountPage.style.display = "none";
}

// klikom na dugme ADD ACCOUNT idemo na stranicu ADD ACCOUNT
function addAccountForm() {
  accountPage.style.display = "none";
  addAccountPage.style.display = "block";
  editAccountPage.style.display = "none";
  editDelAccountPage.style.display = "none";
}

// klikom na dugme EDIT/DELETE idemo na stranicu EDIT/DELETE ACCOUNT
function editDelAccountForm() {
  createEditTable();
  accountPage.style.display = "none";
  addAccountPage.style.display = "none";
  editDelAccountPage.style.display = "block";
  editAccountPage.style.display = "none";
}
