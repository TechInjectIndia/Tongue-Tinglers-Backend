import { Pagination } from "../../../interfaces";
import { BaseAgreementDocs, ENTITY_TYPE_AGREEMENT, IBaseAgreementDocs } from "../../../interfaces/agreement-docs";

export interface IAgreementDocRepo {
    createAgreementDoc(payload: BaseAgreementDocs): Promise<IBaseAgreementDocs>

    getAgreementDocById(id: number): Promise<IBaseAgreementDocs>

    updateAgreementDoc(payload: IBaseAgreementDocs): Promise<IBaseAgreementDocs>

    getAgreementDoc(entity_id: number, entity_type: string): Promise<IBaseAgreementDocs[]>

    getAllAgreementDoc(page: number,limit: number): Promise<Pagination<IBaseAgreementDocs>>
}