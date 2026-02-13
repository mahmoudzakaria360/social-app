export default function ProfileCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-72 bg-white rounded-2xl shadow-lg p-5 text-center font-sans">
        <img
          src="../../../public/vite.svg"
          alt="profile"
          className="w-28 h-28 rounded-full object-cover mx-auto mb-3"
        />

        <h2 className="text-xl font-semibold mb-2">Mahmoud Ali</h2>

        <div className="text-left text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-bold text-black">Date of Birth:</span> 12 Mar
            1985
          </p>
          <p>
            <span className="font-bold text-black">Location:</span> Cairo, Egypt
          </p>
          <p>
            <span className="font-bold text-black">Profession:</span> Civil
            Engineer
          </p>
        </div>
      </div>
    </div>
  );
}
