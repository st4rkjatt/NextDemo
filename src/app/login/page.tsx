// components/PokemonSignupForm.tsx
'use client'
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import React from 'react';
import { BiLogInCircle } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import Head from 'next/head';
import '../signup/signup.css'
import Link from 'next/link';
import InteractiveCanvas from '../components/intractviceCanvas';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const PokemonLoginForm = () => {
    const blackLineRef = useRef<HTMLDivElement>(null);
    const ballRef = useRef<HTMLDivElement>(null);
    const mainFormRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const remRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Helper function to properly type the ref callback
    const setRowRef = (index: number) => (el: HTMLDivElement | null) => {
        rowRefs.current[index] = el;
    };

    const setRemRef = (index: number) => (el: HTMLDivElement | null) => {
        remRefs.current[index] = el;
    };

    useEffect(() => {
        const tl = gsap.timeline();

        // Animation sequence
        tl
            .to(blackLineRef.current, { duration: 0.5, className: '+=red-circle' })
            .to(blackLineRef.current, { duration: 0.5, className: '-=red-circle' })
            .to(blackLineRef.current, { duration: 0.5, className: '+=red-circle' })
            .to(blackLineRef.current, { duration: 0.5, className: '-=red-circle' })
            .to(blackLineRef.current, { duration: 0.5, className: '+=red-circle' })
            .to(blackLineRef.current, { duration: 0.5, className: '-=red-circle' })
            .to(blackLineRef.current, { duration: 0.5, className: '+=red-circle' })
            .to(blackLineRef.current, { duration: 0.5, className: '-=red-circle' })
            .to(ballRef.current, { duration: 0.5, y: '-70%', ease: 'power4.out' })
            .to(ballRef.current, { duration: 0.5, y: '-50%', ease: 'bounce.out' })
            .to(ballRef.current, { duration: 0.5, y: '-85%', ease: 'power4.out' }, '+=0.5')
            .to(ballRef.current, { duration: 0.5, y: '-50%', ease: 'bounce.out' })
            .to(ballRef.current, { duration: 0.5, y: '-100%', ease: 'power4.out' }, '+=0.5')
            .to(ballRef.current, {
                duration: 0.5,
                y: '-50%',
                ease: 'bounce.out',
                onComplete: toggleForm
            });

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
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        loginUser(form);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));

    }

    const loginUser = async (formData: any) => {
        try {
            setLoading(true);
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
          
            const data = await response.json();
            if (!data.status) {
                toast.error(data.message);
                return;
            }
            console.log('User logged in successfully:', data);
            toast.success(data.message);
            router.push('/profile'); // Redirect to home page on successful login

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
            <div className="main-container" ref={ballRef}>
                {/* Pokemon Ball Top Part */}
                <div className="pokemon-top-part" ref={topRef}></div>

                {/* Main Forms */}
                <div className="main-forms" ref={mainFormRef} style={{ display: 'none' }}>
                    <div className="signup-form">
                        <form className="sign-back text-white" onSubmit={handleSubmit}>
                            <h1 ref={h1Ref}>Login</h1>



                            <div className="signup-row " ref={setRowRef(1)}>
                                <AiOutlineMail className="absolute left-[30%] top-2" />
                                <input type="text" name="email" value={form.email} placeholder="EMAIL" onChange={handleChange} />
                            </div>



                            <div className="signup-row" ref={setRowRef(3)}>
                                <RiLockPasswordLine className="absolute left-[30%] top-2" />
                                <input type="password" name="password" value={form.password} placeholder="PASSWORD" onChange={handleChange} />
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
                                    <Link href="/signup">Create an account ?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Pokemon Ball Bottom Part */}
                <div className="pokemon-bottom-part" ref={bottomRef}>
                    <div className="white-part"></div>
                    <div className="black-line" ref={blackLineRef}></div>
                </div>
            </div>
        </>
    );
};

export default PokemonLoginForm;