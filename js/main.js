const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

const ICONS = {
  github: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z"/></svg>`,
  linkedin: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45Z"/></svg>`,
  mail: `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/></svg>`,
  globe: `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/></svg>`,
};

const valid = (u) => !!u && u.trim() !== "";
const splitBio = (text) =>
  text.split(/\n+/).map((p) => p.trim()).filter(Boolean);

/* ---------- render ---------- */
function render() {
  const p = portfolio.profile;

  document.title = `${p.name} | ${p.role}`;
  $("#logoMark").textContent = p.initials;
  $("#logoText").textContent = p.name;
  $("#heroName").textContent = p.name;
  $("#heroRole").textContent = p.role;
  $("#footerName").textContent = p.name;

  $("#heroBio").textContent = splitBio(p.bio)[0] || "";

  $(".about-card").replaceChildren(
    ...splitBio(p.bio).map((t) => {
      const el = document.createElement("p");
      el.textContent = t;
      return el;
    })
  );

  const facts = [];
  if (valid(p.location)) facts.push(["Local", p.location, ICONS.globe]);
  p.social.forEach((s) => valid(s.url) && facts.push([s.label, "ver perfil", ICONS[s.icon] || ICONS.globe]));
  if (valid(p.resumeUrl)) facts.push(["Curriculo", "baixar PDF", ICONS.mail]);

  $("#aboutFacts").replaceChildren(
    ...facts.map(([k, v, icon]) => {
      const li = document.createElement("li");
      li.innerHTML = `${icon}<span class="k"></span><span class="v"></span>`;
      li.querySelector(".k").textContent = k;
      li.querySelector(".v").textContent = v;
      li.querySelector("svg").style.cssText = "width:17px;height:17px;flex-shrink:0";
      return li;
    })
  );

  $("#heroSocial").replaceChildren(
    ...p.social
      .filter((s) => valid(s.url))
      .map((s) => {
        const a = document.createElement("a");
        a.href = s.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.title = s.label;
        a.setAttribute("aria-label", s.label);
        a.innerHTML = ICONS[s.icon] || ICONS.globe;
        return a;
      })
  );

  if (portfolio.stats?.length) {
    $("#stats").replaceChildren(
      ...portfolio.stats.map((s) => {
        const d = document.createElement("div");
        d.className = "stat reveal";
        d.innerHTML = `<div class="stat-value"></div><div class="stat-label"></div>`;
        d.querySelector(".stat-value").textContent = s.value;
        d.querySelector(".stat-label").textContent = s.label;
        return d;
      })
    );
  }

  if (portfolio.skills?.length) {
    $("#skillsGrid").replaceChildren(
      ...portfolio.skills.map((s) => {
        const d = document.createElement("div");
        d.className = "skill reveal";
        d.innerHTML = `<div class="skill-head"><span class="skill-name"></span><span class="skill-pct"></span></div><div class="bar"><i></i></div>`;
        d.querySelector(".skill-name").textContent = s.name;
        d.querySelector(".skill-pct").textContent = `${s.level}%`;
        d.querySelector(".bar > i").dataset.level = s.level;
        return d;
      })
    );
  }

  if (portfolio.projects?.length) {
    $("#projectsGrid").replaceChildren(
      ...portfolio.projects.map((pr) => {
        const d = document.createElement("article");
        d.className = "project reveal";
        d.innerHTML = `<h3></h3><p></p><div class="tech"></div><div class="project-links"></div>`;
        d.querySelector("h3").textContent = pr.title;
        d.querySelector("p").textContent = pr.description;

        const tech = d.querySelector(".tech");
        (pr.tech || []).forEach((t) => {
          const s = document.createElement("span");
          s.textContent = t;
          tech.appendChild(s);
        });

        const links = d.querySelector(".project-links");
        if (valid(pr.url)) links.appendChild(mkLink("Ver site ->", pr.url));
        if (valid(pr.repo)) links.appendChild(mkLink("Codigo ->", pr.repo));

        return d;
      })
    );
  }

  $("#contactLinks").replaceChildren(
    ...p.social
      .filter((s) => valid(s.url))
      .map((s) => mkLink(s.label, s.url))
  );

  observeReveal();
}

function mkLink(label, url) {
  const a = document.createElement("a");
  a.href = url;
  a.textContent = label;
  if (url.startsWith("http")) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }
  return a;
}

/* ---------- reveal on scroll ---------- */
let io;
function observeReveal() {
  io?.disconnect();
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        e.target.querySelectorAll(".bar > i").forEach((bar) => {
          bar.style.width = `${bar.dataset.level}%`;
        });
        io.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));
}

/* ---------- nav ---------- */
function initNav() {
  const nav = $(".nav");
  const toggle = $("#navToggle");
  const links = $(".nav-links");

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 12), { passive: true });

  const sections = $$("main section[id]");
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        $$(".nav-links a").forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  render();
  initNav();
});
