const dom = (function () {
  const toggleBtn = document.getElementById('toggle');
  const closeBtn = document.getElementById('close');
  const openBtn = document.getElementById('open');
  const modal = document.getElementById('modal');
  const modalForm = document.querySelector('.modal-form');

  return {
    toggleBtn,
    closeBtn,
    openBtn,
    modal,
    modalForm,
  };
})();

// Toggle navigation
dom.toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});

// Show modal
dom.openBtn.addEventListener('click', () => {
  dom.modal.classList.add('show-modal');
});

// Hide modal
dom.closeBtn.addEventListener('click', () => {
  dom.modal.classList.remove('show-modal');
});

// Hide modal on outside click #1
/*
dom.modal.addEventListener('click', (event) => {
  if (!dom.modalForm.contains(event.target)) {
    dom.modal.classList.remove('show-modal');
  }
});
*/

// Hide modal on outside click #2
window.addEventListener('click', (event) => {
  if (event.target === dom.modal) {
    dom.modal.classList.remove('show-modal');
  }
});

// Submit event
dom.modalForm.addEventListener('submit', (event) => {
  event.preventDefault();
});
