export default function Welcome({ className }) {
    return (
        <div className={`${className} flex flex-col bg-[#ffffff] justify-center h-screen overflow-hidden`}>
            <h1 className="sm:text-7xl text-5xl font-extrabold text-center mt-15 text-[#ef7d00]"><b>Bem vindo!</b></h1>
            <img
                src="/welcome.png"
                alt=""
                className="max-w-full max-h-[80vh] object-contain"
            />
        </div>
    );
}
