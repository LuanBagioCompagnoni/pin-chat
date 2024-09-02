export default function AuthInput({type, placeholder, value, onChange, onBlur}) {
  return (
    <div className="flex items-center border-b border-white py-2 w-full">
      <input
        className="appearance-none placeholder-gray-50 bg-transparent border-none w-full text-gray-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
    </div>
  );
}