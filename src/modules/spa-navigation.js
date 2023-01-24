const tabLinks = document.querySelectorAll('.nav-link');

const singlePageNav = () => {
  const gameList = document.querySelector('.game-list');
  const trailers = document.querySelector('.trailers');
  const contactSection = document.querySelector('.contact-us');
  tabLinks.forEach((link) => {
    link.onclick = () => {
      if (link.classList.contains('games-nav')) {
        gameList.classList.remove('hide-section');
        trailers.classList.add('hide-section');
        contactSection.classList.add('hide-section');
      } else if (link.classList.contains('trailers-nav')) {
        gameList.classList.add('hide-section');
        trailers.classList.remove('hide-section');
        contactSection.classList.add('hide-section');
      } else {
        gameList.classList.add('hide-section');
        trailers.classList.add('hide-section');
        contactSection.classList.remove('hide-section');
      }
    };
  });
};

const toggleActiveLink = () => {
  const navAnchors = [...tabLinks];

  for (let i = 0; i < navAnchors.length; i += 1) {
    navAnchors[i].addEventListener('click', () => {
      const current = document.getElementsByClassName('active-nav');
      current[0].classList.remove('active-nav');
      navAnchors[i].classList.add('active-nav');
    });
  }
};

export { singlePageNav, toggleActiveLink };
