import { MapPinIcon, UserCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline"

export default function Page({ params }: { params: { slug: string } }) {
  const grant = {
    id: 1,
    author: "Jane Doe",
    title: "Well Project",
    location: "Nammpoak, Togo",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    collaborators: ["John Doe", "Ted Doe"],
    milestones: [
      {
        id: 1,
        title: "Milestone 1 title",
        budget: 2000
      },
      {
        id: 2,
        title: "Milestone 2 title",
        budget: 3000
      },
      {
        id: 3,
        title: "Milestone 3 title",
        budget: 1000
      }
    ],
    budget: 6000
  }

  
  return(
    <div>
      <div className="font-bold mb-6"><a className="text-sky-600" href="/proposals">Proposed Grants</a> / {grant.title}</div>
      <div className="text-sm align-middle mb-4"><MapPinIcon className="h-4 inline-block" /> {grant.location}</div>
      <div className="text-sm mb-4"><UserCircleIcon className="h-4 inline-block" /> {grant.author}</div>
      <div>
        <span className="text-sm"><UserGroupIcon className="h-4 inline-block" /> </span>
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
          <p className="text-sm leading-1 mt-4">{grant.summary}</p>
          <p className="text-sm leading-1 mt-2">{grant.description}</p>
      </div>
      <h3 className="font-bold mt-6 mb-5">Milestones</h3>
      {grant.milestones.map((milestone) => (
        <div className="mt-3 mb-3">
          {milestone.title}: ${milestone.budget}
        </div>
      ))}
      <div className="italic mt-6">Total Budget: {grant.budget}</div>
    </div>
    
  )
}