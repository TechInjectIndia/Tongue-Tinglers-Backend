import { USER_STATUS, USER_TYPE } from "../../../interfaces";

interface ParsedUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    type: USER_TYPE;
    status: USER_STATUS;
    role: number | null;
}

export { ParsedUser }