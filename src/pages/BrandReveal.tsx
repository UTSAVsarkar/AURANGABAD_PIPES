import * as React from "react";
import { motion } from "framer-motion";

export default function BrandReveal() {
    return (
        <>
            <style>
                {`
                    .brand-reveal {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 2;

                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        width: 100%;
                        padding: 0 20px;
                        box-sizing: border-box;

                        pointer-events: none;
                    }

                    .brand-word-wrap {
                        position: relative;
                        padding: 8px 0;
                    }

                    .brand-word {
                        font-size: clamp(2.2rem, 8vw, 6.5rem);
                        font-weight: 700;
                        line-height: 0.95;

                        color: white;

                        letter-spacing: 0.08em;
                        white-space: nowrap;

                        text-shadow:
                            0 0 30px rgba(255,255,255,0.12),
                            0 0 80px rgba(255,255,255,0.05);

                        will-change: transform, opacity, filter;
                    }

                    .brand-line {
                        margin-top: 22px;

                        width: 100%;
                        display: flex;
                        justify-content: center;
                    }

                    .brand-line-inner {
                        height: 1px;

                        background: linear-gradient(
                            90deg,
                            transparent,
                            rgba(255,255,255,0.8),
                            transparent
                        );

                        box-shadow: 0 0 15px rgba(255,255,255,0.2);
                    }

                    .brand-tagline {
                        margin-top: 15px;

                        font-size: clamp(0.55rem, 1.3vw, 0.8rem);

                        font-weight: 400;

                        letter-spacing: 0.55em;

                        color: rgba(255,255,255,0.65);

                        text-align: center;

                        white-space: nowrap;
                    }

                    @media (max-width: 480px) {
                        .brand-word {
                            font-size: clamp(1.8rem, 9vw, 3rem);
                            letter-spacing: 0.05em;
                        }

                        .brand-tagline {
                            letter-spacing: 0.25em;
                        }

                        .brand-line-inner {
                            width: 55%;
                        }
                    }
                `}
            </style>

            <div className="brand-reveal">

                {/* BRAND NAME */}
                <div className="brand-word-wrap">
                    <motion.div
                        className="brand-word"
                        initial={{
                            opacity: 0,
                            scale: 1.08,
                            y: 8,
                            filter: "blur(10px)",
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            filter: "blur(0px)",
                        }}
                        transition={{
                            duration: 1.4,
                            delay: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        AURANGABAD
                    </motion.div>
                </div>

                {/* LINE */}
                <div className="brand-line">
                    <motion.div
                        className="brand-line-inner"
                        initial={{
                            width: "0%",
                            opacity: 0,
                        }}
                        animate={{
                            width: "55%",
                            opacity: 1,
                        }}
                        transition={{
                            duration: 1,
                            delay: 1.35,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    />
                </div>

                {/* TAGLINE */}
                <motion.div
                    className="brand-tagline"
                    initial={{
                        opacity: 0,
                        y: 8,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 1.65,
                        ease: "easeOut",
                    }}
                >
                    PIPES PVT LTD
                </motion.div>

            </div>
        </>
    );
}