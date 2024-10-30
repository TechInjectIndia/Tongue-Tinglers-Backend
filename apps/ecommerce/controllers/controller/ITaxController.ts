// src/controllers/interfaces/ITaxRepo.ts

import { TaxAttributes, Tax } from "../../../../interfaces";

 interface ITaxRepo {
    createTax(data: Partial<TaxAttributes>): Promise<Tax>;
    getTaxById(id: string): Promise<Tax | null>;
    getAllTaxes(): Promise<Tax[]>;
    updateTax(id: string, data: Partial<TaxAttributes>): Promise<[number, Tax[]]>;
    deleteTax(id: string): Promise<number>;
}

export default ITaxRepo;
