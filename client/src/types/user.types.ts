export interface User {
    _id: string;
  username: string;
  name?: string;
  email: string;
  location?: string;
  phone?: string;
  bio?: string;
  currentJobDetails?: string;
  linkedin?: string;
  skills?: string[];
  avatar?: string;
}