const employeeList = document.getElementById('employeeList');
const url = 'https://randomuser.me/api/?results=12';
const list = [];
let index = 0;


fetch(url)
  .then(response => response.json())
  .then(data => {
    generateEmployees(data.results);
    console.log(data.results);
  })
  


// Helper Functions

function generateEmployees(data) {
  data.map(result => {
    const html = `
      <button id='modal-btn'>
        <section class = 'employee-card' index = ${index}>
          <img class = 'employeeImage' src='${result.picture.large}' alt = 'profile-image'>
          <div class = 'info'>
            <h3>${result.name.first} ${result.name.last}</h3>
            <p>${result.email}</p>
            <p>${result.location.city}</p>
          </div>
        </section>
      </button>
    `
    index++;
    list.push(result);
    employeeList.innerHTML += html;
  })
};

function generateModalInfo(index) {
  const modal = document.querySelector('.modal');
  const person = list[index];
  const html = `
    <div class = 'modalContent'>
      <span id ='closeBtn'> &times;</span>
      <img class ='modal-employeeImage' src='${person.picture.large}' alt = 'profile-image'>
      <div class ='modal-info'>
        <h3>${person.name.first} ${person.name.last}</h3>
        <p>${person.email}</p>
        <p>${person.location.city}</p>
        <hr>
        <p>${person.phone}</p>
        <p>${person.location.street.number} ${person.location.street.name} ${person.location.state} ${person.location.postcode}
        <p>Birthday: ${person.dob.date}
      </div>
    </div>
  `
  modal.innerHTML = html;
  
};

function closeModal() {
  modal.style.display = 'none';
};

function outsideClose(e) {
  if(e.target.className === 'modal') {
    modal.style.display = 'none';
  }
}


function creatModal(e) {
  const modal = document.querySelector('.modal');
  const personIndex = e.target.closest('.employee-card').getAttribute('index');
  generateModalInfo(personIndex);
  return generateModalInfo;
}

function openModal() {
  modal.style.display = 'block';
}

// Events
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('#closeBtn');
const modal = document.querySelector('.modal');

modalBtn.addEventListener('click', (e) => {
  creatModal(e);
  openModal();
});

closeBtn.addEventListener('click', closeModal());

window.addEventListener('click', outsideClose());



