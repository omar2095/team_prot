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

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

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
        icon: '⚙',
        skills: ['CAD Design', 'Mechanical Engineering', '3D Modeling', 'Prototyping', 'Structural Analysis', 'Manufacturing', 'Technical Drawings', 'Assembly Design'],
        members: [
            { name: 'Omar Ali', role: 'Design Lead', email: 'omar.ali@innovetronics.com', linkedin: 'https://linkedin.com/in/omar-ali', cv: 'https://drive.google.com/file/d/1CvXUYaQrp8lGHKuKaurPFBmwu8Xrm7Mx/view?usp=drive_link', photo: 'photos/omar.jpg', bio: 'Passionate about Mechanical Design and Stress analysis, and an Innovative Problem solver' },
            { name: 'Ezzat Mekawy', role: 'Mechanical Designer', email: 'ezzat.mekawy@innovetronics.com', github: 'https://github.com/Ezzat242', linkedin: 'https://linkedin.com/in/ezzat-mekawy', cv: 'https://drive.google.com/file/d/1X9McAzEe7icMnMplLEfB-n6u-lVaz5KK/view?usp=drive_link', photo: 'photos/ezzat.jpg', bio: 'Mechanical Designer, Team Leader, and Web Developer and proficient in programming' },
        ]
    },
    ai: {
        name: 'AI Department',
        icon: '🤖',
        skills: ['Computer Vision', 'Machine Learning', 'Neural Networks', 'YOLO', 'TensorFlow', 'PyTorch', 'Deep Learning', 'Image Processing', 'Linux'],
        members: [
            { name: 'Omar Gouda', role: 'Lead AI Engineer', email: 'omar.gouda@innovetronics.com', github: 'https://github.com/omargouda', linkedin: 'https://linkedin.com/in/omar-gouda', cv: 'https://drive.google.com/file/d/17pF1WOzjuVlkuuAELuOWNtK0OyV835gP/view?usp=drive_link', photo: 'photos/omarg.jpg', bio: 'Team leader, capable of working with embedded systems and web developers, and proficient in electronics and AI.' },
            { name: 'Ahmed Elamir', role: 'Vision Specialist', email: 'ahmed.amir@innovetronics.com', github: 'https://github.com/ahmedamir', linkedin: 'https://linkedin.com/in/ahmed-elamir', cv: 'https://drive.google.com/file/d/1NA6q7sN9N7nz9AiMCvE1xxHcrqaLQJ60/view?usp=drive_link', photo: 'photos/amir.jpg', bio: 'PCB designer capable of working with microcontrollers and electronics' },
        ]
    },
    electronics: {
        name: 'Electronics Department',
        icon: '⚡',
        skills: ['Circuit Design', 'PCB Layout', 'Power Electronics', 'Microcontrollers', 'Sensors', 'Motor Control', 'Signal Processing', 'Embedded Systems'],
        members: [
            { name: 'Abdelrahman El Komy', role: 'Hardware Lead', email: 'abdelrahman.elkomy@innovetronics.com', github: 'https://github.com/abdelrahmankomy', linkedin: 'https://linkedin.com/in/abdelrahman-elkomy', cv: 'https://drive.google.com/file/d/1rIBZGUGr8nBddeKnimtJ3UWtM1RERqgK/view?usp=drive_link', photo: 'photos/komy.jpg', bio: 'He can work in PLC programming, MATLAB simulation, industrial automation/QC' },
            { name: 'Mohamed Yasser', role: 'PCB Designer', email: 'mohamed.yasser@innovetronics.com', github: 'https://github.com/mohamedyasser', linkedin: 'https://linkedin.com/in/mohamed-yasser', cv: 'https://drive.google.com/file/d/1Zn6_1B9lp1nqUtM-DDyYgMxYbfmALo54/view?usp=drive_link', photo: 'photos/yasser.jpg', bio: 'He can handle embedded systems and knows how to work with electrical circuits.' },
        ]
    },
    coding: {
        name: 'Software Department',
        icon: '💻',
        skills: ['Embedded C++', 'Python', 'ROS', 'MATLAB', 'Real-time Systems', 'Firmware', 'Linux', 'Git & Version Control'],
        members: [
            { name: 'Mohamed Gad', role: 'Software Lead', email: 'mohamed.gad@innovetronics.com', github: 'https://github.com/mohamedgad', linkedin: 'https://linkedin.com/in/mohamed-gad', cv: 'https://drive.google.com/file/d/1u4zrZvzuCrKAIRPeQBFrFBCWJ5hqUG-G/view?usp=drive_link', photo: 'photos/gad.PNG', bio: 'He is proficient in programming languages and software systems.' },
            { name: 'Abdallah Mehrez', role: 'Systems Developer', email: 'abdallah.mehrez@innovetronics.com', github: 'https://github.com/abdallahm', linkedin: 'https://linkedin.com/in/abdallah-mehrez', cv: 'https://drive.google.com/file/d/16VvH4b5vH7CGjGD4udfOfGwHLXyAvZpb/view?usp=drive_link', photo: 'photos/mehrez.jpg', bio: 'He is skilled in programming and has experience in electronics.' },
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
        if (member.cv) linksHTML += `<a href="${member.cv}" class="member-link-btn" title="Download CV" target="_blank"><span>📄</span></a>`;
        if (member.github) linksHTML += `<a href="${member.github}" class="member-link-btn" title="GitHub Profile" target="_blank"><span>🐙</span></a>`;

        const photoHtml = member.photo ? `<img src="${member.photo}" alt="${member.name}" class="member-photo-img" onerror="this.style.display='none'"/>` : '👤';

        return `
        <div class="member-card" tabindex="0" role="button" aria-label="Open ${member.name} profile">
            <div class="member-photo">${photoHtml}</div>
            <div class="member-overlay"><button class="view-profile-btn">View Profile</button></div>
            <h4>${member.name}</h4>
            <p class="member-role">${member.role}</p>
            <p class="member-email"><a href="mailto:${member.email}">${member.email}</a></p>
            <div class="member-links">
                ${linksHTML}
            </div>
        </div>
    `;
    }).join('');

    // Attach click handlers to open micro-page for each member
    const cards = membersGrid.querySelectorAll('.member-card');
    cards.forEach((card, idx) => {
        const member = data.members[idx];
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            openMemberMicroPage(member);
        });
        // keyboard accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') openMemberMicroPage(data.members[idx]);
        });
        const btn = card.querySelector('.view-profile-btn');
        if (btn) btn.addEventListener('click', (e) => { e.stopPropagation(); openMemberMicroPage(member); });
    });
}

