function changeLi(n3) {
  let li = document
    .getElementById("header")
    .getElementsByTagName("ul")[0]
    .getElementsByTagName("a");
  for (let i = 0; i < li.length; i++) {
    li[i].style.background = "black";
    li[i].style.color = "white";
    li[i].style.height = "9vh";
    li[i].style.width = "100%";
    li[i].style.fontSize = "30px";
    li[i].style.fontSize = "";
  }
  li[n3 - 1].style =
    "background: white;height: 7vh;font-size: 5vh;width: 82%;color: black;";
}
window.addEventListener("scroll", function () {
  if (window.innerWidth <= 1080) {
    let scrol = pageYOffset / 100;
    if (scrol >= 0) {
      changeLi(1);
    }
    if (scrol > 12) {
      changeLi(2);
    }
    if (scrol > 60) {
      changeLi(3);
    }
  }
  if (window.innerWidth > 1080) {
    let scrol = pageYOffset / 100;
    if (scrol >= 0) {
      changeLi(1);
    }
    if (scrol > 6) {
      changeLi(2);
    }
    if (scrol > 14) {
      changeLi(3);
    }
  }
});

let n = 0;
function mUlVis() {
  let ul = document.getElementById("header").getElementsByTagName("ul")[0];
  let body = document.getElementsByTagName("body")[0];
  n++;
  if (n == 1) {
    ul.style.display = "grid";
    ul.style.animation = "ulVis1 1s";
    document.getElementById("header").getElementsByTagName("img")[0].src =
      "/static/img/btn/min.png";
    for (let i = 3; i < body.children.length - 1; i++) {
      body.children[i].style = "filter: brightness(0.3);";
    }
  }
  if (n == 2) {
    ul.style.animation = "ulVis2 1s";
    function anc() {
      ul.style.display = "none";
    }
    setTimeout(anc, 500);
    document.getElementById("header").getElementsByTagName("img")[0].src =
      "/static/img/btn/max.png";
    n -= 2;
    for (let i = 0; i < body.children.length - 1; i++) {
      body.children[i].style = "filter: brightness(1);";
    }
  }
}

function regVis(n1) {
  let model = document.getElementById("reg");
  let blocks = document.getElementsByTagName("body")[0];
  if (n1 == 1) {
    model.style.display = "flex";
    model.style.animation = "reg 1s";
    for (let i = 1; i < blocks.children.length; i++) {
      blocks.children[i].style.filter = "brightness(0.3)";
    }
    blocks.style.overflow = "hidden;";
  }
  if (n1 == 0) {
    model.style.animation = "reg2 1s";
    function anc() {
      model.style.display = "none";
    }
    setTimeout(anc, 500);
    for (let i = 1; i < blocks.children.length; i++) {
      blocks.children[i].style.filter = "brightness(1)";
    }
    blocks.style.overflow = "auto;";
    bagVis(0)
  }
}
function testReg() {
  let email = document.getElementById('register').getElementsByTagName('input')[0];
  var emailOk;
  let password1 = document.getElementById('register').getElementsByTagName('input')[1];
  var passwordOk;
  let password2 = document.getElementById('register').getElementsByTagName('input')[2];
  let button = document.getElementById('register').getElementsByTagName('input')[3];
  let h2 = document.getElementById('register').getElementsByTagName('h2')[0]
  if (email.value == '' | email.value.indexOf('@') == -1) {
    h2.style.display = 'flex';
    h2.innerHTML = 'Электронная почта не указана';
    email.style.borderColor = 'red'
    emailOk = false;
  } else {
    h2.style.display = 'none';
    email.style.borderColor = '';
    emailOk = true;
  }

  if (emailOk == true && password1.value != '') {
    if (password1.value != password2.value | password1.value == '') {
      h2.style.display = 'flex';
      h2.innerHTML = 'Пароли не совпадают';
      password1.style.borderColor = 'red';
      password2.style.borderColor = 'red'
      passwordOk = false
    } else {
      h2.style.display = 'none';
      password1.style.borderColor = '';
      password2.style.borderColor = '';
      passwordOk = true
    }
  }

  if (emailOk & passwordOk) {
    button.disabled = 0
  } else {
    button.disabled = 1
  }
}
function reg() {

}

function bagVis(n) {
  let model = document.getElementById("bagModel");
  let accInf = document.getElementById("accInf");
  if (n == 1) {
    model.style.display = "grid";
    accInf.style.display = "none"
  }
  if (n == 0) {
    accInf.style.display = "grid";
    model.style.display = "none"    
  }
}

function newAcc(n) {
  let blocks = document.getElementById("reg").children;
  let model = blocks[1];
  if (n == 1) {
    for (let i = 0; i < blocks.length; i++) {
      if (i != 0) {
        blocks[i].style.display = "none";
      }
    }
    model.style.display = "grid";
  }
}

function cardInf(n, n2) {
  let model = document.getElementById("cardInf");
  let blocks = document.getElementsByTagName("body")[0];
  if (n == 1) {
    for (let i = 2; i < blocks.children.length; i++) {
      blocks.children[i].style = "filter: brightness(0.3)";
    }
    blocks.style = "overflow: hidden;";
    model.style = "display: grid";
    model.style.animation = "cardInf 1s";
  }
  if (n == 0) {
    model.style.animation = "cardInf1 1s";
    function anc() {
      model.style.display = "none";
    }
    setTimeout(anc, 500);
    for (let i = 2; i < blocks.children.length; i++) {
      blocks.children[i].style = "filter: brightness(1)";

    }
    blocks.style = "overflow: auto;";
  }

  let card = document.getElementsByClassName("card")[n2 - 1];
  let close = "/static/img/btn/close.png";
  let header = card.children[2].innerHTML;
  let img = card.children[1].src;
  let price = card.children[4].innerHTML;
  let text = card.children[3].innerHTML;
  model.innerHTML = '<img class="close" src="' + close +'" onclick="cardInf(0)"><h1>' + header + '</h1>\
  <img src="' + img + '">\
  <h1 class="price">' + price + "</h1>\
  <p>" + text + '</p>\
  <button onclick="addCard(' + n2 + ', this)" class="buy">BUY</button>\
  <div class="col">\
      <button style="border-top-left-radius: 100%;border-bottom-left-radius: 100%;" onclick="colPlus(-1)">-</button>\
      <h1>1</h1>\
      <button style="border-top-right-radius: 100%;border-bottom-right-radius: 100%;" onclick="colPlus(1)">+</button>\
  </div>';
}

function colPlus(n) {
  let col = document
    .getElementById("cardInf")
    .getElementsByClassName("col")[0]
    .getElementsByTagName("h1")[0];
  let num = parseInt(col.innerHTML) + n;
  if (num > 0) {
    col.innerHTML = num;
  }
}
