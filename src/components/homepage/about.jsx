export default function About() {
  return (
    <>
      <div className="flex flex-col h-[400px] py-10 pt-16 px-24 bg-white">
        <div className="font-bold text-[40px]">About</div>
        <div className="text-[16px] grid grid-cols-2 gap-16 mt-5">
          <div className="text-justify leading-7">
            Welcome to Guider.lk, your go-to platform for a seamless highway bus experience in Sri
            Lanka. We are committed to providing you with the essential information required to plan
            efficient and successful trips on public transport across the country. At Guider.lk, our
            vision is clear to offer exceptional transportation information to all passengers
            traveling in Sri Lanka.
          </div>
          <div className="text-justify leading-7">
            Our mission at Guider.lk is to be your trusted source for all your highway bus service
            needs in Sri Lanka. We're dedicated to providing accurate and timely information,
            ensuring your bus journeys are as smooth and stress-free as possible. Our commitment is
            to simplify your travel experience, making it easy for you to access the information you
            need for highway bus services.
          </div>
        </div>
      </div>
    </>
  );
}
