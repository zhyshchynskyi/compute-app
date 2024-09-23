/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface EmbedProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const Embed: React.FC<EmbedProps> = ({ size, ...props }) => (
  <svg viewBox='0 0 20 20' fill='currentColor' width={size || '20'} height={size || '20'} {...props}>
    <path
      d='M11.6117 6.22411C11.6929 5.81793 11.4295 5.42282 11.0233 5.34161C10.6172 5.26039 10.222 5.52382 10.1408 5.92999L8.57199 13.7759C8.49078 14.1821 8.7542 14.5772 9.16038 14.6584C9.56655 14.7396 9.96166 14.4762 10.0429 14.07L11.6117 6.22411ZM13.4148 7.19635C13.6633 6.86497 14.1334 6.79779 14.4648 7.0463L17.6033 9.39999C17.7922 9.54163 17.9033 9.76393 17.9033 10C17.9033 10.2361 17.7922 10.4584 17.6033 10.6L14.4648 12.9537C14.1334 13.2022 13.6633 13.135 13.4148 12.8037C13.1663 12.4723 13.2334 12.0022 13.5648 11.7537L15.9033 10L13.5648 8.24634C13.2334 7.99783 13.1663 7.52773 13.4148 7.19635ZM6.76888 7.19627C7.01744 7.52762 6.95032 7.99773 6.61897 8.24628L4.2811 10L6.61897 11.7537C6.95032 12.0023 7.01744 12.4724 6.76888 12.8037C6.52032 13.1351 6.05022 13.2022 5.71887 12.9536L2.5812 10.6C2.39237 10.4583 2.28125 10.2361 2.28125 10C2.28125 9.76396 2.39237 9.54169 2.5812 9.40004L5.71887 7.04636C6.05022 6.79781 6.52032 6.86492 6.76888 7.19627Z'
      fill='currentColor'
      fillRule='evenodd'
      clipRule='evenodd'
    />
  </svg>
)
Embed.displayName = 'Embed'
export default Embed
/* tslint:enable */
/* eslint-enable */
