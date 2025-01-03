import { BaseMeta } from "apps/common/models/Base";

interface BaseAgreementDocs extends BaseMeta {
    entity_id: number;
    entity_type: ENTITY_TYPE_AGREEMENT;
    agreement_id: string;
    doc_link: string;
    signed_date: Date | null;
    error: string | null;
}

enum ENTITY_TYPE_AGREEMENT {
    PROSPECT = "prospect",
    FRANCHISE = "franchise",
    ORGANISATION = "organisation",
}

interface IBaseAgreementDocs extends BaseAgreementDocs, BaseMeta {
    id: number;
}

export { BaseAgreementDocs, ENTITY_TYPE_AGREEMENT, IBaseAgreementDocs };
