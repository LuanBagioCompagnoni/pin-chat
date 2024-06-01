import { darkPurple, lightPurple } from "@/styles/colors";

export default function genericButton({nameButton, className}){
    return(
        <button type="submit" className={`${className} text-white bg-${darkPurple} hover:bg-${lightPurple} font-medium rounded-3xl text-sm px-3 py-1`}>
            {nameButton}
        </button>
    )
}