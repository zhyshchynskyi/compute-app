/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface AboutProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const About: React.FC<AboutProps> = ({ size, ...props }) => (
  <svg viewBox='0 0 40 40' fill='currentColor' width={size || '40'} height={size || '40'} {...props}>
    <path
      d='M7 18.6135V28.9729C7 29.9338 7.71179 30.4677 8.51734 30.4677C9.32078 30.4581 10.0305 29.9338 10.0305 28.9729V16.0518H9.55538C8.07718 16.0518 7 16.9637 7 18.6135ZM11.1487 32.3655H29.6983C32.2394 32.3655 33.5425 31.0698 33.5425 28.5693V10.8058C33.5425 8.30523 32.2394 7 29.6983 7H16.1598C13.6284 7 12.3135 8.30523 12.3135 10.8058V30.0205C12.3135 31.2196 12.0205 31.8995 11.1487 32.3655ZM17.2806 14.2987C16.8292 14.2987 16.4854 13.9452 16.4854 13.5034C16.4854 13.0712 16.8271 12.7391 17.2806 12.7391H28.5946C29.0406 12.7391 29.3823 13.0712 29.3823 13.5034C29.3823 13.9452 29.0385 14.2987 28.5946 14.2987H17.2806ZM17.2806 18.3477C16.8271 18.3477 16.4854 18.006 16.4854 17.5738C16.4854 17.132 16.8292 16.7882 17.2806 16.7882H28.5946C29.0385 16.7882 29.3823 17.132 29.3823 17.5738C29.3823 18.006 29.0406 18.3477 28.5946 18.3477H17.2806ZM24.407 22.4064C23.9535 22.4064 23.6193 22.0743 23.6193 21.6442C23.6193 21.1907 23.9514 20.849 24.407 20.849H28.5946C29.0385 20.849 29.3685 21.1907 29.3685 21.6442C29.3685 22.0743 29.0385 22.4064 28.5946 22.4064H24.407ZM24.407 26.5007C23.9514 26.5007 23.6193 26.1686 23.6193 25.7364C23.6193 25.2946 23.9535 24.9412 24.407 24.9412H28.5946C29.0385 24.9412 29.3685 25.2946 29.3685 25.7364C29.3685 26.1686 29.0385 26.5007 28.5946 26.5007H24.407ZM17.8818 26.5487C17.0019 26.5487 16.4737 26.0184 16.4737 25.1481V22.255C16.4737 21.3773 17.0019 20.849 17.8818 20.849H20.6955C21.5657 20.849 22.0961 21.3773 22.0961 22.255V25.1481C22.0961 26.0184 21.5657 26.5487 20.6955 26.5487H17.8818Z'
      fill='#fff'
    />
  </svg>
)
About.displayName = 'About'
export default About
/* tslint:enable */
/* eslint-enable */
