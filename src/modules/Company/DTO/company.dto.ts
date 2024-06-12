export interface ICompanyDTO {
  id?: string;
  category: string;
  employees: number;
  description: string;
  status: "active" | "inactive";
}
