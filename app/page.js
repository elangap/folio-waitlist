"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Home() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  const [position, setPosition] = useState(null)
  const [focused, setFocused] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("loading")

    const { count } = await supabase
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
      setPosition(count + 1)
      setStatus("success")
    }
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white overflow-hidden relative">

      <div className="absolute inset-0 pointer-events-none">
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
          <span className="text-xs text-gray-400">Early access open</span>
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

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={5}
        className="relative z-10 flex justify-center pb-16 px-6"
      >
        <div className="w-full max-w-3xl bg-white/3 border border-white/8 rounded-3xl p-8 backdrop-blur">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { number: "5 min", label: "Average build time" },
              { number: "10k+", label: "Portfolios created" },
              { number: "98%", label: "Satisfaction rate" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  {stat.number}
                </p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </main>
  )
}