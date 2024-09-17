import { ToastProps } from 'providers/ToastProvider';
import React from 'react';
import { IUser } from 'types/user.types';

type UserContextValue = {
  user: IUser | null;
  loading: boolean;
  isAuthenticated: boolean;
};

type ModalContextValue = {
  modals: object;
  openModal: (params: { name: string; data?: any }) => void;
  closeModal: (name: string) => void;
};

type PageStateContextValue = {
  pageStateValue: any;
  updatePageStateValue: (value: any) => void;
};

type ToastContextValue = {
  toast: ToastProps;
  setToast: (value: ToastProps) => void;
};

type LayoutContextTypes = {
  expand: boolean;
  onChangeLayout: any;
};

export const ToastContext = React.createContext<ToastContextValue>({
  toast: {},
  setToast: () => {},
});

export const PageStateContext = React.createContext<PageStateContextValue>({
  pageStateValue: {},
  updatePageStateValue: () => {},
});

export const AuthContext = React.createContext<UserContextValue>({
  user: null,
  loading: false,
  isAuthenticated: false,
});

export const ModalContext = React.createContext<ModalContextValue>({
  modals: {},
  openModal: (params) => {},
  closeModal: (name) => {},
});

export const LayoutContext = React.createContext<LayoutContextTypes>({
  expand: false,
  onChangeLayout: () => {},
});
