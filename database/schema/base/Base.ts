interface BaseMeta {
    id: number;
    createdAt: Date;
    createdBy: number;
    updatedBy: number | null;
    deletedBy: number | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export { BaseMeta };
