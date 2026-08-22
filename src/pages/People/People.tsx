import { Box, Typography } from "@mui/material";
import MotionLine from "../../components/MotionLine";

// ============================================================================
// TYPES + DATA
// ============================================================================

interface Person {
    id: string;
    name: string;
    title: string;
    dept: string;
    color: string;
    reports?: Person[];
}

const orgData: Person = {
    id: "ceo",
    name: "Elena Marsh",
    title: "Chief Executive Officer",
    dept: "Executive",
    color: "#C9A15C",
    reports: [
        {
            id: "cto",
            name: "Daniel Osei",
            title: "Chief Technology Officer",
            dept: "Engineering",
            color: "#4FB6A8",
            reports: [
                { id: "vp-eng", name: "Maya Lindqvist", title: "VP, Platform Engineering", dept: "Engineering", color: "#4FB6A8" },
                { id: "dir-data", name: "Rosa Ferreira", title: "Director, Data & AI", dept: "Engineering", color: "#4FB6A8" },
            ],
        },
        {
            id: "cfo",
            name: "Grace Whitfield",
            title: "Chief Financial Officer",
            dept: "Finance",
            color: "#CB6E3F",
            reports: [
                { id: "vp-fin", name: "Owen Baptiste", title: "VP, Finance & Treasury", dept: "Finance", color: "#CB6E3F" },
                { id: "dir-fpna", name: "Nina Kowalski", title: "Director, FP&A", dept: "Finance", color: "#CB6E3F" },
            ],
        },
        {
            id: "coo",
            name: "Marcus Chen",
            title: "Chief Operating Officer",
            dept: "Operations",
            color: "#8B7FD6",
            reports: [
                { id: "vp-ops", name: "Aisha Rahman", title: "VP, Global Operations", dept: "Operations", color: "#8B7FD6" },
                { id: "dir-people", name: "Leo Vantongeren", title: "Director, People Ops", dept: "Operations", color: "#8B7FD6" },
            ],
        },
        {
            id: "cmo",
            name: "Sofia Alvarez",
            title: "Chief Marketing Officer",
            dept: "Marketing",
            color: "#E2717A",
            reports: [
                { id: "vp-brand", name: "Theo Bergman", title: "VP, Brand & Growth", dept: "Marketing", color: "#E2717A" },
                { id: "dir-comms", name: "Priya Natarajan", title: "Director, Communications", dept: "Marketing", color: "#E2717A" },
            ],
        },
    ],
};

// ============================================================================
// CONSTANTS + HELPERS
// ============================================================================

const SERIF = 'Georgia, "Times New Roman", serif';
const INK = "#F4F1EB";
const MUTED = "#9298A6";

const initials = (name: string) =>
    name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const countPeople = (p: Person): number =>
    1 + (p.reports?.reduce((sum, c) => sum + countPeople(c), 0) ?? 0);

// ============================================================================
// AVATAR
// ============================================================================

function Avatar({ person, size, filled }: { person: Person; size: number; filled?: boolean }) {
    return (
        <Box
            sx={{
                flexShrink: 0,
                width: size,
                height: size,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: size * 0.32,
                ...(filled
                    ? { background: person.color, color: "#11131A" }
                    : { background: `${person.color}18`, border: `1px solid ${person.color}55`, color: person.color }),
            }}
        >
            {initials(person.name)}
        </Box>
    );
}

// ============================================================================
// PERSON CARD (handles all three visual roles via `level`)
// ============================================================================

