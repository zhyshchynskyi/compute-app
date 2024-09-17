import { FormikProvider } from 'formik'
import AgentForm from './AgentForm'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'

import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import styled from 'styled-components'
import BackButton from 'components/BackButton'


export const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  gap: 5px;

  padding-right: 10px;

  margin-top: auto;
`
