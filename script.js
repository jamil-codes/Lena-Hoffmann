/* ─── PHOTOS ─── */
const photos = [
    { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85&fit=crop', cat: 'portrait', cap: 'Untitled study · Berlin, 2024' },
    { src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&q=85&fit=crop', cat: 'editorial', cap: 'Vogue DE cover shoot · Munich, 2023' },
    { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=85&fit=crop', cat: 'portrait', cap: 'Personal commission · Hamburg, 2024' },
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=85&fit=crop', cat: 'campaign', cap: 'Adidas Originals · Berlin, 2023' },
    { src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=700&q=85&fit=crop', cat: 'editorial', cap: 'Stille Kraft series · Berlin, 2022' },
    { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&q=85&fit=crop', cat: 'campaign', cap: 'Mercedes-Benz brand series · 2024' },
    { src: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=85&fit=crop', cap: 'Private commission · Berlin, 2024', cat: 'portrait' },
    { src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&q=85&fit=crop', cat: 'portrait', cap: 'Character study · Berlin, 2024' },
    { src: 'https://images.unsplash.com/photo-1494790108755-2616b612b838?w=700&q=85&fit=crop', cat: 'editorial', cap: 'Vogue DE winter issue · 2023' },
    { src: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=700&q=85&fit=crop', cat: 'editorial', cap: 'Spiegel Magazin feature · 2023' },
    { src: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=700&q=85&fit=crop', cat: 'campaign', cap: 'Adidas Women global campaign · 2022' },
    { src: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=800&q=85&fit=crop', cat: 'portrait', cap: 'Character study · Munich, 2023' }
];

let currentFilter = 'all', lbIdx = 0, filtered = [...photos];

/* LOADER */
const loader = document.getElementById('loader');
const fill = document.getElementById('loaderFill');
let prog = 0;
const tick = setInterval(() => {
    prog += Math.random() * 7 + 2;
    if (prog >= 100) { prog = 100; clearInterval(tick); }
    fill.style.width = prog + '%';
    if (prog >= 100) setTimeout(() => { loader.classList.add('done'); }, 500);
}, 55);

/* MASONRY */
function buildGallery(f) {
    const c = document.getElementById('masonry');
    filtered = f === 'all' ? photos : photos.filter(p => p.cat === f);
    c.innerHTML = '';
    filtered.forEach((p, i) => {
        const d = document.createElement('div');
        d.className = 'm-item';
        d.innerHTML = `<img src="${p.src}" alt="${p.cap}" loading="lazy"><div class="m-overlay"><span class="m-tag">${p.cat}</span><span class="m-caption">${p.cap}</span></div><span class="m-idx">${String(i + 1).padStart(2, '0')}</span>`;
        d.addEventListener('click', () => openLb(i));
        c.appendChild(d);
    });
}
buildGallery('all');

document.querySelectorAll('.f-btn').forEach(b => {
    b.addEventListener('click', () => {
        document.querySelectorAll('.f-btn').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        buildGallery(b.dataset.f);
    });
});

/* LIGHTBOX */
function openLb(i) {
    lbIdx = i; updateLb();
    document.getElementById('lb').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeLb() {
    document.getElementById('lb').classList.remove('open');
    document.body.style.overflow = '';
}
function updateLb() {
    const img = document.getElementById('lbImg');
    img.style.opacity = 0;
    setTimeout(() => {
        img.src = filtered[lbIdx].src.replace('w=700', 'w=1400').replace('w=800', 'w=1400');
        document.getElementById('lbCaption').textContent = filtered[lbIdx].cap;
        document.getElementById('lbCounter').textContent = `${String(lbIdx + 1).padStart(2, '0')} / ${String(filtered.length).padStart(2, '0')}`;
        img.style.opacity = 1;
    }, 200);
}
document.getElementById('lbClose').addEventListener('click', closeLb);
document.getElementById('lb').addEventListener('click', e => { if (e.target === e.currentTarget) closeLb(); });
document.getElementById('lbPrev').addEventListener('click', e => { e.stopPropagation(); lbIdx = (lbIdx - 1 + filtered.length) % filtered.length; updateLb(); });
document.getElementById('lbNext').addEventListener('click', e => { e.stopPropagation(); lbIdx = (lbIdx + 1) % filtered.length; updateLb(); });
document.addEventListener('keydown', e => {
    if (!document.getElementById('lb').classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') { lbIdx = (lbIdx - 1 + filtered.length) % filtered.length; updateLb(); }
    if (e.key === 'ArrowRight') { lbIdx = (lbIdx + 1) % filtered.length; updateLb(); }
});

/* NAV */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

/* REVEAL */
const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); ro.unobserve(e.target); } });
}, { threshold: .1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => ro.observe(el));

/* CURSOR */
const cur = document.getElementById('cur'), ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function raf() {
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    rx += (mx - rx) * .1; ry += (my - ry) * .1;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(raf);
})();
document.querySelectorAll('a,button,.m-item,.f-btn,.client,.award-row,.test-dot').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('big'));
    el.addEventListener('mouseleave', () => ring.classList.remove('big'));
});
document.addEventListener('mousedown', () => cur.style.transform = 'translate(-50%,-50%) scale(.6)');
document.addEventListener('mouseup', () => cur.style.transform = 'translate(-50%,-50%) scale(1)');
document.addEventListener('mouseleave', () => { cur.classList.add('hidden'); ring.classList.add('hidden'); });
document.addEventListener('mouseenter', () => { cur.classList.remove('hidden'); ring.classList.remove('hidden'); });

/* PARALLAX HERO */
window.addEventListener('scroll', () => {
    const bg = document.getElementById('heroBg');
    if (bg && scrollY < window.innerHeight) bg.style.transform = `translateY(${scrollY * .3}px)`;
}, { passive: true });

/* TESTIMONIALS */
let testIdx = 0;
const items = document.querySelectorAll('.test-item');
const dots = document.querySelectorAll('.test-dot');
function goTest(i) {
    items[testIdx].classList.remove('active');
    dots[testIdx].classList.remove('on');
    testIdx = i;
    items[testIdx].classList.add('active');
    dots[testIdx].classList.add('on');
}
dots.forEach(d => d.addEventListener('click', () => goTest(+d.dataset.i)));
setInterval(() => goTest((testIdx + 1) % items.length), 6000);

/* FORM */
function handleForm(e) {
    e.preventDefault();
    const n = document.getElementById('cfNote');
    n.classList.add('vis');
    setTimeout(() => n.classList.remove('vis'), 5000);
}

/* SMOOTH ANCHOR */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
});
