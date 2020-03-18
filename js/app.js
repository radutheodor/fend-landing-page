/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 */
const sections = Array.from(document.getElementsByTagName("section"));
const navbar = document.getElementById("navbar__list");
const sticky = navbar.offsetTop;

/**
 * Helper Functions
 */

// build the nav
function buildNavigation() {
  sections.forEach(section => {
    if (!section.dataset || !section.dataset.nav) {
      return;
    }
    console.log(section.dataset);
    let navItem = document.createElement("li");
    navItem.innerText = section.dataset.nav;
    navItem.className = "menu__link";
    navItem.setAttribute("href", `#${section.id}`);
    navItem.onclick = () => {
      /** scroll without using jQuery
            scrollTo(section.id);
        */
      scrollTo($(`#${section.id}`));
    };
    navbar.appendChild(navItem);
  });
}

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event
function scrollTo(target) {
  /** scroll without using jQuery
    document.getElementById(target).scrollIntoView();
    */
  $("html,body").animate(
    {
      scrollTop: target ? target.offset().top : 0
    },
    "slow"
  );
}

/**
 * End Main Functions
 * Begin Events
 *
 */

//window.onscroll = () => myFunction();
// Build menu
buildNavigation();
scrollActive();
//scrollActive();
function checkView(elem) {
  console.log("Verificat");
  const bounding = elem.getBoundingClientRect();
  return bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
}

function scrollActive() {
  sections.forEach(section => {
    if (checkView(section)) {
      console.log("Sunt in view");
      section.classList.add("section-active");
      $(`#${section.id}`).addClass("navbar-active");
    }
  });
}
window.onscroll = scrollActive;
// Scroll to section on link click
// Set sections as active
