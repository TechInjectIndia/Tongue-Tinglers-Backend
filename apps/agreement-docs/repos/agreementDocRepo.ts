import { handleError } from "apps/common/utils/HelperMethods";
import { BaseAgreementDocs, IBaseAgreementDocs } from "../interface/AgreementDocs";
import { AgreementDocModel } from "../model/agreementDocModel";
import { IAgreementDocRepo } from "./IAgreementDocRepo";
import { Pagination } from "apps/common/models/common";


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
                // include: [
                //     {
                //         model: UserModel,
                //         as: "createdByUser",
                //         attributes: ["id", "firstName", "lastName", "email"]
                //     },
                // ]
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

    async getAgreementDoc(entity_id: number, entity_type: string): Promise<IBaseAgreementDocs[]> {
        try {
            const agreementDoc = await AgreementDocModel.findAll({
                where: {
                    entity_id: entity_id,
                    entity_type: entity_type
                },
                // include: [
                //     {
                //         model: UserModel,
                //         as: "createdByUser",
                //         attributes: ["id", "firstName", "lastName", "email"]
                //     },
                // ]
            })

            if(!agreementDoc){
                handleError(`Failed to retrieve the agreement document for the provided entity_id: ${entity_id} and entity_type: ${entity_type}`);
                throw new Error(`Failed to retrieve the agreement document for the provided entity_id: ${entity_id} and entity_type: ${entity_type}`);
            }
            return agreementDoc
        } catch (error) {
            handleError(error, entity_id, entity_type)
            throw error
        }
    }

    async getAllAgreementDoc(page: number,limit: number): Promise<Pagination<IBaseAgreementDocs>> {
        try{
            const offset = (page - 1) * limit;
            const {rows: agreementDoc, count: total} = await AgreementDocModel.findAndCountAll({
                offset,
                limit,
                order: [["createdAt", "DESC"]]
            })
            const totalPages = Math.ceil(agreementDoc.length / limit);

            return { data: agreementDoc, total: agreementDoc.length, totalPages };
        }catch(error){
            handleError(error)
            throw error
        }
    }

    async updateAgreementDoc(payload: IBaseAgreementDocs): Promise<IBaseAgreementDocs> {
        try{
            const agreementDoc = await AgreementDocModel.findOne({
                where: {
                    id: payload.id
                }
            })
            if(!agreementDoc){
                handleError(`Failed to retrieve the agreement document for the provided id: ${payload.id}`);
                throw new Error(`Failed to retrieve the agreement document for the provided id: ${payload.id}`);
            }
            const updatedAgreementDoc = await agreementDoc.update(payload)
            return updatedAgreementDoc.toJSON();
        }catch(error){
            handleError(error, payload)
            throw error
        }
    }
}