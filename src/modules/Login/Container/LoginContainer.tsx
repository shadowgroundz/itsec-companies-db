import React, { useEffect } from "react";
import useStore, { IStore } from "store";

import { ILoginDTO } from "../DTO/login.dto";
import LoginComponent from "../Component/LoginComponent";
import { useRouter } from "next/router";

export default function LoginContainer() {
  const store: IStore = useStore();
  const router = useRouter();

  const { setProfile, userProfile } = store;

  useEffect(() => {
    if (userProfile) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  const handleSubmit = (val: ILoginDTO) => {
    setProfile(val);
  };
  return <LoginComponent onSubmit={handleSubmit} />;
}
