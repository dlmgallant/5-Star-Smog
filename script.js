const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

const hours = {
  0: { open: 9, close: 14 },    // Sun
  1: { open: 8.5, close: 17.5 },
  2: { open: 8.5, close: 17.5 },
  3: { open: 8.5, close: 17.5 },
  4: { open: 8.5, close: 17.5 },
  5: { open: 8.5, close: 17.5 },
  6: { open: 9, close: 16 }     // Sat
};

function getPacificNow() {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour12: false,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
  const parts = formatter.formatToParts(new Date());
  const weekday = parts.find(p => p.type === 'weekday')?.value;
  const hour = Number(parts.find(p => p.type === 'hour')?.value || 0);
  const minute = Number(parts.find(p => p.type === 'minute')?.value || 0);
  const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { day: dayMap[weekday], decimalHour: hour + minute / 60 };
}

function formatTime(decimalHour) {
  const hour = Math.floor(decimalHour);
  const minute = Math.round((decimalHour - hour) * 60);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = ((hour + 11) % 12) + 1;
  const displayMinute = minute === 0 ? '00' : String(minute).padStart(2, '0');
  return `${displayHour}:${displayMinute} ${suffix}`;
}

const badge = document.getElementById('openNowBadge');
if (badge) {
  const { day, decimalHour } = getPacificNow();
  const today = hours[day];
  if (decimalHour >= today.open && decimalHour < today.close) {
    badge.textContent = `Open Now • Until ${formatTime(today.close)}`;
  } else {
    badge.textContent = 'Hours Updated';
  }
}
