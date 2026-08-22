import React from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import SendIcon from "@mui/icons-material/Send";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const ACCENT = "#A85E1F";
const ACCENT_DARK = "#8a4a18";
const INK = "#1A1A1A";

const textFieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        backgroundColor: "#FAFAF8",
        "& fieldset": { borderColor: "#E3DED5" },
        "&:hover fieldset": { borderColor: ACCENT },
        "&.Mui-focused fieldset": { borderColor: ACCENT, borderWidth: "1.5px" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: ACCENT },
};

const Contact = () => {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        subject: '',
    });
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);

        const url = "https://script.google.com/macros/s/AKfycbymrO_WO0esLtfa9jEF2fzY0LAZX49OdkrsQXqDCFBLPdH4Ogc6QT1hwW4zuKFLdlCwBA/exec";

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
            .then((res) => res.text())
            .then(() => {
                setLoading(false);
                setOpen(true);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    subject: '',
                });
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    return (
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, backgroundColor: "#F4F1EA" }}>
            <Box sx={{ maxWidth: "1200px", mx: "auto", mb: { xs: 4, md: 6 }, textAlign: "center" }}>
                <Typography
                    variant="overline"
                    sx={{ color: ACCENT, letterSpacing: 3, fontWeight: 700 }}
                >
                    Contact Us
                </Typography>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        color: INK,
                        mt: 1,
                        fontSize: { xs: "2rem", md: "2.75rem" },
                    }}
                >
                    Let's build something durable
                </Typography>
                <Typography sx={{ color: "text.secondary", mt: 1.5, maxWidth: 560, mx: "auto" }}>
                    Reach out for sourcing, quotes, or partnership inquiries — our team responds within one business day.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    maxWidth: "1200px",
                    mx: "auto",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(26, 26, 26, 0.12)",
                }}
            >
                {/* Left: Info panel */}
                <Box
                    flex={0.85}
                    sx={{
                        backgroundColor: INK,
                        color: "white",
                        p: { xs: 4, md: 5 },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: -80,
                            right: -80,
                            width: 240,
                            height: 240,
                            borderRadius: "50%",
                            background: `radial-gradient(circle, ${ACCENT}55 0%, transparent 70%)`,
                        },
                    }}
                >
                    <Box sx={{ position: "relative" }}>
                        <Typography variant="h5" fontWeight={700} mb={0.5}>
                            Get in touch
                        </Typography>
                        <Typography sx={{ color: "grey.400", mb: 4, fontSize: 14 }}>
                            25+ years engineering trust, one conversation at a time.
                        </Typography>

                        <Box display="flex" gap={2} mb={3.5} alignItems="flex-start">
                            <RoomOutlinedIcon sx={{ color: ACCENT, mt: 0.3 }} />
                            <Box>
                                <Typography sx={{ fontSize: 13, color: "grey.400", fontWeight: 600, letterSpacing: 0.5 }}>
                                    ADDRESS
                                </Typography>
                                <Typography sx={{ fontSize: 15 }}>500 Terry Francine Street</Typography>
                                <Typography sx={{ fontSize: 15 }}>San Francisco, CA 94158</Typography>
                            </Box>
                        </Box>

                        <Box display="flex" gap={2} mb={3.5} alignItems="flex-start">
                            <CallOutlinedIcon sx={{ color: ACCENT, mt: 0.3 }} />
                            <Box>
                                <Typography sx={{ fontSize: 13, color: "grey.400", fontWeight: 600, letterSpacing: 0.5 }}>
                                    PHONE
                                </Typography>
                                <Typography sx={{ fontSize: 15 }}>123-456-7890</Typography>
                            </Box>
                        </Box>

                        <Box display="flex" gap={2} mb={1} alignItems="flex-start">
                            <MailOutlineIcon sx={{ color: ACCENT, mt: 0.3 }} />
                            <Box>
                                <Typography sx={{ fontSize: 13, color: "grey.400", fontWeight: 600, letterSpacing: 0.5 }}>
                                    EMAIL
                                </Typography>
                                <Typography sx={{ fontSize: 15 }}>info@mysite.com</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ position: "relative" }}>
                        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", my: 3 }} />
                        <Box display="flex" gap={1.5}>
                            <IconButton
                                sx={{
                                    color: "white",
                                    backgroundColor: "rgba(255,255,255,0.08)",
                                    "&:hover": { backgroundColor: ACCENT },
                                }}
                            >
                                <FacebookIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: "white",
                                    backgroundColor: "rgba(255,255,255,0.08)",
                                    "&:hover": { backgroundColor: ACCENT },
                                }}
                            >
                                <LinkedInIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: "white",
                                    backgroundColor: "rgba(255,255,255,0.08)",
                                    "&:hover": { backgroundColor: ACCENT },
                                }}
                            >
                                <TwitterIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>

                {/* Right: Form */}
                <Box
                    flex={1.15}
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ backgroundColor: "white", p: { xs: 4, md: 5 } }}
                >
                    <Box display="flex" gap={2} mb={2.5} flexWrap="wrap">
                        <TextField
                            name="firstName"
                            label="First Name"
                            required
                            fullWidth
                            sx={{ flex: 1, ...textFieldSx }}
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            name="lastName"
                            label="Last Name"
                            required
                            fullWidth
                            sx={{ flex: 1, ...textFieldSx }}
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box display="flex" gap={2} mb={2.5} flexWrap="wrap">
                        <TextField
                            name="email"
                            label="Email"
                            required
                            fullWidth
                            sx={{ flex: 1, ...textFieldSx }}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            name="phoneNumber"
                            label="Phone Number"
                            fullWidth
                            sx={{ flex: 1, ...textFieldSx }}
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </Box>

                    <TextField
                        fullWidth
                        multiline
                        rows={5}
                        name="subject"
                        label="Leave us a message..."
                        variant="outlined"
                        sx={{ mb: 3, ...textFieldSx }}
                        value={formData.subject}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        endIcon={!loading && <SendIcon />}
                        sx={{
                            backgroundColor: ACCENT,
                            textTransform: "none",
                            fontWeight: 600,
                            px: 4,
                            py: 1.3,
                            borderRadius: "10px",
                            boxShadow: "none",
                            "&:hover": {
                                backgroundColor: ACCENT_DARK,
                                boxShadow: "0 8px 20px rgba(168, 94, 31, 0.35)",
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Send Message"}
                    </Button>
                </Box>
            </Box>

            {/* Modal Dialog */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        backgroundColor: '#fff',
                        boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.25)',
                        px: 3,
                        py: 2,
                        minWidth: 320,
                    }
                }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            backgroundColor: ACCENT,
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 18,
                            flexShrink: 0,
                        }}
                    >
                        ✓
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: INK }}>
                        Message Sent
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ fontSize: 15, color: '#555', mb: 1 }}>
                    Thank you — your message has been received. We'll get back to you soon.
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 1 }}>
                    <Button
                        onClick={() => setOpen(false)}
                        fullWidth
                        sx={{
                            color: 'white',
                            backgroundColor: ACCENT,
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 1,
                            borderRadius: "8px",
                            '&:hover': {
                                backgroundColor: ACCENT_DARK,
                            },
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Contact;