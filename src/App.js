// src/App.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ExternalLink,
  Server,
  Cloud,
  Boxes,
  Terminal,
  Rocket,
  Moon,
  Sun,
  Cpu,
  X,
  Filter,
  ChevronDown,
} from "lucide-react";
import data from "./data/portfolio";

// Icon map for quick chips
const ICONS = { Cloud, Boxes, Server, Terminal, Cpu };

// ====== Reusable UI Primitives ======
const Section = ({ id, title, icon: Icon, children, description }) => (
  <section id={id} className="py-24 scroll-mt-28">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto px-6"
    >
      <div className="flex items-center gap-3 mb-3">
        {Icon && <Icon className="w-6 h-6" />}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {description && (
        <p className="text-sm opacity-70 mb-8 max-w-3xl">{description}</p>
      )}
      {children}
    </motion.div>
  </section>
);

const Chip = ({ children, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center rounded-2xl border px-3 py-1 text-xs md:text-sm backdrop-blur-sm transition-all ${
      active
        ? "bg-sky-600 text-white border-sky-600 shadow"
        : "bg-white/60 dark:bg-white/5 border-black/10 dark:border-white/10 hover:scale-105"
    }`}
  >
    {children}
  </button>
);

const Card = ({ children, className = "", onMouseMove }) => (
  <div
    onMouseMove={onMouseMove}
    className={`rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm shadow-sm ${className}`}
  >
    {children}
  </div>
);

// ====== Fancy Interactions ======
function MagneticButton({ className = "", children, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(x, { stiffness: 200, damping: 15 });
  const ry = useSpring(y, { stiffness: 200, damping: 15 });
  const transform = useTransform([rx, ry], ([lx, ly]) => `translate(${lx}px, ${ly}px)`);

  function handleMouseMove(e) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const mx = e.clientX - (bounds.left + bounds.width / 2);
    const my = e.clientY - (bounds.top + bounds.height / 2);
    x.set(mx * 0.15);
    y.set(my * 0.15);
  }
  function reset() { x.set(0); y.set(0); }

  return (
    <motion.button
      ref={ref}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2 shadow-sm border border-black/10 dark:border-white/10 transition will-change-transform ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useTransform(y, [50, -50], [8, -8]);
  const ry = useTransform(x, [-50, 50], [-8, 8]);

  function onMouseMove(e) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const mx = e.clientX - (bounds.left + bounds.width / 2);
    const my = e.clientY - (bounds.top + bounds.height / 2);
    x.set(Math.max(-50, Math.min(50, mx)));
    y.set(Math.max(-50, Math.min(50, my)));
  }
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={`[perspective:1000px] will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Glow({ className = "" }) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-300/40 blur-3xl dark:bg-sky-600/20" />
      <div className="absolute -bottom-28 -right-10 h-80 w-80 rounded-full bg-indigo-300/40 blur-3xl dark:bg-indigo-600/20" />
      <div className="absolute top-1/2 left-1/3 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-600/20" />
    </div>
  );
}

// Scroll progress bar at top
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  const scaleX = useTransform(width, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 z-50"
    />
  );
}

