import ComplainsForm from "@/components/complains/form";

export default function ComplainsContent() {
  return (
    <>
      <div className="w-full p-24">
        <div className="text-justify leading-7">
          At Guider.lk, we're here to listen to you. If you have questions, concerns, or feedback
          about our bus services, please reach out. Your input is invaluable and helps us enhance
          your highway bus experience.
        </div>

        <div className="text-justify leading-7 mt-5">
          Thank you for choosing Guider.lk as your highway bus system companion. Your feedback is
          essential to our commitment to providing you with top-notch service.
        </div>

        <ComplainsForm />
      </div>
    </>
  );
}
