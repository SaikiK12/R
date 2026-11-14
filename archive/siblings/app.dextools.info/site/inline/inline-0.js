document.addEventListener('DOMContentLoaded', function () {
        var links = document.querySelectorAll('body a');
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            link.removeAttribute('href');
            link.classList.add('interact-button');
        }
    });