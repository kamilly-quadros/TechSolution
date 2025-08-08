import { Box, Typography } from "@mui/material";

export default function Header() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                flexWrap: "wrap",
                gap: 2,
                color: "var(--primary-color)",
                padding: "1rem",
                backgroundColor: "var(--secondary-color)",
                width: "100%",
                boxSizing: "border-box",
                borderBottom: "0.1rem solid var(--details)",
            }}
        >
            <Box>
                <Typography variant="h6" component="h1" fontWeight="bold" sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: "1rem"}}>
                    Tech Solutions
                </Typography>
            </Box>
        </Box>
    );
}
