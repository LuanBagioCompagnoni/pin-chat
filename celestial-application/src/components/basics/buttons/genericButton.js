export default function genericButton({nameButton, className}){
  return(
    <button type="submit" className={`font-medium rounded-3xl text-sm px-3 ${className}`}>
      {nameButton}
    </button>
  );
}