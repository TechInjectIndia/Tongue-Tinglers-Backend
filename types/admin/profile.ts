// Profile type Starts
export type TProfile = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  profilePhoto: string;
  status: string;
};

export type TEditProfile = {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber?: string;
  profilePhoto: string;
  status: string;
};
