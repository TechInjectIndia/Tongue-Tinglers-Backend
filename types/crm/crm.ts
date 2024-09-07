export type TInquiry = {
    id: number;
    email: string;
    subject: string;
    message: string;
    type: string; // Franchisee or Customer
    userId: number;
    createdAt: Date;
    updatedAt: Date;
};

export enum INQUIRY_TYPE {
    CUSTOMER = "customer",
    FRANCHISE = "franchise",
}