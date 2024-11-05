interface IFranchiseLocationController<T> {
    createFranchiseLocation(data: T): Promise<T>;
    getFranchiseLocationById(id: string): Promise<T | null>;
    updateFranchiseLocationByFranchiseId(id: string, data: Partial<T>): Promise<T | null>;
}

export default IFranchiseLocationController;
