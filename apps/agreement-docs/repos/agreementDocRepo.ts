import { up } from './../../../server/database/seeders/permissions_roles';
import { BaseAgreementDocs, IBaseAgreementDocs } from '../../../interfaces/agreement-docs';
import { handleError } from '../../common/utils/HelperMethods';
import { AgreementDocModel } from '../model/agreementDocModel';
import { IAgreementDocRepo } from './IAgreementDocRepo';

export class AgreementDocRepo implements IAgreementDocRepo{

    async createAgreementDoc(payload: BaseAgreementDocs): Promise<IBaseAgreementDocs> {
        try{
            const createdDoc = await AgreementDocModel.create({
                agreement_id: payload.agreement_id,
                doc_link: payload.doc_link,
                entity_id: payload.entity_id,
                entity_type: payload.entity_type,
                signed_date: payload.signed_date,
                error: payload.error ?? null,
                createdBy: payload.createdBy,
                updatedBy: payload.updatedBy,
                deletedBy: payload.deletedBy,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            if(!createdDoc){
                handleError("Failed to create agreement doc", payload);
                throw new Error("Failed to create agreement doc");
            }
            return createdDoc.toJSON();
        }catch(error){
            handleError(error, payload)
            throw error
        }
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