"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion"
import { supabase } from "@/lib/supabase"

const glass = {
  background: "rgba(255,255,255,0.45)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
}

const glassNav = {
  background: "rgba(255,255,255,0.7)",
  backdropFilter: "blur(40px) saturate(200%)",
  WebkitBackdropFilter: "blur(40px) saturate(200%)",
  borderBottom: "1px solid rgba(255,255,255,0.5)",
  boxShadow: "0 1px 0 rgba(0,0,0,0.05)",
}

const glassCard = {
  background: "rgba(255,255,255,0.5)",
  backdropFilter: "blur(24px) saturate(160%)",
  WebkitBackdropFilter: "blur(24px) saturate(160%)",
  border: "1px solid rgba(255,255,255,0.7)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
}

const glassInput = {
  background: "rgba(255,255,255,0.6)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.8)",
  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06)",
}

const blobs = [
  { width: 500, height: 500, background: "radial-gradient(circle, #a78bfa, #7c3aed)", top: -100, left: -100, delay: "0s" },
  { width: 400, height: 400, background: "radial-gradient(circle, #f9a8d4, #ec4899)", top: 200, right: -100, delay: "-3s" },
  { width: 350, height: 350, background: "radial-gradient(circle, #93c5fd, #3b82f6)", bottom: 100, left: "30%", delay: "-5s" },
  { width: 300, height: 300, background: "radial-gradient(circle, #6ee7b7, #10b981)", top: "50%", left: -50, delay: "-2s" },
]

function AnimatedNumber({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { duration: 2000, bounce: 0 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) motionVal.set(value)
  }, [inView, value, motionVal])

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)))
  }, [spring])

  return <span ref={ref}>{display.toLocaleString()}</span>
}

const features = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    title: "Built in 5 minutes",
    desc: "Answer a few questions and Folio generates your entire portfolio instantly.",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    title: "Stunning designs",
    desc: "Choose from dozens of templates crafted by world-class designers.",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    title: "AI-powered content",
    desc: "Folio writes your bio, project descriptions, and case studies for you.",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    title: "Custom domain",
    desc: "Publish to your own domain with one click. yourname.com in seconds.",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    title: "Analytics built-in",
    desc: "See who viewed your portfolio, where they came from, and what they clicked.",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    title: "Always up to date",
    desc: "Connect your GitHub, Dribbble, or LinkedIn and Folio updates automatically.",
  },
]

const testimonials = [
  { name: "Sarah K.", role: "Product Designer", text: "I built my entire portfolio in 4 minutes. Got 3 job offers the next week." },
  { name: "Marcus T.", role: "Full Stack Developer", text: "Finally a portfolio that doesn't look like every other developer site." },
  { name: "Priya R.", role: "UX Researcher", text: "The AI wrote better case studies than I could have written myself." },
  { name: "James L.", role: "Freelance Designer", text: "Landed my biggest client ever after sharing my Folio portfolio." },
]

