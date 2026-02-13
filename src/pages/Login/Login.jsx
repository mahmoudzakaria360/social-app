import './login.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import useContext and userData context
import { useContext, useState } from 'react';
import { userData } from '../../Context/userData';

//  get started with code
//validation schema
export default function Login() {
  // destructure Token and setToken from userData context
  let { Token, setToken } = useContext(userData);

  const navigate = useNavigate();
  const [ErrorMSg, setErrorMSg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // zod schema to validate form data
  const schema = z.object({
    email: z.string().email('invalid Email'),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        'Ex:(Abc@1234)',
      ),
  });
  //react hook form to manage form state
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });
  const { register, handleSubmit, formState } = form;
  function onSubmit(values) {
    setIsLoading(true);
    console.log(values);
    // call Axios to send  data of the form to backend
    // axios.post(``,values).then().catch();
    axios
      .post(`https://linked-posts.routemisr.com/users/signin`, values)
      //in the case of success
      .then(res => {
        if (res.data.message === 'success') {
          localStorage.setItem('token', res.data.token);
          setToken(res.data.token);
          navigate('/');
          setIsLoading(false);
        }
      })
      // in the case of error
      .catch(err => {
        setIsLoading(false);
        alert(err.response.data.error);
        setErrorMSg(err.response.data.error);
      });
  }
  // render form jsx code
  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <h2>Login page ....</h2>
      <h4 className="text-red-400 bg-gray-200 rounded-2xl">{ErrorMSg}</h4>
      {/* Email input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...register('email')}
          type="text"
          name="email"
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=""
        />
        <label
          htmlFor="email"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Email address
        </label>
        {formState.errors.email ? (
          <p className="text-red-500"> {formState.errors.email.message} </p>
        ) : null}
      </div>
      {/* password input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...register('password')}
          type="password"
          name="password"
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=""
        />
        <label
          htmlFor="password"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Password
        </label>
        {formState.errors.password ? (
          <p className="text-red-500"> {formState.errors.password.message} </p>
        ) : null}
      </div>
      {/* submit button */}
      <button
        type="submit"
        className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
      >
        {isLoading === true ? (
          <i className=" fa fa-spin fa-spinner"> </i>
        ) : (
          'login'
        )}
      </button>
    </form>
  );
}
