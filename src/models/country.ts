export enum CountryStatus {
  Active = 'active',
  Disabled = 'disabled',
}

export interface Language {
  _id: string;
  name: string;
  code: string;
}

export interface Country {
  _id: string;
  name: string;
  phone: string;
  code: string;
  status: CountryStatus;
  languages: Language[];
  createdAt?: Date;
  updatedAt?: Date;
  currency_code?: string;
}
