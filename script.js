/* =============================================
   CAKRAVINGS BAKERY — JAVASCRIPT
   Clean, Elegant, No Emojis
   ============================================= */

// ---- Cake iris entrance: plays once on its own, then is removed ----
window.addEventListener('load', () => {
  const overlay = document.getElementById('doorOverlay');
  if (overlay) setTimeout(() => overlay.remove(), 4800);
});

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Mobile Hamburger ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

// ---- Scroll-triggered Animations (Intersection Observer) ----
const animateOnScroll = (selector, visibleClass = 'visible') => {
  const els = document.querySelectorAll(selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(visibleClass);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
};

animateOnScroll('.gallery-item');
animateOnScroll('.flavour-card');

// ---- Menu Category Filtering ----
const flavourTabs = document.querySelectorAll('.flavour-tab');
const menuBlocks = document.querySelectorAll('.menu-cat-block');

flavourTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    flavourTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.getAttribute('data-filter');

    menuBlocks.forEach(block => {
      const cat = block.getAttribute('data-cat');
      if (filter === 'all' || cat === filter) {
        block.classList.remove('hidden');
        block.querySelectorAll('.flavour-card').forEach(c => c.classList.add('visible'));
      } else {
        block.classList.add('hidden');
      }
    });
  });
});

// ---- Floating Ambient Light Dots (Clean, no emojis) ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 4;
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(240, 157, 191, 0.45) 0%, rgba(255, 255, 255, 0.2) 70%);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: 0;
      pointer-events: none;
      animation: particleFloat ${Math.random() * 14 + 10}s ease-in-out infinite;
      animation-delay: ${Math.random() * 8}s;
      box-shadow: 0 0 6px rgba(240, 157, 191, 0.3);
    `;
    container.appendChild(particle);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%   { opacity: 0; transform: translateY(20px) scale(0.8); }
      20%  { opacity: 0.6; }
      50%  { opacity: 0.7; transform: translateY(-30px) scale(1.1); }
      80%  { opacity: 0.4; }
      100% { opacity: 0; transform: translateY(-80px) scale(0.6); }
    }
  `;
  document.head.appendChild(style);
}
// Floating dots removed by request (createParticles intentionally not called)

// ---- Active Nav Link Highlighting ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--accent-dark)';
    }
  });
});

// ---- Set min date for event date to tomorrow ----
const eventDateInput = document.getElementById('eventDate');
if (eventDateInput) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  eventDateInput.min = tomorrow.toISOString().split('T')[0];
}

// ---- Order Form Validation & Submission ----
const orderForm = document.getElementById('orderForm');
const orderSuccess = document.getElementById('orderSuccess');
const submitBtn = document.getElementById('submitBtn');

function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.add('error');
  if (error) error.textContent = message;
  return false;
}

function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.remove('error');
  if (error) error.textContent = '';
  return true;
}

// Live validation on input
['custName', 'custPhone', 'cakeType', 'cakeSize', 'cakeFlavour', 'occasion', 'eventDate'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    const errorMap = {
      custName: 'err-name', custPhone: 'err-phone',
      cakeType: 'err-type', cakeSize: 'err-size',
      cakeFlavour: 'err-flavour', occasion: 'err-occasion',
      eventDate: 'err-date'
    };
    el.addEventListener('input', () => {
      if (el.value.trim()) clearError(id, errorMap[id]);
    });
    el.addEventListener('change', () => {
      if (el.value.trim()) clearError(id, errorMap[id]);
    });
  }
});

