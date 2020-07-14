const dom = (function () {
  const main = document.getElementById('main');
  const addUserBtn = document.getElementById('add-user');
  const doubleBtn = document.getElementById('double');
  const showMillionairesBtn = document.getElementById('show-millionaires');
  const sortBtn = document.getElementById('sort');
  const calculateBtn = document.getElementById('calculate-wealth');

  return {
    main,
    addUserBtn,
    doubleBtn,
    showMillionairesBtn,
    sortBtn,
    calculateBtn,
  };
})();

let data = [];

// Fetch random user and add money
async function getRandomUsers(number = 1) {
  const url = 'https://randomuser.me/api';

  const resultsPromise = Array(number)
    .fill(null)
    .map(() => fetch(url).then((raw) => raw.json()));

  const results = await Promise.all(resultsPromise);

  const users = results.map((result) => {
    const { first, last } = result.results[0].name;
    return {
      name: `${first} ${last}`,
      money: Math.floor(Math.random() * 1000000),
    };
  });

  return users;
}

// Add data
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM() {
  const usersDOM = data.map((user) => {
    return `
      <h3 class="person"><strong>${user.name}</strong>${formatMoney(
      user.money
    )}</h3>
    `;
  });

  dom.main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  for (const user of usersDOM) {
    dom.main.innerHTML += user;
  }
}

// Format money
function formatMoney(money) {
  return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
}

// Double user money
function doubleMoney() {
  data = data.map((user) => {
    const newUser = { ...user };
    newUser.money *= 2;
    return newUser;
  });
  updateDOM();
}

// Filter millionaires
function filterMillionaires() {
  data = data.filter((user) => user.money >= 1000000);
  updateDOM();
}

//  Sort by richest
function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Calculate entire wealth
function calcTotalWealth() {
  const total = data.reduce((total, curr) => total + curr.money, 0);
  updateDOM();

  const h3 = `<h3><strong>Total wealth:</strong>${formatMoney(total)}</h3>`;
  dom.main.innerHTML += h3;
}

// Main
async function main() {
  try {
    data = await getRandomUsers(3);

    updateDOM();

    // Add a user
    dom.addUserBtn.addEventListener('click', async () => {
      const users = await getRandomUsers();
      addData(users[0]);
    });

    // Double user money
    dom.doubleBtn.addEventListener('click', doubleMoney);

    // Only show millionaires
    dom.showMillionairesBtn.addEventListener('click', filterMillionaires);

    // Sort by richest
    dom.sortBtn.addEventListener('click', sortByRichest);

    // Calculate entire wealth
    dom.calculateBtn.addEventListener('click', calcTotalWealth);
  } catch (err) {
    console.error(err);
    return;
  }
}

main();
