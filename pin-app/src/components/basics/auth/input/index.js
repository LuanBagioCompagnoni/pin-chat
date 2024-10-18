export default function LineInput({className, inputClassName, type, placeholder, value, onChange, onBlur}) {
  return (
    <div className={`flex items-center border-b py-2 ${className}`}>
      <input
        className={`appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none ${inputClassName}`}
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