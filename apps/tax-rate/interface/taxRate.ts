import { BaseMeta, BaseMetaUsers } from "apps/common/models/Base";
import { MetaUser, ParsedUser } from "apps/user/interface/user";

interface TaxRatePayload {
    title: string;
    value: number;
}

interface TaxRateTable extends TaxRatePayload, BaseMeta,BaseMetaUsers {}

interface ParsedTaxRate {
    id: number;
    title: string;
    value: number;
    createdBy: MetaUser;
    updatedBy: MetaUser | null;
    deletedBy: MetaUser | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export {
    TaxRatePayload,
    TaxRateTable,
    ParsedTaxRate,}