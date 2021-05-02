'use strict';
console.log('funguju');

/* const naTahuCircle = 'circle';
const naTahuCross = 'cross'; */

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
  detekujVyhru(event);
};

const detekujVyhru = (event) => {
  const hraciPole = Array.prototype.slice.call(event.target.parentNode.getElementsByTagName("BUTTON"));
  console.log(hraciPole);
  let i = 0;
  let posledniTahPozice = 0;
  let posledniTahHrac = "";
  hraciPole.forEach((button) => {
    if(event.target === button) {
      posledniTahHrac = button.classList.contains("board__field--cross")?"board__field--cross":"board__field--circle";
      console.log("to jsem já, " + posledniTahHrac + " " + i);
      posledniTahPozice = i;
    } else {
      const classes = button.classList;
      if (classes && classes.contains("board__field--cross")) {
        console.log("board__field--cross");
      } else if (classes && classes.contains("board__field--circle")) {
        console.log("board__field--circle");
      } else {
        console.log("prázdné");
      }
    }
    i++;
  });

  let vitez = false;
  if (prohledejVodorovne(hraciPole, posledniTahPozice, posledniTahHrac, false)) {
    vitez = true;
    prohledejVodorovne(hraciPole, posledniTahPozice, posledniTahHrac, true);
  } else if (prohledejSikmoPH(hraciPole, posledniTahPozice, posledniTahHrac, false)) {
    vitez = true;
    prohledejSikmoPH(hraciPole, posledniTahPozice, posledniTahHrac, true);
  } else if (prohledejSikmoPD(hraciPole, posledniTahPozice, posledniTahHrac, false)) {
    vitez = true;
    prohledejSikmoPD(hraciPole, posledniTahPozice, posledniTahHrac, true);
  } else if (prohledejSvisle(hraciPole, posledniTahPozice, posledniTahHrac, false)) {
    vitez = true;
    prohledejSvisle(hraciPole, posledniTahPozice, posledniTahHrac, true);
  }

  if (vitez) {
    hraciPole.forEach((field) => field.disabled = true);
    alert(posledniTahHrac + " vyhrál.");
  }
};

const prohledejVodorovne = (hraciPole, posledniTah, posledniHrac, oznac) => {
  const znaku = prohledejDelta(hraciPole, posledniTah, posledniHrac, 1, oznac);
  console.log("Vodorovne " + znaku);
  return znaku===5;
};

const prohledejSvisle = (hraciPole, posledniTah, posledniHrac, oznac) => {
  const znaku = prohledejDelta(hraciPole, posledniTah, posledniHrac, 10, oznac);
  console.log("Svisle " + znaku);
  return znaku===5;
};

const prohledejSikmoPH = (hraciPole, posledniTah, posledniHrac, oznac) => {
  const znaku = prohledejDelta(hraciPole, posledniTah, posledniHrac, 9, oznac);
  console.log("Sikmo PH " + znaku);
  return znaku===5;
};

const prohledejSikmoPD = (hraciPole, posledniTah, posledniHrac, oznac) => {
  const znaku = prohledejDelta(hraciPole, posledniTah, posledniHrac, 11, oznac);
  console.log("Sikmo PD " + znaku);
  return znaku===5;
};

const prohledejDelta = (hraciPole, posledniTah, posledniHrac, delta, oznac) => {
  let znaku = 1;
  let pozice = posledniTah - delta;
  while (pozice>=0 && pozice < 100 && hraciPole[pozice].classList && hraciPole[pozice].classList.contains(posledniHrac)) {
    znaku++;
    if (oznac) {
      hraciPole[pozice].classList.add("board__field--winner");
    }
    pozice -= delta;;
  }
  pozice = posledniTah + delta
  while (pozice>=0 && pozice < 100 && hraciPole[pozice].classList && hraciPole[pozice].classList.contains(posledniHrac)) {
    znaku++;
    if (oznac) {
      hraciPole[pozice].classList.add("board__field--winner");
    }
    pozice += delta;
  }
  if (oznac) {
    hraciPole[posledniTah].classList.add("board__field--winner");
  }
  return znaku;
};

const buttonElms = document.querySelectorAll('button');
for (let i = 0; i < buttonElms.length; i += 1) {
  buttonElms[i].addEventListener('click', pridejTah);
}
