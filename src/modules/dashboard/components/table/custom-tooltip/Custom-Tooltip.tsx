import { Tooltip, TooltipProps } from "@mui/material";
import { useState } from "react";

export default function CustomTooltip(props: TooltipProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Tooltip
      title={props.title}
      open={open}
      sx={props.sx}
      arrow={props.arrow}
      placement={props.placement}
      disableHoverListener
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div onClick={() => setOpen(false)}>{props.children}</div>
    </Tooltip>
  );
}
