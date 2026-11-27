/**
 * Particle Animation Background
 * Creates an animated background with floating golden particles
 * that move smoothly across the canvas
 */

// Create and append canvas element to the body
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

// Get 2D rendering context
const ctx = canvas.getContext("2d");

/**
 * Resize canvas to match window dimensions
 * Ensures canvas always fills the viewport
 */
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initialize canvas size
resize();

// Update canvas size when window is resized
window.addEventListener("resize", resize);

// Configuration constants
const PARTICLE_COUNT = 80;
const PARTICLE_COLOR = "rgba(255, 215, 0, 0.7)";
const SHADOW_COLOR = "gold";
const SHADOW_BLUR = 20;

/**
 * Particle configuration
 * Each particle has position (x, y), size, and velocity (dx, dy)
 */
const particles = [];
for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7
    });
}

/**
 * Animation loop
 * Updates particle positions and renders them on the canvas
 */
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw each particle
    particles.forEach(particle => {
        // Update position
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
            particle.dx *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
            particle.dy *= -1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.shadowColor = SHADOW_COLOR;
        ctx.shadowBlur = SHADOW_BLUR;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Request next animation frame
    requestAnimationFrame(draw);
}

// Start animation
draw();
