export default function Footer() {
  return (
    <footer className="bg-[#292a2b] text-white w-full mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Address */}
        <div>
          <div className="text-3xl font-bold mb-2">Sarkari Alert</div>
          <div className="mb-2">Sarkari Alert,<br />14, Civil Lines, Prayagraj,<br />Uttar Pradesh, India - 211001</div>
          <div className="flex items-center mt-2">
            <span className="mr-2">📧</span>
            <span className="font-semibold">teamsarkarialert@gmail.com</span>
          </div>
        </div>
        {/* Site Links */}
        <div>
          <div className="font-bold text-lg mb-2">Site Links</div>
          <div className="mb-1"><a href="#" className="hover:underline">About Us</a></div>
          <div><a href="#" className="hover:underline">Contact Us</a></div>
        </div>
        {/* Legal */}
        <div>
          <div className="font-bold text-lg mb-2">Legel</div>
          <div className="mb-1"><a href="#" className="hover:underline">Disclaimer</a></div>
          <div className="mb-1"><a href="#" className="hover:underline">Privacy Policy</a></div>
          <div><a href="#" className="hover:underline">Terms and Conditions</a></div>
        </div>
        {/* Follow Us */}
        <div>
          <div className="font-bold text-lg mb-2">Follow Us</div>
          <div className="mb-1"><a href="#" className="hover:underline">Facebook</a></div>
          <div className="mb-1"><a href="#" className="hover:underline">Twitter</a></div>
          <div className="mb-1"><a href="#" className="hover:underline">Telegram</a></div>
          <div><a href="#" className="hover:underline">Youtube</a></div>
        </div>
      </div>
      <div className="bg-[#232425] text-center py-4 text-gray-300 text-sm border-t border-[#232425]">
        Copyright © 2019-25 | Sarkari Alert
      </div>
    </footer>
  );
} 