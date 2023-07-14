"use client";
import { useStore, useCreatePersister } from "tinybase/ui-react";
import { createCustomPersister } from "tinybase";
import { supabase } from "../../../../lib/supabase-client";
import {
    createLocalPersister,
  } from "tinybase/persisters/persister-browser";

export interface WithTinyBaseProps {
    localUsersPersister: any;
    remoteUsersPersister: any;
    
}

const withTinyBase = (WrappedComponent:any) => {
        // eslint-disable-next-line react/display-name
    return (props: any) => {
        let storeJson;
        const store = useStore();
        
	      // Remote persister functions
        const getPersistedUsers = async () => {
	       const { data, error } = await supabase.from("users").select("*");
	       if (error) {
	           throw error;
	       }
	      let result = {};
	       if (data) {
		       for (let i = 0; i < data.length; i++) {
					 const {id, ...userFields} = data[i];
					 result[id] = {...userFields};
					 
		       }
	       }
	      return JSON.stringify(result);
	     }

        const setPersistedUsers = async (getContent:any) => {
            storeJson = getContent();
						const usersTable = storeJson[0].users;
					  let usersArray = [];
					  for (const id in usersTable) {
						  const userFields = usersTable[id];
							const user = {
								 id,
								 ...userFields,
							}
							usersArray.push(user);
					  }
						const {error} = await supabase.from("users").upsert(usersArray);
						if (error) {
							throw error;
						}
        }
	      
				const getPersistedProposals = async () => {
				const { data, error } = await supabase.from("proposals").select("*");
				if (error) {
					throw error;
				}
				let result = {};
				if (data) {
					for (let i = 0; i < data.length; i++) {
						const {id, ...proposalFields} = data[i];
						result[id] = {...proposalFields};
					}
				}
				return JSON.stringify(result);
				}
				const setPersistedProposals = async (getContent:any) => {
					storeJson = getContent();
					const proposalsTable = storeJson[0].proposals;
					let proposalsArray = [];
					for (const id in proposalsTable) {
						const proposalFields = proposalsTable[id];
						const proposal = {
							 id,
							 ...proposalFields,
						}
						proposalsArray.push(proposal);
					}
					const {error} = await supabase.from("proposals").upsert(proposalsArray);
					if (error) {
						throw error;
					}
				}
				
				const getPersistedCollaborators = async () => {
				const { data, error } = await supabase.from("collaborators").select("*");
				if (error) {
					throw error;
				}
				let result = {};
				if (data) {
					for (let i = 0; i < data.length; i++) {
						const {id, ...collaboratorFields} = data[i];
						result[id] = {...collaboratorFields};
					}
				}
				return JSON.stringify(result);
				}
				const setPersistedCollaborators = async (getContent:any) => {
					storeJson = getContent();
					const collaboratorsTable = storeJson[0].collaborators;
					let collaboratorsArray = [];
					for (const id in collaboratorsTable) {
						const collaboratorFields = collaboratorsTable[id];
						const collaborator = {
							 id,
							 ...collaboratorFields,
						}
						collaboratorsArray.push(collaborator);
					}
					const {error} = await supabase.from("proposal_collaborators").upsert(collaboratorsArray);
					if (error) {
						throw error;
					}
				}
	      
	      //Persister Objects
        const localUsersPersister = useCreatePersister(store!, (store) => {
            return createLocalPersister(store, "users");
        });
        const localProposalsPersister = useCreatePersister(store!, (store) => {
            return createLocalPersister(store, "proposals");
        });

        const localCollaboratorsPersister = useCreatePersister(store!, (store) => {
            return createLocalPersister(store, "collaborators");
        });
	
        const remoteUsersPersister = useCreatePersister(store!, (store) => {
            return createCustomPersister(
                store, 
                getPersistedUsers, 
                setPersistedUsers, 
                (listener) => setInterval(listener, 1000),
                (listener: any) => clearInterval(listener)
            )
        })

        const remoteProposalsPersister = useCreatePersister(store!, (store) => {
            return createCustomPersister(
                store, 
                getPersistedProposals, 
                setPersistedProposals, 
                (listener) => setInterval(listener, 1000),
                (listener: any) => clearInterval(listener)
            )
        })

        const remoteCollaboratorsPersister = useCreatePersister(store!, (store) => {
            return createCustomPersister(
                store, 
                getPersistedCollaborators, 
                setPersistedCollaborators, 
                (listener) => setInterval(listener, 1000),
                (listener: any) => clearInterval(listener)
            )
        })

        return (
            <WrappedComponent 
                {...props}
                localUsersPersister={localUsersPersister} 
                remoteUsersPersister={remoteUsersPersister} 
            />
        )
    }
 }

export default withTinyBase 

