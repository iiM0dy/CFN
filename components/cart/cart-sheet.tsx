"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/store"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { useCurrency } from "@/context/currency-context"

export function CartSheet() {
    const router = useRouter()
    const { items, total, removeItem } = useCart()
    const { formatPrice } = useCurrency()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                            {items.length}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4 h-full">
                    {items.length === 0 ? (
                        <div className="flex flex-1 items-center justify-center text-muted-foreground">
                            Your cart is empty
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{item.name}</span>
                                        <span className="text-sm text-muted-foreground">
                                            Qty: {item.quantity} x {formatPrice(item.price)}
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive/90"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="border-t pt-4 mt-auto">
                        <div className="flex items-center justify-between mb-4 font-medium">
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                        <Button
                            className="w-full"
                            disabled={items.length === 0}
                            onClick={() => {
                                // Close sheet logic if feasible, or just route
                                router.push("/checkout")
                            }}
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
