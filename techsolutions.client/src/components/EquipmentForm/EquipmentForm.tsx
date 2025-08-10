import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./EquipmentForm.module.css";
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

interface EquipmentFormProps {
    disabled?: boolean;
}

type BtnItem = {
    text: string;
    to?: string;
    type?: "submit" | "button";
    sx?: object;
};

export default function EquipmentForm({ disabled = false }: EquipmentFormProps) {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [serialNumber, setSerial] = useState("");
    const [description, setDesc] = useState("");
    const [branchId, setBranchId] = useState(1);
    const navigate = useNavigate();
    const textFieldStyles = {
        "& .MuiInputLabel-root": {
            color: "var(--secondary-color)",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--secondary-color)",
        },
        "& .MuiInputBase-input": {
            color: "var(--details)",
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "var(--secondary-color)",
        },
        "& .MuiInput-underline:hover:before": {
            borderBottomColor: "var(--secondary-color)",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "var(--details)",
        },
    };
    const selectStyles = {
        "& .MuiInputLabel-root": {
            color: "var(--secondary-color)",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--secondary-color)",
        },
        "& .MuiSelect-select": {
            color: "var(--details)",
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "var(--secondary-color)",
        },
        "& .MuiInput-underline:hover:before": {
            borderBottomColor: "var(--secondary-color)",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "var(--details)",
        },
    };
    const save = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await api.put(`/equipments/${id}`, { name, serialNumber, description, branchId });
        } else {
            await api.post("/equipments", { name, serialNumber, description, branchId });
        }
        navigate("/dashboard");
    };

    useEffect(() => {
        if (id) {
            api.get(`/equipments/${id}`).then((res) => {
                setName(res.data.name);
                setSerial(res.data.serialNumber);
                setDesc(res.data.description);
                setBranchId(res.data.branchId);
            });
        }
    }, [id]);

    return (
        <>
            <Header />
            <Box className={styles.container}>
                <Box className={styles.contentContainer}>
                    <form onSubmit={save}>
                        <Typography variant="h5" gutterBottom mb={4}>
                            {disabled
                                ? "Visualizar Equipamento"
                                : id
                                    ? "Editar Equipamento"
                                    : "Cadastrar Equipamento"}
                        </Typography>
                        <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
                            <TextField
                                label="Nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variant="standard"
                                sx={[textFieldStyles, { width: "100%" }]}
                                margin="normal"
                                required
                                inputProps={{ maxLength: "100" }}
                                disabled={disabled}
                            />
                            <TextField
                                label="Número de Série"
                                value={serialNumber}
                                onChange={(e) => setSerial(e.target.value)}
                                variant="standard"
                                sx={[textFieldStyles, { width: "100%" }]}
                                margin="normal"
                                required
                                inputProps={{ maxLength: "100" }}
                                disabled={disabled}
                            />
                            <TextField
                                label="Descrição"
                                multiline
                                minRows={2}
                                value={description}
                                onChange={(e) => setDesc(e.target.value)}
                                sx={[textFieldStyles, { width: "100%" }]}
                                required
                                inputProps={{ maxLength: "200" }}
                                disabled={disabled}
                            />
                            <FormControl
                                variant="standard"
                                margin="normal"
                                required
                                sx={{ width: "100%", ...selectStyles }}
                                disabled={disabled}
                            >
                                <InputLabel>Filial</InputLabel>
                                <Select
                                    value={branchId}
                                    onChange={(e) => setBranchId(Number(e.target.value))}
                                >
                                    <MenuItem value={1}>Matriz</MenuItem>
                                    <MenuItem value={2}>Filial 1</MenuItem>
                                </Select>
                            </FormControl>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "0.5rem",
                                    flexWrap: "wrap",
                                    width: "100%"
                                }}
                            >
                                {(!disabled
                                    ? [
                                        {
                                            text: "Cancelar",
                                            to: "/dashboard",
                                            sx: {
                                                backgroundColor: "var(--primary-color)",
                                                color: "var(--secondary-color)",
                                                "&:hover": {
                                                    backgroundColor: "var(--details)",
                                                    color: "var(--primary-color)"
                                                },
                                            },
                                        },
                                        { text: "Salvar", type: "submit" as const },
                                    ] as BtnItem[]
                                    : [{ text: "Voltar", to: "/dashboard" } as BtnItem]).map(({ text, to, type, sx }) => (
                                        <ButtonComponent
                                            key={text}
                                            component={to ? Link : undefined}
                                            to={to}
                                            type={type}
                                            sx={{
                                                flex: 1,
                                                minWidth: "120px",
                                                textAlign: "center",
                                                ...sx,
                                            }}
                                        >
                                            {text}
                                        </ButtonComponent>
                                    ))}
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </Box>
        </>
    );
}
