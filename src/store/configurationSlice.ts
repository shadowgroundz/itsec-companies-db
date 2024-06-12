export interface IConfigurationState {
  lang: string;
  setLang: (lang: string) => void;
}

const initialState = {
  lang: "en",
};

const createConfigurationSlice = (set: any) =>
  <IConfigurationState>{
    ...initialState,

    setLang: (lang: string) => {
      set(() => {
        return {
          lang,
        };
      });
    },
  };

export default createConfigurationSlice;
