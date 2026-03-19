"use client"

import { addToCart } from "@/actions/cartActions";
import SubmitButton from "./SubmitButton"

type Props = {
    book: {
        title: string
        slug: string
        price: number
    }
}

export default function AddToCartForm({book}: Props){
    return (
        <form action={addToCart}>
            <input type="hidden" name="title" value={book.title} />
            <input type="hidden" name="slug" value={book.slug} />
            <input type="hidden" name="price" value={book.price} />

            <SubmitButton/>
        </form>
    )
}