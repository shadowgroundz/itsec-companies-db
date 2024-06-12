export interface ICompanyDAO {
  name: string;
  image: string;
  address: string;
  employees: number;
  description: string;
  country: string;
  category: string;
  status: "active" | "inactive" | boolean;
  id: string;
}
