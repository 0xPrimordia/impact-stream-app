'use client'
import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useForm, SubmitHandler } from "react-hook-form"
import { createStore, createLocalPersister } from 'tinybase';
import { CellView } from 'tinybase/ui-react';
//import { usePrivy } from 

const store = createStore()
//const {user} = usePrivy();

interface MilestoneProps {
    index:string
}

type Milestone = {
    title:string;
    budget:number;
}

type User = {
    id: string,
    givenName:string,
    familyName:string,
}

type Proposal = {
    title:string;
    author: User;
    collaborators:User[];
    description:string;
    milestones:Milestone[];
    timeline:string;
}

export default function WriteProposal() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Proposal>()
    const onSubmit: SubmitHandler<Proposal> = (data) => {
        let proposalhash = 'proposal-'+(Math.random() + 1).toString(36).substring(2);
        store.setRow("proposals", proposalhash, {
            title: data.title,
            //author: 
            //collaborators: data.collaborators,
            description: data.description,
            //milestones: data.milestones,
            timeline: data.title
        });
        const persister = createLocalPersister(store, "proposals");
        persister.save();
        console.log(localStorage.proposals)
    }
    const [rows, setRows] = useState([{key:'default'}]);
    const inputClasses = "w-full border border-slate-300 rounded h-10 pl-2 mb-6"

    function removeRow(index:string) {
        if(index !== 'default')
        setRows((current) =>
            current.filter((_) => _.key !== index)
        ); 
    }

    const MilestoneRow = ({index, ...props}:MilestoneProps) => {
        return(
            <div className='flex mb-2'>
                <input className="w-1/2 border border-slate-300 rounded h-10 pl-2 mb-2" placeholder="Title" />
                {index!=='default' && (
                    <input className="w-2/5 border border-slate-300 rounded h-10 pl-2 mb-2 ml-2" placeholder="Budget" />
                )}
                {index==='default' && (
                    <input className="w-1/2 border border-slate-300 rounded h-10 pl-2 mb-2 ml-2" placeholder="Budget" />
                )}
                {index!=='default' && (
                    <XMarkIcon onClick={() => removeRow(index)} className='h-6 ml-2 mt-2.5' />
                )}
            </div>
        )
    }

    function addRow() {
        const key = 'milestone-'+(rows.length+2)
        setRows([...rows, {key}]);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold mb-6">Grant Information</h3>
            <input className={inputClasses} placeholder="Title" {...register("title")} />
            <input className={inputClasses} placeholder="Add Collaborator" />
            <textarea className={inputClasses} placeholder="Description" {...register("description")} />
            <h3 className="font-bold mb-4">Milestones</h3>
            {rows.map((row, index) => (
                <MilestoneRow key={row.key} index={row.key} />
            ))}
            <p className='text-right underline mb-8 text-sky-600 mt-2' onClick={addRow}>Add Milestone</p>
            <input className={inputClasses} placeholder="Timeline" {...register("timeline")} />
            <button className="w-full border border-slate-400 rounded leading-10 font-bold" type="submit">Submit</button>
        </form>
    )
}