const dom = (function () {
  const currencyEl_one = document.getElementById('currency-one');
  const currencyEl_two = document.getElementById('currency-two');
  const amountEl_one = document.getElementById('amount-one');
  const amountEl_two = document.getElementById('amount-two');

  const rateEl = document.getElementById('rate');
  const swapBtn = document.getElementById('swap');

  return {
    currencyEl_one,
    currencyEl_two,
    amountEl_one,
    amountEl_two,
    rateEl,
    swapBtn,
  };
})();

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = dom.currencyEl_one.value;
  const currency_two = dom.currencyEl_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/2d6ee58e78f75b3378d31fbe/latest/${currency_one}`
  )
    .then((stream) => stream.json())
    .then((data) => {
      const { result, conversion_rates } = data;

      if (data['error-type']) {
        alert(data['error-type']);
        return;
      }

      if (result !== 'success') {
        return;
      }

      if (!conversion_rates[currency_two]) {
        alert(`${currency_two} currency not found!`);
        return;
      }

      const rate = conversion_rates[currency_two];
      const amount_one = dom.amountEl_one.value * 1;

      dom.rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      dom.amountEl_two.value = (rate * amount_one).toFixed(2);
    });
}

// Swap currency
function swapCurrency() {
  [dom.currencyEl_one.value, dom.currencyEl_two.value] = [
    dom.currencyEl_two.value,
    dom.currencyEl_one.value,
  ];
  calculate();
}

// Event listeners
dom.currencyEl_one.addEventListener('change', calculate);
dom.amountEl_one.addEventListener('input', calculate);
dom.currencyEl_two.addEventListener('change', calculate);
dom.amountEl_two.addEventListener('input', calculate);

dom.swapBtn.addEventListener('click', swapCurrency);

calculate();
