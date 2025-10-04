document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.getElementById('navbar-toggle');
  var menu = document.getElementById('navbar-menu');
  if (toggle) {
    toggle.addEventListener('click', function() {
      menu.classList.toggle('hidden');
    });
  }
});
