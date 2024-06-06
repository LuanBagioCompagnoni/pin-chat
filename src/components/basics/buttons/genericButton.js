export default function genericButton({nameButton, className}){
    return(
        <button type="submit" className={` text-white bg-[#581c87] hover:bg-[#7e22ce] font-medium rounded-3xl text-sm px-3 ${className}`}>
            {nameButton}
        </button>
    )
}