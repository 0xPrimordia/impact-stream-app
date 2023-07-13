"use client";


export default function BrowserCheck({ children }: React.ReactNode) {

var userAgent = navigator.userAgent;
var browserName, browserVersion;

if (userAgent.indexOf("Edge") > -1) {
  browserName = "Microsoft Edge";
  browserVersion = userAgent.substring(userAgent.indexOf("Edge") + 5).split(" ")[0];
  if (browserVersion < 10) {
    throw new Error("Unsupported browser version");
  }
} else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
  browserName = "Internet Explorer";
  browserVersion = userAgent.indexOf("MSIE") > -1 ? userAgent.substring(userAgent.indexOf("MSIE") + 5).split(";")[0] : userAgent.substring(userAgent.indexOf("rv:") + 3).split(")")[0];
  if (browserVersion < 11) {
    throw new Error("Unsupported browser version");
  }
} else if (userAgent.indexOf("Firefox") > -1) {
  browserName = "Mozilla Firefox";
  browserVersion = userAgent.split("Firefox/")[1];
  if (browserVersion < 60) {
    throw new Error("Unsupported browser version");
  }
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
    throw new Error("Unsupported browser version");
  }
} else {
  throw new Error("Unsupported browser");
}

console.log("Browser Name: " + browserName);
console.log("Browser Version: " + browserVersion);
	return <>
		{children}
	 </>;
}


