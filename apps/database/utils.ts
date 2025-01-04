// Import your Sequelize instance

import {sequelize} from "../../config";

type TableSequence = { tableName: string, columnName: string }

async function resetSequenceAfterRollback(tableSequences: Array<TableSequence>) {
    try {
        for (const {tableName, columnName} of tableSequences) {
            // Default PostgreSQL sequence naming convention
            const sequenceName = `${tableName}_${columnName}_seq`;
            const resetQuery = `
                SELECT setval('${sequenceName}', COALESCE((SELECT MAX(${columnName}) FROM ${tableName}), 0));
            `;

            await sequelize.query(resetQuery);
            console.log(
                `Sequence for table "${tableName}" reset successfully.`);
        }
    }
    catch (err) {
        console.error('Error resetting sequences:', err);
    }
}


export {
    resetSequenceAfterRollback,
    TableSequence
}