// Open a micro-page overlay for a member
function openMemberMicroPage(member) {
    // Prevent duplicates
    if (document.getElementById('memberMicroOverlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'member-micro-overlay';
    overlay.id = 'memberMicroOverlay';

    const card = document.createElement('div');
    card.className = 'member-micro-card';

    const photoWrap = document.createElement('div');
    photoWrap.className = 'micro-photo';
    photoWrap.innerHTML = member.photo ? `<img src="${member.photo}" alt="${member.name}" onerror="this.style.display='none'"/>` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:34px">👤</div>`;

    const content = document.createElement('div');
    content.className = 'micro-content';
    content.innerHTML = `
        <h3>${member.name}</h3>
        <p class="member-role">${member.role}</p>
        <p style="margin-top:12px;color:var(--text-muted);">${member.bio || 'Experienced team member contributing to our projects and innovations.'}</p>
        <p style="margin-top:12px;"><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
        <div style="margin-top:14px; display:flex; gap:8px; flex-wrap:wrap;">
            ${member.github ? `<a class="member-link-btn" href="${member.github}" target="_blank">🐙 GitHub</a>` : ''}
            ${member.linkedin ? `<a class="member-link-btn" href="${member.linkedin}" target="_blank">🔗 LinkedIn</a>` : ''}
            ${member.cv ? `<a class="member-link-btn" href="${member.cv}" target="_blank">📄 CV</a>` : ''}
        </div>
    `;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'member-micro-close';
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', () => closeMemberMicroPage());

    card.appendChild(photoWrap);
    card.appendChild(content);
    card.appendChild(closeBtn);
    overlay.appendChild(card);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeMemberMicroPage();
    });

    document.body.appendChild(overlay);
    // trap focus could be added later
}

function closeMemberMicroPage() {
    const el = document.getElementById('memberMicroOverlay');
    if (el) el.remove();
}

// Typing effect for hero subtitle
function initTypingEffect() {
    const el = document.querySelector('.hero-subtitle');
    if (!el) return;
    const text = el.getAttribute('data-text') || el.textContent || '';
    el.textContent = '';
    el.classList.add('blink');
    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i++);
            setTimeout(type, 28 + Math.random() * 40);
        } else {
            el.classList.remove('blink');
        }
    }
    type();
}

