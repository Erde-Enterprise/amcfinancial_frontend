import { ReactNode } from "react";
import CustomTooltip from "../custom-tooltip/Custom-Tooltip";

interface CustomGridCellProps {
    children: ReactNode;
    title?: string;
  }
  const CustomGridCell = (props: CustomGridCellProps) => {
    return (
      <td>
        <CustomTooltip title={props.title}>
          <span>{props.children}</span>
        </CustomTooltip>
      </td>
    );
  };
  
  export default CustomGridCell;