"use client";


export default function BrowserCheck({ children }: React.ReactNode) {

var userAgent = navigator.userAgent;
var browserName, browserVersion;

} else if (userAgent.indexOf("Chrome") > -1) {
  browserName = "Google Chrome";
  browserVersion = userAgent.split("Chrome/")[1].split(" ")[0];
  if (browserVersion < 103) {
    throw new Error("Unsupported browser version. Please use Chrome 103 or higher.");
  }
} else if (userAgent.indexOf("Safari") > -1) {
  browserName = "Safari";
  browserVersion = userAgent.split("Version/")[1].split(" ")[0];
  if (browserVersion < 12) {
    throw new Error("Unsupported browser version. Please use Safari 12 or higher.");
  }
} else {
  throw new Error("Unsupported browser. Please use modern versions of Chrome or Safari.");
}

console.log("Browser Name: " + browserName);
console.log("Browser Version: " + browserVersion);
	return <>
		{children}
	 </>;
}


