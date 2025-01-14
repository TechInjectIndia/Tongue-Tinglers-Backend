import { Model, ModelStatic, Op } from "sequelize";
import { Log } from "../models/Log";
import { ILogsRepo } from "./ILogsRepo";
import { Pagination } from "apps/common/models/common";
import { LogModel } from "../models/LogsTable";

class LogsRepo implements ILogsRepo {
    async getAll(
        page: number,
        limit: number,
        search: string,
        filters: object,
    ): Promise<Pagination<Log>> {
        try {
            const offset = (page - 1) * limit;

            const query: any = {};

            // Add search functionality
            if (search) {
                query[Op.or] = [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { description: { [Op.iLike]: `%${search}%` } },
                ];
            }

            // Add filters
            if (filters) {
                Object.assign(query, filters);
            }

            const { rows: logs, count: total } =
                await LogModel.findAndCountAll({
                    where: query,
                    offset,
                    limit,
                    order: [['createdAt', 'DESC']],
                }).then((res) => {
                    return {
                        rows: res.rows.map((log) => log.toJSON()),
                        count: res.count,
                    };
                });

            const totalPages = Math.ceil(total / limit);

            return { data: logs, total, totalPages };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    logModelAction = async <T extends Model<any, any>>(
        action: string,
        modelName: string,
        instance: T,
        options: any,
    ) => {
        try {
            const primaryKey = (instance.constructor as ModelStatic<Model<any>>)
                .primaryKeyAttributes[0];

            let dataToLog: Record<string, any>;

            if (action === "create") {
                dataToLog = instance.toJSON();
            } else if (action === "update") {
                const changes: Record<string, any> = {};

                for (const key in instance.dataValues) {
                    const currentValue = instance[key];
                    const previousValue = instance.previous(key);

                    if (currentValue !== previousValue) {
                        changes[key] = {
                            before: previousValue,
                            after: currentValue,
                        };
                    }
                }

                dataToLog = changes;
            } else if (action === "delete") {
                dataToLog = instance.toJSON();
            }
            await LogModel.create({
                action,
                model: modelName,
                recordId: instance.get(primaryKey),
                data: dataToLog,
                userId: options.userId || null,
                userName: options.userName || null,
                timestamp: new Date(),
            });
        } catch (error) {
            console.error("Error logging action:", error);
        }
    };

    async getLogsByModelNameAndId(modelName: string, recordId: number): Promise<Log[]> {
        try {
            const logs = await LogModel.findAll({
                where: {
                    model: modelName,
                    recordId: recordId,
                },
                order: [['createdAt', 'DESC']],
            });

            return logs.map((log) => log.toJSON());
        } catch (error) {
            console.error("Error fetching logs:", error);
            throw error;
        }
    }
}

export { LogsRepo };
