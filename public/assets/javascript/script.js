const dateOptions = document.querySelectorAll('.date-option');
const selectedDate = document.querySelector('#selected-date');
const registrationLink = document.querySelector('#registration-link');

function updateRegistration(date) {
  selectedDate.textContent = date;
  registrationLink.setAttribute('aria-label', `Quero reservar a turma de ${date}`);
  dateOptions.forEach((option) => {
    const isSelected = option.dataset.date === date;
    option.classList.toggle('is-selected', isSelected);
    option.setAttribute('aria-checked', String(isSelected));
  });
}

dateOptions.forEach((option) => {
  option.addEventListener('click', () => updateRegistration(option.dataset.date));
  option.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      const next = option.nextElementSibling || dateOptions[0];
      next.focus();
      updateRegistration(next.dataset.date);
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const previous = option.previousElementSibling || dateOptions[dateOptions.length - 1];
      previous.focus();
      updateRegistration(previous.dataset.date);
    }
  });
});

// Mantém a data selecionada visível quando a pessoa chega pela navegação.
document.querySelectorAll('a[href="#inscricao"]').forEach((link) => {
  link.addEventListener('click', () => {
    window.setTimeout(() => dateOptions[0]?.focus({ preventScroll: true }), 400);
  });
});

updateRegistration('14/10/2026');
