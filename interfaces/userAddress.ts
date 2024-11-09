// Define an interface for the required and optional attributes of the User Address
interface UserAddressAttributes {
    id: string;
    userId: string;

    // Billing address fields
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gstin?: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    isActive: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}

// Define an interface for the payload when creating or updating a User Address
interface IUserAddressPayload {
    userId: string;

    // Billing address fields
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gstin?: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    isActive: boolean;
}

export { UserAddressAttributes, IUserAddressPayload };
