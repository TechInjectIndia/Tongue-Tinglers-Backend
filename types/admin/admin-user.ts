
interface UserDetails {
  userName: string,
  id: String
}

export type TUser = {
  id: string;
  firebaseUid: string;
  createdBy: string;
  password: string;
  firstName: string;
  lastName: string;
  nameForSearch: string;
  profilePhoto: string;
  email: string;
  userName: string;
  phoneNumber: string;
  type: string;
  status: string;
  cart: string;
  access_token: string;
  referralCode: string;
  referBy: UserDetails;
  refresh_token: string;
  updatedBy: string;
  deletedBy: string;
  role: number;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export interface TUserWithPermission extends TUser {
  permissions: any
}

export type TAddUser = {
  firebaseUid: string;
  password: string;
  firstName: string;
  lastName: string;
  nameForSearch: string;
  email: string;
  userName: string;
  phoneNumber: string;
  type: string;
  role: number;
  referBy: UserDetails;
};

export type TEditUser = {
  firstName: string;
  lastName: string;
  nameForSearch: string;
  email: string;
  userName: string;
  phoneNumber: string;
  role: number;
};

export type TUsersList = {
  total: number;
  data: TUser[];
};

export type TEditUserProfile = {
  firstName: string;
  lastName: string;
  nameForSearch: string;
  userName: string;
  phoneNumber: string;
};

export type TUpdateUserToken = {
  user_id: string;
  refresh_token: string;
  lastLoginAt: Date;
  lastLoginIp: string;
};

export type TUpdateUserProfile = {
  user_id: string;
  firstName: string;
  lastName: string;
  nameForSearch: string;
  userName: string;
  phoneNumber: string;
};

export type TUpdateUserPassword = {
  user_id: string;
  password: string;
};

export type TUpdateUserReferralCode = {
  referralCode: string;
};