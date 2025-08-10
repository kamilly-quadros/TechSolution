import React from "react";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import type { LinkProps } from "react-router-dom";

type ButtonComponentProps = ButtonProps & Partial<LinkProps> & {
    text?: string;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
    text,
    children,
    sx,
    ...props
}) => {
    return (
        <Button
            variant="contained"
            sx={{
                backgroundColor: "var(--secondary-color)",
                textTransform: "none",
                "&:hover": {
                    backgroundColor: "var(--secondary-color-light)",
                    color: "var(--primary-color-light)",
                },
                ...sx,
            }}
            {...props}
        >
            {text || children}
        </Button>
    );
};

export default ButtonComponent;
