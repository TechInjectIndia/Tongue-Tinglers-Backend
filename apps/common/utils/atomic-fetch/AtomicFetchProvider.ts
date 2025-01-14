import { DTO } from "apps/common/models/DTO";
import { IAtomicFetchProvider } from "./IAtomicFetchProvider";

class AtomicFetchProvider implements IAtomicFetchProvider<any> {
    getMetaFlagAndOccupy(
        orderId: string,
        property: any,
    ): Promise<DTO<boolean | null>> {
        throw new Error("Method not implemented.");
    }
    updateMetaFlag(
        orderId: string,
        property: any,
        executionStatus: boolean,
        paymentVerificationMethod: PAYMENT_VERIFICATION_METHODS,
    ): Promise<DTO<null>> {
        throw new Error("Method not implemented.");
    }
}
