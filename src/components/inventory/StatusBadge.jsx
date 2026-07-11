function StatusBadge({ status }) {
  const className = status
    .toLowerCase()
    .replace(/\s/g, "-");

  return (
    <span className={`inventory-status ${className}`}>
      {status}
    </span>
  );
}

export default StatusBadge;