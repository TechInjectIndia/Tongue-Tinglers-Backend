
import { parseUserToMetaUser } from "apps/user/parser/user-parser";
import {ParsedFranchise} from "../interface/Franchise";
import { sortingLogs } from "apps/lead/parser/leadParser";
import { parseDocument } from "apps/documents/parser/parseDocument";

const parseFranchise = (franchise: any) => {
  let documentLogs = [];
  if((franchise.franchiseDocuments && Array.isArray(franchise.franchiseDocuments)) && (franchise.franchiseDocuments.length > 0)){
    documentLogs = franchise.franchiseDocuments.flatMap(document => document.logs);
}
  const data: ParsedFranchise = {
    pocName: franchise.pocName,
    pocEmail: franchise.pocEmail,
    pocPhoneNumber: franchise.pocPhoneNumber,
    users: franchise.users,
    region: franchise.region,
    area: franchise.area,
    agreementIds: franchise.agreementIds,
    paymentIds: franchise.paymentIds,
    status: franchise.status,
    establishedDate: franchise.establishedDate,
    location: franchise.address,
    sm: franchise.sm,
    organization: franchise.organization,
    affiliate: franchise.affiliate,
    id: franchise.id,
    assignedUser: franchise.assigneduser ? parseUserToMetaUser(franchise.assigneduser) : null,
    createdBy: franchise.createdByUser ? parseUserToMetaUser(franchise.createdByUser) : null,
    updatedBy: franchise.updatedByUser ? parseUserToMetaUser(franchise.updatedByUser) : null,
    deletedBy: franchise.deletedByUser ? parseUserToMetaUser(franchise.deletedByUser) : null,
    createdAt: franchise.createdAt,
    updatedAt: franchise.updatedAt,
    deletedAt: franchise.deletedAt,
    documents: franchise.franchiseDocuments && franchise.franchiseDocuments.length > 0 ? franchise.franchiseDocuments.map((doc) => parseDocument(doc)) : [],
    logs: franchise.logs ? sortingLogs(franchise.logs, documentLogs) : [],
  };
  return data;
};

export { parseFranchise };