function PersonCard({ person, level }: { person: Person; level: 0 | 1 | 2 }) {
    // level 0 = CEO, level 1 = department head, level 2 = report
    if (level === 2) {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transition: "background 160ms ease, border-color 160ms ease",
                    "&:hover": { background: "rgba(255,255,255,0.05)", borderColor: `${person.color}55` },
                }}
            >
                <Avatar person={person} size={38} />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography sx={{ fontFamily: SERIF, fontWeight: 700, fontSize: "0.82rem", color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {person.name}
                    </Typography>
                    <Typography sx={{ fontSize: "0.62rem", color: MUTED, mt: 0.25 }}>{person.title}</Typography>
                </Box>
                <Box sx={{ flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: person.color }} />
            </Box>
        );
    }

    if (level === 1) {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.75,
                    borderRadius: "14px",
                    background: `${person.color}0D`,
                    border: `1px solid ${person.color}30`,
                }}
            >
                <Avatar person={person} size={44} />
                <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontFamily: SERIF, fontWeight: 700, fontSize: "0.92rem", color: INK }}>{person.name}</Typography>
                    <Typography sx={{ fontSize: "0.64rem", color: MUTED, mt: 0.3 }}>{person.title}</Typography>
                </Box>
            </Box>
        );
    }

    // level 0 — CEO
    return (
        <Box
            sx={{
                width: { xs: "min(100%, 300px)", sm: 300 },
                mx: "auto",
                p: { xs: 2.5, sm: 3 },
                borderRadius: "20px",
                textAlign: "center",
                background: "linear-gradient(150deg, rgba(201,161,92,0.12), rgba(255,255,255,0.02))",
                border: "1px solid rgba(201,161,92,0.35)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1.5 }}>
                <Avatar person={person} size={60} filled />
            </Box>
            <Typography sx={{ fontFamily: SERIF, fontWeight: 700, fontSize: { xs: "1.1rem", sm: "1.2rem" }, color: INK }}>
                {person.name}
            </Typography>
            <Typography sx={{ fontSize: "0.72rem", color: MUTED, mt: 0.5 }}>{person.title}</Typography>
            <Typography sx={{ fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#C9A15C", fontWeight: 600, mt: 1.2 }}>
                {person.dept}
            </Typography>
        </Box>
    );
}

// ============================================================================
// DEPARTMENT BLOCK
// ============================================================================

function Department({ person }: { person: Person }) {
    return (
        <Box sx={{ width: "100%", maxWidth: { xs: 460, sm: "none" }, mx: "auto" }}>
            {/* label */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <Box sx={{ width: 7, height: 7, borderRadius: "50%", background: person.color, boxShadow: `0 0 8px ${person.color}` }} />
                <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: person.color }}>
                    {person.dept}
                </Typography>
                <Box sx={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${person.color}40, transparent)` }} />
            </Box>

            {/* head */}
            <Box sx={{ mb: 1.25, pl: 1.5, borderLeft: `2px solid ${person.color}55` }}>
                <PersonCard person={person} level={1} />
            </Box>

            {/* reports */}
            <Box sx={{ ml: 2, pl: 1.5, borderLeft: "1px solid rgba(255,255,255,0.09)", display: "flex", flexDirection: "column", gap: 1 }}>
                {person.reports?.map((r) => (
                    <PersonCard key={r.id} person={r} level={2} />
                ))}
            </Box>
        </Box>
    );
}

// ============================================================================
// PAGE
// ============================================================================

export default function People() {
    const total = countPeople(orgData);
    const departments = orgData.reports?.length ?? 0;

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                color: INK,
                overflowX: "hidden",
                p: "1rem",
                background: `
                    radial-gradient(circle at 50% 0%, rgba(201,161,92,0.07), transparent 35%),
                    linear-gradient(160deg, #090B10 0%, #11141B 55%, #181B23 100%)
                `,
            }}
        >
            <Box sx={{ px: { xs: 2, sm: 4 }, pt: { xs: 3, sm: 5 } }}>
                <MotionLine color="white" />
            </Box>

            {/* header */}
            <Box sx={{ textAlign: "center", px: 2, py: { xs: 5, sm: 7 } }}>
                <Typography sx={{ fontFamily: SERIF, fontWeight: 700, fontSize: { xs: "2rem", sm: "2.8rem" }, letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                    Leadership structure
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", color: MUTED, mt: 1.2 }}>
                    {total} people across {departments} departments
                </Typography>
            </Box>

            {/* tree */}
            <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto", px: { xs: 2, sm: 4 }, pb: { xs: 7, sm: 10 } }}>
                {/* CEO + spine */}
                <Box
                    sx={{
                        position: "relative",
                        pb: { xs: 4, sm: 6 },
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: "50%",
                            bottom: 0,
                            width: "1px",
                            height: { xs: 32, sm: 48 },
                            background: "linear-gradient(180deg, rgba(201,161,92,0.7), rgba(255,255,255,0.1))",
                        },
                    }}
                >
                    <PersonCard person={orgData} level={0} />
                </Box>

                {/* departments */}
                <Box
                    sx={{
                        pt: { xs: 4, sm: 6 },
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                        columnGap: { sm: 8, md: 12 },
                        rowGap: { xs: 5, sm: 6 },
                    }}
                >
                    {orgData.reports?.map((dept) => (
                        <Department key={dept.id} person={dept} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}