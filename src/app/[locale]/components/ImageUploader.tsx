import { Web3Storage } from 'web3.storage'

export const ImageUploader = () => {
    function getAccessToken () {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'

    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    return process.env.WEB3STORAGE_TOKEN
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
        const client = makeStorageClient()
        if(!client) return
        const cid = await client.put(files)
        console.log('stored files with cid:', cid)
        return cid
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
            <input type='file' />
            <button onClick={uploadFiles}>Upload</button>
        </>
    )
}