import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patients from "../../services/patients";
import { GenderIcons } from "../GenderIcons";

interface Props {
  patient: Patient | null;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const PatientPage = ({ patient, setPatient }: Props) => {
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
    <div>
      <h2>
        {patient.name} <GenderIcons gender={patient.gender} />
      </h2>

      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries found</p>
      ) : (
        <ul>
          {patient.entries.map((entry) => (
            <div key={entry.id}>
              <p>
                {" "}
                {entry.date} {entry.description}
              </p>
              {entry.diagnoseCodes && (
                <ul>
                  {entry.diagnoseCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientPage;
