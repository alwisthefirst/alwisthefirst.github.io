import { animate, scroll, inView } from "https://cdn.jsdelivr.net/npm/framer-motion@11.11.11/+esm";

async function init() {
    const response = await fetch('data.json');
    const data = await response.json();
    
    renderMenu(data.menu_highlights);
    renderTestimonials(data.testimonials);
    setupAnimations();
    setupMobileNav();
    lucide.createIcons();
}

function renderMenu(items) {
    const container = document.getElementById('menu-grid');
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card group overflow-hidden rounded-lg';
        card.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute top-4 right-4 bg-gold text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                    ${item.tag}
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-2xl mb-2 gold-text">${item.name}</h3>
                <p class="text-text-muted text-sm mb-4">${item.description}</p>
                <div class="flex items-center text-orange-text gap-1">
                    <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                    <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                    <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                    <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                    <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderTestimonials(reviews) {
    const container = document.getElementById('reviews-grid');
    reviews.forEach(rev => {
        const card = document.createElement('div');
        card.className = 'p-8 bg-[#111] border border-white/5 rounded-xl';
        card.innerHTML = `
            <div class="flex gap-1 mb-4 text-gold">
                <i data-lucide="quote" class="w-8 h-8 opacity-20 mb-2"></i>
            </div>
            <p class="italic text-lg mb-6 leading-relaxed">"${rev.text}"</p>
            <div class="flex items-center gap-4">
                <div class="w-10 h-1 bg-gold"></div>
                <div>
                    <h4 class="font-bold text-white">${rev.name}</h4>
                    <span class="text-xs uppercase tracking-tighter text-text-muted">${rev.role}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function setupAnimations() {
    inView(".reveal", ({ target }) => {
        animate(target, { opacity: 1, y: [40, 0] }, { duration: 0.8, delay: 0.2 });
    });

    scroll(animate(".hero-bg", { scale: [1, 1.2] }, { ease: "linear" }));
}

function setupMobileNav() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('mobile-nav');
    let isOpen = false;

    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        nav.classList.toggle('hidden', !isOpen);
        menuBtn.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
        lucide.createIcons();
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.add('hidden');
            isOpen = false;
            menuBtn.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });
}

document.addEventListener('DOMContentLoaded', init);
