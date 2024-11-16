export enum P_CATEGORY_TYPE {
    ACTIVE = 1,
    NOT_ACTIVE = 0
}

export interface IProductCategory {
    id: number; // Adjust based on your actual type
    name: string;
    description: string; // Ensure you have this field
    active: boolean; // Ensure you have this field
    slug: string; // Ensure you have this field
    createdAt: Date; // Ensure you have this field
    updatedAt: Date; // Ensure you have this field
}