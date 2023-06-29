export default function Onboarding() {
    const inputClasses = "w-full border border-slate-300 rounded h-10 pl-2 mb-6"
    return (
        <form>
            <h3 className="font-bold mb-6">Complete Your Profile</h3>
            <input className={inputClasses} placeholder="Given Name" />
            <input className={inputClasses} placeholder="Family Name" />
            <input className={inputClasses} placeholder="Village / Neighborhood" />
            <input className={inputClasses} placeholder="Phone Number" />

            <p className="text-center text-xs italic mb-6">Your information will not be shared with the public and will only be used for identification purposes and to contact you if necessary.</p>
            <button className="w-full border border-slate-400 rounded leading-10 font-bold" type="submit">Submit</button>
        </form>
    )
}