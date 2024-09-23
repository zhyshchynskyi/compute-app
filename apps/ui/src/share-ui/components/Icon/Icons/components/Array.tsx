/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface ArrayProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const Array: React.FC<ArrayProps> = ({ size, ...props }) => (
  <svg viewBox='0 0 32 32' fill='currentColor' width={size || '32'} height={size || '32'} {...props}>
    <path
      d='M11.365 21.7275L11.592 21.282H11.592L11.365 21.7275ZM10.2725 20.635L10.718 20.408H10.718L10.2725 20.635ZM20.7275 20.635L20.282 20.408V20.408L20.7275 20.635ZM19.635 21.7275L19.408 21.282H19.408L19.635 21.7275ZM19.635 11.2725L19.408 11.718V11.718L19.635 11.2725ZM20.7275 12.365L20.282 12.592V12.592L20.7275 12.365ZM11.365 11.2725L11.592 11.718L11.365 11.2725ZM10.2725 12.365L10.718 12.592L10.2725 12.365ZM12.0528 19.2764C11.9293 19.5234 12.0294 19.8237 12.2764 19.9472C12.5234 20.0707 12.8237 19.9706 12.9472 19.7236L12.0528 19.2764ZM15.9472 13.7236C16.0707 13.4766 15.9706 13.1763 15.7236 13.0528C15.4766 12.9293 15.1763 13.0294 15.0528 13.2764L15.9472 13.7236ZM14 11.5H17V10.5H14V11.5ZM20.5 15V18H21.5V15H20.5ZM17 21.5H14V22.5H17V21.5ZM10.5 18V15H9.5V18H10.5ZM14 21.5C13.2917 21.5 12.7905 21.4996 12.3987 21.4676C12.0128 21.4361 11.7772 21.3764 11.592 21.282L11.138 22.173C11.4877 22.3512 11.8695 22.4277 12.3173 22.4643C12.7593 22.5004 13.3082 22.5 14 22.5V21.5ZM9.5 18C9.5 18.6918 9.49961 19.2407 9.53572 19.6827C9.57231 20.1305 9.64884 20.5123 9.82698 20.862L10.718 20.408C10.6236 20.2228 10.5639 19.9872 10.5324 19.6013C10.5004 19.2095 10.5 18.7083 10.5 18H9.5ZM11.592 21.282C11.2157 21.0903 10.9097 20.7843 10.718 20.408L9.82698 20.862C10.1146 21.4265 10.5735 21.8854 11.138 22.173L11.592 21.282ZM20.5 18C20.5 18.7083 20.4996 19.2095 20.4676 19.6013C20.4361 19.9872 20.3764 20.2228 20.282 20.408L21.173 20.862C21.3512 20.5123 21.4277 20.1305 21.4643 19.6827C21.5004 19.2407 21.5 18.6918 21.5 18H20.5ZM17 22.5C17.6918 22.5 18.2407 22.5004 18.6827 22.4643C19.1305 22.4277 19.5123 22.3512 19.862 22.173L19.408 21.282C19.2228 21.3764 18.9872 21.4361 18.6013 21.4676C18.2095 21.4996 17.7083 21.5 17 21.5V22.5ZM20.282 20.408C20.0903 20.7843 19.7843 21.0903 19.408 21.282L19.862 22.173C20.4265 21.8854 20.8854 21.4265 21.173 20.862L20.282 20.408ZM17 11.5C17.7083 11.5 18.2095 11.5004 18.6013 11.5324C18.9872 11.5639 19.2228 11.6236 19.408 11.718L19.862 10.827C19.5123 10.6488 19.1305 10.5723 18.6827 10.5357C18.2407 10.4996 17.6918 10.5 17 10.5V11.5ZM21.5 15C21.5 14.3082 21.5004 13.7593 21.4643 13.3173C21.4277 12.8695 21.3512 12.4877 21.173 12.138L20.282 12.592C20.3764 12.7772 20.4361 13.0128 20.4676 13.3987C20.4996 13.7905 20.5 14.2917 20.5 15H21.5ZM19.408 11.718C19.7843 11.9097 20.0903 12.2157 20.282 12.592L21.173 12.138C20.8854 11.5735 20.4265 11.1146 19.862 10.827L19.408 11.718ZM14 10.5C13.3082 10.5 12.7593 10.4996 12.3173 10.5357C11.8695 10.5723 11.4877 10.6488 11.138 10.827L11.592 11.718C11.7772 11.6236 12.0128 11.5639 12.3987 11.5324C12.7905 11.5004 13.2917 11.5 14 11.5V10.5ZM10.5 15C10.5 14.2917 10.5004 13.7905 10.5324 13.3987C10.5639 13.0128 10.6236 12.7772 10.718 12.592L9.82698 12.138C9.64884 12.4877 9.57231 12.8695 9.53572 13.3173C9.49961 13.7593 9.5 14.3082 9.5 15H10.5ZM11.138 10.827C10.5735 11.1146 10.1146 11.5735 9.82698 12.138L10.718 12.592C10.9097 12.2157 11.2157 11.9097 11.592 11.718L11.138 10.827ZM12.9472 19.7236L15.9472 13.7236L15.0528 13.2764L12.0528 19.2764L12.9472 19.7236Z'
      fill='#fff'
    />
    <path
      d='M16 19.5C16 19.7761 15.7761 20 15.5 20C15.2239 20 15 19.7761 15 19.5C15 19.2239 15.2239 19 15.5 19C15.7761 19 16 19.2239 16 19.5ZM17.5 19.5C17.5 19.7761 17.2761 20 17 20C16.7239 20 16.5 19.7761 16.5 19.5C16.5 19.2239 16.7239 19 17 19C17.2761 19 17.5 19.2239 17.5 19.5ZM18.5 20C18.7761 20 19 19.7761 19 19.5C19 19.2239 18.7761 19 18.5 19C18.2239 19 18 19.2239 18 19.5C18 19.7761 18.2239 20 18.5 20Z'
      fill='#fff'
      fillRule='evenodd'
      clipRule='evenodd'
    />
  </svg>
)
Array.displayName = 'Array'
export default Array
/* tslint:enable */
/* eslint-enable */
