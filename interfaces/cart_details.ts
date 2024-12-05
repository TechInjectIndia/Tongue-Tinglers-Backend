interface BaseCartDetails {
    user_id: number,
    // cart_ids: Array<number>
}

interface CartDetails extends BaseCartDetails {
    id: number
}

export {
    BaseCartDetails,
    CartDetails
}