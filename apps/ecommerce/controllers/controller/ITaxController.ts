// src/controllers/interfaces/ITaxRepo.ts

import { TaxAttributes, Tax } from "../../../../interfaces";

 interface ITaxRepo {
    createTax(data: Partial<TaxAttributes>): Promise<Tax>;
    getTaxById(id: number): Promise<Tax | null>;
    getAllTaxes(): Promise<Tax[]>;
    updateTax(id: number, data: Partial<TaxAttributes>): Promise<[number, Tax[]]>;
    deleteTax(id: number): Promise<number>;
}

export default ITaxRepo;
