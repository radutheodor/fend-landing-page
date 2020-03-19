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
  navbar.childNodes[0].classList.add("navbar-active");
}

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

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

// Classic function to check element is in viewport
function isInViewport(elem) {
  const bounding = elem.getBoundingClientRect();
  return bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
}

function scrollActive() {
  // get the index of section, if its h2 element is in viewport
  const idx = sections.findIndex(section => isInViewport(section.childNodes[1].childNodes[1]));
  // if no specific h2 is in viewport, -1 is returned
  if (idx >= 0) {
    // fetch the active section and its resective nav elements
    const activeSection = sections[idx];
    activeLink = navbar.childNodes[idx];
    // set active classes for them and remove for all other indexes
    activeSection && activeSection.classList.add("section-active");
    activeLink && activeLink.classList.add("navbar-active");
    navbar.childNodes.forEach((e, i) => i !== idx && e.classList.remove("navbar-active"));
    sections.forEach((e, i) => i !== idx && e.classList.remove("section-active"));
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */
buildNavigation();
window.onscroll = scrollActive;
