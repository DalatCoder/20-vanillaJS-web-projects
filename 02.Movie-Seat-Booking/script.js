const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let tickedPrice = parseFloat(movieSelect.value);

/**
 * Update total and count
 */
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * tickedPrice;
};

// Movie select event
movieSelect.addEventListener('change', (event) => {
  tickedPrice = parseFloat(event.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (event) => {
  const { target } = event;
  if (
    target.classList.contains('seat') &&
    !target.classList.contains('occupied')
  ) {
    target.classList.toggle('selected');

    updateSelectedCount();
  }
});
