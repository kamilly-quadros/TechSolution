import { TextField, Box, Button } from "@mui/material";
import styles from "../login/loginPage.module.css";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { username, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert("Usuário ou senha inválidos");
        }
    };
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

    return (
        <div className={styles.container}>
            <Box
                sx={{
                    backgroundColor: "var(--primary-color)",
                    padding: "2rem",
                    borderRadius: "12px",
                    boxShadow: "0 10px 10px rgba(0,0,0,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.5rem",
                    width: "320px",
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <h1
                        style={{
                            fontFamily: "'Press Start 2P', cursive",
                            color: "var(--secondary-color)",
                            fontSize: "1.5rem",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Tech Solutions
                    </h1>
                    <h3
                        style={{
                            color: "var(--details)",
                            fontWeight: 400,
                            fontSize: "0.9rem",
                        }}
                    >
                        Controle de Equipamentos
                    </h3>
                </div>
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%" }}>
                    <TextField
                        label="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="standard"
                        sx={textFieldStyles}
                        required
                        inputProps={{maxLenght:"100"} }
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="standard"
                        sx={textFieldStyles}
                        required
                        inputProps={{ maxLenght: "100" }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "var(--secondary-color)",
                            color: "var(--primary-color)",
                            fontWeight: "bold",
                            textTransform: "none",
                            borderRadius: "8px",
                            padding: "0.5rem 2rem",
                            "&:hover": {
                                backgroundColor: "var(--secondary-color-medium)",
                            },
                        }}
                    >
                        Entrar
                    </Button>
                </form>
            </Box>
        </div>
    );
}
