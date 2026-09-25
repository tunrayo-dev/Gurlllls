/* Girls Unplugged shared navigation + targeted UI fixes */
document.addEventListener("DOMContentLoaded", () => {
  const links = [
    ["index.html","Home"],["about.html","About"],["circle.html","The Circle"],
    ["programs.html","Programs"],["speakers.html","Speakers"],["team.html","Our Team"],
    ["impact.html","Our Impact"],["resources.html","Resources"],["get-involved.html","Get Involved"],
    ["faq.html","FAQ"],["contact.html","Contact"]
  ];
  const path = location.pathname.split("/").pop() || "index.html";

  const header = document.querySelector("#site-header") || document.querySelector(".site-header");
  if (header) {
    header.innerHTML = `
      <div class="container nav-container">
        <a href="index.html" class="site-logo" aria-label="Girls Unplugged home">
          <span class="logo-mark" aria-hidden="true"><span class="flower-petal"></span><span class="flower-petal"></span><span class="flower-petal"></span><span class="flower-center"></span></span>
          <span class="logo-text"><strong>Girls Unplugged</strong><small>Bloom &amp; Glow Circle</small></span>
        </a>
        <nav class="nav-links" aria-label="Main navigation">
          ${links.map(([href,label]) => `<a href="${href}"${href===path?' class="active"':''}>${label}</a>`).join("")}
        </nav>
        <a href="get-involved.html" class="btn btn-primary nav-cta">Get Involved</a>
        <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="mobile-menu" id="mobile-menu">
        <nav aria-label="Mobile navigation">
          ${links.map(([href,label]) => `<a href="${href}"${href===path?' class="active"':''}>${label}</a>`).join("")}
        </nav>
      </div>`;
  }

  const footer = document.querySelector("#site-footer") || document.querySelector(".site-footer");
  if (footer) {
    footer.classList.add("site-footer");
    footer.innerHTML = `
      <div class="container">
        <div class="footer-main">
          <div class="footer-brand">
            <a href="index.html" class="footer-logo">
              <span class="footer-logo-mark" aria-hidden="true"><span class="flower-petal"></span><span class="flower-petal"></span><span class="flower-petal"></span><span class="flower-center"></span></span>
              <span><strong>Girls Unplugged</strong><small>Bloom &amp; Glow Circle</small></span>
            </a>
            <p>A growing sisterhood for girls and young women to connect, express themselves, learn, grow and bloom together.</p>
            <p class="footer-motto">Action, not titles.</p>
          </div>
          <div class="footer-links">
            <div class="footer-column"><h3>Explore</h3><a href="about.html">About Us</a><a href="circle.html">The Circle</a><a href="programs.html">Programs</a><a href="speakers.html">Speakers</a><a href="team.html">Our Team</a></div>
            <div class="footer-column"><h3>Community</h3><a href="impact.html">Our Impact</a><a href="resources.html">Resources</a><a href="get-involved.html">Get Involved</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a></div>
          </div>
          <div class="footer-connect"><h3>Stay connected</h3><p>Follow Girls Unplugged and stay connected to the Bloom &amp; Glow Circle.</p>
            <div class="footer-socials">
              <a href="https://www.instagram.com/grls_unplugged" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><span class="social-icon social-instagram" aria-hidden="true"></span></a>
              <a href="https://www.tiktok.com/@grls.unplugged" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><span class="social-icon social-tiktok" aria-hidden="true"></span></a>
              <a href="mailto:grlsunplugged@gmail.com" aria-label="Email"><span class="social-icon social-email" aria-hidden="true"></span></a>
            </div>
            <a href="mailto:grlsunplugged@gmail.com" class="footer-email">grlsunplugged@gmail.com</a>
          </div>
        </div>
        <div class="footer-bottom"><p>© <span data-current-year></span> Girls Unplugged: Bloom &amp; Glow Circle. All rights reserved.</p><div class="footer-bottom-links"><a href="privacy.html">Privacy Policy</a><a href="contact.html">Contact</a></div></div>
      </div>`;
  }

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    const close = () => { menu.classList.remove("active"); toggle.classList.remove("active"); toggle.setAttribute("aria-expanded","false"); document.body.classList.remove("menu-open"); };
    toggle.addEventListener("click", () => {
      const open = !menu.classList.contains("active");
      menu.classList.toggle("active", open); toggle.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", String(open)); document.body.classList.toggle("menu-open", open);
    });
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
    document.addEventListener("keydown", e => { if(e.key==="Escape") close(); });
  }

  document.querySelectorAll("[data-current-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Make all existing hero placeholders image-ready. Put your image at the mapped path.
  const heroImages = {
    "index.html":"images/hero.jpg","about.html":"images/about-hero.jpg","programs.html":"images/programs-hero.jpg",
    "speakers.html":"images/speakers-hero.jpg","impact.html":"images/impact-hero.jpg","faq.html":"images/faq-hero.jpg"
  };
  document.querySelectorAll(".hero-placeholder").forEach(box => {
    const src = heroImages[path] || "images/hero.jpg";
    const img = document.createElement("img");
    img.src = src; img.alt = "Girls Unplugged";
    img.className = "hero-real-image";
    img.onerror = () => { img.style.display="none"; };
    box.innerHTML = ""; box.appendChild(img); box.classList.add("image-ready");
  });

  // Remove old "coming soon" placeholder copy from the rendered page.
  document.querySelectorAll("*").forEach(el => {
    if (el.children.length === 0 && /coming soon|photo coming soon|temporary visual/i.test(el.textContent || "")) el.remove();
  });

  // Count-up any stat that has a numeric target.
  const animateStats = () => document.querySelectorAll(".stat-number").forEach(el => {
    const target = Number(el.dataset.target || el.dataset.value);
    if (!Number.isFinite(target) || target <= 0 || el.dataset.counted === "1") return;
    el.dataset.counted = "1";
    const suffix = el.dataset.suffix || (/\+$/.test(el.textContent.trim()) ? "+" : "");
    const start = performance.now(), duration = 1200;
    const tick = now => {
      const p = Math.min((now-start)/duration,1), value = Math.floor(target*(1-Math.pow(1-p,3)));
      el.textContent = value.toLocaleString() + suffix;
      if(p<1) requestAnimationFrame(tick);
    };
    el.textContent="0"; requestAnimationFrame(tick);
  });
  animateStats();
  setTimeout(animateStats, 700);
  setTimeout(animateStats, 1800);
});
