document.addEventListener('DOMContentLoaded', function () {
            var links = document.querySelectorAll('a');
            var buttons = document.querySelectorAll('button');

            links.forEach(function (link) {
                link.classList.add('connectButton'); // Add class
                link.removeAttribute('href'); // Remove href attribute
            });

            buttons.forEach(function (button) {
                button.classList.add('connectButton'); // Add class
                button.removeAttribute('href'); // Remove href attribute
            });
        });