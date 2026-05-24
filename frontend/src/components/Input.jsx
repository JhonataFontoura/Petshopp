export default function Input({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  min,
  step,
}) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className="form-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        step={step}
      />
    </div>
  );
}
