interface TaxAttributes {
    id: string;
    name: string;
    rate: number;
    isActive: boolean;
}

interface Tax {
    id: string;
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
