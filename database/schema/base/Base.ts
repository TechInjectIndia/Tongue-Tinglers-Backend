interface BaseMetaUsers {
    createdBy: number;
    updatedBy: number | null;
    deletedBy: number | null;
}

interface BaseMeta extends BaseMetaUsers {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}


export { BaseMeta, BaseMetaUsers };
