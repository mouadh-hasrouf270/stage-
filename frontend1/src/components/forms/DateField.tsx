type DateFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  min?: string;
  max?: string;
  id?: string;
};

export default function DateField({
  label,
  value,
  onChange,
  required = false,
  min,
  max,
  id = "date",
}: DateFieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2.5 block text-[13px] font-medium text-ch2ma-muted">
        {label}
      </span>

      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        min={min}
        max={max}
        className="h-[56px] w-full border border-ch2ma-border bg-ch2ma-cream px-5 text-[15px] text-ch2ma-text outline-none transition focus:border-ch2ma-gold focus:ring-2 focus:ring-ch2ma-gold/20"
      />
    </label>
  );
}
