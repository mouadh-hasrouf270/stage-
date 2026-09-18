type TextareaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  id?: string;
};

export default function TextareaField({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  rows = 5,
  id,
}: TextareaFieldProps) {
  const textareaId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={textareaId} className="block">
      <span className="mb-2.5 block text-[13px] font-medium text-ch2ma-muted">
        {label}
      </span>

      <textarea
        id={textareaId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full resize-none border border-ch2ma-border bg-ch2ma-cream px-5 py-4 text-[15px] text-ch2ma-text outline-none transition placeholder:text-ch2ma-muted/50 focus:border-ch2ma-gold focus:ring-2 focus:ring-ch2ma-gold/20"
      />
    </label>
  );
}
