'use strict';
console.log('funguju');

const naTahuCircle = 'circle';
const naTahuCross = 'cross';

const pridejTah = (event) => {
  const natahuElm = document.querySelector('#natahu');

  if (natahuElm.classList.contains('ikony--hra---circle')) {
    natahuElm.src = 'podklady/cross.svg';
    natahuElm.alt = 'křížek';
    natahuElm.classList.remove('ikony--hra---circle');
    event.target.classList.add('board__field--circle');
    event.target.disabled = true;
  } else {
    natahuElm.src = 'podklady/circle.svg';
    natahuElm.alt = 'kolečko';
    natahuElm.classList.add('ikony--hra---circle');
    event.target.classList.add('board__field--cross');
    event.target.disabled = true;
  }
};

const buttonElms = document.querySelectorAll('button');
for (let i = 0; i < buttonElms.length; i += 1) {
  buttonElms[i].addEventListener('click', pridejTah);
}
