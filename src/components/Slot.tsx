import { ColorsType } from "../App";

export interface slotProps {
  color?: ColorsType;
}

export default function Slot({color} : slotProps) {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        background: color,
      }}
    ></div>
  );
}
