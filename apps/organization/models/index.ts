import { Op, } from "sequelize";
import {
    TListFilters,
    TListFiltersCampaigns,
} from "../../../types";
import {
    TCampaignList,
    TPayloadCampaign,
    ICampaign,
    IQuestion
} from "../../../interfaces";
import { CampaignAdModel, questionModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IController';
import { IOrganization, IOrganizationPayload } from "../../../interfaces/organization";
import { OrganizationTableModel } from "../database/organization_schema";
import { AddressRepo } from "../../../apps/address/models";

import { sequelize } from "../../../config/database";

export class OrganizationRepo implements IBaseRepo<IOrganization, TListFilters> {
    constructor() { }
    list(filters: TListFilters): Promise<TCampaignList> {
        throw new Error("Method not implemented.");
    }
    get(id: number): Promise<IOrganization | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, payload: TPayloadCampaign): Promise<[affectedCount: number]> {
        throw new Error("Method not implemented.");
    }
    delete(ids: number[], deletedBy: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public async create(data: IOrganizationPayload): Promise<boolean> {
        // const t = sequelize.transaction();
        try {

            /* get user id */

            const userId = -1;


            /* create address */
            const address = await new AddressRepo().createForUser({
                city: data.city,
                country: data.country,
                postalCode: data.postalCode,
                state: data.state,
                street: data.street,
                user_id: userId.toString(),
            });

            /* convert into db format */
            const dbData: any = {
                name: data.name,
                contactPersonName: data.contactPersonName,
                contactNumber: data.contactNumber,
                contactEmail: data.contactEmail,
                addressId: 1,
                pan: data.pan,
                gst: data.gst,
                bankName: data.bankName,
                bankAccountNumber: data.bankAccountNumber,
                bankIFSCCode: data.bankIFSCCode,
                masterFranchiseId: data.masterFranchiseId,
            };

            /* save organization*/
            const response = await OrganizationTableModel.create(dbData);

            console.log("creating");

            // (await t).commit();
            console.log("Created");

            return true;
        } catch (error) {
            console.log("error");
            console.log(error);

            // (await t).rollback();
            return false;
        }
    }


}
