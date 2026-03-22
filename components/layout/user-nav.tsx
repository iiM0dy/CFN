"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { User, Loader2 } from "lucide-react"

export function UserNav() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return (
            <Button variant="ghost" className="relative h-8 w-8 rounded-full" disabled>
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
            </Button>
        )
    }

    if (!session) {
        return (
            <Link 
                href="/login" 
                className="px-5 py-2.5 bg-primary hover:bg-[#8a0e1d] rounded-2xl text-[14px] font-black text-white transition-all uppercase tracking-widest shadow-lg shadow-primary/20"
            >
                Log in
            </Link>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer">
                    <Avatar className="h-9 w-9 rounded-2xl">
                        <AvatarImage src={session.user?.image ?? ""} alt={session.user?.email ?? ""} />
                        <AvatarFallback className="bg-transparent text-slate-300">
                            <User className="h-4 w-4" />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#0D0D0D] border-white/10 text-slate-300 rounded-2xl p-2 shadow-2xl" align="end" sideOffset={8}>
                <DropdownMenuLabel className="font-normal px-2 py-3">
                    <div className="flex flex-col space-y-1">
                        <p className="text-[14px] font-bold leading-none text-white truncate">{session.user?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5 mx-2" />
                <DropdownMenuGroup className="p-1 space-y-1">
                    <DropdownMenuItem asChild className="rounded-xl focus:bg-white/5 focus:text-white cursor-pointer transition-colors px-3 py-2.5 text-[14px] font-medium">
                        <Link href="/orders">
                            My Orders
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl focus:bg-white/5 focus:text-white cursor-pointer transition-colors px-3 py-2.5 text-[14px] font-medium">
                        <Link href="/favorites">
                            Favorites
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl focus:bg-white/5 focus:text-white cursor-pointer transition-colors px-3 py-2.5 text-[14px] font-medium">
                        <Link href="/profile">
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl focus:bg-white/5 focus:text-white cursor-pointer transition-colors px-3 py-2.5 text-[14px] font-medium">
                        <Link href="/history">
                            History
                        </Link>
                    </DropdownMenuItem>
                    {/* @ts-ignore */}
                    {session.user?.role === "ADMIN" && (
                        <DropdownMenuItem asChild className="rounded-xl focus:bg-white/5 focus:text-white cursor-pointer transition-colors px-3 py-2.5 text-[14px] font-medium">
                            <Link href="/admin/chat">
                                Support Terminal
                            </Link>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-white/5 mx-2" />
                <div className="p-1">
                    <DropdownMenuItem 
                        onClick={() => signOut()} 
                        className="rounded-xl focus:bg-primary/20 focus:text-primary cursor-pointer transition-colors px-3 py-2.5 text-[14px] font-bold text-red-400/80"
                    >
                        Log out
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
