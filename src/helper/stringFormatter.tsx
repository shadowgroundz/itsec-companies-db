export default function StringFormatter(...args: any[]) {
  let i = 0;
  const stringData = args[0];
  const tempData = [...args];
  tempData.shift();

  return stringData.replace(/{}/g, () => {
    return typeof tempData?.[i] != "undefined" ? tempData[i++] : "";
  });
}
