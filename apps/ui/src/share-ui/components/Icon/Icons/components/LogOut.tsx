/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface LogOutProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const LogOut: React.FC<LogOutProps> = ({ size, ...props }) => (
  <svg viewBox='0 0 20 20' fill='currentColor' width={size || '20'} height={size || '20'} {...props}>
    <path
      d='M3.55928 3.60927C3.62925 3.53931 3.72414 3.5 3.82309 3.5H11.6846C11.7836 3.5 11.8785 3.53931 11.9484 3.60927C12.0184 3.67924 12.0577 3.77413 12.0577 3.87308V6.68077C12.0577 7.09498 12.3935 7.43077 12.8077 7.43077C13.2219 7.43077 13.5577 7.09498 13.5577 6.68077V3.87308C13.5577 3.37631 13.3604 2.89988 13.0091 2.54861C12.6578 2.19734 12.1814 2 11.6846 2H3.82309C3.32632 2 2.84989 2.19734 2.49862 2.54861C2.14735 2.89988 1.95001 3.37631 1.95001 3.87308V16.2269C1.95001 16.7237 2.14735 17.2001 2.49862 17.5514C2.84989 17.9027 3.32632 18.1 3.82309 18.1H11.6846C12.1814 18.1 12.6578 17.9027 13.0091 17.5514C13.3604 17.2001 13.5577 16.7237 13.5577 16.2269V13.4192C13.5577 13.005 13.2219 12.6692 12.8077 12.6692C12.3935 12.6692 12.0577 13.005 12.0577 13.4192V16.2269C12.0577 16.3259 12.0184 16.4208 11.9484 16.4907C11.8785 16.5607 11.7836 16.6 11.6846 16.6H3.82309C3.72414 16.6 3.62925 16.5607 3.55928 16.4907C3.48932 16.4208 3.45001 16.3259 3.45001 16.2269V3.87308C3.45001 3.77413 3.48932 3.67924 3.55928 3.60927Z'
      fill='currentColor'
    />
    <path
      d='M15.0842 7.83509C15.3771 7.54219 15.852 7.54219 16.1449 7.83509L17.819 9.50916C17.961 9.64563 18.0493 9.83749 18.0493 10.05C18.0493 10.2612 17.9621 10.452 17.8216 10.5883L16.1449 12.265C15.852 12.5579 15.3771 12.5579 15.0842 12.265C14.7913 11.9721 14.7913 11.4972 15.0842 11.2043L15.4886 10.8H9.43781C9.02359 10.8 8.68781 10.4642 8.68781 10.05C8.68781 9.63577 9.02359 9.29999 9.43781 9.29999H15.4885L15.0842 8.89575C14.7913 8.60285 14.7913 8.12798 15.0842 7.83509Z'
      fill='currentColor'
    />
  </svg>
)
LogOut.displayName = 'LogOut'
export default LogOut
/* tslint:enable */
/* eslint-enable */
