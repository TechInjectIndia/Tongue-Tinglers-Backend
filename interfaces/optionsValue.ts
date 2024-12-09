interface BaseOptionsValue {
    option_id: number
    name: string
}

interface OptionsValue extends BaseOptionsValue {
    id: number
}

export {
    BaseOptionsValue,
    OptionsValue
}