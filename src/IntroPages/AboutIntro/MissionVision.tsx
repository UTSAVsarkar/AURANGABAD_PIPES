import React, { useRef } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import {
    motion,
    Transition,
    useScroll,
    useSpring,
    useTransform,
    Variants,
} from 'framer-motion';
import MotionLine from '../../components/MotionLine';
import { Color } from '../../colors';

interface Props {
    onNavChange: (item: string) => void;
}

/* =========================================================
   TEXT ANIMATION
========================================================= */

const textVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 25,
    },

    visible: (custom: number) => ({
        opacity: 1,
        y: 0,

        transition: {
            delay: custom * 0.15,
            duration: 0.7,
            ease: [0.25, 0.8, 0.25, 1],
        } as Transition,
    }),
};

const containerVariant: Variants = {
    hidden: {},

    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

/* =========================================================
   INDUSTRIAL BACKGROUND
========================================================= */

function IndustrialBackground() {
    return (
        <Box
            sx={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',

                background:
                    'radial-gradient(circle at 50% 60%, #17100b 0%, #080808 42%, #010101 100%)',
            }}
        >
            {/* =========================================
                METALLIC LIGHT RAYS
            ========================================= */}

            {[0, 1, 2, 3, 4].map((line) => (
                <motion.div
                    key={line}
                    style={{
                        position: 'absolute',

                        left: '-30%',
                        top: `${20 + line * 17}%`,

                        width: '160%',
                        height: '1px',

                        background:
                            'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',

                        transform:
                            `rotate(${line % 2 === 0 ? -2 : 2}deg)`,

                        pointerEvents: 'none',
                    }}
                    animate={{
                        x: ['-5%', '5%', '-5%'],
                        opacity: [0.15, 0.45, 0.15],
                    }}
                    transition={{
                        duration: 7 + line,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* =========================================
                ORANGE INDUSTRIAL GLOW
            ========================================= */}

            <motion.div
                style={{
                    position: 'absolute',

                    left: '50%',
                    top: '65%',

                    width: 500,
                    height: 500,

                    transform:
                        'translate(-50%, -50%)',

                    borderRadius: '50%',

                    background:
                        'radial-gradient(circle, rgba(255,105,25,0.30) 0%, rgba(255,70,10,0.14) 28%, rgba(255,40,0,0.05) 50%, transparent 72%)',

                    filter: 'blur(25px)',

                    pointerEvents: 'none',
                }}
                animate={{
                    scale: [0.8, 1.15, 0.9, 1.25, 0.8],

                    opacity: [
                        0.35,
                        0.75,
                        0.4,
                        0.8,
                        0.35,
                    ],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* =========================================
                BLUE STEEL GLOW
            ========================================= */}

            <motion.div
                style={{
                    position: 'absolute',

                    right: '-15%',
                    top: '-15%',

                    width: 450,
                    height: 450,

                    borderRadius: '50%',

                    background:
                        'radial-gradient(circle, rgba(80,130,170,0.15), transparent 70%)',

                    filter: 'blur(35px)',

                    pointerEvents: 'none',
                }}
                animate={{
                    x: [-40, 60, -40],
                    y: [20, 80, 20],
                    scale: [1, 1.12, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* =========================================
                WELDING ARC
            ========================================= */}

            <motion.div
                style={{
                    position: 'absolute',

                    left: '50%',
                    top: '65%',

                    width: 90,
                    height: 90,

                    transform:
                        'translate(-50%, -50%)',

                    borderRadius: '50%',

                    background:
                        'radial-gradient(circle, white 0%, rgba(255,230,190,0.95) 5%, rgba(255,130,30,0.7) 18%, rgba(255,70,0,0.2) 45%, transparent 70%)',

                    filter: 'blur(3px)',

                    boxShadow:
                        '0 0 35px rgba(255,120,30,0.7)',

                    zIndex: 2,

                    pointerEvents: 'none',
                }}
                animate={{
                    scale: [
                        0.6,
                        1.4,
                        0.7,
                        1.7,
                        0.8,
                    ],

                    opacity: [
                        0.2,
                        1,
                        0.3,
                        0.95,
                        0.25,
                    ],
                }}
                transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* =========================================
                WHITE HOT WELDING CORE
            ========================================= */}

            <motion.div
                style={{
                    position: 'absolute',

                    left: '50%',
                    top: '65%',

                    width: 8,
                    height: 8,

                    transform:
                        'translate(-50%, -50%)',

                    borderRadius: '50%',

                    background: '#fff',

                    boxShadow: `
                        0 0 8px #fff,
                        0 0 20px #fff,
                        0 0 45px #ff9a45,
                        0 0 80px #ff5a00
                    `,

                    zIndex: 5,

                    pointerEvents: 'none',
                }}
                animate={{
                    scale: [
                        0.5,
                        1.8,
                        0.6,
                        2,
                        0.5,
                    ],

                    opacity: [
                        0.3,
                        1,
                        0.2,
                        1,
                        0.3,
                    ],
                }}
                transition={{
                    duration: 2.2,
                    repeat: Infinity,
                }}
            />

            {/* =========================================
                WELDING SPARKS
            ========================================= */}

            {Array.from({ length: 80 }).map(
                (_, index) => {
                    const angle =
                        -75 +
                        ((index * 37) % 150);

                    const distance =
                        60 +
                        ((index * 43) % 150);

                    const radians =
                        (angle * Math.PI) / 180;

                    const x =
                        Math.cos(radians) *
                        distance;

                    const y =
                        Math.sin(radians) *
                        distance;

                    const size =
                        index % 7 === 0
                            ? 4
                            : index % 3 === 0
                                ? 3
                                : 2;

                    return (
                        <motion.span
                            key={`spark-${index}`}
                            style={{
                                position:
                                    'absolute',

                                left: '50%',
                                top: '65%',

                                width: size,
                                height: size,

                                borderRadius:
                                    '50%',

                                background:
                                    index % 6 ===
                                        0
                                        ? '#fff'
                                        : '#ff9b45',

                                boxShadow:
                                    index % 6 ===
                                        0
                                        ? '0 0 12px white'
                                        : '0 0 12px rgba(255,110,20,0.95)',

                                zIndex: 3,

                                pointerEvents:
                                    'none',
                            }}
                            initial={{
                                opacity: 0,
                                scale: 0,
                            }}
                            animate={{
                                opacity: [
                                    0,
                                    1,
                                    1,
                                    0,
                                ],

                                scale: [
                                    0,
                                    1.3,
                                    0.8,
                                    0,
                                ],

                                x: [
                                    0,
                                    x * 0.3,
                                    x * 0.7,
                                    x,
                                ],

                                y: [
                                    0,
                                    y * 0.3,
                                    y * 0.7,
                                    y,
                                ],
                            }}
                            transition={{
                                duration:
                                    0.8 +
                                    ((index *
                                        0.17) %
                                        1.5),

                                repeat:
                                    Infinity,

                                delay:
                                    (index *
                                        0.13) %
                                    2.8,

                                ease: 'easeOut',
                            }}
                        />
                    );
                }
            )}

            {/* =========================================
                LONG SPARK TRAILS
            ========================================= */}

            {Array.from({ length: 10 }).map(
                (_, index) => {
                    const angle =
                        -70 +
                        ((index * 51) %
                            140);

                    const distance =
                        100 +
                        ((index * 27) %
                            130);

                    const radians =
                        (angle * Math.PI) /
                        180;

                    return (
                        <motion.div
                            key={`trail-${index}`}
                            style={{
                                position:
                                    'absolute',

                                left: '50%',
                                top: '65%',

                                width: 2,

                                height:
                                    30 +
                                    (index % 3) *
                                    15,

                                borderRadius:
                                    999,

                                background:
                                    'linear-gradient(to top, transparent, rgba(255,190,110,0.95))',

                                transformOrigin:
                                    'bottom center',

                                rotate:
                                    angle + 90,

                                filter:
                                    'blur(0.4px)',

                                zIndex: 2,

                                pointerEvents:
                                    'none',
                            }}
                            initial={{
                                opacity: 0,
                                scaleY: 0,
                            }}
                            animate={{
                                opacity: [
                                    0,
                                    1,
                                    0,
                                ],

                                scaleY: [
                                    0,
                                    1,
                                    0,
                                ],

                                x: [
                                    0,
                                    Math.cos(
                                        radians
                                    ) *
                                    distance,
                                ],

                                y: [
                                    0,
                                    Math.sin(
                                        radians
                                    ) *
                                    distance,
                                ],
                            }}
                            transition={{
                                duration:
                                    0.8 +
                                    (index %
                                        4) *
                                    0.25,

                                repeat:
                                    Infinity,

                                delay:
                                    (index *
                                        0.31) %
                                    2.5,

                                ease: 'easeOut',
                            }}
                        />
                    );
                }
            )}

            {/* =========================================
                FLOATING METAL DUST
            ========================================= */}

            {Array.from({ length: 25 }).map(
                (_, index) => (
                    <motion.span
                        key={`dust-${index}`}
                        style={{
                            position:
                                'absolute',

                            left:
                                `${5 + ((index * 31) % 90)}%`,

                            top:
                                `${5 + ((index * 47) % 90)}%`,

                            width:
                                index % 4 ===
                                    0
                                    ? 3
                                    : 1.5,

                            height:
                                index % 4 ===
                                    0
                                    ? 3
                                    : 1.5,

                            borderRadius:
                                '50%',

                            background:
                                'rgba(255,255,255,0.4)',

                            pointerEvents:
                                'none',

                            zIndex: 1,
                        }}
                        animate={{
                            y: [
                                0,
                                -25,
                                0,
                            ],

                            x: [
                                0,
                                index % 2 ===
                                    0
                                    ? 15
                                    : -15,
                                0,
                            ],

                            opacity: [
                                0.1,
                                0.5,
                                0.1,
                            ],
                        }}
                        transition={{
                            duration:
                                4 +
                                (index % 4),

                            repeat:
                                Infinity,

                            delay:
                                (index *
                                    0.23) %
                                3,

                            ease:
                                'easeInOut',
                        }}
                    />
                )
            )}

            {/* =========================================
                MOVING METALLIC LIGHT
            ========================================= */}

            <motion.div
                style={{
                    position: 'absolute',

                    top: '-40%',
                    left: '-50%',

                    width: '30%',
                    height: '180%',

                    background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.055), transparent)',

                    transform:
                        'rotate(20deg)',

                    filter: 'blur(10px)',

                    pointerEvents: 'none',

                    zIndex: 1,
                }}
                animate={{
                    x: [
                        0,
                        900,
                    ],
                }}
                transition={{
                    duration: 10,

                    repeat: Infinity,

                    repeatDelay: 3,

                    ease: 'easeInOut',
                }}
            />

            {/* =========================================
                SUBTLE GRAIN
            ========================================= */}

            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,

                    opacity: 0.06,

                    backgroundImage: `
                        radial-gradient(
                            rgba(255,255,255,0.8) 0.5px,
                            transparent 0.5px
                        )
                    `,

                    backgroundSize:
                        '5px 5px',

                    pointerEvents:
                        'none',

                    zIndex: 6,
                }}
            />

            {/* =========================================
                CINEMATIC DARK OVERLAY
            ========================================= */}

            <Box
                sx={{
                    position:
                        'absolute',

                    inset: 0,

                    background:
                        'linear-gradient(90deg, rgba(0,0,0,0.65), rgba(0,0,0,0.15), rgba(0,0,0,0.7))',

                    pointerEvents:
                        'none',

                    zIndex: 7,
                }}
            />
        </Box>
    );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function MissionVision(props: Props) {
    const handleButtonClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        props.onNavChange('About Us');
    };

    const imageRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: imageRef,

        offset: ['start end', 'end start'],
    });

    const scale = useTransform(
        scrollYProgress,
        [0.2, 0.5],
        [1, 1.2]
    );

    const smoothScale = useSpring(scale, {
        stiffness: 100,
        damping: 30,
    });

    return (
        <Grid
            container
            m={0}
            sx={{
                width: '100%',
            }}
        >
            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                    position: 'relative',
                    overflow: 'hidden',

                    color: 'white',

                    minHeight: {
                        xs: '500px',
                        md: '700px',
                    },
                }}
                ref={imageRef}
            >
                <motion.div
                    style={{
                        width: '100%',
                        height: '100%',
                        scale: smoothScale,
                    }}
                >
                    <img
                        src={
                            process.env.PUBLIC_URL +
                            '/plant.jpeg'
                        }
                        alt="Tech visual"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </motion.div>

                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,

                        background:
                            'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.65))',

                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',

                        textAlign: 'center',

                        px: 3,
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={600}
                    >
                        Unprecedented Velocity.
                    </Typography>

                    <Typography
                        variant="h5"
                        fontWeight={600}
                    >
                        Impeccable Reliability.
                    </Typography>
                </Box>
            </Grid>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                    position: 'relative',
                    overflow: 'hidden',

                    minHeight: {
                        xs: '750px',
                        md: '700px',
                    },

                    display: 'flex',

                    alignItems: 'center',

                    justifyContent: 'center',

                    p: {
                        xs: 2,
                        sm: 4,
                        md: 5,
                    },

                    background: '#020202',
                }}
            >
                {/* =============================================
                    INDUSTRIAL BACKGROUND
                ============================================= */}

                <IndustrialBackground />

                {/* =============================================
                    GLASS CONTENT
                ============================================= */}

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.25,
                    }}
                    variants={containerVariant}
                    style={{
                        position: 'relative',

                        zIndex: 5,

                        width: '100%',
                        maxWidth: 620,
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',

                            p: {
                                xs: 3,
                                sm: 4,
                                md: 4.5,
                            },

                            borderRadius: '24px',

                            background:
                                'linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.035))',

                            backdropFilter: 'blur(18px)',

                            WebkitBackdropFilter:
                                'blur(18px)',

                            border:
                                '1px solid rgba(255,255,255,0.14)',

                            boxShadow:
                                '0 25px 80px rgba(0,0,0,0.55)',

                            overflow: 'hidden',

                            '&::before': {
                                content: '""',

                                position: 'absolute',

                                top: 0,
                                left: 0,

                                width: '100%',
                                height: '1px',

                                background:
                                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                            },

                            '&::after': {
                                content: '""',

                                position: 'absolute',

                                width: '180px',
                                height: '180px',

                                right: '-100px',
                                bottom: '-100px',

                                borderRadius: '50%',

                                background:
                                    'rgba(255,100,20,0.12)',

                                filter: 'blur(40px)',

                                pointerEvents: 'none',
                            },
                        }}
                    >
                        {/* =====================================
                            INTRO
                        ===================================== */}

                        <motion.div
                            custom={0}
                            variants={textVariant}
                        >
                            <Typography
                                component="h3"
                                sx={{
                                    color: 'white',

                                    fontSize: {
                                        xs: '1.25rem',
                                        sm: '1.4rem',
                                        md: '1.45rem',
                                    },

                                    lineHeight: 1.55,

                                    fontWeight: 500,

                                    letterSpacing:
                                        '-0.01em',

                                    mb: 3,
                                }}
                            >
                                At AURANGABAD PIPES, we are committed to manufacturing and supplying high-quality seamless pipes and tubes that meet global standards and statutory requirements. With a focus on customer satisfaction, quality, and on-time delivery, we continuously improve our processes, strengthen our capabilities, and invest in employee expertise to deliver consistent excellence.
                            </Typography>
                        </motion.div>

                        {/* =====================================
                            LINE
                        ===================================== */}

                        <motion.div
                            custom={0.5}
                            variants={textVariant}
                        >
                            <MotionLine color="white" />
                        </motion.div>

                        {/* =====================================
                            MISSION / VISION / VALUES
                        ===================================== */}

                        {[
                            {
                                title: 'Our Mission',

                                text:
                                    'To manufacture and supply quality seamless pipes and tubes that meet customer requirements and applicable standards through reliable processes, competent people and continual improvement.',
                            },

                            {
                                title: 'Our Vision',

                                text:
                                    'To be a trusted and globally recognized manufacturer of high-quality seamless pipes and tubes. Distinguished by quality, reliability, innovation, and customer excellence.',
                            },

                            {
                                title: 'Our Core Values',

                                text:
                                    'Empowerment. Execution. Innovation. Collaboration. Value.',
                            },

                            {
                                title: '',

                                text:
                                    'From insight to execution — delivering measurable results where it matters most.',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                custom={index + 1}
                                variants={textVariant}
                            >
                                {item.title && (
                                    <Typography
                                        sx={{
                                            color: Color.blueGrey,

                                            fontSize:
                                                '0.9rem',

                                            fontWeight: 700,

                                            letterSpacing:
                                                '0.08em',

                                            textTransform:
                                                'uppercase',

                                            mb: 0.7,

                                            mt:
                                                index === 0
                                                    ? 2
                                                    : 1.5,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                )}

                                <Typography
                                    variant="body1"
                                    sx={{
                                        color:
                                            'rgba(255,255,255,0.62)',

                                        fontSize:
                                            '0.95rem',

                                        lineHeight: 1.7,

                                        mb: 1.5,
                                    }}
                                >
                                    {item.text}
                                </Typography>
                            </motion.div>
                        ))}

                        {/* =====================================
                            BUTTON
                        ===================================== */}

                        <Box
                            sx={{
                                display: 'flex',

                                justifyContent:
                                    'center',

                                mt: 3,
                            }}
                        >
                            <motion.div
                                custom={5}
                                variants={textVariant}
                            >
                                <Button
                                    variant="outlined"
                                    sx={{
                                        position:
                                            'relative',

                                        color: 'white',

                                        borderColor:
                                            'rgba(255,255,255,0.55)',

                                        px: 4,

                                        py: 1.4,

                                        borderRadius:
                                            '999px',

                                        fontWeight: 500,

                                        letterSpacing:
                                            '0.04em',

                                        overflow: 'hidden',

                                        transition:
                                            'all 0.3s ease',

                                        '&::before': {
                                            content:
                                                '""',

                                            position:
                                                'absolute',

                                            inset: 0,

                                            background:
                                                'linear-gradient(90deg, transparent, rgba(255,120,40,0.2), transparent)',

                                            transform:
                                                'translateX(-100%)',

                                            transition:
                                                'transform 0.5s ease',
                                        },

                                        '&:hover': {
                                            background:
                                                'rgba(255,255,255,0.08)',

                                            borderColor:
                                                'rgba(255,150,80,0.8)',

                                            boxShadow:
                                                '0 0 30px rgba(255,100,30,0.15)',

                                            transform:
                                                'translateY(-2px)',
                                        },

                                        '&:hover::before': {
                                            transform:
                                                'translateX(100%)',
                                        },
                                    }}
                                    onClick={
                                        handleButtonClick
                                    }
                                >
                                    Learn More
                                </Button>
                            </motion.div>
                        </Box>
                    </Box>
                </motion.div>
            </Grid>
        </Grid>
    );
}