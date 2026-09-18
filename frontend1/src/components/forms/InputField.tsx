type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number";
  required?: boolean;
  id?: string;
  disabled?: boolean;
};

export default function InputField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  id,
  disabled = false,
}: InputFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={inputId} className="block">
      <span className="mb-2.5 block text-[13px] font-medium text-ch2ma-muted">
        {label}
      </span>

      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="h-[56px] w-full border border-ch2ma-border bg-ch2ma-cream px-5 text-[15px] text-ch2ma-text outline-none transition placeholder:text-ch2ma-muted/50 focus:border-ch2ma-gold focus:ring-2 focus:ring-ch2ma-gold/20 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </label>
  );
}
