import { UserInfo } from 'firebase/auth';

interface User extends UserInfo {
  isAdmin: boolean;
}
export type AppUser = User | null;
