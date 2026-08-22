import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import VerifiedIcon from "@mui/icons-material/Verified";
import EngineeringIcon from "@mui/icons-material/Engineering";

import { motion } from "framer-motion";

const services = [
    {
        title: "Seamless Pipe Manufacturing",
        icon: <PrecisionManufacturingIcon style={{ fontSize: 60 }} />,
        description:
            "Manufacturing high-quality seamless carbon steel and alloy steel pipes & tubes for demanding industrial applications.",
    },
    {
        title: "Custom Pipe & Tube Solutions",
        icon: <ArchitectureIcon style={{ fontSize: 60 }} />,
        description:
            "Customized dimensions, wall thicknesses, material grades, and cut-to-length solutions tailored to customer requirements.",
    },
    {
        title: "Quality Assurance & Testing",
        icon: <VerifiedIcon style={{ fontSize: 60 }} />,
        description:
            "Comprehensive quality control with hydro testing, eddy current testing, dimensional inspection, and in-house laboratory facilities.",
    },
    {
        title: "Industrial Engineering Applications",
        icon: <EngineeringIcon style={{ fontSize: 60 }} />,
        description:
            "Reliable seamless pipe solutions for Oil & Gas, Power, Boilers, Automotive, Hydraulic, and Engineering industries.",
    },
];

export default function WhatWeCanDo() {
    return (
        <Box sx={{ py: 8, px: { xs: 2, md: 10 }, paddingBottom: 0 }}>
            <Grid container spacing={4}>
                {services.map((service, index) => (
                    <Grid size={{ xs: 12, md: 6 }} key={index}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card sx={{ minHeight: 180, borderRadius: 3, p: 2 }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            color: 'black',
                                            mb: 2,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {service.icon}
                                    </Box>
                                    <Typography variant="h6" gutterBottom sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}>
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
