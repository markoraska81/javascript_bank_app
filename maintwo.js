var accBtn = document.querySelector('#accBtn');
var addBtn = document.querySelector('#addBtn');
var editDelBtn = document.querySelector('#editDelBtn');
var saveAddBtn = document.querySelector('#saveAddBtn');
var saveEditBtn = document.querySelector('#saveEditBtn');

var mainTbody = document.querySelector('#mainTbody');
var editTbody = document.querySelector('#editTbody');

var accountPage = document.querySelector('#accountPage');
var addAccountPage = document.querySelector('#addAccountPage');
var editDelAccountPage = document.querySelector('#editDelAccountPage');
var editAccountPage = document.querySelector('#editAccountPage');
var deleteAccountPage = document.querySelector('#deleteAccountPage');

var accId = document.querySelector('#accId');
var accName = document.querySelector('#accName');
var accDeposit = document.querySelector('#accDeposit');
var accCard = document.querySelector('#accCard');

var editAccId = document.querySelector('#editAccId');
var editAccName = document.querySelector('#editAccName');
var editAccDeposit = document.querySelector('#editAccDeposit');
var editAccCard = document.querySelector('#editAccCard');

var id;

var editBtn = document.querySelector('#editBtn');
// var editBtn = document.querySelector('#editBtn');
var id;

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


accBtn.addEventListener('click', accountForm);
addBtn.addEventListener('click', addAccountForm);
editDelBtn.addEventListener('click', editDelAccountForm);
saveAddBtn.addEventListener('click', saveAddAccount);
saveEditBtn.addEventListener('click', changeSaveAccount);




createTable();

function createTable() {
  var text = "";
  for (var i = 0; i < dataBase.length; i++) {
    text += '<tr>';
    text += '<td>' + dataBase[i].id + '</td>';
    text += '<td>' + dataBase[i].name + '</td>';
    text += '<td>' + dataBase[i].deposit + '</td>';
    text += '<td>' + dataBase[i].cCard + '</td>';
    text += '</tr>';
  }
  mainTbody.innerHTML = text;
}
function createEditTable() {
  var text = "";
  for (var i = 0; i < dataBase.length; i++) {
    text += '<tr>';
    text += '<td>' + dataBase[i].id + '</td>';
    text += '<td>' + dataBase[i].name + '</td>';
    text += '<td>' + dataBase[i].deposit + '</td>';
    text += '<td>' + dataBase[i].cCard + '</td>';
    text += '<td><button data-id="' + i + '" class="edit">Edit</button></td>';
    text += '<td><button id="' + i + '" class="delete">Delete</button></td>';
    text += '</tr>';
  }
  editTbody.innerHTML = text;
  var deleteBtns = document.querySelectorAll('.delete');
  var editBtns = document.querySelectorAll('.edit');
  for (var i = 0; i < deleteBtns.length; i++) {

    deleteBtns[i].addEventListener('click', deleteAccount);
    editBtns[i].addEventListener('click', editAccount);

  }
}

// klikom na dugme SAVE na stranici EDIT ACCOUNT,
// cuvamo izmenjene podatke
function changeSaveAccount() {
  var accId = editAccId.value;
  var accName = editAccName.value;
  var accDeposit = editAccDeposit.value;
  var accCard = editAccCard.value;

  dataBase[id] = {
    id: accId,
    name: accName,
    deposit: accDeposit,
    cCard: accCard
  };
  createTable();
  accountForm();
}

// klikom na dugme EDIT na stranici EDIT/DELETE,
// otvara se stranica za promenu podataka
function editAccount() {
  accountPage.style.display = "none";
  addAccountPage.style.display = "none";
  editAccountPage.style.display = "block";
  editDelAccountPage.style.display = "none";

  id = this.getAttribute('data-id');

  editAccId.value = dataBase[id].id;
  editAccName.value = dataBase[id].name;
  editAccDeposit.value = dataBase[id].deposit;
  editAccCard.value = dataBase[id].cCard;
}

// klikom na dugme DELETE na stranici EDIT/DELETE brisemo klijenta
function deleteAccount() {
  var id = this.id;
  dataBase.splice(id,1);
  createTable();
  editDelAccountForm();
}

// klikom na dugme ACCOUNTS idemo na stranicu ACCOUNTS
function accountForm() {
  accountPage.style.display = "block";
  addAccountPage.style.display = "none";
  editAccountPage.style.display = "none";
  editDelAccountPage.style.display = "none";
};

// klikom na dugme ADD ACCOUNT idemo na stranicu ADD ACCOUNT
function addAccountForm() {
  accountPage.style.display = "none";
  addAccountPage.style.display = "block";
  editAccountPage.style.display = "none";
  editDelAccountPage.style.display = "none";
};

// klikom na dugme EDIT/DELETE idemo na stranicu EDIT/DELETE ACCOUNT
function editDelAccountForm() {
  createEditTable();
  accountPage.style.display = "none";
  addAccountPage.style.display = "none";
  editAccountPage.style.display = "none";
  editDelAccountPage.style.display = "block";
};

// klikom na dugme SAVE na stranici ADD ACCOUNT,
// cuvamo unesene podatke
function saveAddAccount() {
  var id = accId.value;
  var name = accName.value;
  var deposit = accDeposit.value;
  var card = accCard.value;

  var newAccount = {
    id: id,
    name: name,
    deposit: deposit + " €",
    cCard: card
  }
  dataBase.push(newAccount);
  createTable();
  accountForm();
}
