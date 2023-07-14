import styled from 'styled-components'
import {Form} from 'formik';

export const StyledCreateArticle = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 50px;

  .input {
    margin: 5px 0;
  }
`