import { ILoginDAO } from "modules/Login/DAO/login.dao";

export interface IAuthState {
  logOut: () => void;
  setProfile: (payload: ILoginDAO | null) => void;
  userProfile: ILoginDAO | null;
}

const initialState = {
  userProfile: null,
};

const createAuthSlice = (set: any) =>
  <IAuthState>{
    ...initialState,
    setProfile: (profile) => {
      set(() => ({
        userProfile: profile,
      }));
    },
    logOut: () => {
      set(() => initialState);
    },
  };

export default createAuthSlice;
