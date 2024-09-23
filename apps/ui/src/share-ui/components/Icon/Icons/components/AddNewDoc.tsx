/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface AddNewDocProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const AddNewDoc: React.FC<AddNewDocProps> = ({ size, ...props }) => (
  <svg viewBox='0 0 20 20' fill='currentColor' width={size || '20'} height={size || '20'} {...props}>
    <g fill='currentColor' clipPath='url(#clip0_337_7087)'>
      <path
        d='M16.5988 7.77861C16.6004 7.75869 16.6012 7.73856 16.6012 7.71823C16.6012 7.6979 16.6004 7.67776 16.5988 7.65784V7.63436C16.5987 7.17762 16.4171 6.73944 16.0942 6.41637L12.2838 2.60592C11.9607 2.28307 11.5225 2.10166 11.0658 2.10156H5.16877C4.71171 2.10156 4.27337 2.28313 3.95019 2.60632C3.627 2.9295 3.44543 3.36784 3.44543 3.8249V16.4782C3.44543 16.9353 3.627 17.3736 3.95019 17.6968C4.27337 18.02 4.71171 18.2016 5.16877 18.2016H9.73701C9.27902 17.7996 8.90083 17.2879 8.63366 16.7016H5.16877C5.10954 16.7016 5.05273 16.678 5.01085 16.6361C4.96896 16.5943 4.94543 16.5375 4.94543 16.4782V3.8249C4.94543 3.76566 4.96896 3.70886 5.01085 3.66698C5.05273 3.62509 5.10954 3.60156 5.16877 3.60156L10.2345 3.65625V6.7449C10.2345 7.20195 10.4161 7.64029 10.7393 7.96348C11.0624 8.28666 11.5008 8.46823 11.9578 8.46823H14.1954V8.46649H16.5988V7.77861ZM11.7345 4.17795L14.5248 6.96823H11.9578C11.8986 6.96823 11.8418 6.9447 11.7999 6.90282C11.758 6.86093 11.7345 6.80413 11.7345 6.7449V4.17795Z'
        fillRule='evenodd'
        clipRule='evenodd'
      />
      <path d='M6.11438 10.7515C6.11438 10.3373 6.45017 10.0015 6.86438 10.0015H11.6954C12.1096 10.0015 12.4454 10.3373 12.4454 10.7515 12.4454 11.1657 12.1096 11.5015 11.6954 11.5015H6.86438C6.45017 11.5015 6.11438 11.1657 6.11438 10.7515zM6.86453 13.2015C6.45032 13.2015 6.11453 13.5373 6.11453 13.9515 6.11453 14.3657 6.45032 14.7015 6.86453 14.7015H8.69641C9.11062 14.7015 9.44641 14.3657 9.44641 13.9515 9.44641 13.5373 9.11062 13.2015 8.69641 13.2015H6.86453zM15.4454 10.5469C15.8596 10.5469 16.1954 10.8827 16.1954 11.2969V14.5469H19.4454C19.8596 14.5469 20.1954 14.8827 20.1954 15.2969 20.1954 15.7111 19.8596 16.0469 19.4454 16.0469H16.1954V19.2969C16.1954 19.7111 15.8596 20.0469 15.4454 20.0469 15.0312 20.0469 14.6954 19.7111 14.6954 19.2969V16.0469H11.4454C11.0312 16.0469 10.6954 15.7111 10.6954 15.2969 10.6954 14.8827 11.0312 14.5469 11.4454 14.5469H14.6954V11.2969C14.6954 10.8827 15.0312 10.5469 15.4454 10.5469z' />
    </g>
    <defs>
      <clipPath id='clip0_337_7087'>
        <path fill='#fff' transform='translate(.195 .151)' d='M0 0H20V20H0z' />
      </clipPath>
    </defs>
  </svg>
)
AddNewDoc.displayName = 'AddNewDoc'
export default AddNewDoc
/* tslint:enable */
/* eslint-enable */