// ====== Project Modal ======
function ProjectModal({ open, onClose, project }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="relative max-w-2xl w-full rounded-2xl border border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xl"
          >
            <button
              className="absolute top-3 right-3 p-2 rounded-lg border border-white/10 hover:bg-white/10"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project?.title}</h3>
              <p className="opacity-80 mb-4 text-sm leading-relaxed">{project?.description}</p>
              {project?.details && (
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {project.details.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              )}
              {project?.links?.length ? (
                <div className="flex gap-3 mt-5">
                  {project.links.map((l, i) => (
                    <a
                      key={i}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm underline underline-offset-4"
                    >
                      {l.label} <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ====== Page ======
export default function Portfolio() {
  // Theme toggle — keep hooks INSIDE the component
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // helper: enable smooth transition only for explicit toggle
  const smoothThemeFlip = (duration = 320) => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), duration);
  };

  // Personalize
  const name = data.name;
  const role = data.role;

  // Skills
  const skillsData = useMemo(() => data.skills, []);
  const skillTabs = Object.keys(skillsData);
  const [activeTab, setActiveTab] = useState(skillTabs[0]);

  // Projects
  const projects = data.projects;
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.type)))];
  const [activeCat, setActiveCat] = useState("All");
  const [modalProject, setModalProject] = useState(null);
  const filtered = projects.filter((p) => activeCat === "All" || p.type === activeCat);

  // Experience
  const experiences = data.experiences;
  const [openIdx, setOpenIdx] = useState(0);

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Animation variants
  const fadeUp = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 text-slate-900 dark:text-slate-100">
      <ScrollProgress />

      {/* Sticky Nav */}
      <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/40 border-b border-black/5 dark:border-white/10">
        <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">{name}</a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#skills" className="hover:opacity-70">Skills</a>
            <a href="#projects" className="hover:opacity-70">Projects</a>
            <a href="#experience" className="hover:opacity-70">Experience</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={data.socials?.github || "https://github.com/Aryaman200314"}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-xl border border-black/10 dark:border-white/10 hover:scale-105 transition"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={data.socials?.linkedin || "https://linkedin.com/in/aryaman-sharma-07a233233"}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-xl border border-black/10 dark:border-white/10 hover:scale-105 transition"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              className="p-2 rounded-xl border border-black/10 dark:border-white/10 hover:scale-105 transition"
              onClick={() => { smoothThemeFlip(); setDark((d) => !d); }}
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <header id="home" ref={heroRef} className="relative overflow-hidden">
        <Glow />
        <motion.div style={{ y: heroY }} className="max-w-6xl mx-auto px-6 pt-20 pb-16">
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs md:text-sm border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur"
          >
            <Rocket className="w-4 h-4" /> Open to exciting DevOps & Web projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-3xl md:text-5xl font-bold tracking-tight"
          >
            Hi, I’m {name}. I build <span className="text-sky-600 dark:text-sky-400">scalable cloud systems</span> and delightful UIs.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base md:text-lg opacity-80 max-w-2xl"
          >
            {role}. I focus on AWS, Kubernetes, CI/CD, and modern web apps. I love automating everything and crafting fast, accessible interfaces.
          </motion.p>

          {/* Quick skill chips from data.quickChips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {(data.quickChips || []).map(({ icon, label }, i) => {
              const Icon = ICONS[icon] || Terminal;
              return (
                <Chip key={i}>
                  <Icon className="w-4 h-4 mr-1" /> {label}
                </Chip>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton className="bg-slate-900 text-white dark:bg-white dark:text-slate-900">
              <a href="#projects" className="inline-flex items-center gap-2">
                View Projects <ArrowRight className="w-4 h-4" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href={data.resumeUrl || "/Aryaman_Resume.pdf"} className="inline-flex items-center gap-2">
                Download Resume
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </header>

      {/* About */}
      <Section id="about" title="About" icon={Terminal}>
        <TiltCard>
          <Card className="p-6">
            <p className="leading-relaxed opacity-90">{data.about}</p>
          </Card>
        </TiltCard>
      </Section>

      {/* Skills with Animated Tabs */}
      <Section id="skills" title="Skills" icon={Boxes} description="Switch categories to see my stack. The underline animates and items fade in.">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {skillTabs.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} className="relative px-3 py-1 text-sm">
              <span className={activeTab === t ? "opacity-100" : "opacity-60"}>{t}</span>
              {activeTab === t && (
                <motion.span layoutId="tab-underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-sky-500" />
              )}
            </button>
          ))}
        </div>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {skillsData[activeTab].map((i) => (
            <Chip key={i}>{i}</Chip>
          ))}
        </motion.div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" icon={Rocket} description="Filter by category. Hover cards tilt, click to see more details in a modal.">
        <div className="flex items-center gap-2 mb-5 text-sm opacity-70">
          <Filter className="w-4 h-4" /> Filter
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((c) => (
            <Chip key={c} onClick={() => setActiveCat(c)} active={activeCat === c}>
              {c}
            </Chip>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <motion.div key={p.title} {...fadeUp}>
              <TiltCard>
                <Card className="p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
                      <p className="text-sm opacity-80 leading-relaxed mb-3">{p.description}</p>
                    </div>
                    <Cpu className="w-5 h-5 opacity-60" />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.stack.map((s, i) => <Chip key={i}>{s}</Chip>)}
                  </div>
                  <div className="flex gap-3">
                    <MagneticButton onClick={() => setModalProject(p)} className="px-3 py-1">
                      Learn More
                    </MagneticButton>
                    {p.links?.map((l, i) => (
                      <a
                        key={i}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm underline underline-offset-4"
                      >
                        {l.label} <ExternalLink className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience" icon={Server} description="Click a card to expand responsibilities.">
        <div className="space-y-3">
          {experiences.map((e, idx) => {
            const open = openIdx === idx;
            return (
              <motion.div key={`${e.company}-${idx}`} layout onClick={() => setOpenIdx(open ? -1 : idx)} className="cursor-pointer">
                <Card className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">
                        {e.title} — {e.company}
                      </h3>
                      <p className="text-sm opacity-70">{e.period}</p>
                    </div>
                    <motion.div animate={{ rotate: open ? 180 : 0 }}>
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    </motion.div>
                  </div>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.ul
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="list-disc pl-5 mt-3 space-y-1 text-sm"
                      >
                        {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" icon={Mail} description="Quick email or socials. Buttons have magnetic hover.">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="opacity-90">Want to collaborate or hire me? I’m just a message away.</p>
            <div className="flex items-center gap-3">
              <MagneticButton
                as="a"
                className="px-4 py-2"
                onClick={() => (window.location.href = data.contactEmail || "200314arya@gmail.com")}
              >
                <Mail className="w-4 h-4" /> Email
              </MagneticButton>
              <MagneticButton className="px-4 py-2">
                <a
                  href={data.socials?.linkedin || "https://linkedin.com/in/aryaman-sharma-07a233233"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </MagneticButton>
              <MagneticButton className="px-4 py-2">
                <a
                  href={data.socials?.github || "https://github.com/Aryaman200314"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </MagneticButton>
            </div>
          </div>
        </Card>
      </Section>

      {/* Footer */}
      <footer className="py-12 relative">
        <Glow />
        <div className="max-w-6xl mx-auto px-6 text-xs opacity-70">
          © {new Date().getFullYear()} {name}. Built with React, TailwindCSS & Framer Motion.
        </div>
      </footer>

      {/* Modal */}
      <ProjectModal
        open={!!modalProject}
        onClose={() => setModalProject(null)}
        project={modalProject}
      />
    </div>
  );
}
