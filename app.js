const contentContainer = document.getElementById('index-content');

function injectContent(route) {
  var htmlPath;
  if (route === '/') {
    htmlPath = './pages/home.html';
  } else {
    htmlPath = './pages' + route + '.html';
  }
  fetch(htmlPath)
    .then((response) => response.text())
    .then((data) => {
      contentContainer.innerHTML = data;
    })
    .catch((error) => {
      console.error(error);
    });
}

injectContent(window.location.pathname);

window.onpopstate = (event) => {
  injectContent(event.state.path);
};

document.getElementById('index-nav-bar').childNodes.forEach((link) =>
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const route = event.target.getAttribute('href');
    history.pushState({ path: route }, '', route);
    injectContent(route);
  })
);
