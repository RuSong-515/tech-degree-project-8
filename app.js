const employeeList = document.getElementById('employeeList');
const url = 'https://randomuser.me/api/?results=12';
const list = [];
let index = 0;
const modal = document.createElement('div');
const closeBtn = document.createElement('span');
const myModal = document.createElement('div');
modal.className = 'modal';
closeBtn.id = 'closeBtn';
myModal.className = 'my-modal';


fetch(url)
  .then(response => response.json())
  .then(data => {
    generateEmployees(data.results);
    console.log(data.results);
  })
  

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
  const main = document.querySelector('main');
  const person = list[index];
  const birthday = new Date(person.dob.date).toLocaleString().split(',')[0];
  const html = `
    <div class = 'modalContent'>
      <img class ='modal-employeeImage' src='${person.picture.large}' alt = 'profile-image'>
      <div class ='modal-info'>
        <h3>${person.name.first} ${person.name.last}</h3>
        <p>${person.email}</p>
        <p>${person.location.city}</p>
        <hr>
        <p>${person.cell}</p>
        <p>${person.location.street.number} ${person.location.street.name} ${person.location.state} ${person.location.postcode}
        <p>Birthday: ${birthday}
      </div>
    </div>
    
  `
  main.appendChild(modal);
  closeBtn.innerHTML = '&times';
  myModal.innerHTML = html;
  modal.appendChild(myModal);
  modal.appendChild(closeBtn);
};


// help function



function creatModal(e) {
  const modal = document.querySelector('.modal');
  const personIndex = e.target.closest('.employee-card').getAttribute('index');
  generateModalInfo(personIndex);
  return generateModalInfo;
}

function openModal() {
  myModal.style.display = 'block';
  closeBtn.style.display = 'block';
}

function closeModal() {
  myModal.style.display = 'none';
  closeBtn.style.display = 'none';
}


function outsideClose(e) {
  if(e.target === myModal) {
    closeModal();
  }
}

// Events

employeeList.addEventListener('click', (e) => {
  if (e.target.className === 'employee-card') {
    creatModal(e);
    openModal();
  }
});

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', outsideClose);

document.addEventListener('keydown', closeModal);

