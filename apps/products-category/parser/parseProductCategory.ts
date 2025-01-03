import {ParsedCategory} from "apps/products-category/interface/Category";

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
