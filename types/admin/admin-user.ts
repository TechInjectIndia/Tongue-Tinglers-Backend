
interface UserDetails {
  id: number
}

export type TUser = {
  id: number;
  firebaseUid: string;
  createdBy: number;
  password: string;
  firstName: string;
  lastName: string;
  nameForSearch: string;
  profilePhoto: string;
  email: string;
  phoneNumber: string;
  type: string;
  status: string;
  cart: string;
  access_token: string;
  password_token: string;
  referralCode: string;
  referBy: number;
  refresh_token: string;
  updatedBy: number;
  deletedBy: number;
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
  nameForSearch?: string;
  email: string;
  phoneNumber: string;
  type: string;
  role: number;
  referBy?: UserDetails;
  password_token?: string;
};

export type TEditUser = {
  firstName: string;
  lastName: string;
  nameForSearch: string;
  email: string;
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
  phoneNumber: string;
};

export type TUpdateUserToken = {
  user_id: number;
  refresh_token: string;
  lastLoginAt: Date;
  lastLoginIp: string;
};

export type TUpdateUserProfile = {
  user_id: number;
  firstName: string;
  lastName: string;
  nameForSearch: string;
  phoneNumber: string;
};

export type TUpdateUserPassword = {
  user_id: number;
  password: string;
};

export type TUpdateUserReferralCode = {
  referralCode: string;
};
