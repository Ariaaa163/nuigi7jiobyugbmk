import { createActor } from "@/backend";
import type { backendInterface } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Star,
  Trophy,
  Twitter,
  Users,
  Youtube,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
interface RegistrationForm {
  name: string;
  email: string;
  phone: string;
  interests: string;
  message: string;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "2,400+", label: "Members" },
  { value: "120+", label: "Projects" },
  { value: "80+", label: "Events" },
  { value: "15+", label: "Awards" },
];

const COMMUNITY_CARDS = [
  {
    name: "Aryan Mehta",
    role: "Tech Lead · AI & ML",
    achievement: "Built an AI crop-disease detector serving 3,000 farmers.",
    img: "https://i.pravatar.cc/120?img=11",
  },
  {
    name: "Priya Sharma",
    role: "Design Lead · UX Research",
    achievement: "Won National Design Challenge 2024 for inclusive fintech UI.",
    img: "https://i.pravatar.cc/120?img=47",
  },
  {
    name: "Rohan Verma",
    role: "Entrepreneur · EdTech",
    achievement: "Co-founded startup that secured ₹40L seed funding.",
    img: "https://i.pravatar.cc/120?img=15",
  },
  {
    name: "Sneha Patel",
    role: "Full-Stack Developer",
    achievement: "Open-source contribution with 1,200+ GitHub stars.",
    img: "https://i.pravatar.cc/120?img=32",
  },
  {
    name: "Kabir Singh",
    role: "Robotics & IoT",
    achievement: "Smart campus energy-saver project cut electricity by 30%.",
    img: "https://i.pravatar.cc/120?img=18",
  },
  {
    name: "Aisha Khan",
    role: "Data Science",
    achievement: "Published research on NLP in two international journals.",
    img: "https://i.pravatar.cc/120?img=44",
  },
];

const EVENTS = [
  {
    type: "Upcoming",
    title: "HackADYPU Spring 2025",
    desc: "48-hour hackathon — build solutions for real-world problems.",
    date: "20 June 2025",
    tag: "Hackathon",
  },
  {
    type: "Upcoming",
    title: "Startup Ignition Workshop",
    desc: "Learn to pitch, validate, and launch your startup idea fast.",
    date: "14 July 2025",
    tag: "Workshop",
  },
  {
    type: "Completed",
    title: "Design Sprint Challenge",
    desc: "72-hour design sprint across 200+ participants from 8 colleges.",
    date: "10 March 2025",
    tag: "Competition",
  },
  {
    type: "Completed",
    title: "Innovation Fair 2025",
    desc: "Showcased 60 projects to industry mentors and investors.",
    date: "5 April 2025",
    tag: "Exhibition",
  },
  {
    type: "Ongoing",
    title: "Climate Tech Initiative",
    desc: "Cross-disciplinary team building green-tech solutions for ADYPU.",
    date: "Jan – Aug 2025",
    tag: "Project",
  },
  {
    type: "Ongoing",
    title: "Youth Leadership Program",
    desc: "Monthly mentorship sessions with industry leaders.",
    date: "Monthly",
    tag: "Mentorship",
  },
];

const GALLERY_IMGS = [
  { src: "https://picsum.photos/seed/u25a/600/400", alt: "Hackathon night" },
  { src: "https://picsum.photos/seed/u25b/600/400", alt: "Team collaboration" },
  { src: "https://picsum.photos/seed/u25c/600/400", alt: "Award ceremony" },
  { src: "https://picsum.photos/seed/u25d/600/400", alt: "Workshop session" },
  { src: "https://picsum.photos/seed/u25e/600/400", alt: "Community meet" },
  { src: "https://picsum.photos/seed/u25f/600/400", alt: "Design sprint" },
  { src: "https://picsum.photos/seed/u25g/600/400", alt: "Innovation fair" },
  { src: "https://picsum.photos/seed/u25h/600/400", alt: "Startup pitch" },
  { src: "https://picsum.photos/seed/u25i/600/400", alt: "Tech talk" },
];

