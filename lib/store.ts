import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type CartItem = {
    id: string
    name: string
    price: number
    image?: string
    quantity: number
}

interface CartStore {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    total: number
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            total: 0,
            addItem: (item) => {
                const currentItems = get().items
                const existingItem = currentItems.find((i) => i.id === item.id)

                if (existingItem) {
                    const updatedItems = currentItems.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                    )
                    set({
                        items: updatedItems,
                        total: updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
                    })
                } else {
                    const updatedItems = [...currentItems, item]
                    set({
                        items: updatedItems,
                        total: updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
                    })
                }
            },
            removeItem: (id) => {
                const updatedItems = get().items.filter((i) => i.id !== id)
                set({
                    items: updatedItems,
                    total: updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
                })
            },
            updateQuantity: (id, quantity) => {
                const updatedItems = get().items.map((i) =>
                    i.id === id ? { ...i, quantity } : i
                )
                set({
                    items: updatedItems,
                    total: updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
                })
            },
            clearCart: () => set({ items: [], total: 0 }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
