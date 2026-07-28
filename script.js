// ==========================================
// ELEMENTS
// ==========================================

const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const flap = document.getElementById("flap");
const letter = document.getElementById("letter");

const music = document.getElementById("music");
const openSound = document.getElementById("openSound");
const musicBtn = document.getElementById("musicBtn");

const particles = document.getElementById("particles");

let opened = false;
let musicOn = false;

// ==========================================
// OPEN ENVELOPE
// ==========================================

openBtn.addEventListener("click", () => {

    if (opened) return;

    opened = true;

    envelope.classList.add("open");

    openBtn.style.opacity = "0";
    openBtn.style.pointerEvents = "none";

    openSound.currentTime = 0;
    openSound.play();

    setTimeout(() => {

        startHearts();

        startSparkles();

    }, 600);

    if (!musicOn) {

        music.volume = 0;

        music.play();

        fadeInMusic();

        musicOn = true;

    }

});

// ==========================================
// MUSIC BUTTON
// ==========================================

musicBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicOn = true;

        musicBtn.innerHTML = "🎵";

    }

    else {

        music.pause();

        musicOn = false;

        musicBtn.innerHTML = "🔇";

    }

});

// ==========================================
// FADE IN MUSIC
// ==========================================

function fadeInMusic() {

    let volume = 0;

    const fade = setInterval(() => {

        volume += 0.05;

        if (volume >= 0.4) {

            volume = 0.4;

            clearInterval(fade);

        }

        music.volume = volume;

    }, 200);

}
// ==========================================
// FLOATING HEARTS
// ==========================================

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";
    heart.innerHTML = "❤";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
        (14 + Math.random() * 18) + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 4) + "s";

    particles.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 9000);

}

let heartInterval;

function startHearts() {

    heartInterval = setInterval(() => {

        createHeart();

    }, 400);

}

// ==========================================
// GOLDEN SPARKLES
// ==========================================

function createSpark() {

    const spark = document.createElement("div");

    spark.className = "spark";

    spark.style.left =
        Math.random() * window.innerWidth + "px";

    spark.style.top =
        Math.random() * window.innerHeight + "px";

    particles.appendChild(spark);

    setTimeout(() => {

        spark.remove();

    }, 2000);

}

let sparkInterval;

function startSparkles() {

    sparkInterval = setInterval(() => {

        createSpark();

    }, 180);

}

// ==========================================
// CONFETTI BURST
// ==========================================

function confettiBurst() {

    for (let i = 0; i < 80; i++) {

        const piece = document.createElement("div");

        piece.style.position = "fixed";
        piece.style.left = "50%";
        piece.style.top = "45%";

        piece.style.width = "8px";
        piece.style.height = "14px";

        piece.style.background =
            `hsl(${Math.random() * 360},100%,60%)`;

        piece.style.pointerEvents = "none";
        piece.style.zIndex = "9999";

        document.body.appendChild(piece);

        const x =
            (Math.random() - 0.5) * 800;

        const y =
            -(Math.random() * 500 + 200);

        piece.animate([

            {
                transform: "translate(0,0) rotate(0deg)",
                opacity: 1
            },

            {
                transform:
                    `translate(${x}px,${y}px) rotate(${Math.random()*720}deg)`,

                opacity: 0
            }

        ], {

            duration: 2500,
            easing: "ease-out"

        });

        setTimeout(() => {

            piece.remove();

        }, 2500);

    }

}

// ==========================================
// RUN CONFETTI AFTER OPEN
// ==========================================

openBtn.addEventListener("click", () => {

    setTimeout(() => {

        confettiBurst();

    }, 500);

});
// ==========================================
// LETTER TILT EFFECT
// ==========================================

document.addEventListener("mousemove", (e) => {

    if (!opened) return;

    const letter = document.getElementById("letter");

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    letter.style.transform =
        `translateY(-180px) rotateX(${y}deg) rotateY(${x}deg)`;

});

document.addEventListener("mouseleave", () => {

    if (!opened) return;

    document.getElementById("letter").style.transform =
        "translateY(-180px) rotateX(0deg) rotateY(0deg)";

});

// ==========================================
// TYPEWRITER EFFECT
// ==========================================

const title = document.querySelector(".letter h1");
const originalTitle = title.innerText;

title.innerText = "";

function typeTitle(index = 0) {

    if (index < originalTitle.length) {

        title.innerHTML += originalTitle[index];

        setTimeout(() => {

            typeTitle(index + 1);

        }, 120);

    }

}

openBtn.addEventListener("click", () => {

    setTimeout(() => {

        typeTitle();

    }, 1200);

});

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================

openBtn.addEventListener("mousedown", (e) => {

    const ripple = document.createElement("span");

    ripple.style.position = "absolute";
    ripple.style.width = "10px";
    ripple.style.height = "10px";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255,255,255,.8)";
    ripple.style.pointerEvents = "none";

    ripple.style.left = e.offsetX + "px";
    ripple.style.top = e.offsetY + "px";

    ripple.animate([

        {
            transform: "scale(0)",
            opacity: 1
        },

        {
            transform: "scale(18)",
            opacity: 0
        }

    ], {

        duration: 700

    });

    openBtn.appendChild(ripple);

    setTimeout(() => {

        ripple.remove();

    }, 700);

});

// ==========================================
// WINDOW LOAD
// ==========================================

window.addEventListener("load", () => {

    envelope.animate(

        [

            {
                opacity: 0,
                transform: "translateY(80px)"
            },

            {
                opacity: 1,
                transform: "translateY(0)"
            }

        ],

        {

            duration: 1500,
            easing: "ease-out",
            fill: "forwards"

        }

    );

});
