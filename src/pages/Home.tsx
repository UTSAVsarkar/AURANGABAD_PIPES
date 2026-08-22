import Contact from "./Contact/Contact";
import AboutUsIntro from "../IntroPages/AboutIntro/AboutUsIntro";
import ProjectsIntro from "../IntroPages/ProjectIntro/ProjectsIntro";
import ServicesIntro from "../IntroPages/ServiceIntro/ServicesIntro"
import ParallaxImage from "../components/ParallaxImage";
import CommodityIntro from "../IntroPages/CommodityIntro/CommodityIntro";
import ScrollIndicator from "../components/ScrollIndicator";
import { useRef, useEffect } from "react";
import BrandReveal from "./BrandReveal";


interface Props {
    onNavChange: (item: string) => void;
}

const Home: React.FC<Props> = ({ onNavChange }) => {
    // ...inside your component:
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const skipIntro = () => {
            video.currentTime = 3;
        };

        video.addEventListener("loadedmetadata", skipIntro);
        return () => video.removeEventListener("loadedmetadata", skipIntro);
    }, []);

    return (
        <>
            {/* Dark overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.6) 100%)",
                    zIndex: 1,
                }}
            />
            {/* Hero Video */}
            <div
                style={{
                    position: "relative",
                    minHeight: "100vh",
                    overflow: "hidden",
                }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: 0,
                    }}
                >
                    <source
                        src={`${process.env.PUBLIC_URL}/APPL_video.mp4`}
                        type="video/mp4"
                    />
                </video>

                {/* Dark overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0, 0, 0, 0.25)",
                        zIndex: 1,
                    }}
                >
                    <BrandReveal />

                    {/* Scroll indicator */}
                    <ScrollIndicator />
                </div>
            </div>

            <AboutUsIntro onNavChange={onNavChange} />
            <ServicesIntro onNavChange={onNavChange} />

            <ParallaxImage
                image={process.env.PUBLIC_URL + "/pipes.jpeg"}
                text="Do your duty and a little more, and the future will take care of itself."
                author="Andrew Carnegie"
            />

            <CommodityIntro onNavChange={onNavChange} />

            <ParallaxImage
                image={process.env.PUBLIC_URL + "/steel.jpeg"}
                text="We believe business must look beyond itself to serve communities and build lasting impact."
                author="Ratan Tata"
            />

            <ProjectsIntro onNavChange={onNavChange} />
            <Contact />
        </>
    );
}

export default Home;