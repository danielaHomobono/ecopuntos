export default function InputField({ label, type = "text", value, onChange, required = true }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2744] focus:border-transparent transition"
      />
    </div>
  );
}
