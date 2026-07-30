// ===============================
// FERMETURE DU PARCHEMIN (croix)
// ===============================
document.querySelector('.close-parchment').onclick = () => {
    document.querySelector('#intro-overlay').style.display = 'none';
};

// ===============================
// FERMETURE EN CLIQUANT À CÔTÉ
// ===============================
const overlay = document.getElementById('intro-overlay');

overlay.addEventListener('click', function (e) {
    if (!e.target.classList.contains('overlay')) return;
    overlay.style.display = 'none';
});

// ===============================
// BOUTON ✦
// ===============================
function toggleIntro() {
    overlay.style.display =
        (overlay.style.display === 'none' || overlay.style.display === '') ? 'flex' : 'none';
}

// ===============================
// NAVIGATION PARCHEMIN
// ===============================
function showPage2() {
    page1.style.display = 'none';
    page2.style.display = 'block';
}

function showPage1() {
    page2.style.display = 'none';
    page1.style.display = 'block';
}

// ===============================
// DRAG IMAGE
// ===============================
const imgScroll = document.querySelector('.image-scroll');
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

imgScroll.addEventListener('mousedown', (e) => {
    isDragging = true;
    imgScroll.style.cursor = "grabbing";
    startX = e.pageX - imgScroll.offsetLeft;
    startY = e.pageY - imgScroll.offsetTop;
    scrollLeft = imgScroll.scrollLeft;
    scrollTop = imgScroll.scrollTop;
});

imgScroll.addEventListener('mouseup', () => {
    isDragging = false;
    imgScroll.style.cursor = "grab";
});

imgScroll.addEventListener('mouseleave', () => {
    isDragging = false;
    imgScroll.style.cursor = "grab";
});

imgScroll.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - imgScroll.offsetLeft;
    const y = e.pageY - imgScroll.offsetTop;
    imgScroll.scrollLeft = scrollLeft - (x - startX);
    imgScroll.scrollTop = scrollTop - (y - startY);
});

imgScroll.style.cursor = "grab";

// ===============================
// INDICE
// ===============================
const hintOverlay = document.getElementById('hint-overlay');

function toggleHint() {
    hintOverlay.style.display =
        (hintOverlay.style.display === 'none' || hintOverlay.style.display === '') ? 'flex' : 'none';
}

document.querySelector('.close-hint').onclick = () => {
    hintOverlay.style.display = 'none';
};

hintOverlay.addEventListener('click', function (e) {
    if (!e.target.classList.contains('overlay')) return;
    hintOverlay.style.display = 'none';
});

// ===============================
// ⭐ ZONE 1 = afficher Eldrin + bulle
// ===============================
const zone1 = document.querySelector('.zone-enigme');
const eldrinImg = document.getElementById('eldrin-img');
const eldrinBubble = document.getElementById('eldrin-bubble');

function toggleEldrin() {
    const isHidden = eldrinImg.style.display === "none";
    eldrinImg.style.display = isHidden ? "block" : "none";
    eldrinBubble.style.display = isHidden ? "block" : "none";
}

zone1.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleEldrin();
});

// ===============================
// ⭐ ZONE 2 = ouvrir une box de mot de passe
// ===============================
const zone2 = document.querySelector('.zone-enigme-2');
const passwordOverlay = document.getElementById('password-overlay');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const passwordError = document.getElementById('password-error');

// Mot de passe à définir ici
const CORRECT_PASSWORD = "eldoria";

zone2.addEventListener('click', (e) => {
    e.stopPropagation();
    passwordOverlay.style.display = "flex";
});

// Vérification du mot de passe
passwordSubmit.addEventListener('click', () => {
    if (passwordInput.value.trim().toLowerCase() === CORRECT_PASSWORD) {
        passwordError.style.display = "none";
        passwordOverlay.style.display = "none";

        // 👉 Action quand le mot de passe est bon
        eldrinImg.style.display = "block";
        eldrinBubble.style.display = "block";

    } else {
        passwordError.style.display = "block";
    }
});

// ===============================
// ⭐ CACHER TOUT QUAND ON CLIQUE AILLEURS
// ===============================
document.addEventListener('click', (e) => {

    if (e.target.classList.contains('zone-enigme')) return;
    if (e.target.classList.contains('zone-enigme-2')) return;
    if (e.target.id === 'eldrin-img') return;
    if (e.target.id === 'eldrin-bubble') return;
    if (e.target.closest('#eldrin-bubble')) return;
    if (e.target.id === 'eldrin-audio-btn') return;
    if (e.target.id === 'eldrin-restart-btn') return;
    if (e.target.id === 'eldrin-paper') return;
    if (e.target.classList.contains('overlay')) return;
    if (e.target.closest('.password-box')) return;

    eldrinImg.style.display = "none";
    eldrinBubble.style.display = "none";
});

// ===============================
// ⭐ AUDIO : lecture / pause
// ===============================
const audio = document.getElementById('eldrin-audio');
const audioBtn = document.getElementById('eldrin-audio-btn');

audioBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audio.paused) audio.play();
    else audio.pause();
});

// ===============================
// ⭐ AUDIO : recommencer depuis le début
// ===============================
const restartBtn = document.getElementById('eldrin-restart-btn');

restartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    audio.currentTime = 0;
    audio.play();
});

// ===============================
// ⭐ Papier : zoom direct + fermeture en cliquant autour
// ===============================
const paperZoom = document.getElementById('paper-zoom');
const paperContent = document.getElementById('paper-content');

document.getElementById('eldrin-paper').addEventListener('click', (e) => {
    e.stopPropagation();
    paperZoom.style.display = "flex";
});

paperZoom.addEventListener('click', () => {
    paperZoom.style.display = "none";
});

paperContent.addEventListener('click', (e) => {
    e.stopPropagation();
});
