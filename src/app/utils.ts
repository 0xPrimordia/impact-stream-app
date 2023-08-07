export const shortenAddress: (arg0: string) => string = (address) => {
 if (!address) return "no address provided";
 const start = address.slice(0, 6);
 const end = address.slice(address.length - 4);
 return `${start}...${end}`;
};

export function truncate(str: string, n: number) {
 return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

export function isValidEmail(email: string) {
 // eslint-disable-next-line no-useless-escape
 return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
  email
 );
}
