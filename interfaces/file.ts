
interface FileAttributes {
    id: string;
    name: string;
    message: string;
    url: string;
    recommended: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export {
    FileAttributes
}