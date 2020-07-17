const postContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();
  return data;
}

// Show posts in DOM
async function showPost() {
  const posts = await getPosts();

  for (const post of posts) {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">
          ${post.body}
        </p>
      </div>      
    `;

    postContainer.appendChild(postEl);
  }
}

// Show loader and fetch more posts
function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPost();
    }, 300);
  }, 1000);
}

// Filter posts by input
function filterPosts(event) {
  const term = event.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  for (const post of posts) {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.includes(term) || body.includes(term)) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  }
}

// Show initial posts
catchAsyncException(showPost());

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);

// UTILS FUNCTION
function catchAsyncException(func) {
  return (...args) => {
    func.apply(null, args).catch((err) => {
      alert(err.message);
      return;
    });
  };
}
