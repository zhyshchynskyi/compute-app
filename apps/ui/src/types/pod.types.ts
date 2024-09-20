export interface IPodResponse {
    id: string;
    pod_name: string;
    ssh_connect_cmd: string;
    ports_mapping: { [key: string]: number };
    gpu_name: number;
    gpu_count: string;
    cpu_name: string;
    ram_total: number;
}
