"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { supabase } from "@/lib/supabase"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

const features = [
  {
    icon: "⚡",
    title: "Built in 5 minutes",
    desc: "Answer a few questions and Folio generates your entire portfolio instantly.",
  },
  {
    icon: "🎨",
    title: "Stunning designs",
    desc: "Choose from dozens of templates crafted by world-class designers.",
  },
  {
    icon: "🤖",
    title: "AI-powered content",
    desc: "Folio writes your bio, project descriptions, and case studies for you.",
  },
  {
    icon: "🌐",
    title: "Custom domain",
    desc: "Publish to your own domain with one click. yourname.com in seconds.",
  },
  {
    icon: "📊",
    title: "Analytics built-in",
    desc: "See who viewed your portfolio, where they came from, and what they clicked.",
  },
  {
    icon: "🔒",
    title: "Always up to date",
    desc: "Connect your GitHub, Dribbble, or LinkedIn and Folio updates automatically.",
  },
]

export default function Home() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  const [position, setPosition] = useState(null)
  const [focused, setFocused] = useState(false)
  const [count, setCount] = useState(null)

  useEffect(() => {
    async function fetchCount() {
      const { count } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true })
      setCount(count)
    }
    fetchCount()

    const channel = supabase
      .channel("waitlist-count")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "waitlist" }, () => {
        fetchCount()
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
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
      if (error.code === "23505") {
        setStatus("duplicate")
      } else {
        setStatus("error")
      }
    } else {
      setPosition(currentCount + 1)
      setStatus("success")
    }
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white overflow-hidden">

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-violet-600/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <nav className="relative z-10 flex justify-between items-center px-8 py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
            <span className="text-black text-xs font-black">F</span>
          </div>
          <span className="font-semibold text-sm tracking-tight">Folio</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-gray-400">
            {count !== null ? `${count} joined` : "Early access open"}
          </span>
        </motion.div>
      </nav>

      <section className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="text-violet-400 text-xs font-medium">✦ Introducing Folio 1.0</span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6 max-w-4xl"
        >
          Your portfolio,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400">
            built by AI.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-gray-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
        >
          Stop spending weeks on your portfolio.
          Folio builds a stunning, personalized portfolio in under 5 minutes.
        </motion.p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-2xl mb-2">
                🎉
              </div>
              <h2 className="text-2xl font-bold">You're on the list!</h2>
              <p className="text-gray-400 text-sm">
                You're number{" "}
                <span className="text-violet-400 font-bold text-lg">#{position}</span>
                {" "}on the waitlist.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-px w-16 bg-white/10" />
                <span className="text-xs text-gray-600">share to move up</span>
                <div className="h-px w-16 bg-white/10" />
              </div>
              <div className="flex gap-3 mt-1">
                {["Twitter", "LinkedIn"].map((platform) => (
                  <button
                    key={platform}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-medium transition-all hover:scale-105 active:scale-95"
                  >
                    Share on {platform}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <div className="relative flex-1">
                <motion.div
                  animate={{
                    boxShadow: focused
                      ? "0 0 0 2px rgba(139, 92, 246, 0.5)"
                      : "0 0 0 1px rgba(255,255,255,0.1)",
                  }}
                  className="rounded-2xl overflow-hidden"
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required
                    className="w-full bg-white/5 backdrop-blur px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none"
                  />
                </motion.div>
              </div>
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl text-sm font-bold whitespace-nowrap disabled:opacity-50 shadow-lg shadow-violet-500/25"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Joining...
                  </span>
                ) : (
                  "Join Waitlist"
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {status === "duplicate" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-amber-400 text-xs mt-4"
          >
            This email is already on the waitlist.
          </motion.p>
        )}

        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-xs mt-4"
          >
            Something went wrong. Please try again.
          </motion.p>
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex items-center gap-6 mt-12 text-xs text-gray-600"
        >
          {["No credit card required", "Free during beta", "Cancel anytime"].map((text) => (
            <div key={text} className="flex items-center gap-1.5">
              <span className="text-violet-500">✓</span>
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs text-violet-400 uppercase tracking-widest font-semibold mb-4">Features</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Everything you need,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                nothing you don't.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/3 border border-white/8 rounded-2xl p-6 cursor-default"
              >
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <section className="relative z-10 px-6 pb-32">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 border border-violet-500/20 rounded-3xl p-12"
          >
            <p className="text-xs text-violet-400 uppercase tracking-widest font-semibold mb-4">
              Limited spots
            </p>
            <h2 className="text-4xl font-black tracking-tighter mb-4">
              Get early access.
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Join {count !== null ? count : "..."} others already on the waitlist.
              First 500 users get lifetime free access.
            </p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl text-sm font-bold shadow-lg shadow-violet-500/25"
            >
              Join the waitlist →
            </motion.button>
          </motion.div>
        </div>
      </section>

    </main>
  )
}