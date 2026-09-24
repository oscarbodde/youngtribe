// Sticky header state
const header = document.getElementById('siteHeader');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
}

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks && header) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    header.classList.toggle('nav-open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('menu-lock', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    header.classList.remove('nav-open');
    document.body.classList.remove('menu-lock');
  }));
}

// Event card visual selection state (aanmeldformulier, alleen op de homepage)
const eventCards = document.querySelectorAll('.event-card');
eventCards.forEach(card => {
  const input = card.querySelector('input');
  input.addEventListener('change', () => {
    eventCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  });
});

// Preselect a given event option and scroll to the form
function selectEventAndScroll(eventId) {
  const radio = document.getElementById(eventId);
  const aanmelden = document.getElementById('aanmelden');
  if (!radio || !aanmelden) return;
  radio.checked = true;
  radio.dispatchEvent(new Event('change'));
  aanmelden.scrollIntoView({behavior:'smooth', block:'start'});
  setTimeout(() => {
    const naam = document.getElementById('naam');
    if (naam) naam.focus();
  }, 500);
}

// "Plan een kennismaking" buttons (hero + aanmeldsectie)
const heroKennismaking = document.getElementById('heroKennismaking');
if (heroKennismaking) {
  heroKennismaking.addEventListener('click', (e) => {
    e.preventDefault();
    selectEventAndScroll('ev-kennismakingsgesprek');
  });
}
const talkCta = document.getElementById('talkCta');
if (talkCta) {
  talkCta.addEventListener('click', (e) => {
    e.preventDefault();
    selectEventAndScroll('ev-kennismakingsgesprek');
  });
}

// Losse, niet-opeenvolgende events: elke tegel selecteert direct dat event
document.querySelectorAll('.event-tile').forEach(tile => {
  tile.addEventListener('click', () => selectEventAndScroll(tile.dataset.event));
});

// Fake form submit (no backend yet)
const form = document.getElementById('signupForm');
const successMsg = document.getElementById('successMsg');
if (form && successMsg) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.classList.add('show');
    form.reset();
    eventCards.forEach(c => c.classList.remove('selected'));
    successMsg.scrollIntoView({behavior:'smooth', block:'nearest'});
  });
}

// Ervaringen carousel
const track = document.getElementById('testimonialTrack');
if (track) {
  const slides = Array.from(track.children);
  const dotsWrap = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  let index = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Ga naar ervaring ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }
  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
    restartTimer();
  }
  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }
  function restartTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  const carousel = document.getElementById('testimonialCarousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => timer && clearInterval(timer));
    carousel.addEventListener('mouseleave', restartTimer);
  }

  render();
  restartTimer();
}
