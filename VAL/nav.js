// Shared navigation behaviors (burger toggling, underline, and active link logic)
document.addEventListener('DOMContentLoaded', function(){
  const arrowMenuBtn = document.getElementById('arrowMenuBtn');
  const sliderMenu = document.getElementById('sliderMenu');
  const closeSlider = document.getElementById('closeSlider');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navUnderline = document.querySelector('.nav-underline');

  // toggle slider (menu) open/close
  let previousFocus = null;

  const getFocusable = (container) => {
    return Array.from(container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'))
      .filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1);
  };

  const trapFocus = (container) => {
    const focusable = getFocusable(container);
    if (focusable.length === 0) return null;
    let first = focusable[0];
    let last = focusable[focusable.length - 1];
    // set keydown listener to trap tab
    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        // shift + tab
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    container.addEventListener('keydown', handleTab);
    return () => container.removeEventListener('keydown', handleTab);
  };

  const toggleSlider = (e) => {
    if(e) e.preventDefault();
    if(!sliderMenu) return;
    const opening = !sliderMenu.classList.contains('open');
    sliderMenu.classList.toggle('open');
    // ARIA and focus handling
    if(opening){
      previousFocus = document.activeElement;
      arrowMenuBtn?.setAttribute('aria-expanded', 'true');
      sliderMenu?.setAttribute('aria-hidden','false');
      // focus on close button if available
      (closeSlider || sliderMenu.querySelector('a, button'))?.focus();
      // trap focus
      sliderMenu._removeTrap = trapFocus(sliderMenu);
      document.body.style.overflow = 'hidden'; // prevent background scroll
    } else {
      arrowMenuBtn?.setAttribute('aria-expanded', 'false');
      sliderMenu?.setAttribute('aria-hidden','true');
      if(previousFocus && previousFocus.focus) previousFocus.focus();
      if(sliderMenu._removeTrap) { sliderMenu._removeTrap(); sliderMenu._removeTrap = null; }
      document.body.style.overflow = '';
    }
    arrowMenuBtn?.classList.toggle('open');
    closeSlider?.classList.toggle('open');
  };

  arrowMenuBtn?.addEventListener('click', toggleSlider);
  closeSlider?.addEventListener('click', function(e){
    if(e) e.preventDefault();
    sliderMenu?.classList.remove('open');
    arrowMenuBtn?.classList.remove('open');
    closeSlider?.classList.remove('open');
    arrowMenuBtn?.setAttribute('aria-expanded', 'false');
    sliderMenu?.setAttribute('aria-hidden', 'true');
    if(sliderMenu._removeTrap) { sliderMenu._removeTrap(); sliderMenu._removeTrap = null; }
    // restore focus
    if(previousFocus && previousFocus.focus) previousFocus.focus();
    document.body.style.overflow = '';
  });

  // ESC to close slider
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      sliderMenu?.classList.remove('open');
      arrowMenuBtn?.classList.remove('open');
      closeSlider?.classList.remove('open');
      arrowMenuBtn?.setAttribute('aria-expanded', 'false');
      sliderMenu?.setAttribute('aria-hidden', 'true');
      if(sliderMenu._removeTrap) { sliderMenu._removeTrap(); sliderMenu._removeTrap = null; }
      if(previousFocus && previousFocus.focus) previousFocus.focus();
      document.body.style.overflow = '';
    }
  });

  // set active nav link based on current URL
  const currentPage = window.location.pathname.split('/').pop().toLowerCase();
  let activeSet = false;
  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop().toLowerCase();
    if(!activeSet && (href === currentPage || (href === 'index.html' && (currentPage === '' || currentPage === 'index.html')))){
      link.classList.add('active');
      activeSet = true;
    }
  });
  // if nothing matches and no index, default to first link
  if(!activeSet && navLinks[0]) navLinks[0].classList.add('active');

  // underline positioning helper
  function moveUnderlineTo(link){
    if(!navUnderline || !link) return;
    const linkRect = link.getBoundingClientRect();
    const navRect = document.querySelector('.top-nav')?.getBoundingClientRect() || { left:0 };
    const left = linkRect.left - navRect.left;
    navUnderline.style.width = linkRect.width + 'px';
    navUnderline.style.left = left + 'px';
    navUnderline.style.opacity = '1';
  }
  // set underline to active on load
  const active = document.querySelector('.nav-links a.active');
  if(active) moveUnderlineTo(active);

  // wire hover and click listener to nav links
  navLinks.forEach(l => {
    l.addEventListener('mouseenter', ()=> moveUnderlineTo(l));
    l.addEventListener('click', ()=> { moveUnderlineTo(l); /* keep active when clicked */ });
    l.addEventListener('mouseleave', ()=> { // move back to active
      const a = document.querySelector('.nav-links a.active');
      moveUnderlineTo(a || navLinks[0]);
    });
  });
});