import Table from 'components/Table'
import { columns } from 'pages/Subnets/panels/LogsPanel/columnConfig'
import LogDetails from 'pages/Subnets/panels/LogsPanel/LogDetails'
import { formatDate, generateSubnetApiLogsUrl } from 'pages/Subnets/panels/LogsPanel/useApiLog'
import styled from 'styled-components'

interface FilterProps {
  limit: number
  page: number
}

const LogsTable = () => {
  const default_filter: FilterProps = {
    page: 1,
    limit: 20,
  }

  const url = generateSubnetApiLogsUrl(default_filter)

  // const { data: all_api_logs, loading: fetch_logs_loading } = useAllApiLogs(url)
  const all_api_logs: { items: any[] } = { items: [] }

  const { items } = all_api_logs

  const logs = items?.map(logs => {
    return {
      ...logs,
      created_on: formatDate(logs.created_on),
      name: logs.service_name,
      icon:
        logs.service_icon ||
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAACUCAMAAADBJsndAAAAY1BMVEX///8AAAD5+fnX19c/Pz9ERETf398GBgZiYmKqqqra2tqkpKR2dnb09PRzc3Pv7+9paWlNTU3MzMyXl5fFxcW8vLyLi4vm5uY6OjovLy9UVFQqKiq0tLSCgoJZWVkhISEVFRUKBiJ8AAAD2ElEQVR4nO2c2ZKqMBBAJdGAArKDC6D//5XXkWUQooQkHZlbfV6nAqckS3cnmc0GQRAEQRAEQRAE+d/wiwOF41D4OiRJ6nr1bgvHrvbclKhqZs7ZguccZmqajgHJhlDB8nAypmlZJyatGRnUtKzoIKcZmPvoDU4g5ZkY1rSsREaz6Jt7jEDCjv2bZH7QsG0bSfdvYVg3EI4SjdumF3jNh+ilfdvypmnT8KY4AQuS3ZrXxYtb5k1DB0CKA6llR1LbuXMAKR6VbAdtJk97D+DEw208l6+e3/Fc3s3Qkwt66gU99YKeeoH19AMtufcG1LPI3OroJaVkWvMKmCdxa7t5dpQUSopPoDz9qLX8YUfVJDdgnsXVemF5fDsCxjO4WCPkUlpoz2nKrFJ2AfNk00LJLV2hZzbRVE5QIDxJzvGULLpAenILT4pzE4jnZLQ/2KpNTSCe9d/4PX2P41mrLZ4g473keFaiD+ZvGYB4xtO9hbtAoEoKGu+TPHEzysazA4gnqSae0WwgGpT5b+xy8vav/Rlm3aSTDYa55ShwHfu1xbYazhBA8dJ4RZpbjdLdyPKHa/7bV6Hiz+w+eKE9Vw48TiWf3PtcACyep+Gts6xnarkFb75t6b49XH7kZ0l9up4vVTkzczLe8tVxjqE9HxSUUja3hcoJAod4BN5ThGBm79HzV+FZfFBckSed3RVfhWe8ndNchWcssC++Ak96++Bn1JP4QeC/m5hiAUsTnuSQVvXuFHkl5eVwLyvrFz1p3ve++7Gc/Lm8crWMeyYvY8SuRounqCa05yQCuryUQXmZyUfPuIn7hLMXMU+fk8GfB2HvXliz82yOJZyXl6c/eRYh743XTpS44pq9J8md2pMoTX/w5Gv2osQVmTfHno+IRSqzfu/JLYc8OT1FF2kOPOV46+l/iCfPZb/j/21Ptlvm8SXPw6ckYj2eVLcmjCfTf4ARwpMBnFkF8IxF1+zveqYgp1YHnlKHlCeeGczh2t6zzCtXYi9i7JlBfPSBZ/ITMEmckht5Ckbn0p6seb6r6FlyyoJaPfWcW/PfFQZ1eyrG8+iJnuiJnuiJnuj5H3ryTjCs0HPDOwmkh3YLV5PndMNdE1uq1XMTj7f59RBq3y8OGAR94iYdz/+Vez3dPSnlm79CyN+TMnvvrJS+d2b2Hl9b+7Ul2nZLkIF7kbSr/crciwz6yeO46numX7i3u7wa8vxB/8g9aOP3yqUHAps/NqGPrcoB0hCs/jXClhnqA9LQzP+RUDx+/1jRYrdyoh0ckVO5sZbVmRTsAAcrzIQQCIIgCIIgCIIgiEn+AV2nTx42XppgAAAAAElFTkSuQmCC',
      subnet: logs.subnet_name,
      request_url: logs.request_url,
      response_status: logs.response_status,
      additional_data: {
        request_headers: logs.request_headers,
        request_body: logs.request_body,
        response_headers: logs.response_headers,
        response_body: logs.response_body,
        response_duration: logs.response_duration,
        error_message: logs.error_message,
        error_code: logs.error_code,
        request_id: logs.request_id,
        request_url: logs.request_url,
      },
    }
  })

  return (
    <StyledRoot>
      <Table
        columns={columns()}
        data={logs}
        hiddenContentAccessor={row => {
          return <LogDetails data={row?.additional_data as any} />
        }}
        noBorder
        isLoading={false}
      />
    </StyledRoot>
  )
}

export default LogsTable

const StyledRoot = styled.div`
  display: flex;

  overflow: auto;
  height: 100%;
  width: 100%;
`
