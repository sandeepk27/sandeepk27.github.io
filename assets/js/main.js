/* Navigation: keep the mobile drawer keyboard-operable and announce its state. */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLink = document.querySelectorAll('.nav__link');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  const openMenu = () => {
    if (!navMenu) return;
    navMenu.classList.add('show-menu');
    navToggle.setAttribute('aria-expanded', 'true');
  };
  navToggle.addEventListener('click', openMenu);
  navToggle.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openMenu();
    }
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    navToggle?.setAttribute('aria-expanded', 'false');
  })
}

/*==================== REMOVE MENU MOBILE ====================*/
navLink.forEach(n => n.addEventListener('click', () => {
  navMenu?.classList.remove('show-menu');
  navToggle?.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    navMenu?.classList.remove('show-menu');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

/* Skills accordion: all groups begin closed; activate a heading to open its group. */
const skillsContent = document.getElementsByClassName('skills__content');
const skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
  const item = this.closest('.skills__content');
  const shouldOpen = !item.classList.contains('skills__open');
  Array.from(skillsContent).forEach(content => {
    content.classList.remove('skills__open');
    content.classList.add('skills__close');
    content.querySelector('.skills__header')?.setAttribute('aria-expanded', 'false');
  });
  if (shouldOpen) {
    item.classList.remove('skills__close');
    item.classList.add('skills__open');
    this.setAttribute('aria-expanded', 'true');
  }
}

skillsHeader.forEach((e, index) => {
  const list = e.closest('.skills__content').querySelector('.skills__list');
  if (!list.id) list.id = `skills-list-${index + 1}`;
  e.setAttribute('role', 'button');
  e.setAttribute('tabindex', '0');
  e.setAttribute('aria-controls', list.id);
  e.setAttribute('aria-expanded', e.closest('.skills__content').classList.contains('skills__open') ? 'true' : 'false');
  e.addEventListener('click', toggleSkills);
  e.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleSkills.call(e);
    }
  });
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification__active');
    })
    target.classList.add('qualification__active');

    tabs.forEach(tab => {
      tab.classList.remove('qualification__active');
    })
    tab.classList.add('qualification__active');
  })
})

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    }
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const activeLink = document.querySelector(`.nav__menu a[href="#${sectionId}"]`);

        if (!activeLink) return;

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            activeLink.classList.add('active-link');
        } else{
            activeLink.classList.remove('active-link');
        }
    })
}

window.addEventListener('scroll', scrollActive);
scrollActive();

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
  const nav = document.getElementById('header');
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) { 
    nav.classList.add('scroll-header'); 
  } else { 
    nav.classList.remove('scroll-header');
  }
}

window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-up class
  if (this.scrollY >= 560) { 
    scrollUp.classList.add('show-scroll'); 
  } else { 
    scrollUp.classList.remove('show-scroll');
  }
}

window.addEventListener('scroll', scrollUp);


/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
/*==================== CONTACT FORM (opens mail client) ====================*/
const cf = document.getElementById('contact-form');
if (cf) cf.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(cf);
  const topic = d.get('topic');
  const topicLine = topic ? `Topic: ${topic}\n\n` : '';
  const body = `${topicLine}${d.get('message')}\n\n- ${d.get('name')} (${d.get('email')})`;
  const status = document.getElementById('contact-status');
  if (status) status.textContent = 'Opening your email app with the message details...';
  window.location.href = `mailto:sandeepkaparthi27@gmail.com?subject=${encodeURIComponent('Portfolio enquiry from ' + d.get('name'))}&body=${encodeURIComponent(body)}`;
});

/*==================== SCROLL REVEAL ====================*/
const revealTargets = document.querySelectorAll(
  '.section__title, .section__subtitle, .about__container, .skills__content, .qualification__data, .dp__card, .project__card, .contact__information, .contact__form'
);

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${(index % 4) * 65}ms`);
    revealObserver.observe(element);
  });
}
