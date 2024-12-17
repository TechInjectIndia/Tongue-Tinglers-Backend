import { BaseAgreementDocs, IBaseAgreementDocs } from '../../../interfaces/agreement-docs';
import { handleError } from '../../common/utils/HelperMethods';
import { IAgreementDocRepo } from './IAgreementDocRepo';
import { AgreementDocModel } from '../../../database/schema/agreement-docs/agreementDocsModel';

export class AgreementDocRepo implements IAgreementDocRepo{

    async createAgreementDoc(payload: BaseAgreementDocs): Promise<IBaseAgreementDocs> {
        throw new Error("Method not implemented.");
    }

    async getAgreementDocById(id: number): Promise<IBaseAgreementDocs> {
        throw new Error("Method not implemented.");
    }

    async updateAgreementDoc(payload: IBaseAgreementDocs): Promise<IBaseAgreementDocs> {
        throw new Error("Method not implemented.");
    }

    async getAgreementDoc(entity_id: number, entity_type: any): Promise<IBaseAgreementDocs> {
        throw new Error("Method not implemented.");
    }

    async getAllAgreementDoc(): Promise<IBaseAgreementDocs[]> {
        throw new Error("Method not implemented.");
    }
}