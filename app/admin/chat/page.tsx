"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSession } from "next-auth/react"

interface Message {
    id: string
    text: string
    sender: string
    isAdmin: boolean
    createdAt: string
}

interface ChatSession {
    id: string
    userName: string | null
    userEmail: string | null
    status: string
    updatedAt: string
    createdAt: string
    messages: Message[]
}

export default function AdminChatPage() {
    const { data: session } = useSession()
    const [sessions, setSessions] = useState<ChatSession[]>([])
    const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null)
    const [reply, setReply] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const scrollRef = useRef<HTMLDivElement>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3")
    }, [])

    const playNotification = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch(() => { })
        }
    }

    // Fetch all sessions
    const fetchSessions = async () => {
        try {
            const res = await fetch("/api/chat/sessions")
            const data = await res.json()

            // Check for new messages from users in any session
            const hasNewUserMessage = data.some((s: ChatSession) => {
                const existing = sessions.find(es => es.id === s.id)
                if (!existing) return s.messages.some(m => !m.isAdmin)
                return s.messages.length > existing.messages.length && s.messages[0] && !s.messages[0].isAdmin
            })

            // Note: In sessions list API we only take(1) message, so we check that one
            const currentTotalMessages = sessions.reduce((acc, s) => acc + (s.messages[0] ? 1 : 0), 0)
            const newTotalMessages = data.reduce((acc: number, s: ChatSession) => acc + (s.messages[0] ? 1 : 0), 0)

            if (newTotalMessages > currentTotalMessages || hasNewUserMessage) {
                // Check if the most recent message in any session is from a user and it's new
                data.forEach((s: ChatSession) => {
                    const oldS = sessions.find(os => os.id === s.id)
                    const latestMsg = s.messages[0]
                    if (latestMsg && !latestMsg.isAdmin) {
                        if (!oldS || (oldS.messages[0]?.id !== latestMsg.id)) {
                            playNotification()
                        }
                    }
                })
            }

            setSessions(data)

            // If we have a selected session, update its messages
            if (selectedSession) {
                const updated = data.find((s: ChatSession) => s.id === selectedSession.id)
                if (updated) {
                    // Fetch full history for selected
                    const resFull = await fetch(`/api/chat/session/${selectedSession.id}`)
                    const fullData = await resFull.json()
                    setSelectedSession(fullData)
                }
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchSessions()
        const interval = setInterval(fetchSessions, 5000)
        return () => clearInterval(interval)
    }, [selectedSession?.id])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [selectedSession?.messages])

    const handleSendReply = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!reply.trim() || !selectedSession) return

        const text = reply
        setReply("")

        try {
            await fetch("/api/chat/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId: selectedSession.id,
                    text: text,
                    sender: "Admin",
                    isAdmin: true
                })
            })
            fetchSessions()
        } catch (err) {
            console.error(err)
        }
    }

    if (isLoading && sessions.length === 0) {
        return (
            <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-[#050505]">
                <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex h-[calc(100vh-80px)] bg-[#050505] text-white overflow-hidden">
            {/* Sidebar: Conversations List */}
            <aside className="w-80 border-r border-white/5 bg-[#080808] flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-xl font-black uppercase tracking-tighter">Transmissions</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Live Support Queue</p>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    {sessions.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setSelectedSession(s)}
                            className={`w-full p-6 text-left border-b border-white/5 transition-all hover:bg-white/5 relative group ${selectedSession?.id === s.id ? "bg-white/5" : ""
                                }`}
                        >
                            {selectedSession?.id === s.id && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                            )}
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-sm font-black uppercase tracking-tight text-slate-200">
                                    {s.userName || "Guest User"}
                                </span>
                                <span className="text-[9px] text-slate-600 font-bold">
                                    {new Date(s.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate font-medium">
                                {s.messages[0]?.text || "No messages yet"}
                            </p>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col bg-[#050505] relative">
                <AnimatePresence mode="wait">
                    {selectedSession ? (
                        <motion.div
                            key={selectedSession.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex-1 flex flex-col"
                        >
                            {/* Chat Header */}
                            <div className="p-6 border-b border-white/5 bg-[#080808]/50 backdrop-blur-xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">person</span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black uppercase tracking-widest leading-none">
                                            {selectedSession.userName || "Guest User"}
                                        </h3>
                                        <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-tight">
                                            {selectedSession.userEmail || "No email provided"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                        Mark Done
                                    </button>
                                </div>
                            </div>

                            {/* Messages List */}
                            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                                {selectedSession.messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`flex flex-col ${msg.isAdmin ? "items-end" : "items-start"} max-w-[70%]`}>
                                            <div
                                                className={`p-4 rounded-2xl text-[13px] font-medium leading-relaxed shadow-lg ${msg.isAdmin
                                                    ? "bg-primary text-white rounded-tr-none"
                                                    : "bg-white/5 text-slate-300 border border-white/5 rounded-tl-none backdrop-blur-md"
                                                    }`}
                                            >
                                                {msg.text}
                                            </div>
                                            <span className="text-[9px] text-slate-600 font-bold mt-2 uppercase tracking-widest">
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Reply Input */}
                            <div className="p-6 bg-[#080808] border-t border-white/5">
                                <form onSubmit={handleSendReply} className="flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="Type your response..."
                                        value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-slate-600 shadow-inner"
                                    />
                                    <button
                                        type="submit"
                                        className="px-8 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-[0_10px_20px_-10px_rgba(175,18,37,0.5)] flex items-center gap-2"
                                    >
                                        Send
                                        <span className="material-symbols-outlined text-sm">send</span>
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                            <div className="size-20 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-8 text-slate-400">
                                <span className="material-symbols-outlined text-4xl">chat_bubble</span>
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-slate-300">Awaiting Signal</h2>
                            <p className="text-slate-500 text-sm max-w-sm font-medium leading-relaxed">
                                Select a transmission from the sidebar to begin operational support.
                            </p>
                        </div>
                    )}
                </AnimatePresence>
            </main>

            {/* Right Sidebar: User Intel */}
            {selectedSession && (
                <aside className="w-80 border-l border-white/5 bg-[#080808] p-8">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 border-l-2 border-primary pl-4">User Intel</h3>
                    <div className="space-y-8">
                        <div>
                            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-2">Identifier</p>
                            <p className="text-xs font-black text-slate-200">{selectedSession.userName || "Unknown Operative"}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-2">Email Hash</p>
                            <p className="text-xs font-black text-slate-200 break-all">{selectedSession.userEmail || "No encrypted contact"}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-2">Session Start</p>
                            <p className="text-xs font-black text-slate-200">{new Date(selectedSession.createdAt).toLocaleString()}</p>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <button className="w-full h-12 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-sm text-primary">history</span>
                                View Order History
                            </button>
                        </div>
                    </div>
                </aside>
            )}
        </div>
    )
}
