export default function SelectField({
  id,
  label,
  extra,
  variant,
  name,
  val,
  change,
  options,
}) {
  return (
    <div className={`${extra}`}>
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ${
          variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
        }`}
      >
        {label}
      </label>
      <br />
      <select
        className="select select-bordered w-full max-w-xs rounded-xl border bg-white/0 p-3 outline-none dark:bg-navy-900"
        value={val}
        onChange={change}
        name={name}
        id={id}
      >
        <option disabled selected>
          {label}
        </option>
        {Object.entries(options).map(([altKey, altVal]) => (
          <option key={altKey} value={altKey}>{altVal}</option>
        ))}
      </select>
    </div>
  );
}
