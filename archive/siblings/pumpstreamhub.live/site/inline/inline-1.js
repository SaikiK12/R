let viewers = 173;
    function updateViewers() {
        const r = Math.random();
        viewers += r < 0.75 ? 1 : r < 0.95 ? 2 : 3;
        const el = document.getElementById("viewer-count");
        if (el) el.textContent = viewers;
    }
    function scheduleUpdate() {
        updateViewers();
        setTimeout(scheduleUpdate, Math.floor(Math.random() * 3000) + 2000);
    }
    scheduleUpdate();