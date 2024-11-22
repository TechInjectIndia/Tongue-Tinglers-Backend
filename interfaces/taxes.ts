interface TaxAttributes {
    id: number;
    name: string;
    rate: number;
    isActive: boolean;
}

interface Tax {
    id: number;
    name: string;
    rate: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export {
    TaxAttributes,
    Tax
}

export interface TaxCreationAttributes extends Omit<TaxAttributes, 'id'> { }
