import { useNavigate } from "react-router-dom";

function useDashboard() {
  const navigate = useNavigate();
  function goToAddInvoice() {
    navigate("/new-invoice/");
  }


  return { goToAddInvoice };
}

export default useDashboard;
