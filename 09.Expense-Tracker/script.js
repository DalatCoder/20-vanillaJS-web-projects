const dom = (function () {
  const balance = document.getElementById('balance');
  const money_plus = document.getElementById('money-plus');
  const money_minus = document.getElementById('money-minus');
  const list = document.getElementById('list');
  const form = document.getElementById('form');
  const text = document.getElementById('text');
  const amount = document.getElementById('amount');

  return {
    balance,
    money_plus,
    money_minus,
    list,
    form,
    text,
    amount,
  };
})();

const examples = [
  { id: 1, text: 'flowers', amount: '-50' },
  { id: 2, text: 'salary', amount: '300' },
  { id: 3, text: 'book', amount: '-50' },
  { id: 4, text: 'camera', amount: '-50' },
];

let transactions = examples;

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const { amount, text } = transaction;
  // Get sign
  const sign = amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(sign === '+' ? 'plus' : 'minus');
  item.innerHTML = `
    ${text} <span>${sign}${Math.abs(amount)}</span>
    <button class="delete-btn">x</button>
  `;

  dom.list.appendChild(item);
  // < !-- < li class="minus" >
  //   Cash < span > -$400</ > <button class="delete-btn">x</button>
  //     </li > -->
}

// Init app
(function Init() {
  dom.list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
})();
