import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useLoginMutation } from "../generated/graphql";
import { Wrapper } from "../components/Wrapper";
import image from '../images/home.jpeg';
import logo from '../images/logo.jpeg';
import styled from "@emotion/styled";
import { GENERICS } from "../components/GlobalStyle";
import {Link, useNavigate} from "react-router-dom";
import {saveToken} from "../helper/auth";
import {useRequired} from "../helper/hooks";

export function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [submitLogin, { error, loading }] = useLoginMutation();
    const { isValid } = useRequired(form);

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await submitLogin({
                variables: {
                    ...form
                }
            });
            saveToken(data.data?.login.access_token!);
            navigate('/');
        } catch (e) {
            // console.error(e)
        }
    }

    const onChangeHandler = (name: string) =>
        ({ target }: ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, [name]: target.value })

    return (
        <Wrapper backgroundColor="#fff" center={true}>
            <FormWrapper>
                <div className='left-side'>
                    <img src={image} alt='image'/>
                </div>
                <div className='right-side'>
                    <div>
                        <img src={logo} />
                        <h2>Nevernote</h2>
                    </div>
                    <form onSubmit={onSubmitHandler}>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={onChangeHandler('email')}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={onChangeHandler('password')}
                            />
                        </div>

                        { error && error
                            .graphQLErrors
                            .map(({ message }, i) =>
                                <div key={i}>
                                    <small className='error-message'>
                                        { message }
                                    </small>
                                </div>)
                        }

                        <div>
                            <button disabled={!isValid || loading}>
                                {loading ? '...' : 'Login' }
                            </button>
                        </div>
                        <p>
                            Didn't sign up yet? <Link to='/signup'>Sign Up</Link>
                        </p>
                    </form>
                </div>
            </FormWrapper>
        </Wrapper>
    );
}

const FormWrapper = styled('div')`
  display: flex;
  border: ${GENERICS.border};
  border-radius: 5px;
  padding: 30px;
  user-select: none;
  gap: 20px;
  align-items: center;
  
  > div {
    flex: 0.5
  }
  
  .left-side {
    img {
      width: 300px
    }
  }
  
  .right-side {
    >div:first-child {
        text-align: center;
        img {
            width: 100px;
        }
        margin-bottom: 20px;
    }
    
    form {
      div {
        margin-bottom: 10px;
        
        input {
          border: ${GENERICS.border};
          border-color: #ccc;
          border-radius: 5px;
          padding: 5px 10px;
          outline: none;
          transition: 0.5s;
          
          &:hover {
            border-color: darkgrey
          }
          
          &:focus {
            border-color: grey
          }
        }
        
        button {
          width: 100%;
          background: ${GENERICS.primaryColor};
          padding: 5px 10px;
          color: white;
          border-radius: 5px;
          
          &:disabled {
            background: #ccc;
          }
        }
      }
      
      .error-message {
        color: red;
      }
      
      p {
        font-size: 12px;
        a {
          color: ${GENERICS.primaryColor}
        }
      }
    }
  }
`;
