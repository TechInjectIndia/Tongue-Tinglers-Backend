interface BaseOptions {
    name: string;
}

interface Options extends BaseOptions {
    id: number;
}

interface ParsedOptions {
    id: number;
    name: string;
}

export const parseOptions = (data: any) => {
    return {
        id: data.id,
        name: data.name,
    };
};
export { BaseOptions, Options, ParsedOptions };
