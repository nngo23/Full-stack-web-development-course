import { Patient, Gender, Entry, EntryType } from "../types/patient";

const mapGender = (g: string): Gender => {
  switch (g.toLowerCase()) {
    case "male":
      return Gender.Male;
    case "female":
      return Gender.Female;
    case "other":
      return Gender.Other;
    default:
      throw new Error(`Unknown gender: ${g}`);
  }
};

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const mapEntry = (e: unknown): Entry => {
  if (!isObject(e) || !("type" in e)) {
    throw new Error("Invalid entry");
  }

  switch (e.type) {
    case "Hospital":
      return {
        ...e,
        type: EntryType.Hospital,
      } as Entry;

    case "OccupationalHealthcare":
      return {
        ...e,
        type: EntryType.OccupationalHealthcare,
      } as Entry;

    case "HealthCheck":
      return {
        ...e,
        type: EntryType.HealthCheck,
      } as Entry;

    default:
      throw new Error(`Unhandled entry type: ${String(e.type)}`);
  }
};

const data = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: "male",
    occupation: "New york city cop",
    entries: [
      {
        id: "a1",
        date: "2023-04-20",
        type: "Hospital",
        specialist: "Dr. Bob",
        description: "Covid",
        discharge: {
          date: "2023-04-25",
          criteria: "Has healed",
        },
      },
      {
        id: "a2",
        date: "2023-09-10",
        type: "OccupationalHealthcare",
        specialist: "Dr. Paul",
        description: "Stomach treatment",
        employerName: "XYZ Corp",
        sickLeave: {
          startDate: "2023-09-10",
          endDate: "2023-09-28",
        },
      },
    ],
  },
  {
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-77A",
    gender: "male",
    occupation: "Cop",
    entries: [
      {
        id: "fcd59fa6-c4b5-4fec-ac4d-df4fe1f85f34",
        date: "2015-05-05",
        type: "OccupationalHealthcare",
        specialist: "MD Yan",
        employerName: "Pino",
        diagnoseCodes: ["Z57.1", "Z74.3", "M51.2"],
        description: "Little radiation poisoning. ",
        sickLeave: {
          startDate: "2015-05-05",
          endDate: "2015-05-15",
        },
      },
    ],
  },
  {
    id: "d27736ec-f723-11e9-8f0b-362b9e155667",
    name: "Hans Gruber",
    dateOfBirth: "1970-04-25",
    ssn: "250470-555L",
    gender: "other",
    occupation: "Technician",
    entries: [
      {
        id: "d811e46d-70b3-4d90-b090-4535c7cf8fb4",
        date: "2019-01-08",
        type: "Hospital",
        specialist: "MD Yan",
        diagnoseCodes: ["S62.5"],
        description:
          "Healing time appr. 3 weeks. patient doesn't remember how he got injured.",
        discharge: {
          date: "2019-01-29",
          criteria: "Healing well.",
        },
      },
    ],
  },
  {
    id: "d2773822-f723-11e9-8f0b-362b9e155667",
    name: "Dana Scully",
    dateOfBirth: "1974-01-05",
    ssn: "050174-432N",
    gender: "female",
    occupation: "Forensic Pathologist",
    entries: [],
  },
  {
    id: "d2773c6e-f723-11e9-8f0b-362b9e155667",
    name: "Matti Luukkainen",
    dateOfBirth: "1971-04-09",
    ssn: "090471-8890",
    gender: "male",
    occupation: "Digital evangelist",
    entries: [],
  },
];

const patientData: Patient[] = data.map((p) => {
  return {
    ...p,
    gender: mapGender(p.gender),
    entries: p.entries.map(mapEntry),
  };
});

export default patientData;
