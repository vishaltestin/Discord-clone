"use client"
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from "axios";

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    displayName: z.string().min(3, { message: "Display name must be at least 3 characters" }).max(30, { message: "Display name must be at most 30 characters" }),
    username: z.string().min(3, { message: "Username must be at least 3 characters" }).max(20, { message: "Username must be at most 20 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    day: z.string(),
    month: z.string(),
    year: z.string(),
});

const Register = () => {
    const { handleSubmit, reset, register, control, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });
    const containerStyle = {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        try {
            await axios.post("/api/auth/register", data);
            reset()
            router.push('/login');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };
    const router = useRouter()
    return (
        <div style={containerStyle}>
            <div className="bg-cover justify-center items-center hidden min-[484px]:flex">
                <div className="flex login bg-[#313338] h-full w-[30rem] rounded-sm justify-between shadow-md">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="left flex flex-col w-[30rem] text-[#b5bac1] items-center p-8">
                            <div className="top relative -top-2">
                                <h1 className="text-center font-semibold text-[1.4rem] text-[#ebebeb]">Create an account</h1>
                            </div>

                            <div className="input w-full relative -top-3">
                                <div className="mail space-y-2 my-3">
                                    <label className="font-bold text-xs text-[11px]">EMAIL *</label>
                                    <input
                                        {...register("email")}
                                        className="w-full h-10 rounded-sm bg-[#1e1f22] pl-2"
                                        type="email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{
                                            Array.isArray(errors.email.message)
                                                ? errors.email.message[0]
                                                : errors.email.message || 'Validation error'}</p>

                                    )}
                                </div>

                                <div className="mail space-y-2 my-3">
                                    <label className="font-bold text-xs text-[11px]">DISPLAY NAME *</label>
                                    <input
                                        {...register("displayName")}
                                        className="w-full h-10 rounded-sm bg-[#1e1f22] pl-2"
                                        type="text"
                                    />
                                    {errors.displayName && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {Array.isArray(errors.displayName.message)
                                                ? errors.displayName.message[0]
                                                : errors.displayName.message || 'Validation error'}
                                        </p>
                                    )}
                                </div>

                                <div className="mail space-y-2 my-3">
                                    <label className="font-bold text-xs text-[11px]">USERNAME *</label>
                                    <input
                                        {...register("username")}
                                        className="w-full h-10 rounded-sm bg-[#1e1f22] pl-2"
                                        type="text"
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {Array.isArray(errors.username.message)
                                                ? errors.username.message[0]
                                                : errors.username.message || 'Validation error'}
                                        </p>
                                    )}
                                </div>

                                <div className="mail space-y-2 my-3">
                                    <label className="font-bold text-xs text-[11px]">PASSWORD *</label>
                                    <input
                                        {...register("password")}
                                        className="w-full h-10 rounded-sm bg-[#1e1f22] pl-2"
                                        type="password"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {Array.isArray(errors.password.message)
                                                ? errors.password.message[0]
                                                : errors.password.message || 'Validation error'}
                                        </p>
                                    )}
                                </div>

                                <div className="pass space-y-2 my-2 w-full">
                                    <label className="font-bold text-xs text-[11px]">DATE OF BIRTH *</label>
                                    <div className="dob flex space-x-3 w-full">
                                        <div className="relative w-1/3">
                                            <label className="sr-only">Day</label>
                                            <select
                                                {...register("day")}
                                                className="h-10 w-full rounded bg-[#1e1f22] text-[#899098] pl-4"
                                                defaultValue={1}
                                            >
                                                <option value="" disabled>Day</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                            {errors.day && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {Array.isArray(errors.day.message)
                                                        ? errors.day.message[0]
                                                        : errors.day.message || 'Validation error'}
                                                </p>
                                            )}
                                        </div>

                                        <div className="relative w-1/3">
                                            <label className="sr-only">Month</label>
                                            <select
                                                {...register("month")}
                                                className="h-10 w-full rounded bg-[#1e1f22] text-[#899098] pl-4"
                                                defaultValue={'January'}
                                            >
                                                <option value="" disabled>Month</option>
                                                <option value="January">January</option>
                                                <option value="February">February</option>
                                            </select>
                                            {errors.month && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {Array.isArray(errors.month.message)
                                                        ? errors.month.message[0]
                                                        : errors.month.message || 'Validation error'}
                                                </p>
                                            )}
                                        </div>

                                        <div className="relative w-1/3">
                                            <label className="sr-only">Year</label>
                                            <select
                                                {...register("year")}
                                                className="h-10 w-full rounded bg-[#1e1f22] text-[#899098] pl-4"
                                                defaultValue={2020}
                                            >
                                                <option value="" disabled>Year</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                            </select>
                                            {errors.year && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {Array.isArray(errors.year.message)
                                                        ? errors.year.message[0]
                                                        : errors.year.message || 'Validation error'}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-1 items-center">
                                        <div className="cntr">
                                            <input type="checkbox" id="cbx" className="hidden-xs-up" />
                                            <label htmlFor="cbx" className="cbx"></label>
                                        </div>
                                        <p className="text-[13px] text-[#899098]">
                                            (Optional) It’s okay to send me emails with Discord updates, tips, and special offers. You can opt out at any time.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="h-11 w-full rounded-sm bg-[#5865f2] my-2 hover:bg-[#434ece] text-white font-semibold"
                                >
                                    Continue
                                </button>

                                <p className="text-[13px]">
                                    Already Have an account?{' '}
                                    <button
                                        className="text-[#0a90d3]"
                                        onClick={() => {
                                            router.push('/login');
                                        }}
                                    >
                                        Login
                                    </button>
                                </p>
                            </div>
                        </div>
                    </form>
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

                                        <option value="" disabled>Day</option>

                                        <option value="1">1</option>
                                        <option value="2">2</option>

                                    </select>
                                </div>
                                <div className="relative w-1/3">
                                    <select className="px-2 h-10 w-full rounded-sm bg-[#1e1f22] text-[#b5bac1]">

                                        <option value="" disabled>Month</option>

                                        <option value="1">January</option>
                                        <option value="2">February</option>

                                    </select>
                                </div>
                                <div className="relative w-1/3">
                                    <select className="px-2 h-10 w-full rounded-sm bg-[#1e1f22] text-[#b5bac1]">

                                        <option value="" disabled>Year</option>

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
                        <p className="text-[13px]">Need an account?
                            <button className="text-[#0a90d3]" type="button" onClick={() => {
                                router.push('/login')
                            }}>Register</button></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;