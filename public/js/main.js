const apiBase = 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('token');
}

async function fetchJson(url, options = {}) {
  const headers = options.headers || {};
  if (getToken()) headers['Authorization'] = `Bearer ${getToken()}`;
  const res = await fetch(apiBase + url, { ...options, headers });
  return res.json();
}

async function loadNav() {
  const token = getToken();
  const nav = document.getElementById('nav-links');
  if (token) {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="profile.html">Profile</a>
      <a href="cart.html">Cart</a>
      <a href="#" id="logout">Logout</a>
    `;
    document.getElementById('logout').addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location = 'login.html';
    });
  } else {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="login.html">Login</a>
      <a href="signup.html">Sign Up</a>
    `;
  }
}

window.addEventListener('DOMContentLoaded', loadNav);
