export enum accountTypeEnum {
  Compute = 'compute',
  Subnet_api = 'subnet-api',
  Validation = 'validator',
  Search = 'search',
}

export interface Account {
  id: string
  accountType: accountTypeEnum
  account_type: accountTypeEnum
  configs: any
  name: string
  active: boolean
}
