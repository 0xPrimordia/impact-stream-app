import { useStore, useCreatePersister } from "tinybase/ui-react";
import { usePrivy } from "@privy-io/react-auth";
import { createCustomPersister } from "tinybase";
import {
    createLocalPersister,
  } from "tinybase/persisters/persister-browser";

let withTinyBase = (WrappedComponent: any) => {
    const { user } = usePrivy();
    let storeJson;
    const store = useStore();
    const localUserPersister = useCreatePersister(store!, (store) => {
        return createLocalPersister(store, "users");
    });
    const remoteUserPersister = useCreatePersister(store!, (store) => {
        return createCustomPersister(
            store, 
            getPersisted, 
            setPersisted, 
            (listener) => setInterval(listener, 1000),
            (listener: any) => clearInterval(listener)
        )
    })

    const getPersisted = async () => {
        if(user) {
            let jsonUser = JSON.stringify(user)
            return JSON.parse(jsonUser)
        }
    }

    const setPersisted = async (getContent:any) => {
        storeJson = JSON.stringify(getContent());
    }

    return (props: any) => {

        return (
            <WrappedComponent localUserPersister={localUserPersister} remoteUserPersister={remoteUserPersister} getPersisted={getPersisted} setPersisted={setPersisted} />
        )
    }
}

export { withTinyBase }