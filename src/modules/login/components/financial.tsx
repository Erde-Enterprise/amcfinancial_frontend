import Logo from "../../../icons-images/logo-financial.svg";

export function FinancialImage() {
  const text = [
    "O AMC financial foi desenvolvido para",
    "facilitar a gestão financeira do",
    "Avegena Medical Center.",
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
