import { MapPinIcon } from "@heroicons/react/24/outline"
export default function Proposals() {
  const grants = [
    {
      title: "Well Project",
      location: "Nammpoak, Togo",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      collaborators: ["John Doe", "Jane Doe"]
    },
    {
      title: "Well Project",
      location: "Nammpoak, Togo",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      collaborators: ["John Doe", "Jane Doe"]
    },
    {
      title: "Well Project",
      location: "Nammpoak, Togo",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      collaborators: ["John Doe", "Jane Doe"]
    },
    {
      title: "Well Project",
      location: "Nammpoak, Togo",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      collaborators: ["John Doe", "Jane Doe"]
    }
  ]
  return (
    <>
      <h3 className="font-bold mb-6">Proposed Grants</h3>
      {grants.map((grant) => (
        <div className="mb-4">
          <h3 className="font-bold mb-1 text-lg">{grant.title}</h3>
          <div className="text-sm align-middle"><MapPinIcon className="h-4 inline-block" /> {grant.location}</div>
          <p className="text-sm mt-2 mb-1 leading-1">{grant.summary}</p>
          {grant.collaborators.map((user, index) => (
            <>
              {(index+1) === grant.collaborators.length && (
                <span className="text-sm"><a href="#">{user}</a></span>
              )}
              {(index+1) !== grant.collaborators.length && (
                <span className="text-sm"><a href="#">{user}</a>, </span>
              )}
            </>
          ))}
        </div>
      ))}
      <div className="fixed bottom-4 right-0 left-0 bg-white p-5">
        <button className="w-full border border-slate-400 rounded leading-10 font-bold" type="submit">Write Proposal</button>
      </div>
    </>
  )
}