import _ from "lodash";
export default function ToCapitalize(s: string, firstOnly = true): string {
  if (firstOnly) {
    return _.upperFirst(s);
  }
  const arrString = s.split(" ");
  return _.map(arrString, (item) => _.upperFirst(item)).join(" ");
}
