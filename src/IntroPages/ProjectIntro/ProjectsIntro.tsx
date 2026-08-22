import { Box, Button } from '@mui/material';
import MotionLine from '../../components/MotionLine';
import SectionIntro from '../../components/SectionIntro';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
    onNavChange: (item: string) => void;
}

function ProjectsIntro(props: Props) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px 0px' });

    const handleButtonClick = () => {
        window.scrollTo({ top: 0 });
        props.onNavChange('Application')
    };

    return (
        <>
            <SectionIntro
                title="PRODUCTION PROCESS"
                descriptionLines={[
                    "MANUFACTURING",
                    "PROCESS FLOW"
                ]}
                bgcolor="black"
            >
                <MotionLine color='white' />
                <style>
                    {`.react-flow__attribution { display: none !important; }`}
                </style>

                {/* HOT FINISH SEAMLESS */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        margin: "30px 0 50px",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "min(550px, 90vw)",
                            padding: "28px 40px",
                            boxSizing: "border-box",
                        }}
                    >
                        <svg
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                overflow: "visible",
                            }}
                        >
                            <rect
                                x="2"
                                y="2"
                                width="calc(100% - 4px)"
                                height="calc(100% - 4px)"
                                rx="12"
                                ry="12"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeDasharray="10 6"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="0"
                                    to="-160"
                                    dur="6s"
                                    repeatCount="indefinite"
                                />
                            </rect>
                        </svg>

                        <div
                            style={{
                                position: "relative",
                                textAlign: "center",
                                color: "#fff",
                            }}
                        >
                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: "2rem",
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                            >
                                HOT FINISH SEAMLESS
                            </h2>

                            <p
                                style={{
                                    marginTop: 8,
                                    marginBottom: 0,
                                    fontSize: "1.1rem",
                                    color: "#fff",
                                }}
                            >
                                (HFS TUBES)
                            </p>
                        </div>
                    </div>
                </div>

                {/* COLD DRAWN SEAMLESS */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        margin: "30px 0 50px",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "min(550px, 90vw)",
                            padding: "28px 40px",
                            boxSizing: "border-box",
                        }}
                    >
                        <svg
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                overflow: "visible",
                            }}
                        >
                            <rect
                                x="2"
                                y="2"
                                width="calc(100% - 4px)"
                                height="calc(100% - 4px)"
                                rx="12"
                                ry="12"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeDasharray="10 6"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="0"
                                    to="-160"
                                    dur="6s"
                                    repeatCount="indefinite"
                                />
                            </rect>
                        </svg>

                        <div
                            style={{
                                position: "relative",
                                textAlign: "center",
                                color: "#fff",
                            }}
                        >
                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: "2rem",
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                            >
                                COLD DRAWN SEAMLESS
                            </h2>

                            <p
                                style={{
                                    marginTop: 8,
                                    marginBottom: 0,
                                    fontSize: "1.1rem",
                                    color: "#fff",
                                }}
                            >
                                (CDS TUBES)
                            </p>
                        </div>
                    </div>
                </div>

                <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 4, md: 6 } }}>
                    <Box mt={5} textAlign="center" ref={ref}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    color: 'white',
                                    borderColor: 'white',
                                    px: 4,
                                    py: 1.5,
                                    fontWeight: 500,
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        borderColor: 'white',
                                    },
                                }}
                                onClick={handleButtonClick}
                            >
                                Read More
                            </Button>
                        </motion.div>
                    </Box>
                </Box>
            </SectionIntro>
        </>
    );
}

export default ProjectsIntro;
