/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface ArrowUpOutlineProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const ArrowUpOutline: React.FC<ArrowUpOutlineProps> = ({ size, ...props }) => (
  <svg viewBox='0 0 40 40' fill='currentColor' width={size || '40'} height={size || '40'} {...props}>
    <g filter='url(#filter0_bd_718_13662)'>
      <path
        d='M14 22.5858L19.2929 17.2929C19.6834 16.9024 20.3166 16.9024 20.7071 17.2929L26 22.5858'
        stroke='#fff'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </g>
    <defs>
      <filter
        id='filter0_bd_718_13662'
        x='-10'
        y='-10'
        width='60'
        height='60'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood result='BackgroundImageFix' floodOpacity='0' />
        <feGaussianBlur in='BackgroundImageFix' stdDeviation='5' />
        <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_718_13662' />
        <feColorMatrix in='SourceAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
        <feOffset dy='1' />
        <feGaussianBlur stdDeviation='1.5' />
        <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0' />
        <feBlend in2='effect1_backgroundBlur_718_13662' result='effect2_dropShadow_718_13662' />
        <feBlend in='SourceGraphic' in2='effect2_dropShadow_718_13662' result='shape' />
      </filter>
    </defs>
  </svg>
)
ArrowUpOutline.displayName = 'ArrowUpOutline'
export default ArrowUpOutline
/* tslint:enable */
/* eslint-enable */
