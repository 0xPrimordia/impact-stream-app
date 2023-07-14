import { Web3Storage } from 'web3.storage';
import { useFormContext } from "react-hook-form";

export const ImageUploader = () => {
    const { register, formState: { errors } } = useFormContext();
    function getAccessToken () {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'

    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    return process.env.WEB3_STORAGE_TOKEN
    }

    function makeStorageClient () {
        const token = getAccessToken()
        if(token)
    return new Web3Storage({ token: token })
    }

    function getFiles () {
        const fileInput:any = document.querySelector('input[type="file"]')
        return fileInput?.files
    }

    async function storeFiles (files:any) {
        let client
        try {
            client = await makeStorageClient()
        } catch (error) {
            console.log(error)
        }
        if(client) {
            const cid = await client.put(files)
            // store CID in DB then display image 
            console.log('stored files with cid:', cid)
            return cid
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
            <input {...register("avatar")} className="text-sm italic mt-2" type='file' />
            <button className="border border-slate-400 rounded py-1 px-2 text-sm font-bold relative disabled:opacity-50 mt-4 mb-6" type='button' onClick={uploadFiles}>Upload</button>
        </>
    )
}