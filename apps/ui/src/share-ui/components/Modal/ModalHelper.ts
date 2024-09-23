import { ReactElement } from 'react'
import ModalHeader from '../ModalHeader/ModalHeader'
import ModalContent from '../ModalContent/ModalContent'
import ModalFooter from '../ModalFooter/ModalFooter'

export enum ModalWidth {
  DEFAULT = 'default',
  FULL_WIDTH = 'full_width',
}

export enum ModalBackgroundColor {
  LIGHT = 'light',
  DARK = 'dark',
}

// the type A11yDialog is not exported from a11y-dialog, so mocking it with any for now
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type A11yDialogType = any

export const isModalHeader = (child: ReactElement) => child.type === ModalHeader
export const isModalContent = (child: ReactElement) => child.type === ModalContent
export const isModalFooter = (child: ReactElement) => child.type === ModalFooter

export const validateTitleProp = (title: string, childrenArray: ReactElement[]) => {
  const hasHeaderComponent = childrenArray.some(isModalHeader)
  if (hasHeaderComponent) return
}
