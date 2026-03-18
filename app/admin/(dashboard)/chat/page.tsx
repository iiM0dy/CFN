"use client"

import { useState, useEffect, useRef } from "react";
import {
    MessageSquare,
    Search,
    MoreHorizontal,
    Send,
    User,
    Phone,
    Video,
    Info,
    Clock,
    Check,
    CheckCheck,
    Shield,
    X,
    History,
    Archive,
    Trash2
} from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface ChatSession {
    id: string;
    userId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    user: {
        name: string | null;
        email: string | null;
        image: string | null;
    };
    messages: Array<{
        id: string;
        content: string;
        isAdmin: boolean;
        createdAt: string;
    }>;
}

export default function AdminChatPage() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchSessions();
        const interval = setInterval(fetchSessions, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [selectedSession?.messages]);

    const fetchSessions = async () => {
        try {
            const res = await fetch("/api/chat/sessions");
            const data = await res.json();
            setSessions(data);
            if (selectedSession) {
                const updated = data.find((s: ChatSession) => s.id === selectedSession.id);
                if (updated) setSelectedSession(updated);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !selectedSession || isSending) return;

        setIsSending(true);
        try {
            const res = await fetch("/api/chat/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId: selectedSession.id,
                    content: message,
                    isAdmin: true,
                }),
            });

            if (res.ok) {
                setMessage("");
                fetchSessions();
            }
        } catch (error) {
            toast.error("Failed to send message.");
        } finally {
            setIsSending(false);
        }
    };

    const handleCloseChat = async (sessionId: string) => {
        const promise = fetch(`/api/admin/chat/${sessionId}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "closed" }),
        });

        toast.promise(promise, {
            loading: "Closing chat...",
            success: () => {
                fetchSessions();
                if (selectedSession?.id === sessionId) setSelectedSession(null);
                return "Chat session closed.";
            },
            error: "Failed to close chat.",
        });
    };

    return (
        <div className="h-[calc(100vh-160px)] flex bg-[#0D0D0D] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            {/* Sessions Sidebar */}
            <div className="w-80 border-r border-white/5 flex flex-col bg-white/1">
                <div className="p-6 border-b border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-black text-white uppercase tracking-widest italic">Live Chats</h2>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-md animate-pulse">LIVE</span>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
                        <input
                            placeholder="Search chats..."
                            className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:border-primary/50 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                        <div className="p-8 text-center space-y-3">
                            <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Updating data...</p>
                        </div>
                    ) : sessions.length === 0 ? (
                        <div className="p-8 text-center space-y-2">
                            <MessageSquare className="size-8 text-slate-800 mx-auto" />
                            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">No active chats</p>
                        </div>
                    ) : (
                        sessions.map((session) => (
                            <button
                                key={session.id}
                                onClick={() => setSelectedSession(session)}
                                className={`w-full p-4 flex items-center gap-4 border-b border-white/5 transition-all text-left group ${selectedSession?.id === session.id ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-white/2"
                                    }`}
                            >
                                <div className="relative">
                                    <div className="size-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white font-black uppercase text-sm border border-white/10 group-hover:border-primary/30 transition-all">
                                        {(session.user?.name || "A")[0]}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 size-4 bg-[#0D0D0D] rounded-full flex items-center justify-center border border-white/10 p-0.5">
                                        <div className={`size-full rounded-full ${session.status === 'active' ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-xs font-black text-white truncate uppercase tracking-tight">{session.user?.name || "Anonymous"}</p>
                                        <p className="text-[8px] font-bold text-slate-500">{format(new Date(session.updatedAt), "HH:mm")}</p>
                                    </div>
                                    <p className="text-[10px] text-slate-500 truncate font-medium italic">
                                        {session.messages[session.messages.length - 1]?.content || "Started a new conversation"}
                                    </p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Interface */}
            <div className="flex-1 flex flex-col bg-[#080808]">
                {selectedSession ? (
                    <>
                        {/* Chat Header */}
                        <header className="px-8 py-4 border-b border-white/5 flex items-center justify-between bg-white/1">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                    <User className="size-5" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-black text-white uppercase tracking-wider italic">{selectedSession.user?.name || "Anonymous Customer"}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{selectedSession.user?.email || "No email provided"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all cursor-pointer" title="Call Customer">
                                    <Phone className="size-4" />
                                </button>
                                <button
                                    onClick={() => handleCloseChat(selectedSession.id)}
                                    className="px-4 py-2.5 bg-primary/10 border border-primary/20 rounded-xl text-primary hover:bg-primary hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer"
                                >
                                    <X className="size-4" />
                                    Close Chat
                                </button>
                                <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all cursor-pointer">
                                    <MoreHorizontal className="size-4" />
                                </button>
                            </div>
                        </header>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-linear-to-b from-[#0D0D0D]/50 to-transparent"
                        >
                            <div className="flex flex-col items-center gap-3 py-10 opacity-50">
                                <Shield className="size-6 text-primary" />
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Encryption Secure Connection</p>
                                <div className="h-px w-20 bg-primary/20" />
                            </div>

                            <AnimatePresence>
                                {selectedSession.messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`max-w-[70%] group`}>
                                            {!msg.isAdmin && (
                                                <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">Customer</p>
                                            )}
                                            <div className={`
                                                relative p-4 rounded-3xl text-sm font-medium
                                                ${msg.isAdmin
                                                    ? "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10"
                                                    : "bg-white/5 text-slate-200 border border-white/5 rounded-tl-none"}
                                            `}>
                                                {msg.content}
                                                <div className={`mt-2 flex items-center gap-1.5 opacity-40 justify-end`}>
                                                    <span className="text-[8px] font-bold">{format(new Date(msg.createdAt), "HH:mm")}</span>
                                                    {msg.isAdmin && <CheckCheck className="size-3" />}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Message Input */}
                        <div className="p-6 border-t border-white/5 bg-white/1">
                            <form onSubmit={handleSendMessage} className="relative flex items-center gap-3">
                                <div className="relative flex-1">
                                    <input
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your message here..."
                                        disabled={isSending}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-primary/50 outline-none transition-all placeholder:text-slate-700 disabled:opacity-50"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!message.trim() || isSending}
                                    className="size-14 bg-primary hover:bg-[#8a0e1d] rounded-2xl flex items-center justify-center text-white transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:grayscale cursor-pointer group"
                                >
                                    <Send className={`size-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isSending ? 'animate-pulse' : ''}`} />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
                        <div className="size-24 rounded-[2.5rem] bg-white/5 border border-white/5 flex items-center justify-center text-slate-800 shadow-inner">
                            <MessageSquare className="size-10" />
                        </div>
                        <div className="max-w-xs space-y-2">
                            <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">Support Terminal</h3>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">Select a chat session from the sidebar to begin communicating with customers.</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest transition-all cursor-pointer">
                                <History className="size-4" />
                                Chat History
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest transition-all cursor-pointer">
                                <Archive className="size-4" />
                                Archives
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
