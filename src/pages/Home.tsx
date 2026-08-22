import Contact from "./Contact/Contact";
import AboutUsIntro from "../IntroPages/AboutIntro/AboutUsIntro";
import ProjectsIntro from "../IntroPages/ProjectIntro/ProjectsIntro";
import ServicesIntro from "../IntroPages/ServiceIntro/ServicesIntro";
import ParallaxImage from "../components/ParallaxImage";
import CommodityIntro from "../IntroPages/CommodityIntro/CommodityIntro";
import ScrollIndicator from "../components/ScrollIndicator";
import { useRef, useEffect } from "react";
import BrandReveal from "./BrandReveal";

interface Props {
    onNavChange: (item: string) => void;
}

const Home: React.FC<Props> = ({ onNavChange }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const skipIntro = () => {
            try {
                video.currentTime = 3;
            } catch (error) {
                console.log("Could not set video start time");
            }
        };

        if (video.readyState >= 1) {
            skipIntro();
        } else {
            video.addEventListener("loadedmetadata", skipIntro);
        }

        return () => {
            video.removeEventListener("loadedmetadata", skipIntro);
        };
    }, []);

    return (
        <>
            {/* =====================================================
                HERO
            ===================================================== */}
            <section
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100vh",
                    minHeight: "100vh",
                    overflow: "hidden",
                    background: "#000",
                }}
                className="hero-section"
            >
                {/* VIDEO */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center center",
                        zIndex: 0,
                    }}
                >
                    <source
                        src={`${process.env.PUBLIC_URL}/APPL_video.mp4`}
                        type="video/mp4"
                    />
                </video>

                {/* DARK OVERLAY */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.65) 100%)",
                        zIndex: 1,
                        pointerEvents: "none",
                    }}
                />

                {/* CONTENT */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 2,
                    }}
                >
                    <BrandReveal />

                    <ScrollIndicator />
                </div>
            </section>

            {/* =====================================================
                ABOUT
            ===================================================== */}
            <AboutUsIntro onNavChange={onNavChange} />

            {/* =====================================================
                SERVICES
            ===================================================== */}
            <ServicesIntro onNavChange={onNavChange} />

            {/* =====================================================
                PARALLAX IMAGE
            ===================================================== */}
            <ParallaxImage
                image={process.env.PUBLIC_URL + "/pipes.jpeg"}
                text="Do your duty and a little more, and the future will take care of itself."
                author="Andrew Carnegie"
            />

            {/* =====================================================
                COMMODITY
            ===================================================== */}
            <CommodityIntro onNavChange={onNavChange} />

            {/* =====================================================
                PARALLAX IMAGE
            ===================================================== */}
            <ParallaxImage
                image={process.env.PUBLIC_URL + "/steel.jpeg"}
                text="We believe business must look beyond itself to serve communities and build lasting impact."
                author="Ratan Tata"
            />

            {/* =====================================================
                PROJECTS
            ===================================================== */}
            <ProjectsIntro onNavChange={onNavChange} />

            {/* =====================================================
                CONTACT
            ===================================================== */}
            <Contact />

            {/* =====================================================
                MOBILE HERO FIX
            ===================================================== */}
            <style>
                {`
                    .hero-section {
                        height: 100vh;
                        min-height: 100vh;
                    }

                    @supports (height: 100dvh) {
                        .hero-section {
                            height: 100dvh;
                            min-height: 100dvh;
                        }
                    }

                    @media (max-width: 768px) {
                        .hero-section {
                            height: 100dvh;
                            min-height: 100dvh;
                        }

                        .hero-section video {
                            object-position: center center;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default Home;