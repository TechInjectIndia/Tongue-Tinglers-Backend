
interface IFranchiseeController<T> {
    createFranchisee(data: T): Promise<T>;
    getAllFranchisees(franchiseType: string): Promise<T[]>;
    getFranchiseeById(id: number): Promise<T | null>;
    updateFranchisee(id: number, data: Partial<T>): Promise<T | null>;
    deleteFranchisee(id: number): Promise<boolean>;
}

export default IFranchiseeController;
