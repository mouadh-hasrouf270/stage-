type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  id?: string;
};

export default function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Sélectionnez une option",
  required = false,
  id,
}: SelectFieldProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={selectId} className="block">
      <span className="mb-2.5 block text-[13px] font-medium text-ch2ma-muted">
        {label}
      </span>

      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="h-[56px] w-full border border-ch2ma-border bg-ch2ma-cream px-5 text-[15px] text-ch2ma-text outline-none transition focus:border-ch2ma-gold focus:ring-2 focus:ring-ch2ma-gold/20"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
