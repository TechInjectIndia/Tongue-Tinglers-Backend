import { Commission } from "../models/Commission";
import { DTO } from "../../common/models/DTO";

interface ICommissionRepo {
    get(id: string): Promise<DTO<Commission>>;

    create(commission: Commission): Promise<DTO<Commission>>;
}

export { ICommissionRepo };
