import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import type { Equipment } from "../../types";
import styles from "./EquipmentDetails.module.css";
import EquipmentForm from "../../components/EquipmentForm/EquipmentForm";

export default function EquipmentDetails() {
    const { id } = useParams();
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const load = async () => {
        const eq = await api.get(`/equipments/${id}`);
        setEquipment(eq.data);
    };

    useEffect(() => { load(); }, []);

    if (!equipment) return <p>Carregando...</p>;

    return (
        <>
            <div className={styles.container}>
                    <EquipmentForm disabled={true} />
            </div>
        </>
    );
}
