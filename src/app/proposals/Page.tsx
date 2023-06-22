'use client'
import { MapPinIcon } from "@heroicons/react/24/outline"
import { useRouter } from 'next/navigation'

export default function Proposals() {
  const router = useRouter()
  const grants = [
    {
      id: 1,
      title: "Well Project",
      location: "Nammpoak, Togo",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      collaborators: ["John Doe", "Jane Doe"]
    },
    {
      id: 2,
      title: "Well Project",
      location: "Nammpoak, Togo",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      collaborators: ["John Doe", "Jane Doe"]
    },
    {
      id: 3,
      title: "Well Project",
      location: "Nammpoak, Togo",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      collaborators: ["John Doe", "Jane Doe"]
    },
    {
      id: 4,
      title: "Well Project",
      location: "Nammpoak, Togo",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      collaborators: ["John Doe", "Jane Doe"]
    }
  ]

  return (
    <div className="mb-20">
      <h3 className="font-bold mb-6">Proposed Grants</h3>
      {grants.map((grant) => (
        <div onClick={() => router.push(`/proposals/${grant.id}`)} className="mb-4">
          <h3 className="font-bold mb-1 text-lg">{grant.title}</h3>
          <div className="text-sm align-middle"><MapPinIcon className="h-4 inline-block" /> {grant.location}</div>
          <p className="text-sm mt-2 mb-1 leading-1">{grant.summary}</p>
          {grant.collaborators.map((user, index) => (
            <>
              {(index+1) === grant.collaborators.length && (
                <span className="text-sm"><a className="text-sky-600" href="#">{user}</a></span>
              )}
              {(index+1) !== grant.collaborators.length && (
                <span className="text-sm"><a className="text-sky-600" href="#">{user}</a>, </span>
              )}
            </>
          ))}
        </div>
      ))}
      <div className="fixed bottom-4 right-0 left-0 bg-white p-5 z-20">
        <button onClick={() => router.push("/proposals/write")} className="w-full border border-slate-400 rounded leading-10 font-bold">Write Proposal</button>
      </div>
    </div>
  )
}