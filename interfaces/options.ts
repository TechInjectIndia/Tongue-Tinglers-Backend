interface BaseOptions {
    name: string
}

interface Options extends BaseOptions {
    id: number
}

export {
    BaseOptions,
    Options
}