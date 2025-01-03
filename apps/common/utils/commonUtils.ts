import { TUser } from "apps/user/interface/user";

const getUserName = (user: TUser ) => {
    return user.firstName + " " + user.lastName;
};

export { getUserName };
