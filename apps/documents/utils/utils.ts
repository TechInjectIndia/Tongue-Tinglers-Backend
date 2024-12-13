async function transformData(data: any, userId: number){
    const transformed: any[] = [];

    for (const [entityType, entities] of Object.entries(data)) {
        (entities as any[]).forEach(entity => {
            if(typeof entity !== 'string'){
                transformed.push({
                    entity_id: entity.entity_id,
                    doc_name: entity.doc_name,
                    entity_type: entityType, // Use entityType as entity_type
                    link: entity.link,
                    createdBy: userId, // Add createdBy field
                });
            }
        });
    }
    return transformed;
};

async function getDocumentTransformData(data: any){
    const result = {};

    data.forEach(item => {
        const { entity_type, entity_id, doc_name, link, created} = item;
        
        if (!result[entity_type]) {
            result[entity_type] = [];
        }

        result[entity_type].push({
            entity_id,
            doc_name,
            link,
            user: created
        });
    });

    return result;
};

export {
    transformData,
    getDocumentTransformData
}