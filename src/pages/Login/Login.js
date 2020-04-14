import React from 'react'
import './Login.css'
import { Formik, Form, Field, ErrorMessage } from 'formik' 
import * as yup from 'yup'
import setLocale from '../../validation/validator'
import axios from 'axios'
import history from '../../history'
import swal from 'sweetalert'

const Login = () => {
    yup.setLocale(setLocale)
    const handleSubmit = values => {
        axios.post('http://localhost:3008/user/login', values)
        .then(resp => {
            const { data } = resp
            if (data)
            {   
                if (data.error) {
                    swal({
                        title: "Ops",
                        text: data.error,
                        icon: "error",
                        button: "Ok"
                    })
                } else {
                localStorage.setItem('rpg_token', data.rpg_token)
                localStorage.setItem('email', data.user.email)
                history.push('/')
                console.log(data)
                }
            } else {
                swal({
                    title: "Ops",
                    text: data.error,
                    icon: "warning",
                    button: "Ok"
                })
            }
        })
    }
    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(4).required()
    })
    return ( 
        <>  
            <div className="Login">
            <div className='Login-Icon-Pos'>
            <img src={require('../../img/icons/login.png')} alt="Login" className="Login-Icon"/>
            </div>
                <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}> 
                    <Form className="Login-Form">
                        <div className="Login-Group">
                            <p className="Login-Data">e-mail</p>
                            <Field name="email" className="Login-Field"/>
                            <br/>
                            <ErrorMessage component="span" name="email" className="Login-Error"/>
                        </div>
                        <div className="Login-Group">
                            <p className="Login-Data">senha</p>
                            <Field name="password" className="Login-Field"/>
                            <br/>
                            <ErrorMessage component="span" name="password" className="Login-Error"/>
                        </div>
                        <button className="Login-Btn" type="submit"/>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default Login