interface Log {
  action: string;
  model: string;
  recordId: number;
  data: Record<string, any>;
  userId: number | null;
  createdAt: Date;
}

export { Log };



declare module "sequelize" {
  interface CreateOptions {
    userId?: number;
    userName?: string;
  }

  interface UpdateOptions {
    userId?: number;
    userName?: string;
  }

  interface DestroyOptions {
    userId?: number;
    userName?: string;
  }
}