import { ICompanyDAO } from "modules/Company/DAO/company.dao";
import { ICompanyDTO } from "modules/Company/DTO/company.dto";
import { UseQueryOptions } from "@tanstack/react-query";
import _ from "lodash";
import instance from "./interceptor";

export async function GetCompanyListAPI(): Promise<ICompanyDAO[]> {
  const response = await instance.get("/companies");
  return response.data;
}

export async function GetCompanyDetailAPI(
  params: UseQueryOptions
): Promise<ICompanyDAO> {
  const [_, id] = params.queryKey;
  const response = await instance.get(`/companies/${id}`);
  return response.data;
}

export async function GetCompanyCategoryAPI(): Promise<string[]> {
  const listCompany = await GetCompanyListAPI();
  const listCategory = _.groupBy(listCompany, "category");
  const listCategoryData = [];

  if (listCategory) {
    for (const key in listCategory) {
      if (Object.hasOwn(listCategory, key)) {
        listCategoryData.push(key);
      }
    }
  }

  return listCategoryData;
}

export async function UpdateCompanyCategoryAPI(values: ICompanyDTO) {
  const data = { ...values };
  const id = values.id;
  delete data.id;
  if (values.status) {
    data.status = "active";
  } else {
    data.status = "inactive";
  }
  await instance.put(`/companies/${id}`, data);
}
