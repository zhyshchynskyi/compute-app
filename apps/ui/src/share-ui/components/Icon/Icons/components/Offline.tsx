/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface OfflineProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const Offline: React.FC<OfflineProps> = ({ size, ...props }) => (
  <svg viewBox='0 0 20 20' fill='currentColor' width={size || '20'} height={size || '20'} {...props}>
    <path
      d='M15.9224 3.5777C16.2153 3.8706 16.2153 4.34547 15.9224 4.63836L4.13848 16.4223C3.84559 16.7152 3.37072 16.7152 3.07782 16.4223 2.78493 16.1294 2.78493 15.6545 3.07782 15.3616L14.8617 3.5777C15.1546 3.28481 15.6295 3.28481 15.9224 3.5777zM12.158 4.55997C11.4057 4.07023 10.5076 3.78571 9.54286 3.78571 7.23555 3.78571 5.30913 5.41319 4.84783 7.58317 3.20554 8.0374 2 9.54173 2 11.3286 2 12.3362 2.38358 13.2543 3.01269 13.9448 3.13876 14.0992 3.33063 14.1978 3.54554 14.1978 3.92524 14.1978 4.23304 13.89 4.23304 13.5103 4.23304 13.311 4.14824 13.1315 4.01274 13.006 3.61396 12.561 3.37143 11.9731 3.37143 11.3286 3.37143 10.0565 4.31673 9.00409 5.54293 8.83737L6.07722 8.76472 6.13263 8.22837C6.31087 6.50308 7.77012 5.15713 9.54286 5.15713 10.254 5.15713 10.9148 5.37375 11.4626 5.74458 11.4647 5.74604 11.4669 5.74739 11.4691 5.74865 11.5761 5.81727 11.7033 5.85706 11.8398 5.85706 12.2195 5.85706 12.5273 5.54926 12.5273 5.16956 12.5273 4.90468 12.3775 4.67478 12.158 4.55997zM14.1412 7.44025C14.1661 7.44025 14.1906 7.44156 14.2147 7.44412 16.3143 7.49738 18 9.21611 18 11.3286 18 13.4746 16.2603 15.2143 14.1143 15.2143 14.0545 15.2143 13.995 15.2129 13.9358 15.2102V15.2143H7.4232L7.42089 15.2143 7.41857 15.2143H7.36355L7.3618 15.2118C7.00976 15.1818 6.73339 14.8866 6.73339 14.5268 6.73339 14.1471 7.04119 13.8393 7.42089 13.8393 7.44468 13.8393 7.46819 13.8405 7.49136 13.8428H12.5644 12.9181 13.3153L14.1143 13.8428C15.5029 13.8428 16.6286 12.7172 16.6286 11.3286 16.6286 9.95729 15.5308 8.84241 14.1661 8.8148 14.1579 8.81509 14.1496 8.81525 14.1412 8.81525L14.1367 8.81523 13.8828 8.81525C13.5204 8.79596 13.2325 8.49498 13.2325 8.12775 13.2325 7.76051 13.5204 7.46053 13.8828 7.44123L13.9167 7.44025 13.92 7.44025 13.9232 7.44025H14.1367L14.1412 7.44025z'
      fill='currentColor'
      fillRule='evenodd'
      clipRule='evenodd'
    />
  </svg>
)
Offline.displayName = 'Offline'
export default Offline
/* tslint:enable */
/* eslint-enable */
