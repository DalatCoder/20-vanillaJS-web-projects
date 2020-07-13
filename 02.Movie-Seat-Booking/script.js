const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let tickedPrice = parseFloat(movieSelect.value);

// Save selected movie index and price
const setMovieData = (index, price) => {
  localStorage.setItem('selectedMovieIndex', index);
  localStorage.setItem('selectedMoviePrice', price);
};

// Update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Save to local storage
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  console.log(seatsIndex);

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * tickedPrice;
};

// Movie select event
movieSelect.addEventListener('change', (event) => {
  const { target } = event;
  tickedPrice = parseFloat(target.value);

  setMovieData(target.selectedIndex, target.value);
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
