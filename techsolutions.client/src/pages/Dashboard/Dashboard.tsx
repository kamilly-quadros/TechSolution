import EquipmentList from "../../components/EquipmentList/EquipmentList";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./Dashboard.module.css";
import { Button } from "@mui/material";

export default function Dashboard() {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.contentContainer}>
                    <h1>Equipamentos</h1>
                    <Button
                        component={Link}
                        to="/equipment/new"
                        variant="contained"
                        sx={{
                            backgroundColor: "var(--secondary-color)",
                            color: "var(--primary-color)",
                            fontWeight: "bold",
                            textTransform: "none",
                            borderRadius: "8px",
                            padding: "0.5rem 1rem",
                            "&:hover": {
                                backgroundColor: "var(--secondary-color-medium)",
                                color: "var(--primary-color)"
                            },
                            width: "10rem",
                            alignSelf: "end"
                        }}
                    >
                        Cadastrar
                    </Button>
                    <EquipmentList />
                </div>
            </div>
        </>
    );
}
