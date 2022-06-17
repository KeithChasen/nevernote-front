import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useLoginMutation } from "../generated/graphql";
import { Wrapper } from "../components/Wrapper";
import image from '../images/home.jpeg';
import logo from '../images/logo.jpeg';
import styled from "@emotion/styled";
import { GENERICS } from "../components/GlobalStyle";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [submitLogin, { error }] = useLoginMutation()

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await submitLogin({
                variables: {
                    ...form
                }
            });
            navigate('/');
        } catch (e) {
            console.error(e)
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

                        { error && <div>{JSON.stringify(error.message)}</div> }

                        <div>
                            <button>Login</button>
                        </div>
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
        }
      }
    }
  }
`;
