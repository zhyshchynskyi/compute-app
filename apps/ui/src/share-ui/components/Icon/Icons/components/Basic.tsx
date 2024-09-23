/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface BasicProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const Basic: React.FC<BasicProps> = ({ size, ...props }) => (
  <svg viewBox='0 0 20 20' fill='currentColor' width={size || '20'} height={size || '20'} {...props}>
    <path
      d='M2 11.4631C2 11.0844 2.30701 10.7773 2.68573 10.7773H8.53729C8.91601 10.7773 9.22302 11.0844 9.22302 11.4631V17.3146C9.22302 17.6934 8.91601 18.0004 8.53729 18.0004H2.68573C2.30701 18.0004 2 17.6934 2 17.3146V11.4631zM3.37146 12.1488V16.6289H7.85156V12.1488H3.37146zM10.7773 11.4631C10.7773 11.0844 11.0844 10.7773 11.4631 10.7773H17.3146C17.6934 10.7773 18.0004 11.0844 18.0004 11.4631V17.3146C18.0004 17.6934 17.6934 18.0004 17.3146 18.0004H11.4631C11.0844 18.0004 10.7773 17.6934 10.7773 17.3146V11.4631zM12.1488 12.1488V16.6289H16.6289V12.1488H12.1488zM6.87598 2.68573C6.87598 2.30701 7.18299 2 7.56171 2H13.4133C13.792 2 14.099 2.30701 14.099 2.68573V8.53729C14.099 8.91601 13.792 9.22302 13.4133 9.22302H7.56171C7.18299 9.22302 6.87598 8.91601 6.87598 8.53729V2.68573zM8.24744 3.37146V7.85156H12.7275V3.37146H8.24744z'
      fill='currentColor'
      fillRule='evenodd'
      clipRule='evenodd'
    />
  </svg>
)
Basic.displayName = 'Basic'
export default Basic
/* tslint:enable */
/* eslint-enable */
