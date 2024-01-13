import Logo from "../../../icons-images/logo-financial.svg";

export function FinancialImage() {
  const text = [
    "AMC Financial wurde entwickelt,",
    "um die Finanzverwaltung des Avegena Medical Center",
    "zu erleichtern."
  ];
  
  return (
    <div style={{ textAlign: "center" }}>
      <img src={Logo} alt="Imagem" />
      <br />
      <br />
      {text.map((line, index) => (
        <p
          key={index}
          style={{ fontSize: "18px", color: "#323232", textAlign: "center" }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
