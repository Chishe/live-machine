CREATE TABLE machine_status_1 (
  id SERIAL PRIMARY KEY,
  process VARCHAR(255) NOT NULL,
  mode VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO machine_status_1 (process, mode, status)
VALUES
  ('Meterial Insertion', 'Andon NG', 'Remaining 54 mins'),
  ('Forming', 'Normal', 'Alarm Code:XXXX'),
  ('Staging', 'Normal', '12000');

CREATE TABLE machine_status_2 (
  id SERIAL PRIMARY KEY,
  process VARCHAR(255) NOT NULL,
  mode VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO machine_status_2 (process, mode, status)
VALUES
  ('Meterial Insertion', 'Andon NG', 'Remaining 54 mins'),
  ('Forming', 'Normal', 'Alarm Code:XXXX'),
  ('Staging', 'Normal', '20000');


CREATE TABLE machine_status_3 (
  id SERIAL PRIMARY KEY,
  process VARCHAR(255) NOT NULL,
  mode VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO machine_status_3 (process, mode, status)
VALUES
  ('Meterial Insertion', 'Andon NG', 'Remaining 54 mins'),
  ('Forming', 'Normal', 'Alarm Code:XXXX'),
  ('Staging', 'Normal', '10000');

CREATE TABLE machine_status_5 (
  id SERIAL PRIMARY KEY,
  process VARCHAR(255) NOT NULL,
  mode VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO machine_status_5 (process, mode, status)
VALUES
  ('Meterial Insertion', 'Andon NG', 'Remaining 54 mins'),
  ('Forming', 'Normal', 'Alarm Code:XXXX'),
  ('Staging', 'Normal', '15000');

  CREATE TABLE machine_status (
  id SERIAL PRIMARY KEY,
  machine_name TEXT,
  mode TEXT,
  status TEXT,
  remaining_time TEXT,
  next_model TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO machine_status (
  id,
  machine_name,
  mode,
  status,
  remaining_time,
  next_model
)
VALUES
  (1, 'Forming M/C #1', 'Normal', 'Changeover', '08:22', 'AA'),
  (2, 'Forming M/C #2', 'Andon NG', 'Normal', '12:10', 'BB'),
  (3, 'Forming M/C #3', 'Normal', 'Abnormal', '08:22', 'CC'),
  (4, 'Forming M/C #5', 'Normal', 'Abnormal', '08:22', 'DD');

CREATE TABLE machine_logs (
  id SERIAL PRIMARY KEY,
  mc TEXT,
  mode TEXT,
  date TIMESTAMP,
  details TEXT,
  plc TEXT,
  action TEXT,
  continue TIMESTAMP,
  loss TEXT
);

INSERT INTO machine_logs (mc, mode, date, details, plc,action, continue, loss)
VALUES 
  ('Forming#1', 'Andon NG', '2025-04-23T13:35', '', 'TPM','', '2025-04-23T13:36:25', '50 mins'),
  ('Forming#2', 'Andon NG', '2025-04-23T13:35', '', 'TPM','', '2025-04-23T13:36:25', '50 mins'),
  ('Forming#3', 'Andon NG', '2025-04-23T13:35', '', 'TPM','', '2025-04-23T13:36:25', '50 mins');
