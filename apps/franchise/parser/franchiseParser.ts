
import { parseUserToMetaUser } from "apps/user/parser/user-parser";
import {ParsedFranchise} from "../interface/Franchise";

const parseFranchise = (franchise: any) => {
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
    createdBy: franchise.createdByUser,
    updatedBy: franchise.updatedByUser,
    deletedBy: franchise.deletedByUser,
    createdAt: franchise.createdAt,
    updatedAt: franchise.updatedAt,
    deletedAt: franchise.deletedAt,
  };
  return data;
};

export { parseFranchise };
