import { FileText, Upload, X } from "lucide-react";

type FileUploadProps = {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  hint?: string;
};

export default function FileUpload({
  label,
  file,
  onChange,
  accept,
  hint = "PDF, JPG ou PNG",
}: FileUploadProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    onChange(selectedFile);
  };

  return (
    <div>
      <span className="mb-2.5 block text-[13px] font-medium text-ch2ma-muted">
        {label}
      </span>

      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-ch2ma-border bg-ch2ma-cream px-6 py-10 text-center transition hover:border-ch2ma-gold hover:bg-ch2ma-gold/5">
          <Upload className="mb-3 h-6 w-6 text-ch2ma-gold" />

          <span className="text-sm font-medium text-ch2ma-text">
            Cliquez pour importer un fichier
          </span>

          <span className="mt-1 text-xs text-ch2ma-muted">{hint}</span>

          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="flex items-center justify-between border border-ch2ma-border bg-ch2ma-cream px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <FileText className="h-5 w-5 shrink-0 text-ch2ma-gold" />

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ch2ma-text">
                {file.name}
              </p>

              <p className="text-xs text-ch2ma-muted">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onChange(null)}
            className="ml-4 shrink-0 text-ch2ma-muted transition hover:text-red-600"
            aria-label="Supprimer le fichier"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
