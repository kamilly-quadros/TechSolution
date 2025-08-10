import EquipmentList from "../../components/EquipmentList/EquipmentList";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./Dashboard.module.css";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export default function Dashboard() {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.contentContainer}>
                    <div className={styles.headerRow}>
                        <h1>Equipamentos</h1>
                        <ButtonComponent
                            component={Link}
                            to="/equipment/new"
                            sx={{
                                color: "var(--primary-color)",
                                fontWeight: "bold",
                                borderRadius: "8px",
                                padding: "0.5rem 1rem",
                                width: "10rem",
                                alignSelf: "center",
                            }}
                        >
                            Cadastrar
                        </ButtonComponent>
                    </div>
                    <EquipmentList />
                </div>
            </div>
        </>
    );
}
