import { TUser } from "../../../types";

const getUserName = (user: TUser ) => {
    return user.firstName + " " + user.lastName;
};

export { getUserName };
