export interface TToken {
    id: number;
    accessToken: string;
    isActive: boolean;
    tokenType: string;
    createdAt: Date;
    updatedAt: Date;
}
