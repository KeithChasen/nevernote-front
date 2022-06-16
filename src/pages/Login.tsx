import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useLoginMutation } from "../generated/graphql";

export function Login() {
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
            })
        } catch (e) {
            console.error(e)
        }
    }

    const onChangeHandler = (name: string) =>
        ({ target }: ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, [name]: target.value })

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={onChangeHandler('email')}
                    />
                </div>
                <div>
                    <label>Password</label>
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
    );
}
