"use client";
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import './profile.css';
import Header from '../components/header';
import { useChatStore } from '@/stores/store';
import socket from '../utils/helper/socketGlobal';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface UserData {
    email: string;
    fullName: string;
    isAdmin: boolean;
    isVerified: boolean;
    mobile: string;
    _id: string;
}

export default function Home() {
    const setMe = useChatStore((state) => state.setMe);
    const me = useChatStore((state) => state.me);

    useEffect(() => {
        getUserData()
        // Only run animations on client side
        if (typeof window !== 'undefined') {
            // Your GSAP animations here
            gsap.from(".hero__image", {
                scale: 4,
                transformOrigin: "center center",
                ease: "expo",
                scrollTrigger: {
                    trigger: ".hero__image",
                    start: "center center",
                    end: "center top",
                    pin: true,
                    scrub: 0.5
                }
            });

            // ... (include all your GSAP animations from the original code)

            gsap.to(".ring--right", {
                scale: 5,
                ease: "power4",
                transformOrigin: "center",
                scrollTrigger: {
                    trigger: ".ring--right",
                    start: "top center",
                    end: "bottom+=300 200px",
                    pin: true,
                    scrub: 0.25
                }
            });

            gsap.to(".ring--left", {
                scale: 3,
                ease: "power4",
                transformOrigin: "center center",
                scrollTrigger: {
                    trigger: ".ring--left",
                    start: "center+=100% center",
                    end: "bottom+=300 top",
                    pin: true,
                    scrub: 0.25
                }
            });


            gsap.to(".hero__title--1", {
                xPercent: -50,
                scrollTrigger: {
                    trigger: ".hero__title--1",
                    start: "center center",
                    pin: true,
                    scrub: 0.5
                }
            });

            gsap.to(".hero__title--2", {
                xPercent: 50,
                scrollTrigger: {
                    trigger: ".hero__title--2",
                    start: "center center",
                    pin: true,
                    scrub: 0.5
                }
            });

            gsap.to(".hero__copy", {
                opacity: 0,
                scrollTrigger: {
                    trigger: ".hero__copy",
                    start: "top 60%",
                    end: "+=60 60%",
                    pin: false,
                    scrub: 0.5
                }
            });

            gsap.to(".cross-1", {
                rotate: "+=360",
                scrollTrigger: {
                    trigger: ".cross-1",
                    start: "bottom bottom",
                    end: "bottom top",
                    pin: false,
                    scrub: 0.5
                }
            });

            gsap.to(".cross-2", {
                rotate: 360 * 4,
                scrollTrigger: {
                    trigger: ".cross-2",
                    start: "bottom bottom",
                    end: "bottom top",
                    pin: false,
                    scrub: 0.5
                }
            });

            gsap.to(".box", {
                y: 500,
                x: "-10vw",
                ease: "power.in",
                scrollTrigger: {
                    trigger: ".box",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            gsap.from(".line", {
                scaleX: 0,
                transformOrigin: "left center",
                ease: "power.in",
                scrollTrigger: {
                    trigger: ".line",
                    start: "center 75%",
                    end: "bottom 10%",
                    scrub: 0.5,
                    pin: false
                }
            });

            gsap.to(".big", {
                x: "-130vw",
                transformOrigin: "center center",
                scrollTrigger: {
                    trigger: ".big",
                    start: "top 62%",
                    end: "bottom top-=200",
                    pin: true,
                    scrub: 1.75
                }
            });

            gsap.to(".cards", {
                scale: 1.75,
                scrollTrigger: {
                    trigger: ".cards",
                    start: "center center",
                    end: "bottom top",
                    pin: true,
                    scrub: true
                }
            });

            gsap.to(".card-1", {
                rotate: -20,
                scale: 0.75,
                x: -200,
                transformOrigin: "bottom center",
                scrollTrigger: {
                    trigger: ".cards",
                    start: "center center",
                    end: "bottom top",
                    pin: true,
                    scrub: true
                }
            });

            gsap.to(".card-3", {
                rotate: 20,
                scale: 0.75,
                x: 200,
                transformOrigin: "bottom center",
                scrollTrigger: {
                    trigger: ".cards",
                    start: "center center",
                    end: "bottom top",
                    pin: true,
                    scrub: true
                }
            });
            // Cursor animation
            // gsap.set(".cursor", { force3D: true });
            // document.addEventListener("mousemove", (e) => {
            //     const x = e.clientX;
            //     const y = e.clientY;

            //     gsap.to(".cursor", {
            //         x: x - 16,
            //         y: y - 16,
            //         ease: "power3"
            //     });
            // });

            // document.body.addEventListener("mouseleave", () => {
            //     gsap.to(".cursor", {
            //         scale: 0,
            //         duration: 0.1,
            //         ease: "none"
            //     });
            // });

            // document.body.addEventListener("mouseenter", () => {
            //     gsap.to(".cursor", {
            //         scale: 1,
            //         duration: 0.1,
            //         ease: "none"
            //     });
            // });

            const hoverCursors = document.querySelectorAll('[data-cursor="hover"]');

            hoverCursors.forEach(function (cursor) {
                cursor.addEventListener("mouseenter", () => {
                    gsap.to(".cursor", {
                        scale: 2.5
                    });
                });

                cursor.addEventListener("mouseleave", () => {
                    gsap.to(".cursor", {
                        scale: 1
                    });
                });
            });
        }

        return () => {
            // Clean up event listeners
            document.removeEventListener("mousemove", () => { });
            document.body.removeEventListener("mouseleave", () => { });
            document.body.removeEventListener("mouseenter", () => { });

            if (typeof window !== 'undefined') {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        };
    }, []);

    const getUserData = async () => {
        try {

            const response = await fetch('/api/me');
            const data = await response.json();
            setMe(data.result);
        }
        catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(() => {
        if (me) {
            const userDetails = {
                userId: me?._id,
            };
            socket.emit('registerUser', userDetails);
        }
    }, [])

    return (
        <main>
            <Header />
            <IntroSection data={me} />
            <TextSection />
            <WorksSection />
            <FooterSection />
            <Cursor />
        </main>
    );
}

const IntroSection = ({ data }: { data: UserData | null }) => {
    return <>
        <section className="section section--intro">
            <img
                className="hero__image"
                src="https://images.unsplash.com/photo-1580983563878-706ee872c772?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                alt="Hero background"
            />

            <CrossIcon className="cross-1" />
            <CrossIcon className="cross-2" />

            <div className="ring ring--left"></div>
            <div className="ring ring--right"></div>
            {/* {console.log(data, 'data')} */}
            <h3 className="hero__title hero__title--1">HI, I&#39;M {data?.fullName}</h3>
            <h3 className="hero__title hero__title--2">Mern Developer</h3>

            {/* <p className="hero__copy text-gray-600"><span>I&#39;m not the one in the photo but blue is essential</span></p> */}
        </section>
    </>
}

const FooterSection = () => (
    <section className="section section--footer">
        <div className="big">Works</div>

        <div className="footer__link">
            <TwitterIcon />
        </div>

        <p className="footer__copy text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere animi impedit, esse sunt at
            exercitationem nostrum, accusamus veniam est commodi expedita, praesentium excepturi ut quidem illum incidunt
            officia.
        </p>
    </section>

)
const WorksSection = () => (
    <section className="section section--works">
        <div className="cards">
            <a className="card card-1" data-cursor="hover"></a>
            <a className="card card-2" data-cursor="hover"></a>
            <a className="card card-3" data-cursor="hover"></a>
        </div>

        <CrossIcon className="cross-3" />
    </section>
)

const TextSection = () => (
    <section className="section section--text">
        <div className=" box text-gray-400">
            Hi, I&#39;m St4rk, a Mern Developer. I love creating web applications that are not only functional but also visually appealing. My journey in web development has been exciting, and I&#39;m always eager to learn new technologies and improve my skills.
            <div className="line"></div>
        </div>
    </section>
)


const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="var(--skyblue)" style={{ marginBottom: '2rem' }} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
    </svg>
);

const CrossIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const Cursor = () => <div className="cursor"></div>;