export default function genericButton({nameButton, className}){
    return(
        <button type="submit" className={`${className} text-white bg-purple-900 hover:bg-purple-700 font-medium rounded-3xl text-sm px-3 py-1`}>
            {nameButton}
        </button>
    )
}