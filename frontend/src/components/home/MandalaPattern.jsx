function MandalaPattern({ className = "" }) {
  return (
    <div className={`mandala ${className}`}>
      <span className="circle c1"></span>
      <span className="circle c2"></span>
      <span className="circle c3"></span>
      <span className="line h1"></span>
      <span className="line v1"></span>
      <span className="dot d1"></span>
      <span className="dot d2"></span>
      <span className="dot d3"></span>
    </div>
  );
}

export default MandalaPattern;