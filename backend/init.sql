-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  patient_id VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notes table
CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  patient_id INT NOT NULL,
  text_content TEXT,
  audio_url VARCHAR(255),
  transcription TEXT,
  summary TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Insert fake patient data
INSERT INTO patients (patient_id, first_name, last_name, date_of_birth, email, phone, address)
VALUES 
  ('PAT001', 'John', 'Doe', '1985-05-15', 'john.doe@email.com', '555-0101', '123 Main St, New York, NY'),
  ('PAT002', 'Jane', 'Smith', '1990-08-22', 'jane.smith@email.com', '555-0102', '456 Oak Ave, Los Angeles, CA'),
  ('PAT003', 'Michael', 'Johnson', '1992-03-10', 'michael.j@email.com', '555-0103', '789 Pine Rd, Chicago, IL');

-- Insert fake notes
INSERT INTO notes (patient_id, text_content, transcription, summary, created_at)
VALUES
  (1, 'Patient reports headaches and fatigue', 'Patient reports headaches and fatigue for the past week', 'Headaches, fatigue', NOW() - INTERVAL '2 days'),
  (1, 'Follow-up: Prescribed medication', 'Prescribed pain relief medication', 'Medication prescribed', NOW() - INTERVAL '1 day'),
  (2, 'Routine checkup', 'Routine checkup completed, all vitals normal', 'Normal vitals', NOW() - INTERVAL '3 days');
