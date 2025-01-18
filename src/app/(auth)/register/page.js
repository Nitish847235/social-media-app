// app/login/page.js
'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast, cssTransition, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [usernameStatus, setUsernameStatus] = useState(null);
    const [loadingUsernameStatus, setLoadingUsernameStatus] = useState(false);

    useEffect(() => {
        if (user) {
            router.replace('/');
        }
    }, [user, router]);

    if(loading){
        return <Loader/>;
    }

    if (user) {
        return null; // or a loading indicator
    }

    const initialValues = {
        name: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: ''
      };
    
      const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
      .email('Invalid email format')
      .test('emailOrPhone', 'Either email or phone is required', function (value) {
        const { phone } = this.parent;
        return value || phone;
      }),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number is not valid')
      .test('emailOrPhone', 'Either email or phone is required', function (value) {
        const { email } = this.parent;
        return value || email;
      }),
          username: Yup.string().min(3, 'Username should be at least 3 characters').required('Username is required'),
          password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required')
        });

        const checkUsername = async (username) => {
            try {
              if (username.trim() && username.length>2) {
                setLoadingUsernameStatus(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/userapp/search/checkUsername`,{
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({searchKey: username}),
                    credentials: 'include'
                  });
                const data = await response.json();
                if (data?.data?.available) {
                    setUsernameStatus('available');
                } else {
                    setUsernameStatus('not available');
                }
                setLoadingUsernameStatus(false)
              }
              else{
                setUsernameStatus(null);
              }
            } catch (error) {
              console.error('Error checking username:', error);
              setUsernameStatus('Error checking username');
              setLoadingUsernameStatus(false);
            }
          };
    
      const onSubmit = async(values, { setSubmitting, resetForm }) => {
        try {
            // Simulate API calllet 
            let payload = JSON.parse(JSON.stringify(values));
            payload.email = payload.email.toLowerCase();
            payload.userType = 1;
            let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
              credentials: 'include'
            });

            let data = await response.json();

            if (data.data) {
              // Handle success
            toast.success('Account Created successfully');
            resetForm(); // Optional: Reset the form if needed after successful login
          //   if (data.redirectUrl) {
          //     window.location.href = data.redirectUrl; // Handle redirection
          //     }
            router.push('/login');
              
            }
            else{
              toast.error(data.message);
              // throw new Error(response.message || 'Something went wrong!');
            }
        
            
        
          } catch (error) {
            console.error('Login error:', error.message);
          //   setErrors({ username: 'Invalid credentials', password: 'Invalid credentials' }); // Set form-level errors
          } finally {
            setSubmitting(false); // Ensure that the form can be submitted again
          }
      };
    
      return (
        <div className="max-w-md sm:mx-auto mx-8 bg-[#e7d6d6]  p-8 rounded-lg shadow-md mt-10 text-black">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting,handleChange }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e)=>{
                        handleChange(e);
                        checkUsername(e.target.value);
                    }}
                  />
                  {usernameStatus === 'available' && !loadingUsernameStatus && (
                <div className="text-green-500 text-sm mt-1">Username is available</div>
              )}
              {usernameStatus === 'not available' && !loadingUsernameStatus && (
                <div className="text-red-500 text-sm mt-1">Username is already taken</div>
              )}
              {loadingUsernameStatus && <div className='flex items-center text-sm mt-1 gap-1'>checking <CircularProgress size={14} /></div>}
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>
    
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={isSubmitting}
                >
                  Register {isSubmitting && <CircularProgress size={16} sx={{color:'white'}} />}
                </button>
              </Form>
            )}
          </Formik>
          <div className='w-full flex justify-end mt-4'>
            <div className='flex items-center gap-2'>
                <p>Already have account?</p>
                <button onClick={()=> router.push('/login')} className="text-indigo-600 hover:text-indigo-700">Login</button>
            </div>
          </div>
          <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
{/* Same as */}
<ToastContainer />
        </div>
      );
    };
