
interface IFranchiseeController<T> {
    createFranchisee(data: T): Promise<T>;
    getAllFranchisees(): Promise<T[]>;
    getFranchiseeById(id: string): Promise<T | null>;
    updateFranchisee(id: string, data: Partial<T>): Promise<T | null>;
    deleteFranchisee(id: string): Promise<boolean>;
}

export default IFranchiseeController;
