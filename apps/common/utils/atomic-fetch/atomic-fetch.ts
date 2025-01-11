// _*_*_*_*_*_*_*_*_*_* RUN ATOMIC FETCH CALL _*_*_*_*_*_*_*_*_*_*_*_*_*_



import {DTO} from "../../models/DTO";

export type AtomicFetchFunctionType = () => Promise<DTO<boolean | null>>;

/**
 * Function is used perform a certain function(F1) atomically, by first read a flag from DB and instantly marking it as true.
 *
 * The F1 function is called, if the F1 function returns false(failure) then the flag is toggled back to false. in order
 *
 * @param getFlag :this function is supposed to be in transaction, this should read the flag and if it is false, then marked it true and should return false as response;
 * @param fetchFunc :()=>Promise<boolean> : this function perform certain fetch request and returns boolean whether it was a successful api call or not
 * @param updateFlag based on the response from the fetchFunc, if the fetchFunc's response is false(failure), then this function will toggle back the flag to false;
 * @return false ->
 */
const runAtomicFetch = async (
    getFlag: AtomicFetchFunctionType,
    fetchFunc: () => Promise<boolean>,
    updateFlag: (executionStatus: boolean) => Promise<DTO<null>>
): Promise<void> => {
    // Get Flag
    const flag = await getFlag();

    if (flag.success && flag.data === false) {
        // Perform fetch
        const fetchResponse = await fetchFunc();
        await updateFlag(fetchResponse);
    }
};








export { runAtomicFetch };
