// Profile type Starts
export type TProfile = {
  id: number;
  email: string;
  password?: string;
  full_name: string;
  contact_number: string;
  phone_code: string;
  role: number;
  profile_photo: string;
  address: string;
  lastLoginAt: Date;
  lastLoginIp: string;
  refresh_token?: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TEditProfile = {
  full_name?: string;
  contact_number?: string;
  phone_code?: string;
  address?: string;
};
