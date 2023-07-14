import styled from 'styled-components'
import {Form} from 'formik';

export const StyledAuthForm = styled(Form)`
  & > * {
    margin: 8px;
    width: 25ch;
    display: flex;
    flex-direction: column;
  }
  
  .button {
    margin: 8px;
    /*margin: 10px 0;*/
  }
  
  .table {
    display: table-row;
  }
  
  .field {
    margin: 5px auto;
  }
`