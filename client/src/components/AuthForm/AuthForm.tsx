import React, {FC} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ErrorMessage, Field, Formik} from 'formik';
import * as Yup from 'yup';
import {StyledAuthForm} from "./StyledAuthForm";

export interface IFormValues {
    email: string
    password: string
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required('Required'),
})

const initialValues: IFormValues = {
    email: '',
    password: '',
}

interface IAuthForm {
    handleSubmit: (values: IFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => void
    buttonLabel: string
}

export const AuthForm: FC<IAuthForm> = ({handleSubmit, buttonLabel}) => {

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({isSubmitting, touched, errors}) => (
                <StyledAuthForm>
                    <div className={'table'}>
                        <Field
                            className={'field'}
                            name="email"
                            as={TextField}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            error={!!(touched.email && errors.email)}
                            helperText={<ErrorMessage name="email"/>}
                        />
                        <Field
                            className={'field'}
                            name="password"
                            as={TextField}
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            error={!!(touched.password && errors.password)}
                            helperText={<ErrorMessage name="password"/>}
                        />
                    </div>
                    <Button
                        className={'button'}
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : buttonLabel}
                    </Button>
                </StyledAuthForm>
            )}
        </Formik>
    )
}
