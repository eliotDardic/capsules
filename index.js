const messageState = document.querySelector('.messageState');
const usersTable = document.querySelector('#usersTable');
const toolbar = document.querySelector('#toolbar');
const container = document.querySelector('.container');
const searchInputupdate = document.querySelector("input[name='search']");
const searchSelector = document.querySelector("select[name='selectSearch']");
let userLoadCount = 0;
let usersData = [];

const btnState = {
  EDIT: 'EDIT',
  SAVE: 'SAVE',
  DELETE: 'DELETE',
  CANCEL: 'CANCEL',
}
let editBtnState = btnState.EDIT;
let deleteBtnState = btnState.DELETE;


const getUsers = async () => {
  messageState.innerText = 'Loading... please wait'
  let response;
  try{
    const users = await fetch ("https://apple-seeds.herokuapp.com/api/users/");
    response = await users.json();
  }catch(error){
    messageState.innerText = 'Not our fault';
  }
 
  for (i = 0; i < response.length; i++) {
    const singleExtra = {};
    console.log(response[0].id)
    const extra = await fetch("https://apple-seeds.herokuapp.com/api/users/"+ response[i].id);
    const responseExtra = await extra.json();
    //console.log(responseExtra);
    let fullResponse = {}
    //fullResponse={...response[i], ...responseExtra}
    response[i].age = responseExtra.age
    response[i].city = responseExtra.city
    response[i].gender = responseExtra.gender
    response[i].hobby = responseExtra.hobby
    userLoadCount++;
    messageState.innerText = `Loading... ${userLoadCount} users. Please wait`
    //console.log(response[i]);
  }
  console.log(response);
  usersData = response
  renderTableData(response)
}
getUsers();


// function to handle user edit button
const editBtnHandler = (event) => {
  const tr = event.target.parentElement.parentElement;
  if(editBtnState === btnState.EDIT){
  
    for(let i = 1; i < tr.children.length - 2; i++){
      tr.children[i].innerHTML = `<input type="text" value="${tr.children[i].innerText}" id="${i}" data-orig-value="${tr.children[i].innerText}""/>`
    }
    editBtnState = btnState.SAVE;
    deleteBtnState = btnState.CANCEL;
    event.target.innerText = 'Save'
    tr.lastElementChild.children[0].innerText = 'Cancel';
  } else if(editBtnState === btnState.SAVE){

    for(let i = 1; i < tr.children.length - 2; i++){
      tr.children[i].innerText = tr.children[i].children[0].value;
    }
    editBtnState = btnState.EDIT;
    deleteBtnState = btnState.DELETE;
    event.target.innerText = 'Edit';
    tr.lastElementChild.children[0].innerText = 'Delete';
      
  }
}


const deleteBtnHandler = (event) => {
  const tr = event.target.parentElement.parentElement;
  if(deleteBtnState === btnState.DELETE){
    usersTable.removeChild(tr);
    
  } else if(deleteBtnState === btnState.CANCEL){

    for(let i = 1; i < tr.children.length - 2; i++){
      const value =  tr.children[i].children[0].getAttribute('data-orig-value')
      tr.children[i].innerText = value
    }


    deleteBtnState = btnState.DELETE;
    event.target.innerText = 'Delete'

    editBtnState = btnState.EDIT;
    tr.children[tr.children.length-2].children[0].innerText = 'Edit';
  }
}

// function to create table td
const createTableCell = (row, text) => {
  const td = row.insertCell();
  td.innerText = text;
}

// create table body with users data
const renderTableData = (users) => {
  usersTable.innerHTML = '';
  users.forEach( user => {
    const row = usersTable.insertRow();
    createTableCell(row, user.id);
    createTableCell(row, user.firstName);
    createTableCell(row, user.lastName);
    createTableCell(row, user.age);
    createTableCell(row, user.gender);
    createTableCell(row, user.capsule);
    createTableCell(row, user.city);
    createTableCell(row, user.hobby);

    const editCell = row.insertCell();
    btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.innerText = 'Edit';
    btnEdit.addEventListener('click', editBtnHandler);
    editCell.appendChild(btnEdit);
    const deleteCell = row.insertCell();
    btnDelete = document.createElement('button');
    btnDelete.type = 'button';
    btnDelete.innerText = 'Delete';
    btnDelete.addEventListener('click', deleteBtnHandler);
    deleteCell.appendChild(btnDelete);
  });
  messageState.innerText= '';
  userLoadCount = 0;
}

