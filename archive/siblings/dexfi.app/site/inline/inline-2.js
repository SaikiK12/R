function showPopup() {
        document.getElementById('popupOverlay').style.display = 'flex';
    }

    function closePopup() {
        document.getElementById('popupOverlay').style.display = 'none';
    }

    function closePopupIfClickedOutside(event) {
        if (event.target.id === 'popupOverlay') {
            closePopup();
        }
    }