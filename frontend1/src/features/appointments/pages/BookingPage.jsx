import { useState } from "react";
import BookingStepper from "../components/BookingStepper";
import StepNeed from "../components/StepNeed";
import StepSchedule from "../components/StepSchedule";
import StepContact from "..//components/StepContact";
import useBookingForm from "../../../hooks/useBookingForm";

export default function BookingPage() {
  const [sent, setSent] = useState(false);
  const { step, data, update, nextStep, previousStep, reset } =
    useBookingForm();
  const handleSubmit = () => {
    setSent(true);
  };
  const handleNewBooking = () => {
    reset();
    setSent(false);
  };
  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#1b3a42] pt-20">
      {" "}
      <main id="top">
        {" "}
        <section
          id="booking"
          className="min-h-[560px] px-5 py-[50px] md:px-6 md:py-[72px]"
        >
          {" "}
          <div className="mx-auto w-full max-w-[720px]">
            {" "}
            {sent ? (
              /* SUCCESS */ <div className="border border-[#dfe2dc] bg-[#eef3ef] p-6 md:p-[54px_42px]">
                {" "}
                <span className="mb-[18px] block text-[8px] font-semibold uppercase tracking-[0.22em] text-[#bd914c]">
                  {" "}
                  Demande envoyée{" "}
                </span>{" "}
                <h2 className="mb-[18px] font-['Playfair_Display'] text-[36px] font-medium leading-[0.95] tracking-[-0.045em] text-[#173a43] md:text-[44px]">
                  {" "}
                  Merci pour votre confiance.{" "}
                </h2>{" "}
                <p className="mb-7 max-w-[390px] text-[13px] leading-[1.7] text-[#688187]">
                  {" "}
                  Votre demande a bien été prise en compte. Notre équipe vous
                  recontactera rapidement pour confirmer votre rendez-vous.{" "}
                </p>{" "}
                <button
                  type="button"
                  onClick={handleNewBooking}
                  className="inline-flex items-center gap-2 bg-[#8e9da0] px-[15px] py-3 text-[11px] font-semibold text-white transition-all hover:bg-[#1b3a42]"
                >
                  {" "}
                  Nouvelle demande{" "}
                </button>{" "}
              </div>
            ) : (
              <>
                {" "}
                {/* STEPPER */} <BookingStepper step={step} /> {/* STEP 1 */}{" "}
                {step === 1 && (
                  <StepNeed
                    consultationType={data.consultationType}
                    expertise={data.expertise}
                    onChange={update}
                    onNext={nextStep}
                  />
                )}{" "}
                {/* STEP 2 */}{" "}
                {step === 2 && (
                  <StepSchedule
                    date={data.date}
                    time={data.time}
                    method={data.method}
                    onChange={update}
                    onBack={previousStep}
                    onNext={nextStep}
                  />
                )}{" "}
                {/* STEP 3 */}{" "}
                {step === 3 && (
                  <StepContact
                    name={data.name}
                    email={data.email}
                    phone={data.phone}
                    subject={data.subject}
                    description={data.description}
                    opposingParty={data.opposingParty}
                    consent={data.consent}
                    onChange={update}
                    onBack={previousStep}
                    onSubmit={handleSubmit}
                  />
                )}{" "}
              </>
            )}{" "}
          </div>{" "}
        </section>{" "}
      </main>{" "}
    </div>
  );
}
