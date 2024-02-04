import Image from "next/image";

const Loader = () => {
    return (
        <div className="h-screen w-screen bg-[#313338] grid place-items-center">
            <Image src='/images/Loader.gif' alt='Loading spinner' width={100} height={100} />
        </div>
    );
}

export default Loader;