// ===============================
// **FERMETURE DU PARCHEMIN (croix)**
// ===============================
document.querySelector('.close-parchment').onclick = () => {
    document.querySelector('#intro-overlay').style.display = 'none';
};

// ===============================
// **FERMETURE EN CLIQUANT À CÔTÉ**
// ===============================
const overlay = document.getElementById('intro-overlay');

overlay.addEventListener('click', function (e) {
    if (!e.target.classList.contains('overlay')) return;
    overlay.style.display = 'none';
});

// ===============================
// **BOUTON ✦**
// ===============================
function toggleIntro() {
    overlay.style.display =
        (overlay.style.display === 'none' || overlay.style.display === '') ? 'flex' : 'none';
}

// ===============================
// **NAVIGATION PARCHEMIN**
// ===============================
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');

function showPage2() {
    page1.style.display = 'none';
    page2.style.display = 'block';
}

function showPage1() {
    page2.style.display = 'none';
    page1.style.display = 'block';
}

// ===============================
// **DRAG IMAGE**
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
// **INDICE**
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
// **⭐ ZONE 1 = afficher Eldrin + bulle**
// ===============================
const zone1 = document.querySelector('.zone-enigme1');
const eldrinImg = document.getElementById('eldrin-img');
const eldrinBubble = document.getElementById('eldrin-bubble');
const eldrinPaper = document.getElementById('eldrin-paper');

function toggleEldrin() {
    const isHidden = eldrinImg.style.display === "none";
    eldrinImg.style.display = isHidden ? "block" : "none";
    eldrinBubble.style.display = isHidden ? "block" : "none";

    // ⭐ Afficher / cacher le papier selon la bulle
    eldrinPaper.style.display = isHidden ? "block" : "none";
}

zone1.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleEldrin();
});

// ===============================
// **⭐ CACHER TOUT QUAND ON CLIQUE AILLEURS**
// ===============================
document.addEventListener('click', (e) => {

    if (e.target.classList.contains('zone-enigme1')) return;
    if (e.target.id === 'eldrin-img') return;
    if (e.target.id === 'eldrin-bubble') return;
    if (e.target.closest('#eldrin-bubble')) return;
    if (e.target.id === 'eldrin-audio-btn') return;
    if (e.target.id === 'eldrin-restart-btn') return;
    if (e.target.id === 'eldrin-paper') return;
    if (e.target.classList.contains('overlay')) return;

    eldrinImg.style.display = "none";
    eldrinBubble.style.display = "none";
    eldrinPaper.style.display = "none";
});

// ===============================
// **⭐ AUDIO : lecture / pause**
// ===============================
const audio = document.getElementById('eldrin-audio');
const audioBtn = document.getElementById('eldrin-audio-btn');

audioBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

// ===============================
// **⭐ AUDIO : recommencer depuis le début**
// ===============================
const restartBtn = document.getElementById('eldrin-restart-btn');

restartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    audio.currentTime = 0;
    audio.play();
});

// ===============================
// ⭐⭐ PAPIER : zoom comme le boîtier ⭐⭐
// ===============================
const paperZoom = document.getElementById('paper-zoom');
const paperContent = document.getElementById('paper-content');

// Ouvrir le zoom
eldrinPaper.addEventListener('click', (e) => {
    e.stopPropagation();
    paperZoom.style.display = "flex";
});

// Fermeture prioritaire : zoom → bulle
document.addEventListener("click", function(e) {

    if (paperZoom.style.display === "flex") {
        if (!e.target.closest("#paper-content") && e.target.id !== "eldrin-paper") {
            paperZoom.style.display = "none";
            return;
        }
    }

    if (eldrinBubble.style.display === "block") {
        if (!e.target.closest("#eldrin-bubble") && e.target.id !== "eldrin-img") {
            eldrinBubble.style.display = "none";
            eldrinImg.style.display = "none";
            eldrinPaper.style.display = "none";
        }
    }
});

// ===============================
// **⭐ ÉNIGME 2 : ouverture de la grande box**
// ===============================
document.getElementById("zone-enigme2").addEventListener("click", function() {
    document.getElementById("enigme2-box").style.display = "flex";
});

// ===============================
// ⭐⭐ BOÎTIER MAGIQUE : ouverture du boîtier zoomé ⭐⭐
// ===============================
document.getElementById("boitier-code").addEventListener("click", function(e) {
    e.stopPropagation();
    document.getElementById("boitier-zoom").style.display = "flex";
});

// ===============================
// ⭐⭐ FERMETURE PRIORITAIRE : boîtier zoomé puis grande box ⭐⭐
// ===============================

document.addEventListener("click", function(e) {

    const bigBox = document.getElementById("enigme2-box");
    const zoomBox = document.getElementById("boitier-zoom");

    // ⭐ Si boîtier zoomé ouvert → fermer si clic à côté
    if (zoomBox.style.display === "flex") {
        if (!e.target.closest("#boitier-zoom") &&
            !e.target.closest("#boitier-code")) {

            zoomBox.style.display = "none";
            return;
        }
    }

    // ⭐ Si boîtier zoomé fermé → fermer la grande box
    if (bigBox.style.display === "flex") {
        if (!e.target.closest(".code-content") &&
            e.target.id !== "zone-enigme2") {

            bigBox.style.display = "none";
        }
    }
});

// ===============================
// **⭐ ÉNIGME 2 : vérification du code + porte ouverte**
// ===============================
document.getElementById("enigme2-validate").addEventListener("click", function() {
    const code = document.getElementById("enigme2-input").value.trim().toLowerCase();

    if (code === "velor") {

        document.querySelector(".code-content").style.backgroundImage =
            'url("images/porte_maison_eldorin_ouverte.png")';

        document.getElementById("boitier-zoom").style.display = "none";
        document.getElementById("boitier-code").style.display = "none";

        setTimeout(() => {
            window.location.href = "enigme2.html";
        }, 1500);

    } else {
        document.getElementById("enigme2-error").textContent =
            "Le mot de passe est incorrect.";
    }
});
