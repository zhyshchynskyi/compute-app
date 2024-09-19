export interface IPod {
    executor_id: string;
    container_name: string;
    volume_name: string;
    ports_mapping: { [key: string]: number };
    server_port: number;
    server_ip: string;
}
