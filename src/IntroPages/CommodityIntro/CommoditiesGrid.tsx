import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import OilBarrelOutlinedIcon from "@mui/icons-material/OilBarrelOutlined";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import { Color } from "../../colors";

const items = [
  {
    label: "Boiler & Heat Exchanger Tubes",
    icon: (
      <DeviceThermostatOutlinedIcon
        sx={{ color: Color.blueGrey, fontSize: "5.5rem" }}
      />
    ),
  },
  {
    label: "Oil & Gas Pipelines",
    icon: (
      <OilBarrelOutlinedIcon
        sx={{ color: Color.blueGrey, fontSize: "5.5rem" }}
      />
    ),
  },
  {
    label: "Power Plants",
    icon: (
      <FactoryOutlinedIcon
        sx={{ color: Color.blueGrey, fontSize: "5.5rem" }}
      />
    ),
  },
  {
    label: "Automotive Components",
    icon: (
      <PrecisionManufacturingOutlinedIcon
        sx={{ color: Color.blueGrey, fontSize: "5.5rem" }}
      />
    ),
  },
  {
    label: "Structural & Engineering Uses",
    icon: (
      <EngineeringOutlinedIcon
        sx={{ color: Color.blueGrey, fontSize: "5.5rem" }}
      />
    ),
  },
];

export default function CommoditiesGrid() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Grid container spacing={3} justifyContent="center">
        {items.map((item, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                width: isMobile ? "100%" : 300,
                height: "100%",
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box sx={{ fontSize: 40, color: "primary.main", mb: 1 }}>
                  {item.icon}
                </Box>
                <Typography variant="h6" fontWeight="600">
                  {item.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
