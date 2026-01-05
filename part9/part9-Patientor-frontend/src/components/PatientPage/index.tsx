import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Patient } from "../../types";
import patients from "../../services/patients";
import { GenderIcons } from "../GenderIcons";

interface Props {
  patient: Patient | null;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const PatientPage = ({ patient, setPatient }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    const patientToShow = async () => {
      const data = await patients.getById(id);
      setPatient(data);
    };

    void patientToShow();
  }, [id, setPatient]);

  if (!patient) {
    return <div>Loading patient details...</div>;
  }

  return (
    <div className="App">
      <Box>
        <Typography align="left">
          <h1>Patientor</h1>
        </Typography>
      </Box>
      <Button variant="contained" onClick={() => navigate("/")}>
        Home
      </Button>
      <h2>
        {patient.name} <GenderIcons gender={patient.gender} />
      </h2>

      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries found</p>
      ) : (
        <ul>
          {patient.entries.map((entry, index) => (
            <li key={index}>Entry</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientPage;
