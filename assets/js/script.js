/**
 * PANDIT JI EXPRESS - Official Client Script
 * Lightweight vanilla JavaScript for navigation, accessible drawer,
 * booking form handling, and WhatsApp message formatting.
 */

function openDrawer() {
  const mobileDrawer = document.getElementById('mobileDrawer') || document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop') || document.querySelector('.drawer-backdrop');
  if (mobileDrawer) {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
  }
  if (drawerBackdrop) {
    drawerBackdrop.classList.add('open');
    drawerBackdrop.setAttribute('aria-hidden', 'false');
  }
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  const mobileDrawer = document.getElementById('mobileDrawer') || document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop') || document.querySelector('.drawer-backdrop');
  if (mobileDrawer) {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  }
  if (drawerBackdrop) {
    drawerBackdrop.classList.remove('open');
    drawerBackdrop.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Event Listeners
  const mobileToggleBtn = document.querySelector('.mobile-menu-btn');
  const drawerCloseBtn = document.querySelector('.mobile-drawer-close');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', openDrawer);
  }
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    const mobileDrawer = document.querySelector('.mobile-drawer');
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });


  // 2. Booking Form Submission -> WhatsApp Pre-Fill & Confirmation
  const bookingForm = document.getElementById('panditBookingForm');
  const formSuccessMsg = document.getElementById('formSuccessMessage');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect inputs
      const name = document.getElementById('bookingName')?.value.trim() || '';
      const phone = document.getElementById('bookingPhone')?.value.trim() || '';
      const ceremony = document.getElementById('bookingCeremony')?.value || 'Traditional Puja';
      const date = document.getElementById('bookingDate')?.value || 'To be decided';
      const location = document.getElementById('bookingLocation')?.value.trim() || 'Bangalore';
      const language = document.getElementById('bookingLanguage')?.value || 'Hindi';
      const samagri = document.getElementById('bookingSamagri')?.value || 'Yes';
      const notes = document.getElementById('bookingNotes')?.value.trim() || 'None';

      // Build structured message
      const waText = 
`Namaste Pandit Ji Express 🙏

I would like to book a pandit for a religious ceremony.

Name: ${name}
Contact: ${phone}
Ceremony: ${ceremony}
Preferred Date: ${date}
Location / Area: ${location}
Preferred Language: ${language}
Need Pooja Samagri: ${samagri}
Additional Requirements: ${notes}`;

      const encodedMsg = encodeURIComponent(waText);
      const waUrl = `https://wa.me/919065788789?text=${encodedMsg}`;

      if (formSuccessMsg) {
        formSuccessMsg.style.display = 'block';
        formSuccessMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Open WhatsApp after a short delay
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 300);
    });
  }

  // 3. Dynamic Year in Footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

