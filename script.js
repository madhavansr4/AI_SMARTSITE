// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const dropdown = document.getElementById('dropdown');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Tool Modal
    const toolModal = document.getElementById('toolModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');
    const toolBtns = document.querySelectorAll('.tool-btn');
    const toolLinks = document.querySelectorAll('.dropdown-content a');

    const toolData = {
        'chatgpt': {
            title: 'ChatGPT',
            content: `<p>ChatGPT is an advanced conversational AI developed by OpenAI. It's based on the GPT (Generative Pre-trained Transformer) architecture and can understand and generate human-like text responses.</p>
            <p><strong>Key Features:</strong></p>
            <ul>
                <li>Natural language understanding and generation</li>
                <li>Contextual conversation memory</li>
                <li>Code generation and explanation</li>
                <li>Content creation and summarization</li>
                <li>Answering questions across diverse topics</li>
            </ul>
            <p>ChatGPT has revolutionized how we interact with AI, making it accessible for tasks ranging from coding assistance to creative writing.</p>`
        },
        'midjourney': {
            title: 'MidJourney',
            content: `<p>MidJourney is an independent research lab that produces an AI program under the same name which creates images from textual descriptions, similar to OpenAI's DALL-E.</p>
            <p><strong>Key Features:</strong></p>
            <ul>
                <li>Generates high-quality images from text prompts</li>
                <li>Offers multiple variations of each creation</li>
                <li>Allows for iterative refinement of images</li>
                <li>Creates artwork in various styles and genres</li>
                <li>Accessible through Discord interface</li>
            </ul>
            <p>MidJourney has become popular among artists, designers, and content creators for its ability to quickly visualize concepts and ideas.</p>`
        },
        'github-copilot': {
            title: 'GitHub Copilot',
            content: `<p>GitHub Copilot is an AI pair programmer that helps you write code faster and with less work. It draws context from comments and code to suggest individual lines and whole functions instantly.</p>
            <p><strong>Key Features:</strong></p>
            <ul>
                <li>Real-time code suggestions as you type</li>
                <li>Supports multiple programming languages</li>
                <li>Learns from your coding style over time</li>
                <li>Can generate complete functions from comments</li>
                <li>Integrates with popular IDEs like VS Code</li>
            </ul>
            <p>GitHub Copilot has significantly boosted developer productivity by reducing boilerplate code and suggesting optimal solutions.</p>`
        },
        'notion-ai': {
            title: 'Notion AI',
            content: `<p>Notion AI is an integrated artificial intelligence feature within the Notion productivity app that helps users write, brainstorm, summarize, and organize information more effectively.</p>
            <p><strong>Key Features:</strong></p>
            <ul>
                <li>AI-powered writing assistance</li>
                <li>Automatic summarization of long documents</li>
                <li>Brainstorming and idea generation</li>
                <li>Content improvement suggestions</li>
                <li>Task and project management enhancements</li>
            </ul>
            <p>Notion AI enhances productivity by combining the power of AI with Notion's flexible workspace, making information management more efficient.</p>`
        },
        'dalle': {
            title: 'DALL-E',
            content: `<p>DALL-E is OpenAI's AI system that can create realistic images and art from a description in natural language.</p>
            <p><strong>Key Features:</strong></p>
            <ul>
                <li>Generates images from text descriptions</li>
                <li>Can combine concepts, attributes, and styles</li>
                <li>Creates original, realistic artwork</li>
                <li>Understands complex prompts with multiple objects</li>
                <li>Can edit existing images with text prompts</li>
            </ul>
            <p>DALL-E has opened new possibilities for creative expression and visual content generation.</p>`
        },
        'bard': {
            title: 'Google Bard',
            content: `<p>Google Bard is an experimental conversational AI service powered by LaMDA (Language Model for Dialogue Applications).</p>
            <p><strong>Key Features:</strong></p>
            <ul>
                <li>Generates human-like responses in conversation</li>
                <li>Draws information from the web for fresh responses</li>
                <li>Helps with brainstorming and idea generation</li>
                <li>Can explain complex topics simply</li>
                <li>Integrates with Google's search capabilities</li>
            </ul>
            <p>Bard represents Google's entry into the conversational AI space, offering a different approach to AI interactions.</p>`
        }
    };

    function openModal(toolId) {
        const tool = toolData[toolId];
        if (tool) {
            modalTitle.textContent = tool.title;
            modalContent.innerHTML = tool.content;
            toolModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Trigger animation
            setTimeout(() => {
                toolModal.classList.add('show');
            }, 10);
        }
    }

    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const toolId = btn.getAttribute('data-tool');
            openModal(toolId);
        });
    });

    toolLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const toolId = link.getAttribute('data-tool');
            openModal(toolId);
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    closeModal.addEventListener('click', () => {
        toolModal.classList.remove('show');
        setTimeout(() => {
            toolModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    });

    window.addEventListener('click', (e) => {
        if (e.target === toolModal) {
            toolModal.classList.remove('show');
            setTimeout(() => {
                toolModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Initialize header state
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    }

    // Animate hero content on load
    const heroContent = document.querySelector('.hero-content');
    setTimeout(() => {
        heroContent.classList.add('animate');
    }, 300);

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe all elements with animations
    document.querySelectorAll('.section-title').forEach(el => observer.observe(el));
    document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
    document.querySelectorAll('.tool-card').forEach(el => observer.observe(el));
    document.querySelectorAll('.about-text, .about-image').forEach(el => observer.observe(el));
    document.querySelectorAll('.contact-form').forEach(el => observer.observe(el));

    // Create particle background
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.5 + 0.3;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = opacity;
        
        // Random color between accent and accent2
        const randomHue = Math.random() > 0.5 ? 
            'hsl(180, 100%, 50%)' : 'hsl(320, 100%, 50%)';
        particle.style.background = randomHue;
        
        particlesContainer.appendChild(particle);
    }
});