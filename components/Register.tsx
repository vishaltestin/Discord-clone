"use client"
import { useRouter } from "next/navigation";

const Register = () => {
    const containerStyle = {
        backgroundImage: "url('images/discordbg.png')",
    };
    const router = useRouter()
    return (
        <>
            <div className="bg-cover justify-center items-center hidden min-[484px]:flex" style={containerStyle}>
                <div className="flex login bg-[#313338] h-full w-[30rem] rounded-sm justify-between shadow-md">
                    <div className="left flex flex-col  w-[30rem] text-[#b5bac1]  items-center p-8">
                        <div className="top  relative -top-2">
                            <h1 className="text-center font-semibold text-[1.4rem] text-[#ebebeb]">Create an account</h1>
                        </div>
                        <div className="input w-full  relative -top-3">
                            <div className="mail space-y-2 my-3">
                                <label className="font-bold text-xs text-[11px]">EMAIL *</label>
                                <input className="w-full h-10 rounded-sm bg-[#1e1f22]" type="text" />
                            </div>
                            <div className="mail space-y-2 my-3">
                                <label className="font-bold text-xs text-[11px]">EMAIL *</label>
                                <input className="w-full h-10 rounded-sm bg-[#1e1f22]" type="text" />
                            </div>
                            <div className="mail space-y-2 my-3">
                                <label className="font-bold text-xs text-[11px]">EMAIL *</label>
                                <input className="w-full h-10 rounded-sm bg-[#1e1f22]" type="text" />
                            </div>
                            <div className="mail space-y-2 my-3">
                                <label className="font-bold text-xs text-[11px]">EMAIL *</label>
                                <input className="w-full h-10 rounded-sm bg-[#1e1f22]" type="text" />
                            </div>
                            <div className="pass space-y-2 my-2 w-full">
                                <label className="font-bold text-xs text-[11px]">DATE OF BIRTH *</label>
                                <div className="dob flex space-x-3 w-full">
                                    <div className="relative w-1/3">
                                        <select className="h-10 w-full rounded-sm bg-[#1e1f22] text-white">
                                            <option value="" disabled selected>Day</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>
                                    <div className="relative w-1/3">
                                        <select className="h-10 w-full rounded-sm bg-[#1e1f22] text-white">

                                            <option value="" disabled selected>Month</option>

                                            <option value="1">January</option>
                                            <option value="2">February</option>

                                        </select>
                                    </div>
                                    <div className="relative w-1/3">
                                        <select className="h-10 w-full rounded-sm bg-[#1e1f22] text-white">

                                            <option value="" disabled selected>Year</option>

                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="cntr mt-16">
                                    <input type="checkbox" id="cbx" className="hidden-xs-up" />
                                    <label htmlFor="cbx" className="cbx"></label>
                                </div>

                                <p className="text-[13px] text-[#0a90d3]">Forget your password?</p>
                            </div>
                            <button
                                className="h-11 w-full rounded-sm bg-[#5865f2] my-2 hover:bg-[#434ece] text-white font-semibold">Log
                                in</button>
                            <p className="text-[13px]">Need an account? <button className="text-[#0a90d3]" onClick={() => {
                            router.push('/login')
                        }}>Register</button></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden max-[484px]:flex justify-center bg-[#313338] h-[100vh]">
                <div className="left flex flex-col  w-[30rem] text-[#b5bac1]  items-center p-5">
                    <div className="top space-y-4 flex flex-col items-center">
                        <img className="h-6 w-32" src="/image/logo.png" alt="" />
                        <h1 className="text-center font-semibold text-[1.4rem] text-[#ebebeb]">Create an account</h1>
                    </div>
                    <div className="input w-full  relative -top-3">
                        <div className="mail space-y-2 my-3">
                            <label className="font-bold text-xs text-[11px]">EMAIL *</label>
                            <input className="w-full h-10 rounded-sm bg-[#1e1f22]" type="text" />
                        </div>
                        <div className="mail space-y-2 my-3">
                            <label className="font-bold text-xs text-[11px]">DISPLAY NAME *</label>
                            <input className="w-full h-10 rounded-sm bg-[#1e1f22]" type="text" />
                        </div>
                        <div className="mail space-y-2 my-3">
                            <label className="font-bold text-xs text-[11px]">USERNAME *</label>
                            <input className="w-full h-10 rounded-sm bg-[#1e1f22]" type="text" />
                        </div>
                        <div className="mail space-y-2 my-3">
                            <label className="font-bold text-xs text-[11px]">PASSWORD *</label>
                            <input className="w-full h-10 rounded-sm bg-[#1e1f22]" type="text" />
                        </div>
                        <div className="pass space-y-2 my-2 w-full">
                            <label className="font-bold text-xs text-[11px]">DATE OF BIRTH *</label>
                            <div className="dob flex space-x-3 w-full">
                                <div className="relative w-1/3">
                                    <select className="px-2 h-10 w-full rounded-sm bg-[#1e1f22] text-[#b5bac1]">

                                        <option value="" disabled selected>Day</option>

                                        <option value="1">1</option>
                                        <option value="2">2</option>

                                    </select>
                                </div>
                                <div className="relative w-1/3">
                                    <select className="px-2 h-10 w-full rounded-sm bg-[#1e1f22] text-[#b5bac1]">

                                        <option value="" disabled selected>Month</option>

                                        <option value="1">January</option>
                                        <option value="2">February</option>

                                    </select>
                                </div>
                                <div className="relative w-1/3">
                                    <select className="px-2 h-10 w-full rounded-sm bg-[#1e1f22] text-[#b5bac1]">

                                        <option value="" disabled selected>Year</option>

                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>

                                    </select>
                                </div>
                            </div>
                            <div className="cntr mt-16">
                                <input type="checkbox" id="cbx" className="hidden-xs-up" />
                                <label htmlFor="cbx" className="cbx"></label>
                            </div>

                            <p className="text-[13px] text-[#0a90d3]">Forget your password?</p>
                        </div>
                        <button className="h-11 w-full rounded-sm bg-[#5865f2] my-2 hover:bg-[#434ece] text-white font-semibold">Log
                            in</button>
                        <p className="text-[13px]">Need an account? <button className="text-[#0a90d3]" type="button" onClick={() => {
                            router.push('/login')
                        }}>Register</button></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;