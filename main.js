document.addEventListener('DOMContentLoaded', () => {

    // --- THREE.JS BACKGROUND SETUP ---
    const canvas = document.querySelector('#bg-canvas');
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Objects - Digital Globe
    const globeGeometry = new THREE.SphereGeometry(15, 32, 32);
    const globeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00E5FF,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xC0C0C0,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse Interaction for 3D Scene
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) - 0.5;
        mouseY = (event.clientY / window.innerHeight) - 0.5;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Rotate globe
        globe.rotation.y += 0.002;
        globe.rotation.x += 0.001;

        // Rotate particles slowly
        particlesMesh.rotation.y = -elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;

        // Mouse Parallax Effect on Particles
        particlesMesh.position.x += (mouseX * 5 - particlesMesh.position.x) * 0.05;
        particlesMesh.position.y += (-mouseY * 5 - particlesMesh.position.y) * 0.05;

        renderer.render(scene, camera);
    }
    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // --- GSAP ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    // Initial load animations
    const tl = gsap.timeline();
    tl.from('.navbar', { y: -100, opacity: 0, duration: 1, ease: 'power3.out' })
      .from('.glitch', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
      .from('.tagline', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('.subtitle', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('.hero-section .btn', { scale: 0.8, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.3');

    // Section Headers Scroll Animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // About Section Card
    gsap.from('.profile-card', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
        },
        y: 100,
        opacity: 0,
        rotationX: 10,
        duration: 1.2,
        ease: 'power3.out'
    });

    // Services Grid
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-section',
            start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Stats Section Counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: '.stats-section',
            start: 'top 80%',
            onEnter: () => {
                const target = +counter.getAttribute('data-target');
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: 'power2.out',
                    onUpdate: function() {
                        counter.innerHTML = Math.round(this.targets()[0].innerHTML) + '+';
                    }
                });
            },
            once: true
        });
    });

    // Contact Form Logic
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button');
            const originalBtnText = submitBtn.innerText;
            
            // Get data
            const formData = {
                name: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                subject: 'Website Inquiry',
                message: contactForm.querySelector('textarea').value
            };

            try {
                submitBtn.innerText = 'Sending...';
                submitBtn.disabled = true;

                const response = await fetch('https://the-real-backend.onrender.com/api/contacts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Message Sent Successfully!');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send');
                }
            } catch (err) {
                console.error(err);
                alert('Error: Could not connect to the cloud server. Please check your internet connection.');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Contact Form Animation
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out'
    });
});
