const canvas = document.getElementById("particlebg");
const canvasd = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numparticles = 100;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(255,255,255,${Math.random()})`; 
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }
    }

    draw() {
        canvasd.beginPath();
        canvasd.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        canvasd.fillStyle = this.color;
        canvasd.fill();
    }
}

function initParticles() {
    for (let i = 0; i < numparticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
    }
}

const mouse = {
    radius: 100,
    x: null,
    y: null
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function movementParticles() {
    canvasd.clearRect(0, 0, canvas.width, canvas.height); 

    particles.forEach((particle) => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = Math.cos(angle) * force * 5;
            const directionY = Math.sin(angle) * force * 5;

            particle.x -= directionX;
            particle.y -= directionY;
        }

        particle.update();
        particle.draw();
    });

    requestAnimationFrame(movementParticles);
}

initParticles();
movementParticles();

function showCard(msgId) {
    const target = document.getElementById(msgId);
    const isVisible = target.classList.contains('show');
  
    document.querySelectorAll('.hiddenmsg').forEach(el => el.classList.remove('show'));
  
    if (!isVisible) {
        target.classList.add('show');
      }
  }
