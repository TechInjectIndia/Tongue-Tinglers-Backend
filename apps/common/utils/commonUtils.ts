import { TUser } from "apps/user/interface/user";
import { v4 as uuidv4 } from "uuid";


const getUserName = (user: TUser ) => {
    return user.firstName + " " + user.lastName;
};


const getUid = () => {
    let newId = uuidv4();
    return newId;
};


export { getUserName , getUid };
