export default function WriteProposal() {
    const inputClasses = "w-full border border-slate-300 rounded h-10 pl-2 mb-6"
    return (
        <form>
            <h3 className="font-bold mb-6">Grant Information</h3>
            <input className={inputClasses} placeholder="Title" />
            <input className={inputClasses} placeholder="Add Collaborator" />
            <textarea className={inputClasses} placeholder="Description" />

            <input className={inputClasses} placeholder="Timeline" />
            <button className="w-full border border-slate-400 rounded leading-10 font-bold" type="submit">Submit</button>
        </form>
    )
}