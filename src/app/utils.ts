export const shortenAddress: (arg0: string) => string = (address) => {
    if(!address) return "no address provided"
    const start = address.slice(0, 6)
    const end = address.slice(address.length - 4)
    return `${start}...${end}`
}

export function truncate(str:string, n:number){
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
};