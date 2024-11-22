interface IFranchiseLocationController<T> {
    createFranchiseLocation(data: T): Promise<T>;
    getFranchiseLocationById(id: number): Promise<T | null>;
    updateFranchiseLocationByFranchiseId(id: number, data: Partial<T>): Promise<T | null>;
}

export default IFranchiseLocationController;
