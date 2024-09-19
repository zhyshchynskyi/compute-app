import React, { useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContext } from 'contexts';
import { useModal } from 'hooks';
import { useSingupMutation } from 'redux/apis/userApi';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please enter your first name'),
  // account_name: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Please enter the name of your company'),
  email: Yup.string().email('Invalid email').required('Please use a valid email format. Example - user@l3agi.com'),
  password: Yup.string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character.'
    ),
  // confirm_password: Yup.string()
  //   .required('Please confirm your password')
  //   .oneOf([Yup.ref('password'), null], "Passwords don't match."),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  // account_name: '',
};

const useRegister = ({ noPopup }: { noPopup: boolean }) => {
  const [alertMessage, setAlertMessage] = React.useState({ type: '', message: '' });
  const [sginup, { isLoading }] = useSingupMutation();

  const { openModal, closeModal } = useModal();

  const { setToast } = useContext(ToastContext);
  const handleSubmit = async (values: any) => {
    try {
      const data = { ...values };
      await sginup(data).unwrap();

      setToast({
        message: 'User registered successfully, please login now!',
        type: 'positive',
        open: true,
      });
      {
        noPopup ? closeModal('login-modal') : openModal({ name: 'login-modal', data: { isRegister: false } });
      }
    } catch (error: any) {
      setAlertMessage({
        type: 'danger',
        message: error?.detail || 'User email is already registered',
      });
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values) => handleSubmit(values),
  });

  useEffect(() => {
    if (!formik.isSubmitting) return;
    if (Object.keys(formik.errors).length > 0) {
      const error = document.getElementsByName(Object.keys(formik.errors)[0])[0];
      if (error) {
        error.focus();
      }
    }
  }, [formik]);

  return {
    formik,
    alertMessage,
  };
};

export default useRegister;
