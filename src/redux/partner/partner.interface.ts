export interface Partner {
  _id: string;
  name: string;
  logo: string;
  priority: number;
  status: PartnerStatus;
}

export enum PartnerStatus {
  Active = 'active',
  Disabled = 'disabled',
}

export interface PartnerState {
  isGot: boolean;
  isFetching: boolean;
  data: Partner[];
}
