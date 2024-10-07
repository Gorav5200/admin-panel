import * as React from "react";
import AvatarGroup from "@mui/material/AvatarGroup";

const names = [
  "Remy Sharp",
  "Travis Howard",
  "Cindy Baker",
  "Agnes Walker",
  "Trevor Henderson",
];

export default function GroupAvatars() {
  const maxAvatarsToShow = 2;
  const avatarsToShow = names.slice(0, maxAvatarsToShow);
  const remainingAvatarsCount = names.length - maxAvatarsToShow;

  return (
    <div>
      {avatarsToShow.map((name, index) => (
        <div key={index}>{name}</div>
      ))}
      {remainingAvatarsCount > 0 && (
        <div>{`+${remainingAvatarsCount} more`}</div>
      )}
    </div>
  );
}
