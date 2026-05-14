import React from 'react'
import { useForm } from 'react-hook-form'

function FormDemo() {
    const{register, handleSubmit, formState: {errors}} = useForm();

    //Form submit function
    const onFormSubit = (obj) => {
        console.log(obj);
    };

    return (
        <div >
            <h1 className='text-center text-5xl'>Form Demo</h1>
            {/* {form} */}
            <form className='max-w-md mx-auto mt-10' onSubmit={handleSubmit(onFormSubit)}>
                <div >
                    <label htmlFor="username">UserName</label>
                    <input type="text" {...register("username", {
                        required: "Username is required",
                        // validate: (v) => v.trim().length !== 0 || "White space is not valid",
                        minLength: { value: 4, message: "Minimum length is 4" }, 
                        maxLength: { value: 10, message: "Maximum length is 10" }
                    })} id="username"  className='bg-gray-300 border-2 w-full p-3' />

                    {/* {errors.username?.type === "required" && <p className='text-red-500'>{errors.username.message}</p>} */}
                    {/* {
                        errors.username?.type === "validate" && <p className='text-red-500'>{errors.username.message}</p>
                    } */}
                    {/* {
                        errors.username?.type === "minLength" && <p className='text-red-500'>{errors.username.message}</p>
                    } */}
                    {/* {
                        errors.username?.type === "maxLength" && <p className='text-red-500'>{errors.username.message}</p>
                    } */}

                    {/* instead of writing seperate error messages for every validation error this single line replace all the above lines */}
                    {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
                    
                </div>
                {/* password */}
                <div className='mb-3'>
                    <label htmlFor="password">Password</label>
                    <input type="password"  {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Minimum length is 6" }
                    })} id="password" className='bg-gray-300 border-2 w-full p-3 mb-3' />
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    <button type='submit' className='bg-blue-500 text-white'>Submit</button>
                </div>
            </form>

        </div>
    )
}

export default FormDemo