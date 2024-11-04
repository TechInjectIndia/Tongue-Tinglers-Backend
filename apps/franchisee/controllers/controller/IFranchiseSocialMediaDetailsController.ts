interface IFranchiseSocialMediaDetailsController<T> {
    createSocialMediaDetails(data: T): Promise<T>;
    getById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
}

export default IFranchiseSocialMediaDetailsController;
