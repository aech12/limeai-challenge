import React from 'react';
import { Patient } from '../types/patient';
import PatientRow from './PatientRow';
import styles from './PatientTable.module.css';

interface PatientTableProps {
  patients: Patient[];
}

const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <PatientRow key={patient.id} patient={patient} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