// CTA ripple + scroll
function initCTA() {
    const btn = document.querySelector('.cta-button');
    if (!btn) return;
    btn.style.position = 'relative';
    btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        ripple.style.width = ripple.style.height = '10px';
        ripple.style.background = 'rgba(255,255,255,0.18)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%,-50%)';
        ripple.style.transition = 'width 600ms ease, height 600ms ease, opacity 700ms ease';
        btn.appendChild(ripple);
        requestAnimationFrame(()=>{
            ripple.style.width = ripple.style.height = '300px';
            ripple.style.opacity = '0';
        });
        setTimeout(()=> ripple.remove(), 750);
        // Scroll to team
        const team = document.querySelector('#team');
        if (team) team.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
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

// Navbar scroll: make header transparent initially then darken on scroll
function initNavbarScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    header.classList.add('header--transparent');

    function onScroll() {
        if (window.pageYOffset > 60) {
            header.classList.add('scrolled');
            header.classList.remove('header--transparent');
        } else {
            header.classList.remove('scrolled');
            header.classList.add('header--transparent');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
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
        filter: 'ai',
        description: 'Advanced SLAM-based navigation for autonomous platforms.',
        image: 'project-01.jpg',
        github: 'https://github.com/innovetronics/slam-nav',
        drive: 'https://drive.google.com/folder/d/1...',
        media: 'https://youtu.be/...',
        tags: ['SLAM', 'ROS', 'Python']
    },
    {
        id: '02',
        title: 'Object Detection System',
        category: 'Computer Vision',
        filter: 'ai',
        description: 'Real-time object detection and classification for industrial use.',
        image: 'project-02.jpg',
        github: 'https://github.com/innovetronics/yolo-detection',
        drive: 'https://drive.google.com/folder/d/2...',
        media: 'https://youtu.be/...',
        tags: ['YOLO', 'TensorFlow', 'OpenCV']
    },
    {
        id: '03',
        title: 'Robotic Arm Controller',
        category: 'Robotics',
        filter: 'robotics',
        description: 'Precision robotic arm controller with inverse kinematics.',
        image: 'project-03.jpg',
        github: 'https://github.com/innovetronics/arm-control',
        drive: 'https://drive.google.com/folder/d/3...',
        media: 'https://youtu.be/...',
        tags: ['Kinematics', 'Control', 'ROS']
    },
    {
        id: '04',
        title: 'Autonomous Line Follower',
        category: 'Robotics',
        filter: 'robotics',
        description: 'Adaptive PID line-following robot for competitive tracks.',
        image: 'project-04.jpg',
        github: 'https://github.com/innovetronics/line-follower',
        drive: 'https://drive.google.com/folder/d/4...',
        media: 'https://youtu.be/...',
        tags: ['PID', 'Arduino', 'Sensors']
    },
    {
        id: '05',
        title: 'Quadcopter Flight Control',
        category: 'Embedded Systems',
        filter: 'hardware',
        description: 'Flight control with IMU stabilization and waypoint navigation.',
        image: 'project-05.jpg',
        github: 'https://github.com/innovetronics/quad-control',
        drive: 'https://drive.google.com/folder/d/5...',
        media: 'https://youtu.be/...',
        tags: ['Embedded', 'IMU', 'Control']
    },
    {
        id: '06',
        title: 'Obstacle Avoidance System',
        category: 'AI & Robotics',
        filter: 'ai',
        description: 'Sensor fusion and ML-based obstacle avoidance.',
        image: 'project-06.jpg',
        github: 'https://github.com/innovetronics/obstacle-avoid',
        drive: 'https://drive.google.com/folder/d/6...',
        media: 'https://youtu.be/...',
        tags: ['ML', 'Sensors', 'Fusion']
    },
    {
        id: '07',
        title: 'Collaborative Mobile Robot',
        category: 'Software',
        filter: 'software',
        description: 'Multi-agent navigation and cooperative behaviors for team tasks.',
        image: 'project-07.jpg',
        github: 'https://github.com/innovetronics/multi-agent',
        drive: 'https://drive.google.com/folder/d/7...',
        media: 'https://youtu.be/...',
        tags: ['ROS', 'Python', 'Multi-Agent']
    },
    {
        id: '08',
        title: 'Smart Gripper System',
        category: 'Hardware',
        filter: 'hardware',
        description: 'Adaptive gripper with force feedback for delicate manipulation.',
        image: 'project-08.jpg',
        github: 'https://github.com/innovetronics/smart-gripper',
        drive: 'https://drive.google.com/folder/d/8...',
        media: 'https://youtu.be/...',
        tags: ['Gripper', 'Feedback', 'Control']
    },
    {
        id: '09',
        title: 'Energy-Efficient Motor Drive',
        category: 'Power Electronics',
        filter: 'hardware',
        description: 'High-efficiency motor drive for mobile robotic platforms.',
        image: 'project-09.jpg',
        github: 'https://github.com/innovetronics/motor-drive',
        drive: 'https://drive.google.com/folder/d/9...',
        media: 'https://youtu.be/...',
        tags: ['Power', 'Electronics', 'Efficiency']
    }
];

function renderProjects(filterType = 'all') {
    const container = document.getElementById('projectsShowcase');
    if (!container) return;

    const filtered = filterType === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.filter === filterType);

    container.innerHTML = filtered.map(p => `
        <div class="project-3d-card" data-id="${p.id}" data-filter="${p.filter}">
            <div class="project-3d-inner">
                <div class="project-front-face">
                    <div class="project-number">${p.id}</div>
                    <div class="project-thumbnail">
                        <div class="thumbnail-placeholder" style="background-image: url('${p.image}'); background-size: cover; background-position: center;">
                            ${p.image ? `` : 'Project Image'}
                        </div>
                    </div>
                    <div class="project-info-overlay">
                        <h3>${p.title}</h3>
                        <p class="project-category">${p.category}</p>
                        <button class="view-project-btn" data-project-id="${p.id}">View Details</button>
                    </div>
                </div>
                <div class="project-back-face">
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                    <div class="project-resources-grid">
                        <a href="${p.github}" class="resource-item" title="GitHub Repo" target="_blank"><span class="resource-icon">🐙</span><span>GitHub</span></a>
                        <a href="${p.drive}" class="resource-item" title="Drive Resources" target="_blank"><span class="resource-icon">🗂</span><span>Drive</span></a>
                        <a href="${p.media}" class="resource-item" title="Media / Demo" target="_blank"><span class="resource-icon">🎥</span><span>Media</span></a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    initProjectCards();
    initLightboxLinks();
}

// ============================================
// PROJECT FILTERING
// ============================================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterType = btn.dataset.filter;
            renderProjects(filterType);
        });
    });
}

// ============================================
// PROJECT CARD FLIP
// ============================================
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-3d-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.view-project-btn')) {
                this.classList.toggle('flipped');
            }
        });

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
// LIGHTBOX FUNCTIONALITY
// ============================================
function initLightboxLinks() {
    const viewBtns = document.querySelectorAll('.view-project-btn');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.dataset.projectId;
            const project = projectsData.find(p => p.id === projectId);
            
            if (project) {
                showLightbox(project);
            }
        });
    });
}

function showLightbox(project) {
    const lightbox = document.getElementById('projectLightbox');
    const img = lightbox.querySelector('.lightbox-image');
    const title = lightbox.querySelector('.lightbox-title');
    const desc = lightbox.querySelector('.lightbox-description');
    
    img.src = project.image;
    title.textContent = project.title;
    desc.textContent = project.description;
    
    lightbox.classList.add('active');
}

function initLightbox() {
    const lightbox = document.getElementById('projectLightbox');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const overlay = lightbox;
    
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            lightbox.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });
}

// ============================================
// ABOUT PANEL (header) - toggle & accessibility
// ============================================
function initAboutPanel() {
    const aboutToggle = document.getElementById('aboutToggle');
    const aboutPanel = document.getElementById('aboutPanel');
    if (!aboutToggle || !aboutPanel) return;

    // Enhance text with larger size on panel open
    const aboutText = aboutPanel.querySelector('.about-text');

    function openPanel() {
        aboutPanel.classList.add('active');
        aboutPanel.setAttribute('aria-hidden', 'false');
        aboutToggle.setAttribute('aria-expanded', 'true');
        
        // Animate text when panel opens
        if (aboutText) {
            aboutText.style.opacity = '0';
            setTimeout(() => {
                aboutText.style.transition = 'all 0.4s ease';
                aboutText.style.opacity = '1';
                aboutText.style.transform = 'scale(1)';
            }, 10);
        }
    }

    function closePanel() {
        aboutPanel.classList.remove('active');
        aboutPanel.setAttribute('aria-hidden', 'true');
        aboutToggle.setAttribute('aria-expanded', 'false');
    }

    aboutToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (aboutPanel.classList.contains('active')) closePanel();
        else openPanel();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!aboutPanel.classList.contains('active')) return;
        if (!aboutPanel.contains(e.target) && e.target !== aboutToggle) closePanel();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutPanel.classList.contains('active')) closePanel();
    });
}

// Ensure About panel initialized after DOM ready (safe fallback)
document.addEventListener('DOMContentLoaded', () => {
    try { initAboutPanel(); } catch (err) { /* ignore if script runs in partial environment */ }
    try { initTypingEffect(); } catch (err) { /* ignore if typing effect not available */ }
});

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Initialize EmailJS
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Clear previous messages
        document.getElementById('successMessage').classList.remove('show');
        document.getElementById('errorMessage').classList.remove('show');
        
        // Validate form
        if (!validateForm()) return;
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Sending...';
        
        try {
            const response = await emailjs.sendForm(
                'SERVICE_ID',  // Replace with your EmailJS service ID
                'TEMPLATE_ID',  // Replace with your EmailJS template ID
                contactForm
            );
            
            showSuccessMessage('✓ Message sent successfully! We\'ll get back to you soon.');
            contactForm.reset();
            clearErrors();
            
        } catch (error) {
            showErrorMessage('✗ Failed to send message. Please try again later.');
            console.error('EmailJS error:', error);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Send Message';
        }
    });
}

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let isValid = true;
    clearErrors();
    
    // Validate name
    if (name.value.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (message.value.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + 'Error');
    
    field.classList.add('error');
    errorEl.textContent = message;
    errorEl.classList.add('show');
}

function clearErrors() {
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.classList.remove('error');
    });
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });
}

function showSuccessMessage(message) {
    const successMsg = document.getElementById('successMessage');
    successMsg.textContent = message;
    successMsg.classList.add('show');
    
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 5000);
}

function showErrorMessage(message) {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.textContent = message;
    errorMsg.classList.add('show');
    
    setTimeout(() => {
        errorMsg.classList.remove('show');
    }, 5000);
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
// THREE.JS 3D ROBOT MASCOT
// ============================================
function initThreeJS() {
    const container = document.getElementById('threejs-canvas');
    if (!container || typeof THREE === 'undefined') return;

    // renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.4, 3.6);

    // lights
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    // simple robot made from primitives
    const robot = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x00d9ff, metalness: 0.25, roughness: 0.4 });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0x7f00ff, metalness: 0.2, roughness: 0.4 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.2, 0.6), bodyMat);
    robot.add(body);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.48, 0.5), accentMat);
    head.position.set(0, 0.92, 0);
    robot.add(head);

    const eyeGeom = new THREE.SphereGeometry(0.06, 12, 12);
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const eyeL = new THREE.Mesh(eyeGeom, eyeMat); eyeL.position.set(-0.15, 0.95, 0.26);
    const eyeR = eyeL.clone(); eyeR.position.set(0.15, 0.95, 0.26);
    robot.add(eyeL); robot.add(eyeR);

    const armGeom = new THREE.BoxGeometry(0.12, 0.64, 0.12);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x005f8f });
    const leftArm = new THREE.Mesh(armGeom, armMat); leftArm.position.set(-0.75, 0.05, 0);
    const rightArm = leftArm.clone(); rightArm.position.set(0.75, 0.05, 0);
    robot.add(leftArm); robot.add(rightArm);

    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.32, 18), new THREE.MeshStandardMaterial({ color: 0x222222 }));
    wheel.rotation.z = Math.PI / 2; wheel.position.set(0, -0.66, 0);
    robot.add(wheel);

    // small antenna
    const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.28, 8), new THREE.MeshStandardMaterial({ color: 0xffdd55 }));
    ant.position.set(0, 1.17, 0);
    robot.add(ant);

    scene.add(robot);

    // controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI / 2.1;

    // resize handling
    function onResize() {
        const w = container.clientWidth, h = container.clientHeight;
        camera.aspect = w / h; camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    // gentle idle animation
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        robot.rotation.y = Math.sin(t * 0.6) * 0.25;
        robot.position.y = Math.sin(t * 1.8) * 0.02;
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // expose for debugging if needed
    window.__innovThree = { scene, camera, renderer, robot, controls };
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
    const particleSystem = new ParticleSystem();
    particleSystem.start();

    initMobileMenu();
    // navbar scroll behavior (transparent -> scrolled)
    try { initNavbarScroll(); } catch (err) { /* ignore */ }
    initSmoothScroll();
    initDepartmentModal();
    initScrollAnimations();
    initCTAButtons();
    renderProjects('all');
    initProjectFilters();
    initLightbox();
    initContactForm();
    initLazyLoading();
    initScrollToTop();
    initCounters();
    enhanceRoboticsBackground();

    // additional inits
    initTypingEffect();
    // initialize Three.js 3D robot mascot (if available)
    try { initThreeJS(); } catch (err) { console.warn('Three.js init failed:', err); }
    initCTA();

    console.log('✓ Innovetronics Team Portal Initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
