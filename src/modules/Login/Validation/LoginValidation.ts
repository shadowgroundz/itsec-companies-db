import { ILoginDTO } from "../DTO/login.dto";
import { IntlShape } from "react-intl";
import ToCapitalize from "helper/toCapitalize";

const LoginValidation = (values: ILoginDTO, intl: IntlShape) => {
  const errors: any = {};
  const { username } = values;

  if (!username) {
    errors.username = ToCapitalize(
      intl.formatMessage({
        id: "VALIDATION_USERNAME_REQUIRED",
      })
    );
  }

  return errors;
};
export default LoginValidation;
