document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const form = document.querySelector('.newsletter form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button');
      const input = form.querySelector('input');

      if (button) {
        button.textContent = 'Hvala!';
        button.disabled = true;
      }

      if (input) {
        input.value = '';
      }
    });
  }
});