export default function Home() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  const [position, setPosition] = useState(null)
  const [focused, setFocused] = useState(false)
  const [count, setCount] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const GOAL = 500

  useEffect(() => {
    async function fetchCount() {
      const { count } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true })
      setCount(count || 0)
    }
    fetchCount()
    const channel = supabase
      .channel("waitlist-count")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "waitlist" }, () => fetchCount())
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("loading")
    const { count: currentCount } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
    const { error } = await supabase
      .from("waitlist")
      .insert([{ email }])
    if (error) {
      setStatus(error.code === "23505" ? "duplicate" : "error")
    } else {
      setPosition(currentCount + 1)
      setStatus("success")
    }
  }

  function shareOnTwitter() {
    const text = `Just joined the waitlist for Folio — AI-powered portfolio builder. Join me: https://folio-waitlist.vercel.app`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank")
  }

  function shareOnLinkedIn() {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://folio-waitlist.vercel.app")}`, "_blank")
  }

  const progress = Math.min((count / GOAL) * 100, 100)

  return (
    <main style={{ minHeight: "100vh", color: "#1d1d1f", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #faf5ff 0%, #fce7f3 25%, #eff6ff 50%, #f0fdf4 75%, #fefce8 100%)" }}>

      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        {blobs.map((blob, i) => (
          <div key={i} style={{
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(80px)",
            opacity: 0.5,
            width: blob.width,
            height: blob.height,
            background: blob.background,
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            animation: `float 8s ease-in-out infinite`,
            animationDelay: blob.delay,
          }} />
        ))}
      </div>

      <nav style={{ ...glassNav, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", padding: "0 24px", height: 48, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: "#1d1d1f", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: 10, fontWeight: 900 }}>F</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em" }}>Folio</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ ...glass, borderRadius: 999, padding: "4px 12px", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontSize: 12, color: "#6e6e73" }}>{count} joined</span>
          </motion.div>
        </div>
      </nav>

      <section style={{ position: "relative", zIndex: 10, maxWidth: 1024, margin: "0 auto", padding: "96px 24px 64px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ ...glass, display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "6px 16px", marginBottom: 32 }}>
          <span style={{ fontSize: 12, color: "#6e6e73", fontWeight: 500 }}>Introducing Folio 1.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 24 }}
        >
          Your portfolio,
          <br />
          <span style={{ color: "#6e6e73" }}>built by AI.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ fontSize: 18, color: "#6e6e73", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.6 }}>
          Stop spending weeks on your portfolio. Folio builds a stunning, personalized portfolio in under 5 minutes.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ maxWidth: 360, margin: "0 auto 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6e6e73", marginBottom: 8 }}>
            <span>{count} of {GOAL} early spots</span>
            <span>{Math.round(progress)}% claimed</span>
          </div>
          <div style={{ width: "100%", borderRadius: 999, height: 4, overflow: "hidden", background: "rgba(0,0,0,0.08)" }}>
            <motion.div
              style={{ height: "100%", borderRadius: 999, background: "linear-gradient(90deg, #7c3aed, #ec4899)" }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ ...glass, borderRadius: 24, padding: 32, maxWidth: 320, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
            >
              <div style={{ ...glass, width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 600 }}>You're on the list.</h2>
              <p style={{ fontSize: 14, color: "#6e6e73" }}>
                You're <strong style={{ color: "#1d1d1f" }}>#{position}</strong> on the waitlist.
              </p>
              <div style={{ display: "flex", gap: 8, width: "100%" }}>
                <motion.button onClick={shareOnTwitter} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ ...glass, flex: 1, borderRadius: 12, padding: "8px 0", fontSize: 12, fontWeight: 500, cursor: "pointer", border: "none" }}>
                  Twitter
                </motion.button>
                <motion.button onClick={shareOnLinkedIn} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ ...glass, flex: 1, borderRadius: 12, padding: "8px 0", fontSize: 12, fontWeight: 500, cursor: "pointer", border: "none" }}>
                  LinkedIn
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleSubmit}
              style={{ display: "flex", gap: 8, maxWidth: 360, margin: "0 auto" }}
            >
              <motion.div
                style={{ flex: 1, borderRadius: 12, overflow: "hidden", ...glassInput }}
                animate={{ boxShadow: focused ? "0 0 0 3px rgba(124,58,237,0.2), inset 0 1px 3px rgba(0,0,0,0.06)" : "inset 0 1px 3px rgba(0,0,0,0.06)" }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  required
                  style={{ width: "100%", background: "transparent", padding: "12px 16px", fontSize: 14, color: "#1d1d1f", border: "none", outline: "none" }}
                />
              </motion.div>
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: "12px 20px", borderRadius: 12, fontSize: 14, fontWeight: 500, color: "white", background: "linear-gradient(135deg, #7c3aed, #ec4899)", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
              >
                {status === "loading" ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 12, height: 12, border: "1.5px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                    Joining
                  </span>
                ) : "Join waitlist"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {status === "duplicate" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, color: "#6e6e73", marginTop: 12 }}>
            Already on the list.
          </motion.p>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 24, fontSize: 12, color: "#aeaeb2" }}>
          {["No credit card", "Free during beta", "Cancel anytime"].map((text) => (
            <span key={text}>{text}</span>
          ))}
        </motion.div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "0 24px 64px" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <div style={{ ...glass, borderRadius: 24, padding: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, textAlign: "center" }}>
              {[
                { number: 5, suffix: " min", label: "Average build time" },
                { number: 10000, suffix: "+", label: "Portfolios created" },
                { number: 98, suffix: "%", label: "Satisfaction rate" },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <p style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em" }}>
                    <AnimatedNumber value={stat.number} />{stat.suffix}
                  </p>
                  <p style={{ fontSize: 13, color: "#6e6e73", marginTop: 4 }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 11, color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500, marginBottom: 12 }}>Features</p>
            <h2 style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em" }}>Everything you need.</h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{ ...glassCard, borderRadius: 20, padding: 24, cursor: "default" }}
              >
                <div style={{ color: "#6e6e73", marginBottom: 16 }}>{feature.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{feature.title}</h3>
                <p style={{ fontSize: 13, color: "#6e6e73", lineHeight: 1.6 }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 11, color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500, marginBottom: 12 }}>Testimonials</p>
            <h2 style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em" }}>Loved by creators.</h2>
          </motion.div>

          <div style={{ ...glass, borderRadius: 24, padding: 32 }}>
            <div style={{ position: "relative", height: 160 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <p style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.5, letterSpacing: "-0.01em", marginBottom: 24 }}>
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "white", fontSize: 12, fontWeight: 600 }}>{testimonials[activeTestimonial].name.charAt(0)}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500 }}>{testimonials[activeTestimonial].name}</p>
                      <p style={{ fontSize: 12, color: "#6e6e73" }}>{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    height: 4,
                    width: i === activeTestimonial ? 24 : 4,
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    background: i === activeTestimonial ? "#7c3aed" : "rgba(0,0,0,0.15)",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "0 24px 128px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ ...glass, borderRadius: 32, padding: 48 }}
          >
            <h2 style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16 }}>Get early access.</h2>
            <p style={{ fontSize: 14, color: "#6e6e73", marginBottom: 32 }}>
              Join {count} others on the waitlist. First 500 users get lifetime free access.
            </p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 500, color: "white", background: "linear-gradient(135deg, #7c3aed, #ec4899)", border: "none", cursor: "pointer" }}
            >
              Join the waitlist
            </motion.button>
          </motion.div>
        </div>
      </section>

      <footer style={{ position: "relative", zIndex: 10, padding: "32px 24px" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "#aeaeb2" }}>Folio</span>
          <span style={{ fontSize: 12, color: "#aeaeb2" }}>2026</span>
        </div>
      </footer>

    </main>
  )
}