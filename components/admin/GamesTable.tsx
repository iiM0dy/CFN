"use client";

import { useState } from "react";
import { GameService } from "@prisma/client";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Search, 
  X, 
  ExternalLink, 
  Image as ImageIcon,
  User,
  MoreVertical,
  Check,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { updateGame, deleteGame, createGame } from "@/actions/game";
import { motion, AnimatePresence } from "framer-motion";

interface GamesTableProps {
  initialGames: GameService[];
}

export default function GamesTable({ initialGames }: GamesTableProps) {
  const [games, setGames] = useState(initialGames);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingGame, setEditingGame] = useState<Partial<GameService> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredGames = games.filter(g => 
    g.name.toLowerCase().includes(search.toLowerCase()) || 
    g.slug.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingGame({
      name: "",
      slug: "",
      description: "",
      bgImage: "",
      charImage: "",
      href: "#",
      isActive: true,
      isPopular: false
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (game: GameService) => {
    setEditingGame(game);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGame?.name) return toast.error("Game name is required");
    
    setIsSubmitting(true);
    try {
      if (isEditing && editingGame.id) {
        const res = await updateGame(editingGame.id, editingGame as any);
        if (res.success) {
          setGames(games.map(g => (g.id === editingGame.id ? (res.game as any) : g)));
          toast.success("Game updated successfully");
          setIsModalOpen(false);
        } else {
          toast.error("Update failed: " + res.error);
        }
      } else {
        const res = await createGame(editingGame as any);
        if (res.success) {
          setGames([...games, res.game as any]);
          toast.success("Game created successfully");
          setIsModalOpen(false);
        } else {
          toast.error("Create failed: " + res.error);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    
    try {
      const res = await deleteGame(id);
      if (res.success) {
        setGames(games.filter(g => g.id !== id));
        toast.success(`${name} deleted`);
      } else {
        toast.error("Delete failed: " + res.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
      {/* Top Bar */}
      <div className="p-8 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search games..." 
            className="w-full bg-white/3 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm text-white placeholder:text-slate-600 focus:border-primary transition-all outline-none font-bold uppercase tracking-widest"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button 
          onClick={openAddModal}
          className="w-full md:w-auto px-8 py-4 bg-primary hover:bg-[#8a0e1d] text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/20"
        >
          <Plus className="size-5" />
          Add New Game
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-8 py-5 text-left text-[12px] font-black uppercase tracking-[0.2em] text-slate-500 italic">Game Info</th>
              <th className="px-8 py-5 text-left text-[12px] font-black uppercase tracking-[0.2em] text-slate-500 italic">Images</th>
              <th className="px-8 py-5 text-left text-[12px] font-black uppercase tracking-[0.2em] text-slate-500 italic">Status</th>
              <th className="px-8 py-5 text-right text-[12px] font-black uppercase tracking-[0.2em] text-slate-500 italic">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={game.id} 
                  className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden flex items-center justify-center border border-white/10 shrink-0">
                        {game.bgImage ? (
                          <img src={game.bgImage} className="w-full h-full object-cover" alt={game.name} />
                        ) : (
                          <ImageIcon className="text-slate-700 size-6" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors">{game.name}</div>
                        <div className="text-[11px] text-slate-600 font-bold uppercase tracking-widest mt-1">/{game.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2">
                      {game.bgImage && (
                        <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase flex items-center gap-1.5">
                          <ImageIcon className="size-3" /> BG
                        </div>
                      )}
                      {game.charImage && (
                        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-[10px] font-black uppercase flex items-center gap-1.5">
                          <User className="size-3" /> CHAR
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`size-2 rounded-full ${game.isActive ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`} />
                      <span className={`text-[12px] font-black uppercase tracking-widest ${game.isActive ? 'text-white' : 'text-slate-600'}`}>
                        {game.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => openEditModal(game)}
                        className="p-3 bg-white/3 border border-white/5 rounded-xl text-slate-500 hover:text-white hover:border-white/20 transition-all active:scale-95"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(game.id, game.name)}
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500/50 hover:text-red-500 hover:border-red-500/40 transition-all active:scale-95"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-all duration-500 opacity-100" 
            onClick={() => setIsModalOpen(false)}
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-10 overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic mr-4">
                    {isEditing ? 'Edit' : 'Add New'} <span className="text-primary italic">Game</span>
                  </h2>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] mt-2 italic">Configure your dynamic game card layers</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 bg-white/5 rounded-2xl text-slate-500 hover:text-white transition-all shadow-xl"
                >
                  <X className="size-6" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest pl-1 italic">Game Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="World of Warcraft" 
                      className="w-full bg-white/3 border border-white/5 rounded-2xl p-4 text-white focus:border-primary transition-all outline-none font-bold placeholder:text-slate-700" 
                      value={editingGame?.name || ""}
                      onChange={(e) => setEditingGame({ ...editingGame!, name: e.target.value })}
                    />
                  </div>
                  {/* Slug */}
                  <div className="space-y-2">
                    <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest pl-1 italic">Slug</label>
                    <input 
                      type="text" 
                      required
                      placeholder="wow" 
                      className="w-full bg-white/3 border border-white/5 rounded-2xl p-4 text-white focus:border-primary transition-all outline-none font-bold placeholder:text-slate-700" 
                      value={editingGame?.slug || ""}
                      onChange={(e) => setEditingGame({ ...editingGame!, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <ImageIcon className="size-3 text-primary" />
                      <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest pl-1 italic">Background URL</label>
                    </div>
                    <input 
                      type="text" 
                      required
                      placeholder="https://..." 
                      className="w-full bg-white/3 border border-white/5 rounded-2xl p-4 text-white focus:border-primary transition-all outline-none font-bold placeholder:text-slate-700" 
                      value={editingGame?.bgImage || ""}
                      onChange={(e) => setEditingGame({ ...editingGame!, bgImage: e.target.value })}
                    />
                    <p className="text-[10px] text-slate-700 font-bold uppercase pl-1">Best resolution: 600x600px square or 16:9 ratio</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="size-3 text-emerald-500" />
                      <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest pl-1 italic">Character Overlay URL (Transparent PNG)</label>
                    </div>
                    <input 
                      type="text" 
                      placeholder="https://... (Optional)" 
                      className="w-full bg-white/3 border border-white/5 rounded-2xl p-4 text-white focus:border-primary transition-all outline-none font-bold placeholder:text-slate-700" 
                      value={editingGame?.charImage || ""}
                      onChange={(e) => setEditingGame({ ...editingGame!, charImage: e.target.value })}
                    />
                     <p className="text-[10px] text-slate-700 font-bold uppercase pl-1 italic">Will play a smooth zoom animation on hover</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest pl-1 italic">Destination Link (href)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="/wow/services" 
                    className="w-full bg-white/3 border border-white/5 rounded-2xl p-4 text-white focus:border-primary transition-all outline-none font-bold placeholder:text-slate-700" 
                    value={editingGame?.href || ""}
                    onChange={(e) => setEditingGame({ ...editingGame!, href: e.target.value })}
                  />
                </div>

                <div className="flex flex-wrap gap-6 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="peer sr-only" 
                        checked={editingGame?.isActive}
                        onChange={(e) => setEditingGame({ ...editingGame!, isActive: e.target.checked })}
                      />
                      <div className="w-12 h-7 bg-white/5 border border-white/10 rounded-full transition-all peer-checked:bg-emerald-500/20 peer-checked:border-emerald-500/40" />
                      <div className="absolute left-1 top-1 w-5 h-5 bg-slate-600 rounded-full transition-all peer-checked:left-6 peer-checked:bg-emerald-500" />
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors italic">Is Active?</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="peer sr-only" 
                        checked={editingGame?.isPopular}
                        onChange={(e) => setEditingGame({ ...editingGame!, isPopular: e.target.checked })}
                      />
                      <div className="w-12 h-7 bg-white/5 border border-white/10 rounded-full transition-all peer-checked:bg-primary/20 peer-checked:border-primary/40" />
                      <div className="absolute left-1 top-1 w-5 h-5 bg-slate-600 rounded-full transition-all peer-checked:left-6 peer-checked:bg-primary" />
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors italic">In Popular Games Section?</span>
                  </label>
                </div>

                <div className="pt-6">
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-5 bg-primary hover:bg-[#8a0e1d] text-white rounded-3xl font-black uppercase tracking-[0.2em] text-[14px] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-2xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <span className="size-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Check className="size-5" />
                        Save Game Configuration
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
