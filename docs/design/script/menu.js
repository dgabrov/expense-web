document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
});