/**
 * Global Modal Handlers for Interactive Mobile App & Web Experience
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    modal.classList.remove('active');
    // Only restore scroll if no other modals are active
    if (!document.querySelector('.app-modal-overlay.open, .app-modal-overlay.active')) {
      document.body.style.overflow = '';
    }
  }
}

function closeModalOnBackdrop(event, modalId) {
  if (event.target.id === modalId) {
    closeModal(modalId);
  }
}

function openPanditSelectionModal() {
  closeModal('hawanDetailModal');
  openModal('panditSelectModal');
}

function openHawanDetailModal() {
  openCeremonyDetailModal('Hawan / Yagya', 'assets/images/card-hawan.jpg', 'Hawan / Yagya', 'Sacred fire ceremony with shanti mantra chanting.', '4.9 (320 bookings)');
}

let currentBookingStep = 1;

function goToBookingStep(stepNum) {
  if (stepNum < 1 || stepNum > 3) return;
  currentBookingStep = stepNum;

  // Toggle step panels
  for (let s = 1; s <= 3; s++) {
    const panel = document.getElementById(`bookingStep${s}`);
    if (panel) {
      if (s === stepNum) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    }
  }

  // Update Stepper Dots & Connector Lines
  const checkSvg = '<svg class="pj-icon pj-icon-green" style="width:14px;height:14px;stroke:#fff;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  for (let s = 1; s <= 3; s++) {
    const dot = document.getElementById(`stepDot${s}`);
    const label = document.getElementById(`stepLabel${s}`);
    const line = document.getElementById(`stepLine${s}`);

    if (dot && label) {
      dot.className = 'step-indicator-dot';
      label.className = 'step-indicator-label';

      if (s < stepNum) {
        dot.classList.add('completed');
        dot.innerHTML = checkSvg;
        label.classList.add('completed');
      } else if (s === stepNum) {
        dot.classList.add('active');
        dot.textContent = s;
        label.classList.add('active');
      } else {
        dot.classList.add('inactive');
        dot.textContent = s;
      }
    }

    if (line) {
      line.className = 'step-connector-line';
      if (s < stepNum) {
        line.classList.add('completed');
      } else if (s === stepNum) {
        line.classList.add('active');
      }
    }
  }
}

function nextBookingStep(targetStep) {
  if (targetStep === 2) {
    const poojaSelect = document.getElementById('flowPooja');
    if (!poojaSelect || !poojaSelect.value) {
      alert('Please select a Pooja / Ceremony to proceed.');
      if (poojaSelect) poojaSelect.focus();
      return;
    }
    goToBookingStep(2);
  } else if (targetStep === 3) {
    const dateInput = document.getElementById('flowDate');
    const slotSelect = document.getElementById('flowSlot');

    if (!dateInput || !dateInput.value) {
      alert('Please select your preferred ceremony date.');
      if (dateInput) dateInput.focus();
      return;
    }
    if (!slotSelect || !slotSelect.value) {
      alert('Please select a preferred time slot or choose "Pandit Ji will calculate exact Shubh Muhurat".');
      if (slotSelect) slotSelect.focus();
      return;
    }
    goToBookingStep(3);
  }
}

function toggleMuhuratAdvise(checkbox) {
  const slotSelect = document.getElementById('flowSlot');
  if (checkbox && checkbox.checked && slotSelect) {
    slotSelect.value = "Pandit Ji will calculate exact Shubh Muhurat";
  }
}

function openBookingModal(poojaName) {
  const modal = document.getElementById('bookingFlowModal');
  if (!modal) {
    // If on a page without inline modal, navigate to booking.html with pre-selected ceremony
    window.location.href = `booking.html?pooja=${encodeURIComponent(poojaName || 'General Puja')}`;
    return;
  }

  closeModal('panditSelectModal');
  closeModal('hawanDetailModal');
  if (typeof closeGalleryLightbox === 'function') {
    closeGalleryLightbox();
  }

  // Reset form cleanly - Zero pre-filled dummy data!
  const form = document.getElementById('activeBookingFlowForm');
  if (form) {
    form.reset();
  }

  // Set min date to today's date dynamically
  const dateInput = document.getElementById('flowDate');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = '';
  }

  // Clear all text inputs explicitly
  ['flowName', 'flowPhone', 'flowAddress', 'flowGotra', 'flowSpecial'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  // Select pooja if requested
  const poojaSelect = document.getElementById('flowPooja');
  if (poojaSelect && poojaName) {
    const pLower = poojaName.toLowerCase();
    let matched = false;
    for (let opt of poojaSelect.options) {
      if (opt.value && (opt.value.toLowerCase().includes(pLower) || pLower.includes(opt.value.toLowerCase().split(' ')[0]))) {
        poojaSelect.value = opt.value;
        matched = true;
        break;
      }
    }
    if (!matched) {
      if (pLower.includes('griha') || pLower.includes('vastu')) {
        poojaSelect.value = "Griha Pravesh (House Warming)";
      } else if (pLower.includes('hawan') || pLower.includes('yagya') || pLower.includes('fire') || pLower.includes('agni')) {
        poojaSelect.value = "Hawan / Yagya / Navagraha Shanti";
      } else if (pLower.includes('marriage') || pLower.includes('wedding') || pLower.includes('vivah')) {
        poojaSelect.value = "Marriage / Vivah Sanskar & Sagai";
      } else if (pLower.includes('ganesh') || pLower.includes('ganapati')) {
        poojaSelect.value = "Ganesh Puja / Lakshmi Puja";
      } else if (pLower.includes('satyanarayan') || pLower.includes('katha')) {
        poojaSelect.value = "Satyanarayan Katha & Puja";
      } else if (pLower.includes('naamkaran') || pLower.includes('naming')) {
        poojaSelect.value = "Naamkaran (Naming Ceremony)";
      } else if (poojaSelect.options.length > 1) {
        poojaSelect.selectedIndex = 1;
      }
    }
  }

  // Start at step 1
  goToBookingStep(1);
  openModal('bookingFlowModal');
}

function selectPanditAndProceed(panditName) {
  closeModal('panditSelectModal');
  openBookingModal('General Puja');
}

function handleBookingFlowSubmit(event) {
  event.preventDefault();

  const pooja = document.getElementById('flowPooja')?.value || 'Vedic Pooja';
  const rawDate = document.getElementById('flowDate')?.value || '';
  const slot = document.getElementById('flowSlot')?.value || 'Morning Auspicious Muhurat';
  const samagri = document.getElementById('flowSamagri')?.value || 'Complete Pure Vedic Samagri Kit arranged by Pandit Ji';
  const name = document.getElementById('flowName')?.value.trim() || '';
  const phone = document.getElementById('flowPhone')?.value.trim() || '';
  const address = document.getElementById('flowAddress')?.value.trim() || '';
  const gotra = document.getElementById('flowGotra')?.value.trim() || '';
  const special = document.getElementById('flowSpecial')?.value.trim() || '';

  // Required validations
  if (!name) {
    alert('Please enter Yajman / Devotee Full Name.');
    document.getElementById('flowName')?.focus();
    return;
  }
  if (!phone || phone.replace(/\D/g, '').length < 10) {
    alert('Please enter a valid 10-digit WhatsApp mobile number.');
    document.getElementById('flowPhone')?.focus();
    return;
  }
  if (!address) {
    alert('Please enter your Puja Address / Locality in Bangalore.');
    document.getElementById('flowAddress')?.focus();
    return;
  }

  // Format date nicely
  let formattedDate = rawDate;
  if (rawDate) {
    try {
      const parts = rawDate.split('-');
      if (parts.length === 3) {
        const dObj = new Date(parts[0], parts[1] - 1, parts[2]);
        formattedDate = dObj.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          weekday: 'short'
        });
      }
    } catch (e) {
      formattedDate = rawDate;
    }
  }

  // Generate Unique Booking Reference
  const bookingRef = 'PJEXP' + Math.floor(10000 + Math.random() * 90000);

  // Update Confirmation Modal
  const confirmPooja = document.getElementById('confirmPoojaDisplay');
  const confirmDate = document.getElementById('confirmDateDisplay');
  const confirmSlot = document.getElementById('confirmSlotDisplay');
  const confirmId = document.getElementById('confirmIdDisplay');

  if (confirmPooja) confirmPooja.textContent = pooja;
  if (confirmDate) confirmDate.textContent = formattedDate || 'Auspicious Date';
  if (confirmSlot) confirmSlot.textContent = slot;
  if (confirmId) confirmId.textContent = bookingRef;

  // Build WhatsApp inquiry with all required Vedic ritual data
  const waLines = [
    '*Namaste Pandit Shyam Sundar Ji (Pandit Ji Express)* 🙏',
    '',
    'I would like to enquire and book an auspicious Vedic ceremony in Bangalore:',
    '• *Puja / Ceremony:* ' + pooja,
    '• *Preferred Date:* ' + formattedDate,
    '• *Time Slot / Muhurat:* ' + slot,
    '• *Samagri Option:* ' + samagri,
    '',
    '*Yajman Details for Vedic Sankalp:*',
    '• *Host Name:* ' + name,
    '• *WhatsApp Number:* ' + phone,
    '• *Gotra / Community Tradition:* ' + (gotra || 'To be guided by Pandit Ji'),
    '• *Puja Address / Locality:* ' + address,
    '• *Special Notes / Requests:* ' + (special || 'Standard Vedic Vidhi'),
    '• *Booking Ref:* ' + bookingRef,
    '',
    'Please confirm your availability and advise on the auspicious Muhurat and vidhi.'
  ];

  const waText = waLines.join('\n');
  const waUrl = 'https://wa.me/919065788789?text=' + encodeURIComponent(waText);

  // Open WhatsApp immediately
  window.open(waUrl, '_blank');

  // Close booking flow modal and open Confirmation modal
  closeModal('bookingFlowModal');
  openModal('bookingConfirmModal');
}

function handleQuickLead(event) {
  event.preventDefault();
  const input = event.target.querySelector('input[type="tel"]');
  const phone = input ? input.value.trim() : '';
  if (phone) {
    const waText = `Namaste Pandit Ji Express\n\nI want to book a Pandit. My phone number is ${phone}. Please call me back or share details.`;
    window.open(`https://wa.me/919065788789?text=${encodeURIComponent(waText)}`, '_blank');
    if (input) input.value = '';
    alert('Thank you! Pandit Ji Express will connect with you shortly.');
  }
}

/**
 * Global helper for custom ceremony WhatsApp booking links
 * @param {string} ceremonyName 
 */
