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

// Ervaringen: doorlopende marquee (dupliceer de kaarten voor een naadloze lus)
const marqueeTrack = document.getElementById('marqueeTrack');
if (marqueeTrack) {
  const originals = Array.from(marqueeTrack.children);
  originals.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    marqueeTrack.appendChild(clone);
  });
}
