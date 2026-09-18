type PhoneFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
};

export default function PhoneField({
  label,
  value,
  onChange,
  placeholder = "+213 5 XX XX XX XX",
  required = false,
  id = "phone",
}: PhoneFieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2.5 block text-[13px] font-medium text-ch2ma-muted">
        {label}
      </span>

      <input
        id={id}
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        inputMode="tel"
        autoComplete="tel"
        className="h-[56px] w-full border border-ch2ma-border bg-ch2ma-cream px-5 text-[15px] text-ch2ma-text outline-none transition placeholder:text-ch2ma-muted/50 focus:border-ch2ma-gold focus:ring-2 focus:ring-ch2ma-gold/20"
      />
    </label>
  );
}
