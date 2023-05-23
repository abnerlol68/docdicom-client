export default function SelectField({
  id,
  label,
  extra,
  extraLabel,
  extraSelect,
  variant,
  name,
  val,
  change,
  options,
  disabled,
}) {
  return (
    <div className={`flex flex-col ${extra}`}>
      <label
        htmlFor={id}
        className={`text-base text-navy-700 dark:text-white mb-2 ${
          variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
        } ${extraLabel}`}
      >
        {label}
      </label>
      <select
        className={
          disabled
            ? "w-full max-w-xs rounded-xl border bg-gray-200 p-3 text-base outline-none"
            : `select select-bordered w-full max-w-xs rounded-xl border bg-white/0 p-3 text-base outline-none focus:border-indigo-500 dark:bg-navy-900 ${extraSelect}`
        }
        value={val}
        onChange={change}
        name={name}
        id={id}
        disabled={disabled}
      >
        <option disabled selected>
          {label}
        </option>
        {Object.entries(options).map(([altKey, altVal]) => (
          <option key={altKey} value={altKey}>
            {altVal}
          </option>
        ))}
      </select>
    </div>
  );
}
