
interface FileAttributes {
    id: number;
    name: string;
    message: string;
    subject: string;
    url: string[];
    recommended: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export {
    FileAttributes
}