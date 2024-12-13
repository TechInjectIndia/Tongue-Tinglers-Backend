interface Log {
  action: string;
  model: string;
  recordId: number;
  data: Record<string, any>;
  userId: number | null;
  createdAt: Date;
}

export { Log };
