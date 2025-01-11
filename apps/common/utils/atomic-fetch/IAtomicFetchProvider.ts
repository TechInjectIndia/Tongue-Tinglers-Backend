import { DTO } from "../../models/DTO";

/**
 * P: the enum which defines the fields of the META
 */
interface IAtomicFetchProvider<P> {
    /**
     * this will run a transaction, and if the given field is marked false, it will mark it as true and return false.
     * get the current state and occupying it
     * @param orderId : string
     * @param property the field we want to retrieve and occupy
     */
    getMetaFlagAndOccupy(
        orderId: string,
        property: P,
    ): Promise<DTO<boolean | null>>;

    /**
     * post the dedicated task is done.
     * This function's responsibility is to make sure it is marked correctly:
     *
     * - If task success, then it won't make any change (since it was already marked true when occupied) but mark the method via which it is successfully executed (polling or webhook)
     *
     * - If task failure, then inside a transaction it will check whether it is done and marked executed by another method. if it is marked as executed by a method already then it wont make any change. otherwise it will mark it back to false. covering the case where if method 1 fails then method 2 can retry it.
     *
     * @param orderId
     * @param property
     * @param executionStatus
     * @param paymentVerificationMethod
     */
    updateMetaFlag(
        orderId: string,
        property: P,
        executionStatus: boolean,
        paymentVerificationMethod: PAYMENT_VERIFICATION_METHODS,
    ): Promise<DTO<null>>;
}

export { IAtomicFetchProvider };
