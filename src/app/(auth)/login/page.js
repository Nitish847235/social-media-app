// app/login/page.js
'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Suspense, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { authapi } from '@/mocks/auth';
import { ToastContainer, toast, cssTransition, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Loader from '@/components/Loader/Loader';
import Loading from './loading';


export default function LoginPage() {
    const { user,loading } = useAuth();
    const router = useRouter();

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
        username: '',
        password: ''
      };
    
      const validationSchema = Yup.object({
        username: Yup.string()
          .required('Username is required')
          .test('usernameOrEmailOrPhone', 'Invalid username, email, or phone number', value => {
            // Check if value is a valid email or phone number format or just a username
            return (
              Yup.string().email().isValidSync(value) ||  // Check for valid email
              /^[0-9]+$/.test(value) ||  // Check for phone number format (digits only)
              value.trim().length > 0 // Check for non-empty username
            );
          }),
        password: Yup.string().required('Password is required')
      });
    
      const onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
        try {
          // Simulate API call
          let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
            credentials: 'include'
          });
          console.log(response);
          let data = await response.json();
          console.log(data);
          if (data) {
            // Handle success
          toast.success('Login successful');
          resetForm(); // Optional: Reset the form if needed after successful login
        //   if (data.redirectUrl) {
        //     window.location.href = data.redirectUrl; // Handle redirection
        //     }
          router.push('/');
            
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
        <Suspense fallback={<Loading/>}>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10 text-black">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username (Email or Phone)</label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username or email or phone"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                </div>
    
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
    
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
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
        </Suspense>
    );
}