if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const errorPairs = [
      ['custName', 'err-name'],
      ['custPhone', 'err-phone'],
      ['cakeType', 'err-type'],
      ['cakeSize', 'err-size'],
      ['cakeFlavour', 'err-flavour'],
      ['occasion', 'err-occasion'],
      ['eventDate', 'err-date']
    ];
    errorPairs.forEach(([id, errId]) => clearError(id, errId));

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const cakeType = document.getElementById('cakeType').value;
    const cakeSize = document.getElementById('cakeSize').value;
    const cakeFlavour = document.getElementById('cakeFlavour').value;
    const occasion = document.getElementById('occasion').value;
    const eventDate = document.getElementById('eventDate').value;

    if (!name) { showError('custName', 'err-name', 'Please enter your full name'); valid = false; }
    if (!phone) { showError('custPhone', 'err-phone', 'Please enter your phone number'); valid = false; }
    else if (!/^[\d\s\-\+\(\)]{7,15}$/.test(phone)) { showError('custPhone', 'err-phone', 'Please enter a valid phone number'); valid = false; }
    if (!cakeType) { showError('cakeType', 'err-type', 'Please select a product type'); valid = false; }
    if (!cakeSize) { showError('cakeSize', 'err-size', 'Please select a cake size'); valid = false; }
    if (!cakeFlavour) { showError('cakeFlavour', 'err-flavour', 'Please select a flavour'); valid = false; }
    if (!occasion) { showError('occasion', 'err-occasion', 'Please select an occasion'); valid = false; }
    if (!eventDate) { showError('eventDate', 'err-date', 'Please select your event or pickup date'); valid = false; }

    if (!valid) {
      const firstError = orderForm.querySelector('.error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    if (btnText && btnLoading) {
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
    }
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.75';

    const orderData = {
      name, phone,
      email: document.getElementById('custEmail').value,
      productType: cakeType,
      size: cakeSize,
      flavour: cakeFlavour,
      occasion,
      designPreference: document.getElementById('designPref').value,
      eventDate,
      inscription: document.getElementById('inscriptionText').value,
      specialInstructions: document.getElementById('specialInstructions').value,
      sendRefImage: document.getElementById('refImg').checked
    };
    console.log('New Order Request:', orderData);

    setTimeout(() => {
      orderForm.style.display = 'none';
      orderSuccess.style.display = 'block';
      orderSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Clean elegant pastel confetti
      fireConfetti();
    }, 1400);
  });
}

function resetForm() {
  if (!orderForm || !orderSuccess) return;
  orderForm.reset();
  orderForm.style.display = 'block';
  orderSuccess.style.display = 'none';
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.style.opacity = '';
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    if (btnText) btnText.style.display = 'inline';
    if (btnLoading) btnLoading.style.display = 'none';
  }
  orderForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
window.resetForm = resetForm;

// ---- Elegant Pastel Confetti (Paper flakes & ribbons, no emojis) ----
function fireConfetti() {
  const colors = ['#f8ccde', '#ffe9f3', '#f3acc8', '#ffffff', '#f2dae5', '#381c2d'];

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const piece = document.createElement('div');
      const isRibbon = Math.random() > 0.6;
      const width = isRibbon ? Math.random() * 4 + 4 : Math.random() * 8 + 6;
      const height = isRibbon ? Math.random() * 14 + 10 : Math.random() * 8 + 6;

      piece.style.cssText = `
        position: fixed;
        top: -20px;
        left: ${Math.random() * 100}vw;
        width: ${width}px;
        height: ${height}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${isRibbon ? '1px' : '50%'};
        z-index: 99999;
        pointer-events: none;
        box-shadow: 0 1px 4px rgba(200, 90, 123, 0.15);
        animation: confettiFall ${Math.random() * 2 + 2.2}s ease-in forwards;
      `;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4200);
    }, i * 40);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(105vh) rotate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 540 + 360}deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ---- Smooth section reveal on scroll ----
const revealSections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.05 });

revealSections.forEach(section => {
  if (!section.classList.contains('hero')) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(16px)';
    section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  }
  sectionObserver.observe(section);
});

