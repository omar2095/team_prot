// ============================================
// INNOVETRONICS ROBOTICS TEAM - MAIN SCRIPT
// ============================================

// ============================================
// PARTICLE SYSTEM
// ============================================
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.lifespan = 100;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.01;
        this.lifespan--;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(100, 200, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.particlesContainer = document.getElementById('particles');
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        this.particlesContainer.appendChild(this.canvas);
        
        // Spawn particles on mouse move
        document.addEventListener('mousemove', (e) => this.spawnParticles(e.x, e.y));
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    spawnParticles(x, y) {
        for (let i = 0; i < 3; i++) {
            this.particles.push(new Particle(x, y));
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            this.particles[i].draw(this.ctx);
            
            if (this.particles[i].lifespan <= 0) {
                this.particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }

    start() {
        this.animate();
    }
}

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileMenuBtn) return;

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', 
            mobileMenuBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// ============================================
// SMOOTH SCROLL & ACTIVE NAV LINK
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ============================================
// DEPARTMENT MODAL
// ============================================
const departmentData = {
    design: {
        name: 'Mechanical Design Department',
        icon: '⚙️',
        skills: ['CAD Design', 'Mechanical Engineering', '3D Modeling', 'Prototyping', 'Structural Analysis', 'Manufacturing', 'Technical Drawings', 'Assembly Design'],
        members: [
            { name: 'Omar Ali', role: 'Design Lead', email: 'omar.ali@innovetronics.com', cv: '#' },
            { name: 'Ezzat Mekaway', role: 'Mechanical Designer', email: 'ezzat.mekaway@innovetronics.com', cv: '#' },
        ]
    },
    ai: {
        name: 'AI Department',
        icon: '🤖',
        skills: ['Computer Vision', 'Machine Learning', 'Neural Networks', 'YOLO', 'TensorFlow', 'PyTorch', 'Deep Learning', 'Image Processing'],
        members: [
            { name: 'Omar Gouda', role: 'Lead AI Engineer', email: 'omar.gouda@innovetronics.com', github: 'https://github.com/omargouda', cv: '#' },
            { name: 'Ahmed Amir', role: 'Vision Specialist', email: 'ahmed.amir@innovetronics.com', github: 'https://github.com/ahmedamir', cv: '#' },
        ]
    },
    electronics: {
        name: 'Electronics Department',
        icon: '⚡',
        skills: ['Circuit Design', 'PCB Layout', 'Power Electronics', 'Microcontrollers', 'Sensors', 'Motor Control', 'Signal Processing', 'Embedded Systems'],
        members: [
            { name: 'Abdelrahman El Komy', role: 'Hardware Lead', email: 'abdelrahman.elkomy@innovetronics.com', github: 'https://github.com/abdelrahmankomy', cv: '#' },
            { name: 'Mohamed Yasser', role: 'PCB Designer', email: 'mohamed.yasser@innovetronics.com', github: 'https://github.com/mohamedyasser', cv: '#' },
        ]
    },
    coding: {
        name: 'Software Department',
        icon: '💻',
        skills: ['Embedded C++', 'Python', 'ROS', 'MATLAB', 'Real-time Systems', 'Firmware', 'Linux', 'Git & Version Control'],
        members: [
            { name: 'Mohamed Gad', role: 'Software Lead', email: 'mohamed.gad@innovetronics.com', github: 'https://github.com/mohamedgad', cv: '#' },
            { name: 'Abdallah Mehrez', role: 'Systems Developer', email: 'abdallah.mehrez@innovetronics.com', github: 'https://github.com/abdallahm', cv: '#' },
        ]
    }
};

function initDepartmentModal() {
    const deptCards = document.querySelectorAll('.dept-logo-card');
    const modal = document.getElementById('deptModal');
    const modalClose = document.querySelector('.modal-close');

    deptCards.forEach(card => {
        card.addEventListener('click', () => {
            const dept = card.dataset.dept;
            const data = departmentData[dept];
            
            if (data) {
                populateModal(data);
                modal.classList.add('active');
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    document.querySelector('.modal-overlay')?.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

function populateModal(data) {
    document.querySelector('.modal-dept-icon').textContent = data.icon;
    document.querySelector('.modal-dept-name').textContent = data.name;
    
    const skillsList = document.querySelector('.skills-list');
    skillsList.innerHTML = data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    
    const membersGrid = document.querySelector('.members-grid');
    membersGrid.innerHTML = data.members.map(member => {
        let linksHTML = `<a href="mailto:${member.email}" class="member-link-btn" title="Send Email"><span>📧</span></a>`;
        if (member.cv) {
            linksHTML += `<a href="${member.cv}" class="member-link-btn" title="Download CV" target="_blank"><span>📄</span></a>`;
        }
        if (member.github) {
            linksHTML += `<a href="${member.github}" class="member-link-btn" title="GitHub Profile" target="_blank"><span>🐙</span></a>`;
        }
        return `
        <div class="member-card">
            <div class="member-photo">👤</div>
            <h4>${member.name}</h4>
            <p class="member-role">${member.role}</p>
            <p class="member-email"><a href="mailto:${member.email}">${member.email}</a></p>
            <div class="member-links">
                ${linksHTML}
            </div>
        </div>
    `;
    }).join('');
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .project-3d-card, .dept-detail-card').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// CTA BUTTON FUNCTIONALITY
// ============================================
function initCTAButtons() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const teamSection = document.querySelector('#team');
            if (teamSection) {
                teamSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

// ============================================
// PROJECTS DATA + RENDERER
// ============================================
const projectsData = [
    {
        id: '01',
        title: 'Autonomous Robot Navigation',
        category: 'AI & Robotics',
        description: 'SLAM-based navigation system for indoor and outdoor autonomous platforms, with path planning and obstacle avoidance.',
        tags: ['SLAM','ROS','Path Planning','Localization'],
        github: 'https://github.com/innovetronics/autonomous-navigation',
        drive: '#',
        media: '#',
        thumbnail: 'assets/projects/nav-thumb.jpg'
    },
    {
        id: '02',
        title: 'Object Detection System',
        category: 'Computer Vision',
        description: 'Real-time detection and classification pipeline optimized for industrial inspection and low-latency inference.',
        tags: ['YOLO','OpenCV','Edge TPU','Inference'],
        github: 'https://github.com/innovetronics/object-detection',
        drive: '#',
        media: '#',
        thumbnail: 'assets/projects/od-thumb.jpg'
    },
    {
        id: '03',
        title: 'Robotic Arm Controller',
        category: 'Mechatronics',
        description: 'High-precision arm controller with inverse kinematics, trajectory planning and safety interlocks for manipulation tasks.',
        tags: ['Inverse Kinematics','PID','Motion Planning','ROS'],
        github: 'https://github.com/innovetronics/arm-controller',
        drive: '#',
        media: '#',
        thumbnail: 'assets/projects/arm-thumb.jpg'
    },
    {
        id: '04',
        title: 'Autonomous Line Follower',
        category: 'Robotics',
        description: 'Competition-grade line follower using adaptive PID control, sensor fusion, and robust path recovery.',
        tags: ['Control','Sensors','PID','Competition'],
        github: 'https://github.com/innovetronics/line-follower',
        drive: '#',
        media: '#',
        thumbnail: 'assets/projects/line-thumb.jpg'
    },
    {
        id: '05',
        title: 'Quadcopter Flight Control',
        category: 'Embedded Systems',
        description: 'Robust flight control system with IMU filtering, stabilization loops and waypoint autonomy for UAV platforms.',
        tags: ['IMU','Kalman','Flight Control','RTOS'],
        github: 'https://github.com/innovetronics/quadcopter-fc',
        drive: '#',
        media: '#',
        thumbnail: 'assets/projects/quad-thumb.jpg'
    },
    {
        id: '06',
        title: 'Obstacle Avoidance System',
        category: 'Sensors & AI',
        description: 'Real-time obstacle detection and avoidance using multi-sensor fusion and lightweight ML models for edge deployment.',
        tags: ['Sensors','ML','Fusion','Real-time'],
        github: 'https://github.com/innovetronics/obstacle-avoidance',
        drive: '#',
        media: '#',
        thumbnail: 'assets/projects/obs-thumb.jpg'
    }
];

function renderProjects() {
    const container = document.getElementById('projectsShowcase');
    if (!container) return;

    container.innerHTML = projectsData.map(p => `
        <div class="project-3d-card" data-id="${p.id}">
            <div class="project-3d-inner">
                <div class="project-front-face">
                    <div class="project-number">${p.id}</div>
                    <div class="project-thumbnail"><div class="thumbnail-placeholder">${p.thumbnail ? '<img src="'+p.thumbnail+'" alt="'+p.title+'"/>' : 'Project Image'}</div></div>
                    <div class="project-info-overlay"><h3>${p.title}</h3><p class="project-category">${p.category}</p></div>
                </div>
                <div class="project-back-face">
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                    <div class="project-resources-grid">
                        <a href="${p.github}" class="resource-item" title="GitHub Repo" target="_blank"><span class="resource-icon">🐙</span><span>GitHub</span></a>
                        <a href="${p.drive}" class="resource-item" title="Drive Resources" target="_blank"><span class="resource-icon">🗂️</span><span>Drive</span></a>
                        <a href="${p.media}" class="resource-item" title="Media / Demo" target="_blank"><span class="resource-icon">🎥</span><span>Media</span></a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // After injecting markup, initialize interactivity
    initProjectCards();
}


// ============================================
// PROJECT CARD FLIP
// ============================================
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-3d-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });

        // Also flip on hover on desktop
        if (window.innerWidth > 768) {
            card.addEventListener('mouseenter', function() {
                this.classList.add('flipped');
            });
            card.addEventListener('mouseleave', function() {
                this.classList.remove('flipped');
            });
        }
    });
}

// ============================================
// FORM SUBMISSION
// ============================================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Show success message
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = '#00D700';
            
            // Reset after 2 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        });
    }
}

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function initScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.title = 'Scroll to top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00D9FF, #0099FF);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 24px;
        z-index: 999;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        font-weight: bold;
        box-shadow: 0 5px 20px rgba(0, 217, 255, 0.4);
    `;

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 8px 30px rgba(0, 217, 255, 0.6)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 5px 20px rgba(0, 217, 255, 0.4)';
    });
}

// ============================================
// ANIMATED COUNTER
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(target * progress);
            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// ============================================
// FLOATING ROBOT PARTS ANIMATION
// ============================================
function enhanceRoboticsBackground() {
    const robotParts = document.querySelectorAll('.robot-part');
    
    robotParts.forEach((part, index) => {
        part.style.opacity = '0.06';
        part.style.fontSize = `${40 + index * 5}px`;
    });
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
    // Start particle system
    const particleSystem = new ParticleSystem();
    particleSystem.start();

    // Initialize all features
    initMobileMenu();
    initSmoothScroll();
    initDepartmentModal();
    initScrollAnimations();
    initCTAButtons();
    // render projects (will call initProjectCards internally)
    renderProjects();
    initContactForm();
    initLazyLoading();
    initScrollToTop();
    initCounters();
    enhanceRoboticsBackground();

    console.log('✓ Innovetronics Team Portal Initialized');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// HANDLE WINDOW RESIZE
// ============================================
window.addEventListener('resize', () => {
    // Reinitialize project cards on resize for responsive behavior
    setTimeout(() => {
        initProjectCards();
    }, 200);
});
