import React from "react";
import { Patient } from "../types/patient";
import styles from "./PatientSidebar.module.css";

interface PatientSidebarProps {
  patient: Patient;
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({ patient }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.sidebar}>
      <h2>
        {patient.first_name} {patient.last_name}
      </h2>

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.label}>Patient ID:</span>
          <span>{patient.patient_id}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>DOB:</span>
          <span>{formatDate(patient.date_of_birth)}</span>
        </div>
        {patient.email && (
          <div className={styles.detailRow}>
            <span className={styles.label}>Email:</span>
            <span>{patient.email}</span>
          </div>
        )}
        {patient.phone && (
          <div className={styles.detailRow}>
            <span className={styles.label}>Phone:</span>
            <span>{patient.phone}</span>
          </div>
        )}
        {patient.address && (
          <div className={styles.detailRow}>
            <span className={styles.label}>Address:</span>
            <span>{patient.address}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientSidebar;
