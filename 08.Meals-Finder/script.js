const dom = (function () {
  const search = document.getElementById('search');
  const submit = document.getElementById('submit');
  const random = document.getElementById('random');
  const resultHeading = document.getElementById('result-heading');
  const mealsEl = document.getElementById('meals');
  const single_mealEl = document.getElementById('single-meal');

  return {
    search,
    submit,
    random,
    resultHeading,
    mealsEl,
    single_mealEl,
  };
})();

// Handle async exception
function catchAsyncException(func) {
  return (...args) => {
    func.apply(null, args).catch((err) => {
      alert('Something went wrong! 😢');
      console.error(err);
      return;
    });
  };
}

// Search meal and fetch from API
async function searchMeal(event) {
  event.preventDefault();

  // Clear single meal
  dom.single_mealEl.innerHTML = '';

  // Get search term
  const term = dom.search.value;

  // Check for empty search
  if (!term.trim()) {
    alert('Please enter a search value!');
    return;
  }

  // Fetch data from API
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
  const raw = await fetch(url);
  const data = await raw.json();

  const { meals } = data;

  if (!meals) {
    dom.resultHeading.innerHTML = `
      <p>There are no search results for '${term}'. Try again with other meal!</p>
    `;
    return;
  }

  // Display result heading
  dom.resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

  // Insert data to the DOM
  dom.mealsEl.innerHTML = meals
    .map(
      (meal) => `
    <div class="meal">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal} photo"/>
      <div class="meal-info" data-mealID=${meal.idMeal}>
        <h3>${meal.strMeal}</h3>
      </div>
    </div>
  `
    )
    .join('');

  // Clear search term
  dom.search.value = '';
}

// Event listeners
dom.submit.addEventListener('submit', catchAsyncException(searchMeal));
