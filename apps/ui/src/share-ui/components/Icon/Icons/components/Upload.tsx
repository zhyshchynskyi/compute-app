/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface UploadProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const Upload: React.FC<UploadProps> = ({ size, ...props }) => (
  <svg viewBox='0 0 32 32' fill='currentColor' width={size || '32'} height={size || '32'} {...props}>
    <g filter='url(#filter0_bd_761_16557)'>
      <path
        d='M15.5 19.0195C15.5 19.2957 15.7239 19.5195 16 19.5195C16.2761 19.5195 16.5 19.2957 16.5 19.0195L15.5 19.0195ZM16.5 10.2624C16.5 9.9863 16.2761 9.76244 16 9.76244C15.7239 9.76244 15.5 9.9863 15.5 10.2624L16.5 10.2624ZM18.7535 12.2041C18.9464 12.4016 19.263 12.4053 19.4605 12.2123C19.658 12.0193 19.6617 11.7027 19.4688 11.5052L18.7535 12.2041ZM16.55 9.23317L16.1923 9.58259L16.55 9.23317ZM15.45 9.23317L15.8077 9.58259L15.8077 9.58259L15.45 9.23317ZM12.5312 11.5052C12.3383 11.7027 12.342 12.0193 12.5395 12.2123C12.737 12.4053 13.0536 12.4016 13.2465 12.204L12.5312 11.5052ZM9.5 19.0195C9.5 18.7434 9.27614 18.5195 9 18.5195C8.72386 18.5195 8.5 18.7434 8.5 19.0195H9.5ZM23.5 19.0195C23.5 18.7434 23.2761 18.5195 23 18.5195C22.7239 18.5195 22.5 18.7434 22.5 19.0195H23.5ZM21.726 22.7397L21.4948 22.2964L21.4948 22.2964L21.726 22.7397ZM22.7457 21.696L23.1933 21.9188L23.1933 21.9188L22.7457 21.696ZM9.25432 21.696L8.80671 21.9188L8.80671 21.9188L9.25432 21.696ZM10.274 22.7397L10.0428 23.183L10.0428 23.183L10.274 22.7397ZM16.5 19.0195L16.5 10.2624L15.5 10.2624L15.5 19.0195L16.5 19.0195ZM19.4688 11.5052L16.9076 8.88376L16.1923 9.58259L18.7535 12.2041L19.4688 11.5052ZM15.0924 8.88376L12.5312 11.5052L13.2465 12.204L15.8077 9.58259L15.0924 8.88376ZM16.9076 8.88376C16.4077 8.37208 15.5923 8.37208 15.0924 8.88376L15.8077 9.58259C15.9153 9.47247 16.0847 9.47247 16.1923 9.58259L16.9076 8.88376ZM8.5 19.0195V19.1787H9.5V19.0195H8.5ZM12.7333 23.5H19.2667V22.5H12.7333V23.5ZM23.5 19.1787V19.0195H22.5V19.1787H23.5ZM19.2667 23.5C19.9116 23.5 20.4261 23.5004 20.8409 23.4657C21.2618 23.4305 21.6244 23.3566 21.9572 23.183L21.4948 22.2964C21.3285 22.3831 21.1148 22.4393 20.7575 22.4692C20.3941 22.4996 19.9285 22.5 19.2667 22.5V23.5ZM22.5 19.1787C22.5 19.8556 22.4996 20.3338 22.4698 20.7076C22.4404 21.0758 22.3848 21.2989 22.2981 21.4732L23.1933 21.9188C23.3609 21.5822 23.4324 21.2154 23.4666 20.7871C23.5004 20.3644 23.5 19.8395 23.5 19.1787H22.5ZM21.9572 23.183C22.4912 22.9045 22.9232 22.4613 23.1933 21.9188L22.2981 21.4732C22.1207 21.8294 21.8388 22.1169 21.4948 22.2964L21.9572 23.183ZM8.5 19.1787C8.5 19.8395 8.49963 20.3644 8.53338 20.7871C8.56756 21.2154 8.63913 21.5822 8.80671 21.9188L9.70192 21.4732C9.61518 21.2989 9.5596 21.0758 9.5302 20.7076C9.50037 20.3338 9.5 19.8556 9.5 19.1787H8.5ZM12.7333 22.5C12.0715 22.5 11.6059 22.4996 11.2425 22.4692C10.8852 22.4393 10.6715 22.3831 10.5052 22.2964L10.0428 23.183C10.3756 23.3566 10.7382 23.4305 11.1591 23.4657C11.5739 23.5004 12.0884 23.5 12.7333 23.5V22.5ZM8.80671 21.9188C9.07676 22.4613 9.50879 22.9045 10.0428 23.183L10.5052 22.2964C10.1612 22.1169 9.87928 21.8294 9.70192 21.4732L8.80671 21.9188Z'
        fill='#fff'
      />
    </g>
    <defs>
      <filter
        id='filter0_bd_761_16557'
        x='-10'
        y='-10'
        width='52'
        height='52'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood result='BackgroundImageFix' floodOpacity='0' />
        <feGaussianBlur in='BackgroundImageFix' stdDeviation='5' />
        <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_761_16557' />
        <feColorMatrix in='SourceAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
        <feOffset dy='1' />
        <feGaussianBlur stdDeviation='1.5' />
        <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0' />
        <feBlend in2='effect1_backgroundBlur_761_16557' result='effect2_dropShadow_761_16557' />
        <feBlend in='SourceGraphic' in2='effect2_dropShadow_761_16557' result='shape' />
      </filter>
    </defs>
  </svg>
)
Upload.displayName = 'Upload'
export default Upload
/* tslint:enable */
/* eslint-enable */
