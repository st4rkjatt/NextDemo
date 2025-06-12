
'use client'
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Head from 'next/head';
import './signup.css'
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai'
import { BiLogInCircle } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import { BiPhoneCall } from 'react-icons/bi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import InteractiveCanvas from '../components/intractviceCanvas';
import { ToastContainer, toast } from 'react-toastify';

type SignupForm = {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
}
const PokemonSignupForm = () => {
    const mainFormRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const remRefs = useRef<(HTMLDivElement | null)[]>([]);
    const router = useRouter()
    // Helper function to properly type the ref callback
    const setRowRef = (index: number) => (el: HTMLDivElement | null) => {
        rowRefs.current[index] = el;
    };

    const setRemRef = (index: number) => (el: HTMLDivElement | null) => {
        remRefs.current[index] = el;
    };

    useEffect(() => {
        const tl = gsap.timeline();
        toggleForm()
        function toggleForm() {
            if (mainFormRef.current) {
                gsap.set(mainFormRef.current, { display: 'block' });
                gsap.to(mainFormRef.current, { duration: 1.5, opacity: 1 });

                tl
                    .to(topRef.current, { duration: 1, autoAlpha: 0 })
                    .to(bottomRef.current, { duration: 1, autoAlpha: 0 }, '-=1')
                    .fromTo(h1Ref.current,
                        { autoAlpha: 0, y: -20 },
                        { duration: 1, autoAlpha: 1, y: 0 },
                        '+=0.5'
                    );

                // Animate each row with stagger
                if (rowRefs.current) {
                    tl.staggerFrom(
                        rowRefs.current.filter(Boolean) as HTMLDivElement[],
                        1,
                        { left: '-100%', autoAlpha: 0 },
                        0.2
                    );
                }

                // Animate remember sections
                if (remRefs.current) {
                    tl.staggerFrom(
                        remRefs.current.filter(Boolean) as HTMLDivElement[],
                        1,
                        {
                            cycle: { y: [20, -20] },
                            autoAlpha: 0
                        },
                        0.2
                    );
                }
            }
        }

        return () => {
            tl.kill();
        };
    }, []);

    const [loading, setLoading] = useState(false);
    ;
    const [form, setForm] = useState<SignupForm>({
        fullName: '',
        email: '',
        mobile: '',
        password: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.fullName.trim()) {
            newErrors.fullName = 'Full Name is required';
        }
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!form.mobile.trim()) {
            newErrors.mobile = 'Mobile is required';
        } else if (!/^\d{10}$/.test(form.mobile)) {
            newErrors.mobile = 'Invalid mobile number';
        }
        if (!form.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        signupUser(form);
    };

    const getInputClass = (field: string) =>
        errors[field]
            ? 'signup-roweerror'
            : 'signup-row';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));

    }

    const signupUser = async (formData: SignupForm) => {
        try {
            setLoading(true);
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });


            const data = await response.json();
            if (!data.status) {
                toast.error(data.message);
                return;
            }
            toast.success(data.message);
            // console.log('User signed up successfully:', data);
            setForm({
                fullName: '',
                email: '',
                mobile: '',
                password: ''
            });

            router.push('/profile'); // Redirect to login page after successful signup
        } catch (error) {
            console.error('Error signing up user:', error);
        }
        finally {
            setLoading(false);
        }

    }
    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css?family=Ubuntu"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
            </Head>
            <ToastContainer />
            <InteractiveCanvas />

            {/* Main Container */}
            <div className="main-container">

                {/* Main Forms */}
                <div className="main-forms" ref={mainFormRef} style={{ display: 'none' }}>
                    <div className="signup-form">
                        <form className="sign-back text-white" onSubmit={handleSubmit}>
                            <h1 ref={h1Ref}>sign UP</h1>

                            <div className={`${getInputClass("fullName")} signup-row`} ref={setRowRef(0)}>
                                <div className=''>
                                    <AiOutlineUser className="absolute left-[30%] top-2" />
                                    <input type="text" name="fullName" value={form.fullName} placeholder="FULL NAME" onChange={handleChange} />
                                </div>
                                {errors.fullName && (
                                    <span className="error-message text-red-500 text-xs">{errors.fullName}</span>
                                )}
                            </div>

                            <div className={`${getInputClass("email")} signup-row`} ref={setRowRef(1)}>
                                <div>

                                    <AiOutlineMail className="absolute left-[30%] top-2" />
                                    <input type="text" name="email" value={form.email} placeholder="EMAIL" onChange={handleChange} />
                                </div>
                                {errors.email && (
                                    <span className="error-message text-red-500 text-xs">{errors.email}</span>
                                )}
                            </div>

                            <div className={`${getInputClass("mobile")} signup-row`} ref={setRowRef(2)}>
                                <div>

                                    <BiPhoneCall className="absolute left-[30%] top-2" />
                                    <input type="text" name="mobile" value={form.mobile} placeholder="MOBILE" onChange={handleChange} />
                                </div>
                                {errors.mobile && (
                                    <span className="error-message text-red-500 text-xs">{errors.mobile}</span>
                                )}
                            </div>

                            <div className={`${getInputClass("password")} signup-row`} ref={setRowRef(3)}>
                                <div>
                                    <RiLockPasswordLine className="absolute left-[30%] top-2" />
                                    <input type="password" name="password" value={form.password} placeholder="PASSWORD" onChange={handleChange} />
                                </div>
                                {errors.password && (
                                    <span className="error-message text-red-500 text-xs">{errors.password}</span>
                                )}
                            </div>

                            <div className="signup-row flex justify-center text-center" ref={setRowRef(4)}>

                                <button
                                    type="submit"
                                    className="bg-transparent border-none cursor-pointer"
                                    disabled={loading}
                                >
                                    {loading ? "Processing" : <BiLogInCircle className="text-4xl" />}
                                </button>
                            </div>

                            <div className="form-bottom">
                                <div className="remember" ref={setRemRef(0)}>
                                    <input type="checkbox" name="" value="" />
                                    <span>Remember</span>
                                </div>

                                <div className="remember" ref={setRemRef(1)}>
                                    <Link href="/login">Already Have Account ?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </>
    );
};

export default PokemonSignupForm;