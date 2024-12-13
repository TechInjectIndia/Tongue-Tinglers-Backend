import {ParsedCategory} from "../../../interfaces/products_category"

const parseCategory = (category:any):ParsedCategory => {
    const data:ParsedCategory = {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        status: category.status,
        type: category.type
    }
    return data
}

export {parseCategory}