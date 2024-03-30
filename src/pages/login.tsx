import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { redirect } from "next/navigation";
import React from "react";
import { Form } from "react-bootstrap";
//import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TextInputGeneral from "@/app/common/form/TextInputGeneral";
import { useStore } from "@/app/stores/store";

//import { useStore } from "../../app/stores/store";

export default observer( function LoginForm() {
    
    const {userStore} = useStore();   
  //  const navigate = useNavigate();

    return (
        <Formik
            initialValues={{email:'', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values)
                .then(state => {
                    toast.success('successfully logged in');
                    redirect(`/`);
//                    navigate(`/`)
})
                .catch(error => setErrors({error:'Invalid email or password'}))
            }
            >
                {({handleSubmit, isSubmitting, errors}) =>(
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <h3>Login</h3>
                        <TextInputGeneral name='email' placeholder="Email" />
                        <TextInputGeneral name='password' placeholder="Password" type="password" />
                        <ErrorMessage 
                            name='error' render={() => 
                                <>
                                    {
                                        //<Label style = {{marginBottom:10}} basic color='red' content ={errors.error} />
                                    }
                                    <Form.Label style = {{marginBottom:10}} basic color='red' >{errors.error}</Form.Label>
                                </>
                        }
                        />
                        <button type = 'submit' className="btn btn-primary">Login</button>
                    </Form>
                )}
            </Formik>
    )
})