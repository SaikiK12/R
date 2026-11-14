document.addEventListener('DOMContentLoaded', function () {
        var buttons = document.querySelectorAll('body button');
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            button.classList.add('interact-button');
        }
    });