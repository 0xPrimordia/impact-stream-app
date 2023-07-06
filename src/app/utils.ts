export const shortenAddress: (arg0: string) => string = (address) => {
    if(!address) return "no address provided"
    const start = address.slice(0, 6)
    const end = address.slice(address.length - 4)
    return `${start}...${end}`
}