const searchFirstName = (value) => {
  for(let i = 0; i < usersTable.children.length; i++){
    if(!usersTable.children[i].children[1].innerText.toLowerCase().includes(value.toLowerCase())){
      usersTable.children[i].style.display = 'none';
    } else{
      usersTable.children[i].style.display = 'table-row';
    }
  }
}
const searchLastName = (value) => {
  for(let i = 0; i < usersTable.children.length; i++){
    if(!usersTable.children[i].children[2].innerText.toLowerCase().includes(value.toLowerCase())){
      usersTable.children[i].style.display = 'none';
    } else{
      usersTable.children[i].style.display = 'table-row';
    }
  }
}
const searchAge = (value) => {
  for(let i = 0; i < usersTable.children.length; i++){
    if(!usersTable.children[i].children[3].innerText.toLowerCase().includes(value.toLowerCase())){
      usersTable.children[i].style.display = 'none';
    } else{
      usersTable.children[i].style.display = 'table-row';
    }
  }
}
const searchGender = (value) => {
  for(let i = 0; i < usersTable.children.length; i++){
    if(!usersTable.children[i].children[4].innerText.toLowerCase().includes(value.toLowerCase())){
      usersTable.children[i].style.display = 'none';
    } else{
      usersTable.children[i].style.display = 'table-row';
    }
  }
}
const searchCapsule = (value) => {
  for(let i = 0; i < usersTable.children.length; i++){
    if(!usersTable.children[i].children[5].innerText.toLowerCase().includes(value.toLowerCase())){
      usersTable.children[i].style.display = 'none';
    } else{
      usersTable.children[i].style.display = 'table-row';
    }
  }
}
const searchCity = (value) => {
  for(let i = 0; i < usersTable.children.length; i++){
    if(!usersTable.children[i].children[6].innerText.toLowerCase().includes(value.toLowerCase())){
      usersTable.children[i].style.display = 'none';
    } else{
      usersTable.children[i].style.display = 'table-row';
    }
  }
}
const searchHobby = (value) => {
  for(let i = 0; i < usersTable.children.length; i++){
    if(!usersTable.children[i].children[7].innerText.toLowerCase().includes(value.toLowerCase())){
      usersTable.children[i].style.display = 'none';
    } else{
      usersTable.children[i].style.display = 'table-row';
    }
  }
}

// search table data - detected what to serach
const searchTableHandler = () => {
  const value = searchInputupdate.value;
  switch(searchSelector.value){
    case "1":
      searchFirstName(value)
      break;
    case "2":
      searchLastName(value)
      break;
    case "3":
      searchAge(value);
      break;
    case "4":
      searchGender(value);
      break;
    case "5":
      searchCapsule(value);
      break;
    case "6":
      searchCity(value);
      break;
    case "7":
      searchHobby(value);
      break;
    default:
      break;
  }
}

// read
const renderData = () => {
  container.innerHTML = "";
  data.forEach((person) => {
    const nameEl = document.createElement("p");
    nameEl.textContent = person.name
    container.appendChild(nameEl);
    
    const lastNameEl = document.createElement("p");
    nameEl.textContent = person.name
    container.appendChild(lastNameEl);
    
    const capsuleEl = document.createElement("p");
    nameEl.textContent = person.name
    container.appendChild(capsuleEl);
    
    const ageEl = document.createElement("p");
    nameEl.textContent = person.name
    container.appendChild(ageEl);
    
    const cityEl = document.createElement("p");
    nameEl.textContent = person.name
    container.appendChild(cityEl);
    
    const genderEl = document.createElement("p");
    nameEl.textContent = person.name
    container.appendChild(genderEl);
    
    const HobbyEl = document.createElement("p");
    nameEl.textContent = person.name
    container.appendChild(HobbyEl);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click",deleteData);
    container.appendChild(deleteBtn);
    
    const updateBtn = document.createElement("button");
    deleteBtn.innerText = "Update";
    deleteBtn.addEventListener("click", () =>{});
    container.appendChild(updateBtn);

  });
};

// create
const createData = () => {
  const name = nameImput.value;
  const gender = gend

  
};

// update
const updateData = () => {};

// Delete 
const deleteData = () => {};

// createSubmit.addEventListener("click",createData);
// async function createTable(){}

// function setEvent(elementId, event ,func) {}

// function setTableRows(data) {}

// async function testMoust(){}

// function createDropDown(){}

// function dropDownChange() {}

// function search (e) {}

// function remove (e){}

// function update (e) {}

// function cancelEventListener (e){}

// function editRow(e){}

// function makeAllEditAndDelete(){}

// function cancelAddEvenListener(){}

// function updateAddEvenListener (){}

// function updateCell(rowIndex, CellIndex, content){}

// async function getData(){}






























