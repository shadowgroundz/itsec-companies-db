import createAuthSlice, { IAuthState } from "store/authSlice";

import { persist } from "zustand/middleware";

import { create } from "zustand";
import createConfigurationSlice, {
  IConfigurationState,
} from "./configurationSlice";

export interface IStore extends IAuthState, IConfigurationState {}

const store: any = persist(
  (set: any) =>
    <IStore>{
      ...createAuthSlice(set),
      ...createConfigurationSlice(set),
    },
  {
    name: "itsec",
    partialize: (state: IStore) => ({
      userProfile: state.userProfile,
      lang: state.lang,
    }),
  }
);
const createStore = create(store);
export default createStore;
