"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store"
import { toast } from "sonner" // Need to install sonner later or use simple alert or nothing

interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
}

export function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCart()

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        })
        // toast("Added to cart")
    }

    return (
        <Card className="flex flex-col overflow-hidden border-border/40 bg-card/50 transition-colors hover:border-primary/50 hover:bg-card">
            <div className="aspect-[16/9] w-full bg-muted overflow-hidden">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform hover:scale-105 duration-500" />
            </div>
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
            </CardFooter>
        </Card>
    )
}
