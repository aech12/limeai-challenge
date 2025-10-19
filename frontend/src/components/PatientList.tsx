import React, { useState } from "react";
import { usePatients } from "../hooks/usePatients";
import PatientSidebar from "./PatientSidebar";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";
import styles from "./PatientList.module.css";
import { Patient } from "../types/patient";

const PatientList: React.FC = () => {
  const { patients, isLoading, error, mutate } = usePatients();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Error</h2>
          <p>Failed to load patients. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading patients...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Patient Records</h1>

      <div className={styles.layout}>
        <div className={styles.patientsList}>
          <h2>Patients</h2>
          <div className={styles.list}>
            {patients.map((patient) => (
              <button
                key={patient.id}
                className={`${styles.patientItem} ${
                  selectedPatient?.id === patient.id ? styles.active : ""
                }`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className={styles.patientName}>
                  {patient.first_name} {patient.last_name}
                </div>
                <div className={styles.patientId}>{patient.patient_id}</div>
                <div className={styles.noteCount}>
                  {patient.notes.length} note
                  {patient.notes.length !== 1 ? "s" : ""}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.patientDetail}>
          {selectedPatient ? (
            <>
              <PatientSidebar patient={selectedPatient} />
              <NoteForm
                patientId={selectedPatient.id}
                onNoteCreated={() => mutate()}
              />
              <NotesList notes={selectedPatient.notes} />
            </>
          ) : (
            <div className={styles.noSelection}>
              <p>Select a patient to view details and manage notes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientList;
