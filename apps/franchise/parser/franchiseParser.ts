import { parsedFranchise } from "../../../interfaces"


const parseFranchise = (franchise: any) => {
    const data: parsedFranchise = {
        pocName: franchise.pocName,
        pocEmail: franchise.pocEmail,
        pocPhoneNumber: franchise.pocPhoneNumber,
        users: [],
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
        id: franchise.id
    }
    return data;
}

export {
    parseFranchise
}