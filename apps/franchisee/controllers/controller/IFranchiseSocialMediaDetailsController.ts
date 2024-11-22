interface IFranchiseSocialMediaDetailsController<T> {
    createSocialMediaDetails(data: T): Promise<T>;
    getById(id: number): Promise<T | null>;
    update(id: number, data: Partial<T>): Promise<T | null>;
}

export default IFranchiseSocialMediaDetailsController;
