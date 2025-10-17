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

-- Insert fake patient data
INSERT INTO patients (patient_id, first_name, last_name, date_of_birth, email, phone, address)
VALUES 
  ('PAT001', 'John', 'Doe', '1985-05-15', 'john.doe@email.com', '555-0101', '123 Main St, New York, NY'),
  ('PAT002', 'Jane', 'Smith', '1990-08-22', 'jane.smith@email.com', '555-0102', '456 Oak Ave, Los Angeles, CA');