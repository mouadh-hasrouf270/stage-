import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import DateField from "../../../components/forms/DateField";
import SelectField from "../../../components/forms/SelectField";

type StepScheduleProps = {
  date: string;
  time: string;
  mode: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onModeChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
};

const modes = [
  {
    value: "cabinet",
    label: "Au cabinet, Alger Centre",
  },
  {
    value: "visio",
    label: "Visioconférence sécurisée",
  },
  {
    value: "telephone",
    label: "Par téléphone",
  },
];

export default function StepSchedule({
  date,
  time,
  mode,
  onDateChange,
  onTimeChange,
  onModeChange,
  onBack,
  onNext,
}: StepScheduleProps) {
  const today = new Date().toISOString().split("T")[0];

  const canContinue = Boolean(date && time && mode);

  return (
    <div className="transition-all duration-300">
      {/* DATE + TIME */}
      <div className="mb-[26px] grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-x-[26px]">
        <div className="mb-[22px]">
          <DateField
            label="Date souhaitée"
            value={date}
            min={today}
            onChange={onDateChange}
            required
          />
        </div>

        <label className="mb-[22px] block">
          <span className="mb-2.5 block text-[11px] font-semibold text-[#28464d]">
            Heure souhaitée
          </span>

          <div className="relative flex items-center">
            <input
              type="time"
              value={time}
              onChange={(event) => onTimeChange(event.target.value)}
              className="w-full rounded-none border-0 border-b border-[#d7dcd6] bg-transparent px-0 py-2 pr-6 pb-[11px] text-xs text-[#1b3a42] outline-none transition-colors focus:border-[#a47a39]"
            />

            <Clock3
              size={15}
              className="pointer-events-none absolute right-0 text-[#748688]"
            />
          </div>
        </label>
      </div>

      {/* MODE */}
      <SelectField
        label="Mode d’échange"
        value={mode}
        onChange={onModeChange}
        options={modes}
        placeholder="Sélectionnez un mode"
        required
      />

      {/* ACTIONS */}
      <div className="mt-[30px] flex items-center justify-between border-t border-[#e0e2dd] pt-[18px]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-transparent px-0 py-2 text-[11px] font-semibold text-[#73878a] transition-colors hover:text-[#1b3a42]"
        >
          <ArrowLeft size={14} />
          Retour
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="inline-flex items-center gap-2 bg-[#8e9da0] px-[15px] py-3 text-[11px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#1b3a42] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:bg-[#8e9da0]"
        >
          Continuer
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
