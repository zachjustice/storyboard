export interface Author {
  id: number;
  email: string;
  name: string;
  created: string;
  modified?: any;
  roles: Role[];
  enabled: boolean;
}

export interface Role {
  id: number;
  role: string;
}

