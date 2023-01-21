//random bk option
let backgroundoption = true;
let counter;

//get from localstorage
window.onload = function () {
  if (window.localStorage.getItem("color")) {
    document.documentElement.style.setProperty(
      "--main-color",
      window.localStorage.getItem("color")
    );
  } else {
  }
};

//get from local storage
if (window.localStorage.getItem("bkoption") !== null) {
  if (window.localStorage.getItem("bkoption") === "true") {
    backgroundoption = true;
  } else {
    backgroundoption = false;
  }
}

// select landing page
let landing = document.querySelector(".landing-page");

// get array of imgs
let imgsArray = ["2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

function background() {
  if ((backgroundoption = true)) {
    counter = setInterval(() => {
      // get random num
      let randomImg = Math.floor(Math.random() * imgsArray.length);
      // change background url

      landing.style.backgroundImage =
        'url("../img/' + imgsArray[randomImg] + '")';
    }, 1000);
  }
}
background();

// start setting box
let settingbox = document.querySelector(".setting-box");
let icon = document.querySelector(".setting-box i");

icon.onclick = function () {
  icon.classList.toggle("fa-spin");
  settingbox.classList.toggle("open");
};

// end setting box
// start color
let root = document.querySelector(":root");
let lis = Array.from(document.querySelectorAll(".color-list li"));

lis.forEach((e) => {
  e.onclick = function () {
    //remove active
    lis.forEach((li) => {
      li.classList.remove("active");
    });
    //add active to clicked
    this.classList.add("active");
    console.log(e.dataset.color);
    let newcolor = e.dataset.color;
    //change root color
    document.documentElement.style.setProperty("--main-color", newcolor);
    //add color to local storage
    window.localStorage.setItem("color", newcolor);
  };
});
// end color
//start bcground

let bkspans = document.querySelectorAll(".random-back span");
bkspans.forEach((span) => {
  span.onclick = function () {
    //remove active

    bkspans.forEach((e) => {
      e.classList.remove("active");
    });
    //add active
    this.classList.add("active");
    if (this.dataset.background == "yes") {
      backgroundoption = true;
      background();
      window.localStorage.setItem("bkoption", true);

      console.log("yes");
    } else {
      console.log("no");

      backgroundoption = false;

      clearInterval(counter);
      window.localStorage.setItem("bkoption", false);
    }
  };
});

// start skills
let skillsection = document.querySelector(".skills");
let progressspans = document.querySelectorAll(".progress span");

window.onscroll = function () {
  if (scrollY >= skillsection.offsetTop - 100) {
    progressspans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};
// end skills

// start gallery
let imgs = document.querySelectorAll(".images-box img");

imgs.forEach((img) => {
  img.addEventListener("click", function (e) {
    //create overlay element
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    //create popup
    let popup = document.createElement("div");
    popup.className = "popup";
    //creat image
    let imagebox = document.createElement("img");
    imagebox.src = img.getAttribute("src");
    //add imag-box to popup
    popup.appendChild(imagebox);
    //add popup to body
    document.body.appendChild(popup);
    //
    if (img.alt !== null) {
      let title = document.createElement("h3");
      title.className = "title";
      let titletex = document.createTextNode(img.alt);
      title.appendChild(titletex);
      popup.appendChild(title);
    }
    //close button
    let close = document.createElement("span");
    close.className = "close";
    let closetex = document.createTextNode("x");
    close.appendChild(closetex);
    popup.appendChild(close);
    //close onclick
    close.addEventListener("click", function () {
      overlay.style.display = "none";
      // popup.style.display = "none";
      close.parentNode.remove();
    });
  });
});

// start Timeline
// end  Timeline

//  start Navigation Bullets Design

let navbulls = document.querySelectorAll(".nav-bullet .bull");
let links = document.querySelectorAll(".header-area ul li");

function scrollinto(xx) {
  xx.forEach((x) => {
    x.onclick = function (e) {
      e.preventDefault();
      console.log(document.querySelector(e.target.dataset.sec));
      document.querySelector(e.target.dataset.sec).scrollIntoView({
        behavior: "smooth",
      });
    };
  });
}
scrollinto(navbulls);
scrollinto(links);

// end Navigation Bullets Design
let navspans = document.querySelectorAll(".navbullets span");
let navspansparent = document.querySelector(".nav-bullet");

let bulletlocalitem = window.localStorage.getItem("bullets-options");
if (bulletlocalitem !== null) {
  navspans.forEach((el) => {
    el.classList.remove("active");
  });

  if (bulletlocalitem == "block") {
    navspansparent.style.display = "block";
    document.querySelector(".navbullets span.yes").classList.add("active");
  } else {
    navspansparent.style.display = "none";
    document.querySelector(".navbullets span.no").classList.add("active");
  }
}

navspans.forEach((span) => {
  span.onclick = function () {
    navspans.forEach((e) => {
      e.classList.remove("active");
    });
    this.classList.add("active");

    if (
      document.querySelector(".navbullets span.no").classList.contains("active")
    ) {
      navspansparent.style.display = "none";
      window.localStorage.setItem("bullets-options", "none");
    } else if (
      document
        .querySelector(".navbullets span.yes")
        .classList.contains("active")
    ) {
      navspansparent.style.display = "block";
      window.localStorage.setItem("bullets-options", "block");
    }
  };
});

//reset options
let resbutton = document.querySelector(".reset");

resbutton.onclick = function () {
  localStorage.clear();
  // localStorage.removeItem();
  document.location.reload();
};
//responsive menu
document.querySelector(".links-container i").onclick = function () {
  document.querySelector(".header-area ul").classList.toggle("active");
  if (document.querySelector(".header-area ul").classList.contains("active")) {
    document.querySelector(".links-container i").classList.add("active");
  } else {
    document.querySelector(".links-container i").classList.remove("active");
  }
};

//close window by click anywhere
document.addEventListener("click", function (e) {
  if (document.querySelector(".header-area ul").classList.contains("active")) {
    if (
      e.target !== document.querySelector(".links-container i") &&
      e.target !== document.querySelector(".header-area ul")
    ) {
      document.querySelector(".header-area ul").classList.remove("active");
      document.querySelector(".links-container i").classList.remove("active");
    }
  }
});
