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

type ChatState = "home" | "chat"

export function LiveChat() {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [chatState, setChatState] = useState<ChatState>("home")
    const [message, setMessage] = useState("")
    const [chatSession, setChatSession] = useState<any>(null)
    const [messages, setMessages] = useState<Message[]>([])

    const scrollRef = useRef<HTMLDivElement>(null)

    // Resume session if exists
    const initSession = async () => {
        try {
            const res = await fetch("/api/chat/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: session?.user?.id,
                    userEmail: session?.user?.email,
                    userName: session?.user?.name
                })
            })
            const data = await res.json()
            setChatSession(data)
            setMessages(data.messages || [])
            if (data.messages?.length > 0) {
                setChatState("chat")
            }
        } catch (err) {
            console.error("Init Chat Error:", err)
        }
    }

    useEffect(() => {
        if (isOpen && !chatSession) {
            initSession()
        }
    }, [isOpen])

    // Poll for new messages
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isOpen && chatSession && chatState === "chat") {
            interval = setInterval(async () => {
                try {
                    const res = await fetch(`/api/chat/session/${chatSession.id}`)
                    const data = await res.json()
                    setMessages(data.messages || [])
                } catch (err) {
                    console.error("Poll Error:", err)
                }
            }, 3000)
        }
        return () => clearInterval(interval)
    }, [isOpen, chatSession?.id, chatState])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, chatState])

    const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
        if (e) e.preventDefault()
        const textToSend = customText || message
        if (!textToSend.trim() || !chatSession) return

        setMessage("")
        if (chatState === "home") setChatState("chat")

        try {
            const res = await fetch("/api/chat/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId: chatSession.id,
                    text: textToSend,
                    sender: session?.user?.name || "Guest",
                    isAdmin: false
                })
            })
            const newMessage = await res.json()
            setMessages(prev => [...prev, newMessage])
        } catch (err) {
            console.error("Send Error:", err)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-200 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="absolute bottom-20 right-0 w-[350px] md:w-[420px] h-[600px] bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-3xl"
                    >
                        {/* Dynamic Header */}
                        <div className={`p-8 transition-all duration-500 ${chatState === 'home' ? 'bg-linear-to-br from-primary/20 via-primary/5 to-transparent h-64' : 'bg-white/5 border-b border-white/10 p-6'}`}>
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-2xl bg-primary flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(175,18,37,0.5)]">
                                        <span className="material-symbols-outlined text-white text-2xl">support_agent</span>
                                    </div>
                                    {chatState === 'chat' && (
                                        <div>
                                            <h3 className="text-white text-xs font-black uppercase tracking-widest">Support Core</h3>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Live Response</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => setIsOpen(false)} className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-xl">close</span>
                                </button>
                            </div>

                            {chatState === 'home' && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="mt-4"
                                >
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                                        Ready for <br /><span className="text-primary italic">Transmission?</span>
                                    </h2>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                                        Active support line established. Estimated response: <span className="text-white">&lt; 3 mins</span>
                                    </p>
                                </motion.div>
                            )}

                            {chatState === 'chat' && (
                                <button
                                    onClick={() => setChatState("home")}
                                    className="absolute left-1/2 -bottom-4 -translate-x-1/2 px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all shadow-xl"
                                >
                                    Home Base
                                </button>
                            )}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-hidden flex flex-col relative">
                            <AnimatePresence mode="wait">
                                {chatState === 'home' ? (
                                    <motion.div
                                        key="home"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex-1 p-8 space-y-8 overflow-y-auto scrollbar-hide"
                                    >
                                        <div>
                                            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">New Connection</h4>
                                            <button
                                                onClick={() => setChatState("chat")}
                                                className="w-full group p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all text-left flex items-center justify-between"
                                            >
                                                <div>
                                                    <span className="block text-sm font-black text-white uppercase tracking-widest mb-1">Start Chat</span>
                                                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-tight">Open a line to the command center</span>
                                                </div>
                                                <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">east</span>
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Quick Protocols</h4>
                                            {[
                                                { label: "Check Order Status", icon: "package_2", query: "Can you check my order status?" },
                                                { label: "Pricing Inquiry", icon: "payments", query: "I have a question about pricing." },
                                                { label: "Become a Booster", icon: "stars", query: "How can I apply to work with you?" }
                                            ].map((item) => (
                                                <button
                                                    key={item.label}
                                                    onClick={() => handleSendMessage(undefined, item.query)}
                                                    className="w-full p-4 bg-white/3 border border-white/5 rounded-2xl hover:bg-white/5 transition-all flex items-center gap-4 text-left"
                                                >
                                                    <span className="material-symbols-outlined text-slate-500 text-lg">{item.icon}</span>
                                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="chat"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex-1 flex flex-col h-full"
                                    >
                                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                                            {messages.map((msg, idx) => (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    key={msg.id}
                                                    className={`flex ${!msg.isAdmin ? "justify-end" : "justify-start"}`}
                                                >
                                                    <div className={`max-w-[85%] ${!msg.isAdmin ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                                                        <div
                                                            className={`p-4 rounded-3xl text-[13px] font-medium leading-relaxed ${!msg.isAdmin
                                                                    ? "bg-linear-to-br from-primary to-primary-dark text-white rounded-tr-none shadow-lg shadow-primary/20"
                                                                    : "bg-white/5 text-slate-200 border border-white/10 rounded-tl-none"
                                                                }`}
                                                        >
                                                            {msg.text}
                                                        </div>
                                                        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest px-1">
                                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Input Box */}
                                        <div className="p-6 bg-[#080808] border-t border-white/5">
                                            <form onSubmit={handleSendMessage} className="flex gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Transmit data..."
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-slate-600 shadow-inner"
                                                />
                                                <button
                                                    type="submit"
                                                    className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 active:scale-95"
                                                >
                                                    <span className="material-symbols-outlined text-2xl">send</span>
                                                </button>
                                            </form>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative group size-16 rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-2xl ${isOpen ? "bg-[#1A1A1A] rotate-90" : "bg-primary hover:scale-110 hover:-translate-y-1 active:scale-95 shadow-primary/40"
                    }`}
            >
                <div className="absolute inset-0 bg-primary/20 rounded-[2rem] animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.span
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            className="material-symbols-outlined text-white text-3xl"
                        >
                            close
                        </motion.span>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="relative"
                        >
                            <span className="material-symbols-outlined text-white text-3xl">chat_bubble</span>
                            {messages.some(m => m.isAdmin) && (
                                <div className="absolute -top-1 -right-1 size-4 bg-emerald-500 rounded-full border-4 border-primary animate-pulse" />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </div>
    )
}
