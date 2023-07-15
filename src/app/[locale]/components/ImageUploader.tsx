"use client";
import React, { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { supabase } from "../../../../lib/supabase-client";
import { Web3Storage, CIDString, Web3File } from 'web3.storage';
import { storeImage } from "./ImageGallery";

export const ImageUploader = () => {
    const { user } = usePrivy();
    const [files, setFiles] = useState<CIDString>();
    const [storageClient, setStorageClient] = useState<Web3Storage>();
    const [storedFiles, setStoredFiles] = useState<Web3File>();

    function getAccessToken () {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'

    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    return process.env.NEXT_WEB3_STORAGE_TOKEN
    }

    useEffect(() => {
		setClient();
	}, []);

    function makeStorageClient () {
        const token = getAccessToken()
        console.log("token")
        console.log(token)
        if(token)
        return new Web3Storage({ token: token })
    }

    function getFiles () {
        const fileInput:any = document.querySelector('input[type="file"]')
        return fileInput?.files
    }

    async function setClient() {
        let client;
        try {
            client = await makeStorageClient()
        } catch (error) {
            console.log(error)
        }
        setStorageClient(client)
    }

    async function storeFiles (files:any) {
        if(storageClient) {
            //const cid = await storageClient.put(files)
            const Image = await storeImage(files, "avatar")
            // store CID in DB then display image 
            console.log('stored files with cid:', Image?.cid)
            setFiles(Image?.imageGatewayURL)
            try {
                const { error } = await supabase
                    .from("users")
                    .update({
                        profile_image_url: Image?.imageGatewayURL
                    })
                    .eq("id", user?.id);
                if (error) {
                    throw error;
                }
            } catch (error) {
                console.log(error);
            }
            return Image
        }
        
    }

    const uploadFiles = () => {
        const files = getFiles()
        try {
            storeFiles(files)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        {files && (
            <img src={files} />
        )}
        {!files && (
            <>
                <input className="text-sm italic mt-2" type='file' />
                <button className="border border-slate-400 rounded py-1 px-2 text-sm font-bold relative disabled:opacity-50 mt-4 mb-6" type='button' onClick={uploadFiles}>Upload</button>
            </>
        )}
        </>
    )
}