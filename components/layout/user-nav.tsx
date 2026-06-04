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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { User, Loader2 } from "lucide-react"

export function UserNav() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return (
            <div className="size-9 rounded-xl bg-white/[0.04] flex items-center justify-center">
                <Loader2 className="size-4 animate-spin text-gray-500" />
            </div>
        )
    }

    if (!session) {
        return (
            <Link
                href="/login"
                className="hidden sm:flex items-center justify-center h-9 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
                Log In
            </Link>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="flex items-center justify-center size-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
                    aria-label="User menu"
                >
                    <Avatar className="size-7 rounded-lg">
                        <AvatarImage src={session.user?.image ?? ""} alt={session.user?.email ?? ""} />
                        <AvatarFallback className="bg-transparent text-gray-400 rounded-lg">
                            <User className="size-4" />
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 bg-[#111] border-white/[0.08] text-gray-300 rounded-xl p-1.5 shadow-2xl shadow-black/60" align="end" sideOffset={8}>
                <DropdownMenuLabel className="font-normal px-2.5 py-2.5">
                    <p className="text-[13px] font-medium leading-none text-white truncate">{session.user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/[0.06] mx-2" />
                <DropdownMenuGroup className="p-0.5 space-y-0.5">
                    <DropdownMenuItem asChild className="rounded-lg focus:bg-white/[0.06] focus:text-white cursor-pointer transition-colors px-2.5 py-2 text-[13px] font-medium">
                        <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-lg focus:bg-white/[0.06] focus:text-white cursor-pointer transition-colors px-2.5 py-2 text-[13px] font-medium">
                        <Link href="/favorites">Favorites</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-lg focus:bg-white/[0.06] focus:text-white cursor-pointer transition-colors px-2.5 py-2 text-[13px] font-medium">
                        <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-lg focus:bg-white/[0.06] focus:text-white cursor-pointer transition-colors px-2.5 py-2 text-[13px] font-medium">
                        <Link href="/history">History</Link>
                    </DropdownMenuItem>
                    {/* @ts-ignore */}
                    {session.user?.role === "ADMIN" && (
                        <DropdownMenuItem asChild className="rounded-lg focus:bg-white/[0.06] focus:text-white cursor-pointer transition-colors px-2.5 py-2 text-[13px] font-medium">
                            <Link href="/admin/chat">Support Terminal</Link>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-white/[0.06] mx-2" />
                <div className="p-0.5">
                    <DropdownMenuItem
                        onClick={() => signOut()}
                        className="rounded-lg focus:bg-primary/15 focus:text-red-400 cursor-pointer transition-colors px-2.5 py-2 text-[13px] font-semibold text-red-400/70"
                    >
                        Log out
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
