export default function serviceInfos(){
    const date = new Date()
    return(
        <div className="border-y-2 border-gray-50 text-gray-50 border-dashed my-5 w-full text-left space-y-2">
            <div className="m-2 space-y-2">
                <h1>Open service in {date.toLocaleString()}</h1>
                <h1>Total service time: 3 days</h1>
                <h1>Protocol: {Math.random()}</h1>
            </div>
        </div>
    )
}