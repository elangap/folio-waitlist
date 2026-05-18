"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [waitlist, setWaitlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false })
      if (data) setWaitlist(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const filtered = waitlist.filter(w =>
    w.email.toLowerCase().includes(search.toLowerCase())
  )

  const today = waitlist.filter(w =>
    new Date(w.created_at).toDateString() === new Date().toDateString()
  ).length

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-700 border-t-violet-500 rounded-full animate-spin" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white p-8">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Admin</span>
            </div>
            <h1 className="text-3xl font-black tracking-tighter">Waitlist</h1>
          </div>
          <a href="/" className="text-xs text-gray-500 hover:text-white transition px-3 py-2 rounded-lg hover:bg-white/5">
            Back to site
          </a>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total", value: waitlist.length },
            { label: "Today", value: today },
            { label: "Goal", value: "500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/3 border border-white/8 rounded-2xl p-4">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          />
        </div>

        <div className="flex flex-col gap-2">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white/3 border border-white/8 rounded-xl px-5 py-3 flex justify-between items-center hover:border-white/15 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">
                  {item.email.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-300">{item.email}</span>
              </div>
              <span className="text-xs text-gray-600">
                #{item.id} · {new Date(item.created_at).toLocaleDateString("id-ID")}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  )
}