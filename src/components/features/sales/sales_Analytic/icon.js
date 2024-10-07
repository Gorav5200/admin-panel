import { icons } from "lucide-react";

const Icon = ({ name, color, size, fill }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;

export const GreenUp = () => {
  return (
    <svg
      width="8"
      height="6"
      viewBox="0 0 8 6"
      fill={"none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.29284 0.342857C3.60713 -0.114286 4.39287 -0.114286 4.70716 0.342857L7.88938 4.97143C8.20368 5.42857 7.81081 6 7.18222 6H0.817777C0.18919 6 -0.203677 5.42857 0.110616 4.97143L3.29284 0.342857Z"
        fill="#24B670"
      />
    </svg>
  );
};

export const RedDown = () => {
  return (
    <svg
      width="8"
      height="6"
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.29284 5.65714C3.60713 6.11429 4.39287 6.11429 4.70716 5.65714L7.88938 1.02857C8.20368 0.571428 7.81081 0 7.18222 0H0.817777C0.18919 0 -0.203677 0.571428 0.110616 1.02857L3.29284 5.65714Z"
        fill="#EA3434"
      />
    </svg>
  );
};
