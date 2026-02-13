import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//  get started with code
//validation schema
export default function Register() {
  const navigate = useNavigate();
  const [ErrorMSg, setErrorMSg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const schema = z
    .object({
      name: z.string().min(2, '!at least 1 char ').max(25, '!max 3 names'),
      email: z.string().email('invalid Email'),
      password: z
        .string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
          'Ex:(Abc@1234)',
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^(\d{4})-(\d{2})-(\d{2})$/, '!invalid date format')
        .refine(date => {
          const userDate = new Date(date);
          const todayDate = new Date();
          todayDate.setHours(0, 0, 0, 0);
          return userDate < todayDate;
        }, '!invalid Date'),
      gender: z.enum(['female', 'male']),
    })
    .refine(
      object => {
        return object.password === object.rePassword;
      },
      {
        message: '!Passwords Do Not Match',
        path: ['rePassword'],
      },
    );
  //react hook form
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: '',
    },
    resolver: zodResolver(schema),
  });
  const { register, handleSubmit, formState } = form;
  function Onsubmit(values) {
    setIsLoading(true);
    console.log(values);
    // call api
    // axios.post(``,values).then().catch();
    axios
      .post(`https://linked-posts.routemisr.com/users/signup`, values)
      .then(res => {
        if (res.data.message === 'success') {
          navigate('/login');
          setIsLoading(false);
        }
      })
      .catch(err => {
        setIsLoading(false);
        alert(err.response.data.error);
        setErrorMSg(err.response.data.error);
      });
  }
  // render form jsx code
  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit(Onsubmit)}>
      <h2>Register page</h2>
      <h4 className="text-red-400 bg-gray-200 rounded-2xl">{ErrorMSg}</h4>
      {/* name input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...register('name')}
          type="text"
          name="name"
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=""
        />
        <label
          htmlFor="name"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Name
        </label>
        {/* error message formstate */}
        {formState.errors.name ? (
          <p className="text-red-500"> {formState.errors.name.message} </p>
        ) : null}
      </div>
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
      {/* re-password input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...register('rePassword')}
          type="password"
          name="rePassword"
          id="rePassword"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=""
        />
        <label
          htmlFor="rePassword"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Re-enter your Password
        </label>
        {formState.errors.rePassword ? (
          <p className="text-red-500">
            {' '}
            {formState.errors.rePassword.message}{' '}
          </p>
        ) : null}
      </div>
      {/* date of birth input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...register('dateOfBirth')}
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=""
        />
        <label
          htmlFor="dateOfBirth"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Date of Birth
        </label>
        {formState.errors.dateOfBirth ? (
          <p className="text-red-500">
            {' '}
            {formState.errors.dateOfBirth.message}{' '}
          </p>
        ) : null}
      </div>
      {/* gender  */}
      <div className="flex items-center ps-4 border border-default bg-neutral-primary-soft rounded-base gap-x-40 mb-5">
        {/* female */}
        <div className="flex items-center ps-4 border border-default bg-neutral-primary-soft rounded-base px-4">
          <input
            id="bordered-radio-1"
            type="radio"
            {...register('gender')}
            value="female"
            className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
          />
          <label
            htmlFor="bordered-radio-1"
            className="w-full py-4 select-none ms-2 text-sm font-medium text-heading"
          >
            female
          </label>
        </div>
        {/* male */}
        <div className="flex items-center ps-4 border border-default bg-neutral-primary-soft rounded-base px-4">
          <input
            id="bordered-radio-2"
            type="radio"
            {...register('gender')}
            value="male"
            className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
          />
          <label
            htmlFor="bordered-radio-2"
            className="w-full py-4 select-none ms-2 text-sm font-medium text-heading"
          >
            male
          </label>
        </div>
        {formState.errors.gender ? (
          <p className="text-red-500"> {formState.errors.gender.message} </p>
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
          'Submit'
        )}
      </button>
    </form>
  );
}