function bookViaWhatsApp(ceremonyName) {
  const text = `Namaste Pandit Ji Express\n\nI would like to enquire about booking a pandit for:\nCeremony: ${ceremonyName}\nLocation: Bangalore\nPreferred Language: Hindi\n\nPlease let me know the availability and vidhi details.`;
  const url = `https://wa.me/919065788789?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function handleMobileBack() {
  if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

function triggerMobileCall() {
  window.location.href = 'tel:+919065788789';
}

// Auto-sync mobile bottom navigation active tab
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.mobile-bottom-nav .mob-nav-item');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (!href) return;
    const itemPath = href.split('/').pop();
    
    // Check match
    if (
      (currentPath === 'index.html' || currentPath === '') && (itemPath === 'index.html' || itemPath === '#') ||
      (currentPath.includes('service') || currentPath.includes('puja') || currentPath.includes('pooja') || currentPath.includes('havan') || currentPath.includes('wedding')) && itemPath.includes('services') ||
      (currentPath.includes('samagri') && itemPath.includes('samagri')) ||
      (currentPath.includes('gallery') && itemPath.includes('gallery')) ||
      (currentPath.includes('pandit') && itemPath.includes('pandit'))
    ) {
      // Keep existing active class if explicitly defined or set appropriately
    }
  });
});

window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;
window.openModal = openModal;
window.closeModal = closeModal;
window.closeModalOnBackdrop = closeModalOnBackdrop;
window.openPanditSelectionModal = openPanditSelectionModal;
window.openHawanDetailModal = openHawanDetailModal;
window.openBookingModal = openBookingModal;
window.selectPanditAndProceed = selectPanditAndProceed;
window.handleBookingFlowSubmit = handleBookingFlowSubmit;
window.handleQuickLead = handleQuickLead;
window.bookViaWhatsApp = bookViaWhatsApp;
window.handleMobileBack = handleMobileBack;
window.triggerMobileCall = triggerMobileCall;
window.goToBookingStep = goToBookingStep;
window.nextBookingStep = nextBookingStep;
window.toggleMuhuratAdvise = toggleMuhuratAdvise;

/* --------------------------------------------------------------------------
 * PINTEREST-STYLE GALLERY LOGIC (Showcase, Filters & Lightbox)
 * -------------------------------------------------------------------------- */

let currentLightboxCeremony = 'General Puja';

function filterGallery(category, btnElement) {
  // Update active pill styling
  const pills = document.querySelectorAll('.gallery-filter-bar .filter-pill');
  pills.forEach(p => p.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  }

  // Filter masonry cards
  const cards = document.querySelectorAll('.pinterest-masonry-grid .masonry-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 10);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 200);
    }
  });
}

function openGalleryLightbox(element) {
  const modal = document.getElementById('galleryLightboxModal');
  const imgElem = document.getElementById('lightboxImg');
  const titleElem = document.getElementById('lightboxTitle');
  const catElem = document.getElementById('lightboxCategory');

  if (!modal || !imgElem) return;

  const imgSrc = element.getAttribute('data-img') || element.querySelector('img')?.src;
  const title = element.getAttribute('data-title') || 'Ceremony Moment';
  const category = element.getAttribute('data-category-name') || element.getAttribute('data-category') || 'Vedic Ceremony';

  currentLightboxCeremony = title;
  imgElem.src = imgSrc;
  if (titleElem) titleElem.textContent = title;
  if (catElem) catElem.textContent = category;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGalleryLightbox() {
  const modal = document.getElementById('galleryLightboxModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function closeGalleryLightboxOnBackdrop(event) {
  if (event.target.id === 'galleryLightboxModal') {
    closeGalleryLightbox();
  }
}

function bookFromLightbox() {
  closeGalleryLightbox();
  if (typeof openBookingModal === 'function') {
    openBookingModal(currentLightboxCeremony);
  }
}

// Touch support for mobile Pinterest showcase
document.addEventListener('DOMContentLoaded', () => {
  const pinterestItems = document.querySelectorAll('.pinterest-showcase .pinterest-item');
  pinterestItems.forEach(item => {
    item.addEventListener('touchstart', function(e) {
      pinterestItems.forEach(i => i.classList.remove('touch-active'));
      this.classList.add('touch-active');
    }, { passive: true });
  });

  // Esc key listener to close lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('galleryLightboxModal');
      if (modal && modal.classList.contains('active')) {
        closeGalleryLightbox();
      }
    }
  });
});

window.filterGallery = filterGallery;
window.openGalleryLightbox = openGalleryLightbox;
window.closeGalleryLightbox = closeGalleryLightbox;
window.closeGalleryLightboxOnBackdrop = closeGalleryLightboxOnBackdrop;
window.bookFromLightbox = bookFromLightbox;

/* ============================================================
   NATIVE MOBILE & TABLET APP UI CONTROLLERS (MOCKUP SCREENS 1 - 8)
   ============================================================ */
let activeAppCeremony = 'Marriage Pooja';
let activeAppDate = '18 September 2026';
let activeAppTimeSlot = '10:00 AM';

function openCeremonyDetailModal(name, img, title, sub, rating) {
  activeAppCeremony = name || 'Marriage Pooja';

  const modal = document.getElementById('appCeremonyDetailModal');
  const imgElem = document.getElementById('appDetailImg');
  const titleElem = document.getElementById('appDetailTitle');
  const subElem = document.getElementById('appDetailSub');
  const ratingElem = document.getElementById('appDetailRating');
  const descElem = document.getElementById('appDetailOverviewDesc');

  if (imgElem && img) imgElem.src = img;
  if (titleElem && title) titleElem.textContent = title;
  if (subElem && sub) subElem.textContent = sub;
  if (ratingElem && rating) ratingElem.textContent = rating;
  if (descElem) {
    descElem.textContent = `Our experienced North Indian pandits perform ${title || 'ceremony'} rituals as per your family's tradition – UP, Bihari, Maithil, Kumaoni and more.`;
  }

  // Reset tab to Overview
  switchAppDetailTab(0);

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAppDetailModal() {
  const modal = document.getElementById('appCeremonyDetailModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeAppDetailModalOnBackdrop(event) {
  if (event.target.id === 'appCeremonyDetailModal') {
    closeAppDetailModal();
  }
}

function switchAppDetailTab(index, btn) {
  const tabs = ['appDetailTabOverview', 'appDetailTabIncludes', 'appDetailTabProcess', 'appDetailTabFaqs'];
  tabs.forEach((tabId, i) => {
    const el = document.getElementById(tabId);
    if (el) el.style.display = (i === index) ? 'block' : 'none';
  });

  const tabBtns = document.querySelectorAll('.app-detail-tabs-bar .app-detail-tab-btn');
  tabBtns.forEach((b, i) => {
    if (i === index) b.classList.add('active');
    else b.classList.remove('active');
  });
}

function toggleWishlist(btn) {
  if (btn) {
    if (btn.textContent === '♡') {
      btn.textContent = '♥';
      btn.style.color = '#FF4D4D';
    } else {
      btn.textContent = '♡';
      btn.style.color = '#FFFFFF';
    }
  }
}

function bookFromAppDetail() {
  closeAppDetailModal();
  openAppBookingModal(activeAppCeremony);
}

function openAppBookingModal(poojaName) {
  if (poojaName) activeAppCeremony = poojaName;
  const modal = document.getElementById('appBookingDateModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAppBookingModal() {
  const modal = document.getElementById('appBookingDateModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeAppBookingModalOnBackdrop(event) {
  if (event.target.id === 'appBookingDateModal') {
    closeAppBookingModal();
  }
}

function selectAppDate(element, day) {
  const dates = document.querySelectorAll('#appCalGrid .app-cal-date');
  dates.forEach(d => d.classList.remove('active'));
  if (element) element.classList.add('active');
  activeAppDate = `${day} September 2026`;
}

function selectAppTimeSlot(element, slot) {
  const pills = document.querySelectorAll('.app-time-slots-grid .app-time-pill');
  pills.forEach(p => p.classList.remove('active'));
  if (element) element.classList.add('active');
  activeAppTimeSlot = slot;
}

function changeAppMonth(direction) {
  const title = document.getElementById('appCalMonthTitle');
  if (title) {
    if (direction > 0) {
      title.textContent = 'October 2026';
    } else {
      title.textContent = 'September 2026';
    }
  }
}

function handleAppBookingSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('appDevoteeName')?.value || 'Devotee';
  const phone = document.getElementById('appDevoteePhone')?.value || '';
  const address = document.getElementById('appDevoteeAddress')?.value || '';
  const special = document.getElementById('appDevoteeSpecial')?.value || '';

  const waText = encodeURIComponent(
    `Namaste Pandit Shyam Sundar Ji,\n\nI would like to book an authentic ceremony with Pandit Ji Express:\n\n` +
    `*Ceremony:* ${activeAppCeremony}\n` +
    `*Preferred Date:* ${activeAppDate}\n` +
    `*Time Slot / Muhurat:* ${activeAppTimeSlot}\n` +
    `*Yajman Name:* ${name}\n` +
    `*WhatsApp Phone:* ${phone}\n` +
    `*Address in Bangalore:* ${address}\n` +
    (special ? `*Special Requirements:* ${special}\n\n` : `\n`) +
    `Please confirm the auspicious Muhurat and priest allocation.`
  );

  // Open WhatsApp directly
  window.open(`https://wa.me/919065788789?text=${waText}`, '_blank');

  // Close booking modal
  closeAppBookingModal();

  // Populate and open confirmation modal
  const confirmPooja = document.getElementById('confirmPoojaDisplay');
  const confirmDate = document.getElementById('confirmDateDisplay');
  const confirmSlot = document.getElementById('confirmSlotDisplay');
  const confirmId = document.getElementById('confirmIdDisplay');

  if (confirmPooja) confirmPooja.textContent = activeAppCeremony;
  if (confirmDate) confirmDate.textContent = activeAppDate;
  if (confirmSlot) confirmSlot.textContent = activeAppTimeSlot;
  if (confirmId) confirmId.textContent = 'PJEXP' + Math.floor(10000 + Math.random() * 90000);

  const confirmModal = document.getElementById('bookingConfirmModal');
  if (confirmModal) {
    confirmModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function filterAppGallery(category, btn) {
  const pills = document.querySelectorAll('.app-gallery-pills .app-gal-pill');
  pills.forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const items = document.querySelectorAll('#appGalleryMasonry .app-masonry-item');
  items.forEach(item => {
    const cats = item.getAttribute('data-app-cat') || '';
    if (category === 'all' || cats.includes(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

window.openCeremonyDetailModal = openCeremonyDetailModal;
window.closeAppDetailModal = closeAppDetailModal;
window.closeAppDetailModalOnBackdrop = closeAppDetailModalOnBackdrop;
window.switchAppDetailTab = switchAppDetailTab;
window.toggleWishlist = toggleWishlist;
window.bookFromAppDetail = bookFromAppDetail;
window.openAppBookingModal = openAppBookingModal;
window.closeAppBookingModal = closeAppBookingModal;
window.closeAppBookingModalOnBackdrop = closeAppBookingModalOnBackdrop;
window.selectAppDate = selectAppDate;
window.selectAppTimeSlot = selectAppTimeSlot;
window.changeAppMonth = changeAppMonth;
window.handleAppBookingSubmit = handleAppBookingSubmit;
window.filterAppGallery = filterAppGallery;

