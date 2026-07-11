function Button({ label, variant = "primary" }) {
  return <button className={`app-btn ${variant}`}>{label}</button>;
}

export default Button;