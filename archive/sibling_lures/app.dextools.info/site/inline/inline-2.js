document.addEventListener("DOMContentLoaded", function() {
        const elements = document.querySelectorAll('[ad-data-linked]');
        elements.forEach(element => {
            element.removeAttribute('ad-data-linked');
        });
    
        console.log('Removed ad-data-linked attributes from', elements.length, 'elements');
    });