const TESTIMONIALS = [
  {
    quote:
      "Under 25 ADYPU didn't just give me opportunities — it gave me confidence. The hackathons and mentors changed how I think.",
    name: "Ananya Roy",
    role: "Computer Science, Batch 2024",
    img: "https://i.pravatar.cc/80?img=23",
  },
  {
    quote:
      "I joined as a freshman with zero industry experience. Within 6 months I had a funded project and a network of 300+ peers.",
    name: "Dhruv Kapoor",
    role: "Mechanical Engineering, Batch 2025",
    img: "https://i.pravatar.cc/80?img=13",
  },
  {
    quote:
      "The design-thinking workshops here are better than anything I've found online. My startup UI literally won a national award.",
    name: "Meera Joshi",
    role: "Design & Innovation, Batch 2024",
    img: "https://i.pravatar.cc/80?img=38",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-body font-semibold tracking-widest uppercase mb-3"
      style={{
        background: "rgba(212, 175, 55, 0.12)",
        color: "oklch(0.7 0.21 86)",
        border: "1px solid rgba(212, 175, 55, 0.25)",
      }}
    >
      {children}
    </span>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-2 my-2">
      <div
        className="h-0.5 w-8 rounded-full"
        style={{ background: "oklch(0.7 0.21 86)" }}
      />
      <div
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: "oklch(0.7 0.21 86)" }}
      />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function HomePage() {
  const { actor } = useActor<backendInterface>(createActor);
  const [form, setForm] = useState<RegistrationForm>({
    name: "",
    email: "",
    phone: "",
    interests: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [communityPage, setCommunityPage] = useState(0);
  const [quickMsg, setQuickMsg] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [quickMsgState, setQuickMsgState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleQuickMsgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setQuickMsgState("loading");
    try {
      await actor.submitRegistration({
        name: quickMsg.name,
        email: quickMsg.email,
        phone: "",
        interests: "contact",
        message: quickMsg.message,
      });
      setQuickMsgState("success");
      setQuickMsg({ name: "", email: "", message: "" });
    } catch {
      setQuickMsgState("error");
    }
  };

  const communityPerPage = 3;
  const communityPages = Math.ceil(COMMUNITY_CARDS.length / communityPerPage);
  const visibleCommunity = COMMUNITY_CARDS.slice(
    communityPage * communityPerPage,
    communityPage * communityPerPage + communityPerPage,
  );

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSubmitState("loading");
    try {
      await actor.submitRegistration({
        name: form.name,
        email: form.email,
        phone: form.phone,
        interests: form.interests,
        message: form.message,
      });
      setSubmitState("success");
      setForm({ name: "", email: "", phone: "", interests: "", message: "" });
    } catch {
      setSubmitState("error");
    }
  };

  const goldText = { color: "oklch(0.7 0.21 86)" };
  const blueDeep = { color: "oklch(0.12 0.01 264)" };

  return (
    <div id="hero" className="scroll-smooth">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        data-ocid="hero.section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <img
          src="/assets/generated/hero-bg.jpg"
          alt="Under 25 ADYPU community"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(12,18,42,0.88) 0%, rgba(30,58,138,0.75) 60%, rgba(12,18,42,0.92) 100%)",
          }}
        />
        {/* Radial gold glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 60%, rgba(212,175,55,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="relative container text-center px-4 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Glow logo badge */}
            <div className="flex justify-center mb-8">
              <div
                className="px-6 py-3 rounded-full font-display font-bold text-5xl sm:text-7xl md:text-8xl tracking-tight animate-glow-pulse"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.7 0.21 86), oklch(0.85 0.18 75), oklch(0.6 0.18 70))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 30px rgba(212,175,55,0.5))",
                }}
              >
                Under 25
              </div>
            </div>
            <div
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] uppercase mb-6"
              style={{ color: "rgba(255,255,255,0.95)" }}
            >
              ADYPU
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="font-body text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Where Young Minds Build the Future
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              type="button"
              data-ocid="hero.join_button"
              onClick={() =>
                document
                  .querySelector("#join")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="button-gold text-base px-8 py-4"
            >
              Join the Movement
            </button>
            <button
              type="button"
              data-ocid="hero.explore_button"
              onClick={() =>
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 rounded-lg font-body font-semibold text-base border transition-smooth hover:-translate-y-0.5"
              style={{
                borderColor: "rgba(212,175,55,0.4)",
                color: "rgba(255,255,255,0.9)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              Explore More
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="glass-card px-4 py-5 flex flex-col items-center"
                data-ocid={`hero.stat.${s.label.toLowerCase()}`}
              >
                <span
                  className="font-display font-bold text-2xl"
                  style={goldText}
                >
                  {s.value}
                </span>
                <span className="font-body text-xs text-foreground/60 mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section
        id="about"
        data-ocid="about.section"
        className="py-24 bg-background"
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel>Who We Are</SectionLabel>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-2">
                About Us
              </h2>
              <GoldDivider />
              <p className="font-body text-foreground/70 leading-relaxed mb-6">
                Under 25 ADYPU is a youth innovation brand at Ajeenkya D.Y.
                Patil University — where curious minds collide with ambitious
                projects. We are a community of builders, dreamers, and
                disruptors who believe the next great ideas come from students
                under 25.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                {[
                  {
                    icon: Rocket,
                    title: "Mission",
                    id: "mission",
                    text: "Empower young innovators with the tools, mentors, and community to ship real-world solutions.",
                  },
                  {
                    icon: Star,
                    title: "Vision",
                    id: "vision",
                    text: "Become India's most celebrated student innovation ecosystem — fueling the startup generation.",
                  },
                  {
                    icon: Users,
                    title: "Culture",
                    id: "culture",
                    text: "Inclusive, collaborative, and merit-driven. Every voice counts, every idea matters.",
                  },
                  {
                    icon: Trophy,
                    title: "Impact",
                    id: "impact",
                    text: "20+ award-winning projects, 15+ industry partnerships, and counting.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-4"
                    data-ocid={`about.card.${i + 1}`}
                  >
                    <item.icon size={20} className="mb-2 text-accent" />
                    <h3 className="font-display font-bold text-sm text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-foreground/60 leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div
                className="rounded-2xl overflow-hidden aspect-[4/3] relative"
                style={{
                  boxShadow:
                    "0 20px 60px rgba(30,58,138,0.3), 0 0 40px rgba(212,175,55,0.1)",
                }}
              >
                <img
                  src="https://picsum.photos/seed/about25/800/600"
                  alt="Under 25 ADYPU team"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(12,18,42,0.7) 100%)",
                  }}
                />
              </div>
              {/* Floating accent */}
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl flex items-center justify-center animate-float"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.7 0.21 86), oklch(0.6 0.18 70))",
                  boxShadow: "0 8px 30px rgba(212,175,55,0.4)",
                }}
              >
                <Zap size={28} style={blueDeep} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ────────────────────────────────────────────────────── */}
      <section
        id="community"
        data-ocid="community.section"
        className="py-24"
        style={{ background: "oklch(var(--muted) / 0.3)" }}
      >
        <div className="container">
          <div className="text-center mb-12">
            <SectionLabel>Our People</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
              Community Showcase
            </h2>
            <p className="font-body text-foreground/60 max-w-xl mx-auto">
              Meet the innovators, builders, and changemakers shaping tomorrow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {visibleCommunity.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 hover:shadow-glow-blue transition-smooth group"
                data-ocid={`community.card.${communityPage * communityPerPage + i + 1}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-14 h-14 rounded-full object-cover border-2"
                    style={{ borderColor: "rgba(212,175,55,0.4)" }}
                  />
                  <div>
                    <h3 className="font-display font-bold text-base text-foreground">
                      {member.name}
                    </h3>
                    <p className="font-body text-xs text-accent">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className="font-body text-sm text-foreground/70 leading-relaxed">
                  {member.achievement}
                </p>
                <div
                  className="mt-4 text-xs font-body px-2 py-1 rounded-md inline-block"
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    color: "oklch(0.7 0.21 86)",
                  }}
                >
                  Premium Story
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              type="button"
              data-ocid="community.pagination_prev"
              onClick={() => setCommunityPage((p) => Math.max(0, p - 1))}
              disabled={communityPage === 0}
              className="p-2 rounded-lg border border-border/40 text-foreground/60 hover:text-accent hover:border-accent/40 transition-smooth disabled:opacity-30 bg-transparent"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: communityPages }, (_, i) => i).map(
              (pageIdx) => (
                <button
                  type="button"
                  key={`community-dot-${pageIdx}`}
                  data-ocid={`community.page.${pageIdx + 1}`}
                  onClick={() => setCommunityPage(pageIdx)}
                  className="w-2 h-2 rounded-full transition-smooth border-0"
                  style={{
                    background:
                      pageIdx === communityPage
                        ? "oklch(0.7 0.21 86)"
                        : "rgba(212,175,55,0.25)",
                  }}
                />
              ),
            )}
            <button
              type="button"
              data-ocid="community.pagination_next"
              onClick={() =>
                setCommunityPage((p) => Math.min(communityPages - 1, p + 1))
              }
              disabled={communityPage === communityPages - 1}
              className="p-2 rounded-lg border border-border/40 text-foreground/60 hover:text-accent hover:border-accent/40 transition-smooth disabled:opacity-30 bg-transparent"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── EVENTS ───────────────────────────────────────────────────────── */}
      <section
        id="events"
        data-ocid="events.section"
        className="py-24 bg-background"
      >
        <div className="container">
          <div className="text-center mb-12">
            <SectionLabel>Events & Projects</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
              Events & Projects Highlights
            </h2>
            <p className="font-body text-foreground/60 max-w-xl mx-auto">
              Hackathons, workshops, competitions, and ongoing real-world
              projects.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.map((ev, evIdx) => (
              <motion.div
                key={ev.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: evIdx * 0.1 }}
                className="glass-card p-6 hover:shadow-glow-blue transition-smooth group"
                data-ocid={`events.card.${evIdx + 1}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[10px] font-body font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{
                      background:
                        ev.type === "Upcoming"
                          ? "rgba(212,175,55,0.15)"
                          : ev.type === "Ongoing"
                            ? "rgba(66,135,245,0.15)"
                            : "rgba(255,255,255,0.08)",
                      color:
                        ev.type === "Upcoming"
                          ? "oklch(0.7 0.21 86)"
                          : ev.type === "Ongoing"
                            ? "oklch(0.7 0.18 264)"
                            : "oklch(0.6 0.02 0)",
                    }}
                  >
                    {ev.type}
                  </span>
                  <span
                    className="text-[10px] font-body px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "oklch(0.6 0.02 0)",
                    }}
                  >
                    {ev.tag}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {ev.title}
                </h3>
                <p className="font-body text-sm text-foreground/65 leading-relaxed mb-4">
                  {ev.desc}
                </p>
                <p className="font-body text-xs text-accent font-semibold">
                  {ev.date}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────────── */}
      <section
        id="gallery"
        data-ocid="gallery.section"
        className="py-24"
        style={{ background: "oklch(var(--muted) / 0.3)" }}
      >
        <div className="container">
          <div className="text-center mb-12">
            <SectionLabel>Gallery</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
              Moments That Matter
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {GALLERY_IMGS.map((img, imgIdx) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: imgIdx * 0.06 }}
                className="relative overflow-hidden rounded-xl group aspect-video"
                data-ocid={`gallery.item.${imgIdx + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Blue tint overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(30,58,138,0.5) 0%, rgba(12,18,42,0.3) 100%)",
                    opacity: 0.4,
                  }}
                />
                {/* Gold corner accent */}
                <div
                  className="absolute bottom-2 right-2 w-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "oklch(0.7 0.21 86)" }}
                />
                <p className="absolute bottom-3 left-3 text-xs font-body text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.alt}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN US ───────────────────────────────────────────────────────── */}
      <section
        id="join"
        data-ocid="join.section"
        className="py-24 bg-background"
      >
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <SectionLabel>Join Us</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
              Become Part of the Movement
            </h2>
            <p className="font-body text-foreground/60">
              Fill in the form below and we'll get in touch with your onboarding
              details.
            </p>
          </div>

          <div
            className="glass-card p-8 sm:p-10"
            style={{
              boxShadow:
                "0 20px 60px rgba(30,58,138,0.2), 0 0 40px rgba(212,175,55,0.08)",
            }}
          >
            {submitState === "success" ? (
              <div className="text-center py-12" data-ocid="join.success_state">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.7 0.21 86), oklch(0.6 0.18 70))",
                  }}
                >
                  <Trophy size={28} style={blueDeep} />
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                  You're In!
                </h3>
                <p className="font-body text-foreground/60">
                  Welcome to Under 25 ADYPU. We'll reach out within 48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitState("idle")}
                  className="mt-6 button-gold text-sm"
                >
                  Register Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-ocid="join.form">
                <div className="mb-5">
                  <label
                    htmlFor="join-name"
                    className="block text-xs font-body font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider"
                  >
                    Full Name
                  </label>
                  <input
                    id="join-name"
                    type="text"
                    name="name"
                    data-ocid="join.name_input"
                    required
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="Aryan Mehta"
                    className="w-full px-4 py-3 rounded-lg font-body text-sm text-foreground bg-transparent border border-border/50 focus:border-accent focus:outline-none transition-colors duration-200 placeholder:text-foreground/30"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="join-email"
                    className="block text-xs font-body font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <input
                    id="join-email"
                    type="email"
                    name="email"
                    data-ocid="join.email_input"
                    required
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="aryan@adypu.edu.in"
                    className="w-full px-4 py-3 rounded-lg font-body text-sm text-foreground bg-transparent border border-border/50 focus:border-accent focus:outline-none transition-colors duration-200 placeholder:text-foreground/30"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="join-phone"
                    className="block text-xs font-body font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider"
                  >
                    Phone Number
                  </label>
                  <input
                    id="join-phone"
                    type="tel"
                    name="phone"
                    data-ocid="join.phone_input"
                    value={form.phone}
                    onChange={handleFormChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-lg font-body text-sm text-foreground bg-transparent border border-border/50 focus:border-accent focus:outline-none transition-colors duration-200 placeholder:text-foreground/30"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="join-interests"
                    className="block text-xs font-body font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider"
                  >
                    Area of Interest
                  </label>
                  <select
                    id="join-interests"
                    name="interests"
                    data-ocid="join.interest_select"
                    required
                    value={form.interests}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-lg font-body text-sm text-foreground bg-card border border-border/50 focus:border-accent focus:outline-none transition-colors duration-200"
                  >
                    <option value="">Select your interest</option>
                    <option value="tech">Technology & AI</option>
                    <option value="design">Design & UX</option>
                    <option value="startup">Entrepreneurship</option>
                    <option value="research">Research & Innovation</option>
                    <option value="social">Social Impact</option>
                  </select>
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="join-message"
                    className="block text-xs font-body font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider"
                  >
                    Why do you want to join?
                  </label>
                  <textarea
                    id="join-message"
                    name="message"
                    data-ocid="join.message_textarea"
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Tell us about your passion and what you'd like to build…"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg font-body text-sm text-foreground bg-transparent border border-border/50 focus:border-accent focus:outline-none transition-colors duration-200 placeholder:text-foreground/30 resize-none"
                  />
                </div>

                {submitState === "error" && (
                  <p
                    className="text-sm font-body text-destructive mb-4"
                    data-ocid="join.error_state"
                  >
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  data-ocid="join.submit_button"
                  disabled={submitState === "loading"}
                  className="button-gold w-full text-base py-4 disabled:opacity-60"
                >
                  {submitState === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                        data-ocid="join.loading_state"
                      />
                      Submitting…
                    </span>
                  ) : (
                    "Sign Up Now"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section
        id="testimonials"
        data-ocid="testimonials.section"
        className="py-24"
        style={{ background: "oklch(var(--muted) / 0.3)" }}
      >
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
              Testimonials Carousel
            </h2>
          </div>

          <div className="relative">
            <motion.div
              key={testimonialIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 sm:p-12 text-center"
              data-ocid={`testimonials.card.${testimonialIdx + 1}`}
              style={{
                boxShadow:
                  "0 20px 60px rgba(30,58,138,0.2), 0 0 40px rgba(212,175,55,0.06)",
              }}
            >
              <div
                className="text-5xl font-display leading-none mb-4"
                style={goldText}
              >
                "
              </div>
              <p className="font-body text-lg sm:text-xl text-foreground/85 leading-relaxed mb-8 max-w-2xl mx-auto">
                {TESTIMONIALS[testimonialIdx].quote}
              </p>
              <div className="flex items-center justify-center gap-3">
                <img
                  src={TESTIMONIALS[testimonialIdx].img}
                  alt={TESTIMONIALS[testimonialIdx].name}
                  className="w-12 h-12 rounded-full object-cover border-2"
                  style={{ borderColor: "rgba(212,175,55,0.5)" }}
                />
                <div className="text-left">
                  <p className="font-display font-bold text-sm text-foreground">
                    {TESTIMONIALS[testimonialIdx].name}
                  </p>
                  <p className="font-body text-xs text-accent">
                    {TESTIMONIALS[testimonialIdx].role}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                data-ocid="testimonials.pagination_prev"
                onClick={() =>
                  setTestimonialIdx(
                    (i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
                  )
                }
                className="p-2 rounded-lg border border-border/40 text-foreground/60 hover:text-accent hover:border-accent/40 transition-smooth bg-transparent"
              >
                <ChevronLeft size={18} />
              </button>
              {TESTIMONIALS.map((t, i) => (
                <button
                  type="button"
                  key={t.name}
                  data-ocid={`testimonials.dot.${i + 1}`}
                  onClick={() => setTestimonialIdx(i)}
                  className="w-2 h-2 rounded-full transition-smooth border-0"
                  style={{
                    background:
                      i === testimonialIdx
                        ? "oklch(0.7 0.21 86)"
                        : "rgba(212,175,55,0.25)",
                  }}
                />
              ))}
              <button
                type="button"
                data-ocid="testimonials.pagination_next"
                onClick={() =>
                  setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length)
                }
                className="p-2 rounded-lg border border-border/40 text-foreground/60 hover:text-accent hover:border-accent/40 transition-smooth bg-transparent"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        data-ocid="contact.section"
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, oklch(var(--background)) 0%, oklch(var(--card)) 100%)",
        }}
      >
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Contact info */}
            <div data-ocid="contact.info">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="font-display font-bold text-3xl text-foreground mb-4">
                Get in Touch
              </h2>
              <GoldDivider />
              <div className="mt-6 space-y-4">
                {[
                  { icon: Phone, text: "+91 20 1234 5678", id: "phone" },
                  { icon: Mail, text: "hello@under25adypu.in", id: "email" },
                  {
                    icon: MapPin,
                    text: "Ajeenkya D.Y. Patil University, Pune",
                    id: "address",
                  },
                ].map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(212,175,55,0.12)" }}
                    >
                      <item.icon size={14} style={goldText} />
                    </div>
                    <span className="font-body text-sm text-foreground/70">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div data-ocid="contact.socials">
              <h3 className="font-display font-bold text-xl text-foreground mb-4 mt-1">
                Social Us
              </h3>
              <GoldDivider />
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  {
                    icon: Instagram,
                    label: "Instagram",
                    handle: "@under25adypu",
                    href: "https://www.instagram.com/under25adypu",
                  },
                  {
                    icon: Twitter,
                    label: "Twitter / X",
                    handle: "@under25adypu",
                    href: "https://twitter.com/under25adypu",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    handle: "Under 25 ADYPU",
                    href: "https://www.linkedin.com/company/under25adypu",
                  },
                  {
                    icon: Youtube,
                    label: "YouTube",
                    handle: "Under 25 ADYPU",
                    href: "https://www.youtube.com/@under25adypu",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-3 flex items-center gap-2 hover:shadow-glow-gold transition-smooth group"
                    data-ocid={`contact.social.${s.label.toLowerCase().replace(/[\s/]/g, "_")}`}
                    aria-label={`${s.label}: ${s.handle}`}
                  >
                    <s.icon
                      size={16}
                      className="group-hover:text-accent transition-colors duration-200 text-foreground/60"
                    />
                    <div>
                      <p className="font-body text-[11px] font-semibold text-foreground/80">
                        {s.label}
                      </p>
                      <p className="font-body text-[10px] text-foreground/40">
                        {s.handle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick contact form */}
            <div data-ocid="contact.quick_form">
              <h3 className="font-display font-bold text-xl text-foreground mb-4 mt-1">
                Quick Message
              </h3>
              <GoldDivider />
              <form className="mt-6 space-y-3" onSubmit={handleQuickMsgSubmit}>
                <input
                  type="text"
                  data-ocid="contact.name_input"
                  placeholder="Your Name"
                  value={quickMsg.name}
                  onChange={(e) =>
                    setQuickMsg((q) => ({ ...q, name: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-3 rounded-lg font-body text-sm text-foreground bg-transparent border border-border/50 focus:border-accent focus:outline-none transition-colors duration-200 placeholder:text-foreground/30"
                />
                <input
                  type="email"
                  data-ocid="contact.email_input"
                  placeholder="Email Address"
                  value={quickMsg.email}
                  onChange={(e) =>
                    setQuickMsg((q) => ({ ...q, email: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-3 rounded-lg font-body text-sm text-foreground bg-transparent border border-border/50 focus:border-accent focus:outline-none transition-colors duration-200 placeholder:text-foreground/30"
                />
                <textarea
                  data-ocid="contact.message_textarea"
                  placeholder="Your message…"
                  rows={4}
                  value={quickMsg.message}
                  onChange={(e) =>
                    setQuickMsg((q) => ({ ...q, message: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-3 rounded-lg font-body text-sm text-foreground bg-transparent border border-border/50 focus:border-accent focus:outline-none transition-colors duration-200 placeholder:text-foreground/30 resize-none"
                />
                {quickMsgState === "success" && (
                  <p
                    data-ocid="contact.success_state"
                    className="text-sm font-body text-green-400"
                  >
                    Message sent! We'll get back to you soon.
                  </p>
                )}
                {quickMsgState === "error" && (
                  <p
                    data-ocid="contact.error_state"
                    className="text-sm font-body text-red-400"
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={quickMsgState === "loading"}
                  className="button-gold w-full text-sm disabled:opacity-60"
                >
                  {quickMsgState === "loading" ? "Sending…" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
