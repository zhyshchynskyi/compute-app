/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface RecycleBinProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const RecycleBin: React.FC<RecycleBinProps> = ({ size, ...props }) => (
  <svg viewBox='0 0 20 20' fill='currentColor' width={size || '20'} height={size || '20'} {...props}>
    <path
      d='M8.82321 9.29205C9.19893 9.04262 9.64643 8.9241 10.0964 8.95485 10.5463 8.98559 10.9735 9.1639 11.3118 9.46212 11.3985 9.53853 11.478 9.62171 11.55 9.71062H11.1602C10.7459 9.71062 10.4102 10.0464 10.4102 10.4606 10.4102 10.8748 10.7459 11.2106 11.1602 11.2106H13.0437C13.458 11.2106 13.7937 10.8748 13.7937 10.4606V8.57703C13.7937 8.16281 13.458 7.82703 13.0437 7.82703 12.706 7.82703 12.4205 8.05024 12.3265 8.35717L12.3037 8.33693C11.7178 7.82041 10.9779 7.51159 10.1986 7.45834 9.41938 7.40508 8.64432 7.61036 7.99358 8.04236 7.34285 8.47436 6.8528 9.10895 6.59937 9.84776 6.46498 10.2396 6.67365 10.6661 7.06546 10.8005 7.45726 10.9349 7.88383 10.7263 8.01822 10.3344 8.16455 9.90787 8.44749 9.54147 8.82321 9.29205zM7.73274 14.3711C7.63861 14.6778 7.35316 14.9008 7.01562 14.9008 6.60141 14.9008 6.26562 14.565 6.26562 14.1508V12.2672C6.26562 11.853 6.60141 11.5172 7.01562 11.5172H7.34293C7.35195 11.517 7.36095 11.517 7.36992 11.5172H8.89922C9.31343 11.5172 9.64922 11.853 9.64922 12.2672 9.64922 12.6814 9.31343 13.0172 8.89922 13.0172H8.50886C8.58076 13.1062 8.66035 13.1894 8.74701 13.2658 9.08532 13.5642 9.51265 13.7426 9.96269 13.7733 10.4127 13.804 10.8603 13.6853 11.236 13.4357 11.6118 13.1861 11.8946 12.8194 12.0406 12.3926 12.1747 12.0007 12.6011 11.7917 12.993 11.9258 13.3849 12.0599 13.5939 12.4863 13.4598 12.8782 13.2069 13.6175 12.717 14.2526 12.0662 14.685 11.4154 15.1175 10.6401 15.323 9.86055 15.2698 9.08101 15.2166 8.34082 14.9076 7.75482 14.3908L7.73274 14.3711z'
      fill='currentColor'
    />
    <path
      d='M14.9882 18H5.01179C4.59336 18.0001 4.18929 17.8474 3.87555 17.5705C3.56173 17.2935 3.35989 16.9115 3.308 16.4962L2.01337 6.13464C1.98504 5.90913 2.0021 5.68249 2.06105 5.46729C2.06409 5.45557 2.0674 5.44396 2.07099 5.43246C2.13038 5.23232 2.22629 5.0428 2.35586 4.8742L4.05273 2.6695C4.21312 2.46115 4.41923 2.29242 4.65516 2.17634C4.89103 2.06029 5.15041 1.99996 5.41328 2H14.5868C14.8496 1.99996 15.109 2.06029 15.3449 2.17634C15.5808 2.29242 15.7869 2.46115 15.9473 2.6695L17.6442 4.8742C17.9197 5.23275 18.043 5.68595 17.9867 6.13464L16.692 16.4962C16.6401 16.9115 16.4383 17.2935 16.1245 17.5705C15.8107 17.8474 15.4067 18.0001 14.9882 18ZM4.79642 16.3102L3.55893 6.40601H16.4411L15.2036 16.3102C15.1971 16.3626 15.1716 16.4108 15.132 16.4458C15.0924 16.4807 15.0411 16.5 14.9882 16.5H5.01179C4.95896 16.5 4.90766 16.4807 4.86805 16.4458C4.82845 16.4108 4.80298 16.3626 4.79642 16.3102ZM15.7758 4.90601H4.22423L5.24133 3.5845C5.26158 3.5582 5.28759 3.53691 5.31737 3.52226C5.34714 3.50761 5.37989 3.49999 5.41308 3.5H14.587C14.6201 3.49999 14.6529 3.50761 14.6827 3.52226C14.7124 3.53691 14.7385 3.5582 14.7587 3.5845L15.7758 4.90601Z'
      fill='currentColor'
      fillRule='evenodd'
      clipRule='evenodd'
    />
  </svg>
)
RecycleBin.displayName = 'RecycleBin'
export default RecycleBin
/* tslint:enable */
/* eslint-enable */
