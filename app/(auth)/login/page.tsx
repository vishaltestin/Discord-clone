"use client"
import { useRouter } from "next/navigation";

const Login = () => {
    const containerStyle = {
        backgroundImage: "url('images/discordbg.png')",
    };
    const router = useRouter()
    return (
        <>
            <div className="hidden bg-cover min-[484px]:flex justify-center items-center h-screen" style={containerStyle}>
                <div className="login bg-[#313338] h-[408px] min-[836px]:w-[790px] rounded-md flex justify-between shadow-md">
                    <div className="left flex flex-col  w-[30rem] text-[#b5bac1]  items-center p-8">
                        <div className="top space-y-1">
                            <h1 className="text-center font-semibold text-[1.4rem] text-[#ebebeb]">Welcome back!</h1>
                            <p className="text-s">Were so excited to see you again</p>
                        </div>
                        <div className="input w-full">
                            <div className="mail space-y-2 my-3">
                                <label className="font-bold text-xs text-[11px]">EMAIL OR PHONE NUMBER *</label>
                                <input className="w-full h-10 rounded-sm bg-[#1e1f22]" type="text" />
                            </div>
                            <div className="pass space-y-2 my-2">
                                <label className="font-bold text-xs text-[11px]">PASSWORD *</label>
                                <input className="w-full h-10 rounded-sm bg-[#1e1f22]" type="text" />
                                <p className="text-[13px] text-[#0a90d3]">Forget your password?</p>
                            </div>
                            <button className="h-11 w-full rounded-sm bg-[#5865f2] my-2 hover:bg-[#434ece] text-white font-semibold">Log in</button>
                            <p className="text-[13px]">Need an account? <button className="text-[#0a90d3]" onClick={() => {
                            router.push('/register')
                        }}>Register</button></p>
                        </div>
                    </div>
                    <div className="hidden right h-full w-[19rem] min-[836px]:flex justify-center items-center flex-col">
                        <img className="h-[10.8rem] w-[10.8rem] rounded-[0.3rem] relative -top-4" src="images/qr2.jpg" alt="" />
                        <div className="last text-center relative -bottom-2 space-y-2">
                            <h2 className="font-semibold text-[#ebebeb] text-[1.5rem]">Log in with QR Code</h2>
                            <p className="w-64 text-center text text-[#b5bac1] leading-tight">Scan this with the <span className="font-semibold">Discord mobile app</span> to log in instantly</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden max-[484px]:flex justify-center bg-[#313338] h-[100vh]">
                <div className="left flex flex-col  w-[30rem] text-[#b5bac1]  items-center p-5">
                    <div className="top space-y-4 flex flex-col items-center">
                        <img className="h-6 w-32" src="images/logo.png" alt="" />
                        <h1 className="text-center font-bold text-[1.4rem] text-[#ebebeb]">Welcome back!</h1>
                    </div>
                    <div className="input w-full">
                        <div className="mail space-y-2 my-3">
                            <label className="font-bold text-xs text-[11px]">EMAIL OR PHONE NUMBER *</label>
                            <input className="w-full h-10 rounded-sm bg-[#1e1f22]" type="text" />
                        </div>
                        <div className="pass space-y-2 my-2">
                            <label className="font-bold text-xs text-[11px]">PASSWORD *</label>
                            <input className="w-full h-10 rounded-sm bg-[#1e1f22]" type="text" />
                            <p className="text-[13px] text-[#0a90d3]">Forget your password?</p>
                        </div>
                        <button className="h-11 w-full rounded-sm bg-[#5865f2] my-2 hover:bg-[#434ece] text-white font-semibold">Log in</button>
                        <p className="text-[13px]">Need an account? <button className="text-[#0a90d3]" type="button" onClick={() => {
                            router.push('/register')
                        }}>Register</button></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;