export interface IGpuDetail {
  name: string;
  driver: string;
  capacity: string;
  cuda: string;
  power_limit: string;
  graphics_speed: string;
  memory_speed: string;
  pcei: string;
}

export interface IGpuSpec {
  count: number;
  details: IGpuDetail[];
}

export interface ICpuSpec {
  count: number;
  model: string;
}

export interface IMemorySpec {
  total: number;
  used: number;
  free: number;
}

export interface IMachineSpecs {
  gpu: IGpuSpec;
  cpu: ICpuSpec;
  ram: IMemorySpec;
}

export interface IExecutor {
  id: string;
  miner_hotkey: string;
  validator_hotkey: string;
  executor_id: string;
  executor_ip_address: string;
  executor_ip_port: string;
  specs: IMachineSpecs;
}
