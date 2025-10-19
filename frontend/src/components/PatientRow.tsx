import React from 'react';
import { Patient } from '../types/patient';

interface PatientRowProps {
  patient: Patient;
}

const PatientRow: React.FC<PatientRowProps> = ({ patient }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <tr>
      <td>{patient.patient_id}</td>
      <td>{patient.first_name} {patient.last_name}</td>
      <td>{formatDate(patient.date_of_birth)}</td>
      <td>{patient.email || '-'}</td>
      <td>{patient.phone || '-'}</td>
      <td>{patient.address || '-'}</td>
    </tr>
  );
};

export default PatientRow;
