/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface CountryProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const Country: React.FC<CountryProps> = ({ size, ...props }) => (
  <svg viewBox='0 0 20 20' fill='currentColor' width={size || '20'} height={size || '20'} {...props}>
    <path
      d='M4 17V3M7.83676 4.0363C8.56001 4.11785 9.25533 4.33528 9.87627 4.67407 10.4825 5.00475 11.1596 5.21992 11.8647 5.30589 12.5698 5.39187 13.2874 5.34676 13.9717 5.17344L15.2352 4.85329C15.3245 4.83078 15.4185 4.82692 15.5097 4.84204 15.601 4.85715 15.6871 4.89082 15.7612 4.94041 15.8353 4.98999 15.8954 5.05413 15.9369 5.1278 15.9783 5.20146 15.9999 5.28264 16 5.36496V10.9105C16 11.0262 15.9576 11.1387 15.879 11.231 15.8005 11.3233 15.6902 11.3904 15.5648 11.4222L13.9717 11.8261C13.2872 11.999 12.5695 12.0436 11.8644 11.9571 11.1593 11.8707 10.4822 11.655 9.87627 11.3238 9.25533 10.9851 8.56001 10.7676 7.83676 10.6861 7.1135 10.6045 6.37894 10.6607 5.68213 10.851L4 11.3097V4.65941L5.68213 4.20118M7.83676 4.0363C7.1135 3.95476 6.37894 4.01096 5.68213 4.20118M7.83676 4.0363C7.34593 3.99165 6.22784 3.96212 5.68213 4.20118'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
Country.displayName = 'Country'
export default Country
/* tslint:enable */
/* eslint-enable */
