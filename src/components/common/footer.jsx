export default function Footer() {
  return (
    <footer className="bg-gray-800 mt-24 w-full">
      <div className="flex px-10 py-24">
        <div className="w-1/6">
          <img
            src="/images/logo.png"
            alt="Guider logo"
          />
        </div>
        <div className="w-5/6 grid grid-cols-4 text-white">
          <div className="flex flex-col gap-2">
            <div>Home</div>
            <div>Tracking</div>
            <div>News</div>
            <div>Complains and Inquiries</div>
            <div>About us</div>
          </div>

          <div className="flex flex-col gap-2">
            <div>FAQ</div>
            <div>T&C</div>
            <div>Privacy & Policy</div>
          </div>

          <div className="flex flex-col gap-2">
            <div>Contact us</div>
            <div>Email: guiderExpress@gmail.com</div>
            <div>Hotline: +94 71 234 5678</div>
            <div>Whatsapp: +94 71 234 5678</div>
          </div>

          <div className="flex flex-col gap-2">
            <div>Sri Lanka Transport BoardNo. 200,</div>
            <div>Kirula Road,</div>
            <div>Colombo 5.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
