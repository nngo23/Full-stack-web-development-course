import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Gender } from "../types";

interface GenderProps {
  gender: Gender;
}

export const GenderIcons = ({ gender }: GenderProps) => {
  if (gender === "female") {
    return <FemaleIcon />;
  }

  if (gender === "male") {
    return <MaleIcon />;
  }

  return <TransgenderIcon />;
};
