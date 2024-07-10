export interface User {
  id: string;
  email: string;
  name: string;
  companyId: string;
  token: string;
  permissions: Permissions[];
  accessToken?: string;
}
export interface Permissions {
  permission: string;
  path: string;
}

export interface ResponseInterface {
  statusCode: number;
  message: string | string[];
  data: any;
  error?: string | null;
}