// ---- Gallery lightbox effect ----
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(30, 15, 22, 0.88);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      animation: fadeIn 0.25s ease;
      backdrop-filter: blur(6px);
    `;
    const bigImg = document.createElement('img');
    bigImg.src = img.dataset.full || img.src;
    bigImg.style.cssText = `
      max-width: 88vw; max-height: 88vh;
      object-fit: contain; border-radius: 12px;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
      animation: imgPop 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.setAttribute('aria-label', 'Close image viewer');
    closeBtn.style.cssText = `
      position: absolute; top: 24px; right: 28px;
      background: #ffffff; border: none; border-radius: 50%;
      width: 40px; height: 40px; font-size: 1.1rem;
      cursor: pointer; font-weight: 700; color: var(--text-dark);
      box-shadow: 0 4px 14px rgba(0,0,0,0.2);
    `;

    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes imgPop { from { transform: scale(0.92); } to { transform: scale(1); } }
    `;
    document.head.appendChild(fadeInStyle);

    overlay.appendChild(bigImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const close = () => {
      overlay.remove();
      document.body.style.overflow = '';
    };
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  });
});

// ---- Typewriter for hero badge ----
const badge = document.querySelector('.hero-badge');
if (badge) {
  const text = badge.textContent;
  badge.textContent = '';
  let i = 0;
  setTimeout(() => {
    const type = () => {
      if (i < text.length) {
        badge.textContent += text[i];
        i++;
        setTimeout(type, 50);
      }
    };
    type();
  }, 4800);
}


// ---- Order pop-up: opens from the baker character and every "Order" button ----
(function initOrderModal() {
  const modal = document.getElementById('orderModal');
  if (!modal) return;
  const first = () => modal.querySelector('input, select, textarea');

  function openOrder(e) {
    if (e) e.preventDefault();
    if (window.setOrderMode && !window.__packOpen) window.setOrderMode('cake');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const mc = modal.querySelector('.order-modal-card'); if (mc) { mc.scrollLeft = 0; }
    setTimeout(() => { const f = first(); if (f) f.focus({ preventScroll: true }); }, 350);
  }
  function closeOrder() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('a[href="#order"]').forEach(a => a.addEventListener('click', openOrder));
  const baker = document.getElementById('bakerBtn');
  if (baker) {
    baker.addEventListener('click', openOrder);
    baker.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openOrder(e); });
  }
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeOrder));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeOrder(); });
  window.openOrder = openOrder;
})();


// ---- Text order form ----
// CHANGE THE PHONE NUMBER HERE LATER (digits only, with country code, e.g. +14033344500)
const ORDER_PHONE = '+17164741447';
const INSTAGRAM_DM = 'https://ig.me/m/cakravings_';

(function initTextOrder() {
  const form = document.getElementById('textOrderForm');
  if (!form) return;
  const flavour = document.getElementById('toFlavour');
  const people = document.getElementById('toPeople');
  const message = document.getElementById('toMessage');
  const dateEl = document.getElementById('toDate');
  const note = document.getElementById('toNote');
  const igLink = document.getElementById('toIg') || document.createElement('a');
  igLink.href = INSTAGRAM_DM;

  // ---- order types: cakes (default), cupcakes, chocolates ----
  const flLabel = document.getElementById('toFlavourLabel');
  const pplLabel = document.getElementById('toPeopleLabel');
  const modeNote = document.getElementById('toModeNote');
  const orderTitle = document.getElementById('orderTitle');
  const origFl = Array.from(flavour.options).map(o => o.value || o.textContent);
  const origPpl = Array.from(people.options).map(o => o.value || o.textContent);
  const origMsgPh = message.placeholder;
  const CAKE_FLAVOURS = ['Chocolate', 'Chocolate Truffle Cake', 'Strawberry', 'Vanilla', 'Mixed Fruits', 'Pineapple', 'Mixed Berries', 'Coffee'];
  const MODES = {
    cake: { title: 'Place Your Order', sub: 'Pick your flavour and size, tell us the details, and send it to us by text or Instagram.', fl: 'Flavour', flPh: 'Choose a flavour', flOpts: null, ppl: 'How many people?', pplPh: 'Choose size', pplOpts: null, flKey: 'Flavour', pplKey: 'For', need: 'a flavour and how many people', note: '' },
    cupcake: { title: 'Order Cupcakes', sub: 'Pick your quantity and flavour, tell us the details, and send it to us by text or Instagram.', fl: 'Flavour', flPh: 'Choose a flavour', flOpts: CAKE_FLAVOURS, ppl: 'How many cupcakes?', pplPh: 'Choose quantity', pplOpts: ['6 cupcakes', '12 cupcakes', '24 cupcakes', 'Custom (more than 24)'], flKey: 'Cupcake flavour', pplKey: 'Quantity', need: 'a flavour and quantity', note: 'Minimum order is 6 cupcakes, in any flavour. For more than 24, choose Custom and tell us the quantity in your message.', msgPh: 'Custom quantity, special requests, design ideas, allergies, anything else you would like us to know' },
    brownie: { title: 'Order Brownies', sub: 'Pick pre-cut or whole and your topping, tell us the details, and send it to us by text or Instagram.', fl: 'Pre-cut or whole', flPh: 'Choose one', flOpts: ['Pre-cut pieces', 'Whole'], ppl: 'Topping', pplPh: 'Choose a topping', pplOpts: ['No topping', 'Chocolate ganache', 'White chocolate ganache', 'Nutella', 'Biscoff spread'], flKey: 'Brownies', pplKey: 'Topping', need: 'pre-cut or whole and a topping', note: '', msgPh: 'Quantity, special requests, allergies, anything else you would like us to know' },
    chocolate: { title: 'Order Chocolates', sub: 'Pick your category and chocolate type, tell us the details, and send it to us by text or Instagram.', fl: 'Category', flPh: 'Choose a category', flOpts: ['Regular', 'Almond & Raisins', 'Dried Fruits & Cranberries', 'Gourmet Chocolate Sticks', 'Assorted'], ppl: 'Chocolate type', pplPh: 'Choose a type', pplOpts: ['Milk', 'Semi-Sweet', 'White', 'Assorted'], flKey: 'Chocolate category', pplKey: 'Chocolate type', need: 'a category and chocolate type', note: '', msgPh: 'Quantity, special requests, gifting details, allergies, anything else you would like us to know' }
  };
  let curMode = 'cake';
  function fill(sel, ph, opts) {
    sel.innerHTML = '';
    const p = document.createElement('option'); p.value = ''; p.textContent = ph; sel.appendChild(p);
    opts.forEach(v => { const o = document.createElement('option'); o.textContent = v; sel.appendChild(o); });
  }
  window.setOrderMode = function (mode, preset) {
    const m = MODES[mode] || MODES.cake;
    curMode = MODES[mode] ? mode : 'cake';
    if (orderTitle) orderTitle.textContent = m.title;
    const sub = document.querySelector('.order-modal-head p'); if (sub) sub.textContent = m.sub;
    flLabel.textContent = m.fl;
    pplLabel.textContent = m.ppl;
    fill(flavour, m.flPh, m.flOpts || origFl.slice(1));
    fill(people, m.pplPh, m.pplOpts || origPpl.slice(1));
    message.placeholder = m.msgPh || origMsgPh;
    modeNote.textContent = m.note;
    modeNote.hidden = !m.note;
    if (preset) {
      const target = curMode === 'cupcake' ? people : flavour;
      for (const o of target.options) { if ((o.value || o.textContent) === preset) { target.value = o.value || o.textContent; break; } }
    }
    say('Text opens your messaging app with your order ready to send.');
  };
  flavour.addEventListener('change', () => {
    if (curMode !== 'cake') return;
    if (flavour.value === 'Cupcakes') window.setOrderMode('cupcake');
    else if (flavour.value === 'Chocolates') window.setOrderMode('chocolate');
    else if (flavour.value === 'Chocolate Fudge Brownies') window.setOrderMode('brownie');
  });

  function pad(n) { return String(n).padStart(2, '0'); }
  function minDate() {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function prettyDate(v) {
    const p = v.split('-');
    const d = new Date(+p[0], +p[1] - 1, +p[2]);
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
  dateEl.min = minDate();

  function buildMessage() {
    const lines = ['Hi Cakravings! I would like to place an order.'];
    if (curMode !== 'cake') lines.push('Order type: ' + ({ cupcake: 'Cupcakes', chocolate: 'Chocolates', brownie: 'Brownies' }[curMode]));
    if (flavour.value) lines.push(MODES[curMode].flKey + ': ' + flavour.value);
    if (people.value) lines.push(MODES[curMode].pplKey + ': ' + people.value);
    const method = form.querySelector('input[name="toMethod"]:checked');
    if (method) lines.push('Pickup or delivery: ' + method.value);
    if (dateEl.value) lines.push('Date required: ' + prettyDate(dateEl.value));
    if (message.value.trim()) lines.push('Details: ' + message.value.trim());
    return lines.join('\n');
  }
  function say(t, isError) { note.textContent = t; note.classList.toggle('error', !!isError); }
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(() => {});
  }

  document.getElementById('toText').addEventListener('click', () => {
    if (!flavour.value || !people.value) {
      say('Please choose ' + MODES[curMode].need + '.', true);
      return;
    }
    if (curMode === 'cupcake' && people.value.indexOf('Custom') === 0 && !message.value.trim()) {
      say('Please tell us how many cupcakes you need in the message box.', true);
      return;
    }
    if (!form.querySelector('input[name="toMethod"]:checked')) {
      say('Please choose pickup or delivery.', true);
      return;
    }
    if (!dateEl.value) {
      say('Please choose the date you need your order.', true);
      return;
    }
    if (dateEl.value < minDate()) {
      say('Orders must be made at least 2 days before the occasion. Please pick ' + prettyDate(minDate()) + ' or later.', true);
      return;
    }
    const body = buildMessage();
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const sep = isiOS ? '&' : '?';
    copy(body);
    say('Opening your messaging app... your message is also copied in case you need to paste it.');
    window.location.href = 'sms:' + ORDER_PHONE + sep + 'body=' + encodeURIComponent(body);
  });

  igLink.addEventListener('click', () => {
    if (flavour.value || people.value || message.value.trim()) {
      copy(buildMessage());
      say('Your message is copied. Paste it into the Instagram chat.');
    }
  });
  [flavour, people].forEach(el => el.addEventListener('change', () => say('Text opens your messaging app with your order ready to send.')));
})();

// Move focus out of the pop-up when it closes (avoids an accessibility warning)
(function () {
  const m = document.getElementById('orderModal');
  if (!m) return;
  new MutationObserver(() => {
    if (!m.classList.contains('open') && m.contains(document.activeElement)) document.activeElement.blur();
  }).observe(m, { attributes: true, attributeFilter: ['class'] });
})();


// ---- Flavour detail pop-up: click a flavour card to see its layers and what is inside ----
(function initFlavourModal() {
  const modal = document.getElementById('flavourModal');
  if (!modal) return;
  const fmImg = document.getElementById('fmImg');
  const fmTitle = document.getElementById('fmTitle');
  const fmDesc = document.getElementById('fmDesc');
  const fmList = document.getElementById('fmList');

  const D = {
    'chocolate': { t: 'Chocolate Cake', img: 'Chocolate_cake_layer_cross_section_42bc4628_4K.jpg',
      d: 'A classic chocolate celebration cake: moist chocolate sponge with smooth chocolate frosting between every layer.',
      l: ['Moist chocolate sponge, three layers', 'Smooth chocolate frosting between every layer', 'Chocolate frosting topped with chocolate curls'] },
    'chocolate truffle cake': { t: 'Chocolate Truffle Cake', img: 'Chocolate_cake_layer_by_layer_ef021d4b_4K.jpg',
      d: 'Our signature chocolate truffle cake: deep, moist chocolate sponge layered with silky truffle ganache.',
      l: ['Moist dark chocolate sponge, three layers', 'Rich chocolate truffle ganache between every layer', 'Smooth glossy ganache on top'] },
    'strawberry': { t: 'Strawberry Cake', img: 'Strawberry_cake_layer_breakdown_f1a19c78_4K.jpg',
      d: 'Soft, light vanilla sponge with juicy fresh strawberries and clouds of whipped cream.',
      l: ['Soft vanilla sponge, three layers', 'Fresh strawberry pieces in every layer', 'Light, fluffy whipped cream', 'Whipped cream and strawberries on top'] },
    'vanilla': { t: 'Vanilla Cake', img: 'Layered_vanilla_cake_with_cream_574cc183_4K.jpg',
      d: 'A timeless favourite: buttery vanilla sponge folded with smooth, lightly sweet cream.',
      l: ['Golden vanilla sponge, three layers', 'Silky vanilla cream between the layers', 'Smooth cream finish on top'] },
    'mixed fruits': { t: 'Mixed Fruits Cake', img: 'Floating_layered_mixed_fruit_cake_1d6434e5_4K.jpg',
      d: 'A fresh, colourful cake with a light sponge, soft cream and a generous mix of seasonal fruit.',
      l: ['Light vanilla sponge, three layers', 'Fresh mixed fruit in every layer', 'Whipped cream filling', 'Colourful fresh fruit topping'] },
    'pineapple': { t: 'Pineapple Cake', img: 'Pineapple_cake_floating_layers_9243c35f_4K.jpg',
      d: 'A bright and juicy classic with sweet pineapple and fluffy cream through every bite.',
      l: ['Soft vanilla sponge, three layers', 'Sweet pineapple pieces in every layer', 'Light whipped cream', 'Pineapple pieces on top'] },
    'mixed berries': { t: 'Mixed Berries Cake', img: 'Mixed_berries_layer_cake_a505380a_4K.jpg',
      d: 'Fresh, tangy berries and soft cream on a tender sponge for a fruity, not-too-sweet finish.',
      l: ['Soft vanilla sponge, three layers', 'Strawberries, blueberries and blackberries in the layers', 'Light whipped cream', 'Fresh berries on top'] },
    'coffee': { t: 'Coffee Cake', img: 'Layered_coffee_cake_creating_6ee86f4b_4K.jpg',
      d: 'Moist chocolate sponge with a velvety coffee cream for a smooth, rich mocha flavour.',
      l: ['Moist chocolate sponge, three layers', 'Smooth coffee cream between the layers', 'Dusted with cocoa on top'] }
  };

  function norm(s) { return (s || '').toLowerCase().replace(/[^a-z ]/g, '').trim(); }

  const cache = {};
  const imgEls = {};
  const imgReady = {};
  let openToken = 0;
  const imgBox = fmImg.parentElement;
  fmImg.style.display = 'none';
  function getImg(src) {
    if (!imgEls[src]) {
      const el = new Image();
      el.className = 'fm-pic';
      el.alt = '';
      el.decoding = 'sync';
      el.src = src;
      imgBox.appendChild(el);
      imgEls[src] = el;
    }
    return imgEls[src];
  }
  function loadImg(src) {
    if (cache[src]) return cache[src];
    const el = getImg(src);
    cache[src] = new Promise(res => {
      const done = () => { imgReady[src] = true; res(); };
      if (el.decode) el.decode().then(done, done);
      else if (el.complete) done();
      else { el.onload = done; el.onerror = done; }
    });
    return cache[src];
  }
  function showImg(src, alt) {
    Object.keys(imgEls).forEach(k => imgEls[k].classList.remove('on'));
    const el = getImg(src);
    el.alt = alt || '';
    el.classList.add('on');
  }
  // start loading the pictures as soon as the Flavours section is near the screen
  const flSec = document.getElementById('flavours');
  if (flSec && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => {
      if (es[0].isIntersecting) {
        const q = Object.keys(D).map(k => D[k].img);
        (function next() { if (q.length) loadImg(q.shift()).then(() => setTimeout(next, 150)); })();
        io.disconnect();
      }
    }, { rootMargin: '900px 0px' });
    io.observe(flSec);
  }

  function open(card) {
    const name = card.querySelector('h3').textContent.trim();
    const key = card.dataset.key || norm(name);
    const data = D[key] || {
      t: name,
      img: card.querySelector('img').getAttribute('src'),
      d: card.querySelector('p').textContent.trim(),
      l: []
    };
    const P = {
      'vanilla': { label: 'Base Price', price: '$40', meta: '1 lb · Serves 2–4 people', note: 'Customised cakes vary according to size, flavour, and design.' },
      'chocolate': { label: 'Base Price', price: '$50', meta: '1 lb · Serves 2–4 people', note: 'Customised cakes vary according to size, flavour, and design.' },
      'coffee': { label: 'Base Price', price: '$50', meta: '1 lb · Serves 2–4 people', note: 'Customised cakes vary according to size, flavour, and design.' },
      'pineapple': { label: 'Base Price', price: '$45', meta: '1.5 lbs · Serves 2–4 people', note: 'Customised cakes vary according to size, flavour, and design.' },
      'mixed fruits': { label: 'Base Price', price: '$45', meta: '1.5 lbs · Serves 2–4 people', note: 'Customised cakes vary according to size, flavour, and design.' },
      'strawberry': { label: 'Base Price', price: '$50', meta: '1.5 lbs · Serves 2–4 people', note: 'Customised cakes vary according to size, flavour, and design.' },
      'mixed berries': { label: 'Base Price', price: '$50', meta: '1.5 lbs · Serves 2–4 people', note: 'Customised cakes vary according to size, flavour, and design.' },
      'chocolate truffle cake': { label: 'Base Price', price: '$60', meta: '1.5–2 lbs min · Serves 3–6 people', note: 'Customised cakes vary according to size, flavour, and design.' },
      'chocolate fudge brownies': { label: 'Base Price', price: '$35', meta: '1.5–2 lbs', note: '' },
      'cranberry almond': { label: 'Price', price: '$35', meta: 'Tea Cake · Each', note: '' },
      'tutti fruiti': { label: 'Price', price: '$35', meta: 'Tea Cake · Each', note: '' },
      'double chocolate chip': { label: 'Price', price: '$35', meta: 'Tea Cake · Each', note: '' }
    };
    const EXTRA = 'Prices are for basic chocolate. Almonds, raisins, dried fruits or any other extras are charged extra.';
    const PP = {
      cup6: { label: 'Price', price: '$25', meta: '6 cupcakes \u00b7 Any flavour', note: 'Minimum order is 6 cupcakes. Choose any flavour from our cake menu.' },
      cup12: { label: 'Price', price: '$45', meta: '12 cupcakes \u00b7 Any flavour', note: 'Choose any flavour from our cake menu.' },
      cup24: { label: 'Price', price: '$90', meta: '24 cupcakes \u00b7 Any flavour', note: 'Choose any flavour from our cake menu.' },
      cupcustom: { label: 'Per Piece', price: '$4.50', meta: 'More than 24 cupcakes \u00b7 Any flavour', note: 'Choose Custom and tell us how many cupcakes you need.' },
      chocbasic: { label: 'Basic Pricing', tiers: [['12 pieces', '$20'], ['24 pieces', '$40']], note: EXTRA },
      chocsticks: { label: 'Basic Pricing', tiers: [['8 sticks', '$25'], ['16 sticks', '$50']], note: EXTRA }
    };
    fmTitle.textContent = data.t;
    const pBox = document.getElementById('fmPriceBox');
    const pInfo = P[key] || PP[card.dataset.key];
    if (pBox) {
      if (pInfo) {
        pBox.hidden = false;
        document.getElementById('fmPriceLabel').textContent = pInfo.label;
        document.getElementById('fmPriceMeta').textContent = pInfo.meta || '';
        const valEl = document.getElementById('fmPriceVal');
        const tiersEl = document.getElementById('fmPriceTiers');
        tiersEl.innerHTML = '';
        if (pInfo.tiers) {
          valEl.style.display = 'none';
          tiersEl.hidden = false;
          pInfo.tiers.forEach(t => { const li = document.createElement('li'); const a = document.createElement('span'); a.textContent = t[0]; const b = document.createElement('strong'); b.textContent = t[1]; li.appendChild(a); li.appendChild(b); tiersEl.appendChild(li); });
        } else {
          valEl.style.display = '';
          valEl.textContent = pInfo.price;
          tiersEl.hidden = true;
        }
        const pNote = document.getElementById('fmPriceNote');
        pNote.textContent = pInfo.note || '';
        pNote.style.display = pInfo.note ? '' : 'none';
      } else {
        pBox.hidden = true;
      }
    }
    fmDesc.textContent = data.d;
    fmList.innerHTML = '';
    data.l.forEach(t => { const li = document.createElement('li'); li.textContent = t; fmList.appendChild(li); });
    fmList.parentElement.querySelector('.fm-sub').style.display = data.l.length ? '' : 'none';
    fmImg.alt = data.t;
    modal.dataset.flavour = name;
    modal.dataset.mode = card.dataset.mode || '';
    modal.dataset.value = card.dataset.value || '';
    const token = ++openToken;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    Object.keys(imgEls).forEach(k => imgEls[k].classList.remove('on'));
    const ready = imgEls[data.img] && imgReady[data.img];
    if (ready) { imgBox.classList.remove('loading'); showImg(data.img, data.t); }
    else {
      imgBox.classList.add('loading');
      const el = getImg(data.img);
      el.fetchPriority = 'high';
      loadImg(data.img).then(() => {
        if (token !== openToken) return;
        imgBox.classList.remove('loading');
        showImg(data.img, data.t);
      });
    }
    return;
  }
  function close() {
    openToken++;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.getElementById('orderModal').classList.contains('open')) document.body.style.overflow = '';
  }

  document.querySelectorAll('.flavour-card, .pack-card').forEach(card => {
    card.addEventListener('click', () => open(card));
    if (card.classList.contains('pack-card')) card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card); } });
  });
  modal.querySelectorAll('[data-fclose]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });

  document.getElementById('fmOrder').addEventListener('click', () => {
    if (modal.dataset.mode) {
      const mode = modal.dataset.mode, val = modal.dataset.value;
      close();
      window.__packOpen = true;
      if (window.openOrder) window.openOrder();
      window.__packOpen = false;
      if (window.setOrderMode) window.setOrderMode(mode, val);
      return;
    }
    const want = norm(modal.dataset.flavour);
    close();
    if (window.openOrder) window.openOrder();
    const sel = document.getElementById('toFlavour');
    if (sel) {
      for (const o of sel.options) {
        const t = norm(o.textContent);
        if (t && (t === want || t.startsWith(want) || want.startsWith(t))) { sel.value = o.value || o.textContent; break; }
      }
    }
  });
})();


// ---- fade big pictures in when they finish loading ----
(function () {
  document.querySelectorAll('.gallery-item img, .flavour-img-wrap img').forEach(img => {
    const ok = () => img.classList.add('ready');
    if (img.complete && img.naturalWidth) ok();
    else { img.addEventListener('load', ok); img.addEventListener('error', ok); }
  });
})();


// ---- make sure the videos actually start (some browsers pause autoplay), hero starts when the entrance ends ----
(function () {
  const hero = document.querySelector('.hero-video');
  const intro = document.querySelector('.ib-video');
  const kick = v => { if (v && v.paused) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } };
  if (hero) { hero.muted = true; }
  if (intro) { intro.muted = true; kick(intro); }
  // hero waits (saves the phone/computer decoding two 4K videos at once), then plays
  setTimeout(() => kick(hero), 3800);
  ['click', 'touchstart', 'scroll', 'keydown'].forEach(ev => window.addEventListener(ev, () => { kick(hero); }, { once: true, passive: true }));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(hero); });
})();

// ---- Customer reviews (shared by everyone, scrolling row) ----
const REVIEWS_API = 'https://cakravings-reviews.ananyasnh2.workers.dev/reviews';

(function initReviews() {
  const track = document.getElementById('reviewList');
  const marquee = document.getElementById('reviewMarquee');
  const form = document.getElementById('reviewForm');
  if (!track || !marquee || !form) return;
  const note = document.getElementById('rvNote');
  const say = (t, err) => { note.textContent = t; note.classList.toggle('error', !!err); };
  let reviews = [];

  function stars(n) { return '\u2605'.repeat(n) + '\u2606'.repeat(5 - n); }
  function card(r) {
    const c = document.createElement('div');
    c.className = 'review-card';
    const s = document.createElement('div'); s.className = 'review-stars'; s.textContent = stars(r.rating || 5);
    const t = document.createElement('p'); t.className = 'review-text'; t.textContent = '\u201C' + r.text + '\u201D';
    const n = document.createElement('div'); n.className = 'review-name'; n.textContent = '\u2014 ' + r.name;
    c.appendChild(s); c.appendChild(t); c.appendChild(n);
    return c;
  }
  function render() {
    track.innerHTML = '';
    track.style.animation = 'none';
    if (!reviews.length) {
      const p = document.createElement('p');
      p.className = 'review-empty';
      p.textContent = 'Be the first to share your experience with Cakravings.';
      track.appendChild(p);
      marquee.classList.remove('moving', 'still');
      return;
    }
    // 1-2 reviews stay still and centered; 3 or more drift slowly across the row
    if (reviews.length <= 2) {
      reviews.forEach(r => track.appendChild(card(r)));
      marquee.classList.remove('moving');
      marquee.classList.add('still');
      return;
    }
    marquee.classList.remove('still');
    const reps = Math.max(1, Math.ceil(6 / reviews.length));
    const once = [];
    for (let k = 0; k < reps; k++) reviews.forEach(r => once.push(r));
    once.concat(once).forEach(r => track.appendChild(card(r)));
    marquee.classList.add('moving');
    track.style.setProperty('--dur', Math.max(90, once.length * 22) + 's');
    track.style.animation = '';
  }

  fetch(REVIEWS_API).then(r => r.json()).then(list => { if (Array.isArray(list)) reviews = list; render(); }).catch(render);
  render();

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (document.getElementById('rvHoney').value) return;
    const name = document.getElementById('rvName').value.trim();
    const text = document.getElementById('rvText').value.trim();
    const picked = form.querySelector('input[name="rvRating"]:checked');
    if (!name || !picked || text.length < 5) { say('Please add your name, a star rating and a short review.', true); return; }
    const btn = document.getElementById('rvSubmit');
    btn.disabled = true; say('Posting...');
    try {
      const res = await fetch(REVIEWS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating: picked.value, text })
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        reviews.unshift(data.review);
        render();
        form.reset();
        say('Thank you! Your review is now on the website.');
      } else {
        say(data.error || 'Sorry, that did not post. Please try again.', true);
      }
    } catch (err) {
      say('Sorry, that did not post. Please try again.', true);
    }
    btn.disabled = false;
  });
})();
