interface APIResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
}

export { APIResponse };