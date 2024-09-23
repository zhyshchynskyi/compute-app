/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface MirrorProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const Mirror: React.FC<MirrorProps> = ({ size, ...props }) => (
  <svg viewBox='0 0 20 20' fill='currentColor' width={size || '20'} height={size || '20'} {...props}>
    <path
      d='M10.4698 14.5303C10.1769 14.2374 10.1769 13.7626 10.4698 13.4697C10.7627 13.1768 11.2376 13.1768 11.5305 13.4697L13.2501 15.1893L13.2501 8.5C13.2501 7.24022 12.7497 6.03204 11.8589 5.14124C10.9681 4.25044 9.7599 3.75 8.50012 3.75C7.24034 3.75 6.03216 4.25044 5.14136 5.14124C4.25057 6.03204 3.75012 7.24022 3.75012 8.5C3.75012 8.91421 3.41433 9.25 3.00012 9.25C2.58591 9.25 2.25012 8.91421 2.25012 8.5C2.25012 6.8424 2.9086 5.25268 4.0807 4.08058C5.25281 2.90848 6.84252 2.25 8.50012 2.25C10.1577 2.25 11.7474 2.90848 12.9195 4.08058C14.0916 5.25268 14.7501 6.8424 14.7501 8.5L14.7501 15.1893L16.4698 13.4697C16.7627 13.1768 17.2376 13.1768 17.5305 13.4697C17.8233 13.7626 17.8233 14.2374 17.5305 14.5303L14.5305 17.5303C14.3898 17.671 14.199 17.75 14.0001 17.75C13.8012 17.75 13.6104 17.671 13.4698 17.5303L10.4698 14.5303Z'
      fill='currentColor'
      fillRule='evenodd'
      clipRule='evenodd'
    />
  </svg>
)
Mirror.displayName = 'Mirror'
export default Mirror
/* tslint:enable */
/* eslint-enable */
