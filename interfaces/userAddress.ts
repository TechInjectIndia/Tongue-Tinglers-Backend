// Define an interface for the required and optional attributes of the User Address
interface UserAddressAttributes {
    id: string;
    userId: string;

    // Billing address fields
    billingTitle: string;
    billingFirstName: string;
    billingLastName: string;
    billingEmail: string;
    billingPhone: string;
    billingGstin?: string;
    billingAddress: string;
    billingCity: string;
    billingState: string;
    billingCountry: string;
    billingZipCode: string;

    // Shipping address fields
    shippingTitle: string;
    shippingFirstName: string;
    shippingLastName: string;
    shippingEmail: string;
    shippingPhone: string;
    shippingGstin?: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingCountry: string;
    shippingZipCode: string;

    createdAt?: Date;
    updatedAt?: Date;
}

// Define an interface for the payload when creating or updating a User Address
interface IUserAddressPayload {
    userId: string;

    // Billing address fields
    billingTitle: string;
    billingFirstName: string;
    billingLastName: string;
    billingEmail: string;
    billingPhone: string;
    billingGstin?: string;
    billingAddress: string;
    billingCity: string;
    billingState: string;
    billingCountry: string;
    billingZipCode: string;

    // Shipping address fields
    shippingTitle: string;
    shippingFirstName: string;
    shippingLastName: string;
    shippingEmail: string;
    shippingPhone: string;
    shippingGstin?: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingCountry: string;
    shippingZipCode: string;
}

export { UserAddressAttributes, IUserAddressPayload };
