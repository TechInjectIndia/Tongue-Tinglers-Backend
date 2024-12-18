import { up } from './../../../server/database/seeders/permissions_roles';
import { BaseAgreementDocs, IBaseAgreementDocs } from '../../../interfaces/agreement-docs';
import { handleError } from '../../common/utils/HelperMethods';
import { AgreementDocModel } from '../model/agreementDocModel';
import { IAgreementDocRepo } from './IAgreementDocRepo';
import { UserModel } from '../../../database/schema';

export class AgreementDocRepo implements IAgreementDocRepo{

    async createAgreementDoc(payload: BaseAgreementDocs): Promise<IBaseAgreementDocs> {
        try{
            const data={
                agreement_id: payload.agreement_id,
                doc_link: payload.doc_link,
                entity_id: payload.entity_id,
                entity_type: payload.entity_type,
                signed_date: payload.signed_date,
                error: payload.error ?? null,
                createdBy: payload.createdBy,
                updatedBy: payload.updatedBy ?? null,
                deletedBy: payload.deletedBy ?? null,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const createdDoc = await AgreementDocModel.create(data)

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
        try{
            const agreementDoc = await AgreementDocModel.findOne({
                where:{
                    id: id
                },
                include: [
                    {
                        model: UserModel,
                        as: "createdByUser",
                        attributes: ["id", "firstName", "lastName", "email"]
                    },
                ]
            })
            if(!agreementDoc){
                handleError(`Failed to fetch agreement doc by this ${id}`);
                throw new Error(`Failed to fetch agreement doc by this ${id}`);
            }
            return agreementDoc.toJSON();
        }catch(error){
            handleError(error, id)
            throw error
        }
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