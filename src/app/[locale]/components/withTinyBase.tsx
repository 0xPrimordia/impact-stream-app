"use client";
import React from "react";
import { useStore, useCreatePersister } from "tinybase/ui-react";
import { usePrivy } from "@privy-io/react-auth";
import { createCustomPersister } from "tinybase";
import {
    createLocalPersister,
  } from "tinybase/persisters/persister-browser";

export interface WithTinyBaseProps {
    localUserPersister: any;
    remoteUserPersister: any;
    getPersisted: Function;
    setPersisted: Function;
}

const withTinyBase = (WrappedComponent:any) => {

    return (props: any) => {
        const { ready, authenticated, user } = usePrivy();
        let storeJson;
        const store = useStore();
        const getPersisted = async () => {
            if(user) {
                let jsonUser = JSON.stringify(user)
                return JSON.parse(jsonUser)
            }
        }

        const setPersisted = async (getContent:any) => {
            storeJson = JSON.stringify(getContent());
        }
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

        return (
            <WrappedComponent 
                {...props}
                localUserPersister={localUserPersister} 
                remoteUserPersister={remoteUserPersister} 
                getPersisted={getPersisted} 
                setPersisted={setPersisted} 
            />
        )
    }
}

export default withTinyBase 