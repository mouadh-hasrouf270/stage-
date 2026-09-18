import { useState } from "react";
import { initialBookingData } from "../features/appointments/types";
import type {
  BookingChange,
  BookingFormData,
  BookingStep,
} from "../features/appointments/types";
export default function useBookingForm() {
  const [step, setStep] = useState<BookingStep>(1);
  const [data, setData] = useState<BookingFormData>(initialBookingData);
  const update: BookingChange = (field, value) => {
    setData((current) => ({ ...current, [field]: value }));
  };
  const isStepValid = () => {
    if (step === 1) {
      return Boolean(data.consultationType && data.expertise);
    }
    if (step === 2) {
      return Boolean(data.date && data.time && data.method);
    }
    return Boolean(
      data.name &&
      data.email &&
      data.subject &&
      data.description.length >= 10 &&
      data.consent,
    );
  };
  const nextStep = () => {
    if (!isStepValid()) return;
    setStep((current) => Math.min(current + 1, 3) as BookingStep);
  };
  const previousStep = () => {
    setStep((current) => Math.max(current - 1, 1) as BookingStep);
  };
  const reset = () => {
    setStep(1);
    setData(initialBookingData);
  };
  return {
    step,
    data,
    update,
    nextStep,
    previousStep,
    isStepValid: isStepValid(),
    reset,
  };
}
