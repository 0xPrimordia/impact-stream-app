"use strict";

const { clearTableData, writeTableData } = require("./lib/db.js");

// Workbox RuntimeCaching config: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.RuntimeCachingEntry
module.exports = [
 {
  urlPattern: /\.next\/static\/.*\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
  handler: "StaleWhileRevalidate",
  options: {
   cacheName: "static-font-assets",
   expiration: {
    maxEntries: 4,
    maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
   },
  },
 },
 {
  urlPattern: /\.next\/static\/.*\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  handler: "StaleWhileRevalidate",
  options: {
   cacheName: "static-image-assets",
   expiration: {
    maxEntries: 64,
    maxAgeSeconds: 24 * 60 * 60, // 24 hours
   },
  },
 },
 {
  urlPattern: /\.next\/static\/.*\.(?:mp3|wav|ogg)$/i,
  handler: "CacheFirst",
  options: {
   rangeRequests: true,
   cacheName: "static-audio-assets",
   expiration: {
    maxEntries: 32,
    maxAgeSeconds: 24 * 60 * 60, // 24 hours
   },
  },
 },
 {
  urlPattern: /\.next\/static\/.*\.(?:mp4)$/i,
  handler: "CacheFirst",
  options: {
   rangeRequests: true,
   cacheName: "static-video-assets",
   expiration: {
    maxEntries: 32,
    maxAgeSeconds: 24 * 60 * 60, // 24 hours
   },
  },
 },
 {
  urlPattern: /\.next\/static\/.*\.(?:js)$/i,
  handler: "StaleWhileRevalidate",
  options: {
   cacheName: "static-js-assets",
   expiration: {
    maxEntries: 32,
    maxAgeSeconds: 24 * 60 * 60, // 24 hours
   },
  },
 },
 {
  urlPattern: /\.next\/static\/.*\.(?:css|less)$/i,
  handler: "StaleWhileRevalidate",
  options: {
   cacheName: "static-style-assets",
   expiration: {
    maxEntries: 32,
    maxAgeSeconds: 24 * 60 * 60, // 24 hours
   },
  },
 },
 // Supabase single proposal request
 // Supabase all proposals requst
 // Supabase all users request
 {
  urlPattern: `https://dszdioldqhzlbqutsjyp.supabase.co/rest/v1//users`,
  handler: async (args) => {
   const response = await fetch(args.event.request);
   const clonedResponse = response.clone();
   await clearTableData("users");
   const result = await clonedResponse.json();
   await writeTableData("users", result);
   console.log("hello from users sw route");
   return response;
  },
 },
 {
  urlPattern: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/get_proposal_with_collaborators`,
  handler: async (args) => {
   const response = await fetch(args.event.request);
   const clonedResponse = response.clone();
   await clearTableData("proposals");
   const result = await clonedResponse.json();
   // await writeTableData("proposals", result);
   console.log(result);
   return response;
  },
 },
 {
  urlPattern: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/get_proposals_with_collaborators`,
  handler: async (args) => { },
 },
 // {
 //   urlPattern: ({ url }) => {
 //     if (self.origin !== url.origin) {
 //       return false;
 //     }
 //
 //     if (
 //       url.pathname.startsWith("/_next/data/") &&
 //       url.pathname.indexOf(".json") !== -1
 //     ) {
 //       return true;
 //     }
 //
 //     return false;
 //   },
 //   handler: "StaleWhileRevalidate",
 //   options: {
 //     cacheName: "next-data",
 //     expiration: {
 //       maxEntries: 32,
 //       maxAgeSeconds: 24 * 60 * 60, // 24 hours
 //     },
 //     plugins: [
 //       {
 //         cacheWillUpdate: async ({ request, response }) => {
 //           if (
 //             request.headers.get("x-middleware-prefetch") ||
 //             response.headers.get("x-middleware-skip")
 //           )
 //             return null;
 //           if (response.status === 200) {
 //             return response;
 //           }
 //           return null;
 //         },
 //       },
 //       {
 //         cachedResponseWillBeUsed: async ({
 //           cacheName,
 //           request,
 //           matchOptions,
 //           cachedResponse,
 //           event,
 //         }) => {
 //           if (
 //             cachedResponse &&
 //             cachedResponse.headers.get("x-middleware-skip")
 //           )
 //             return null;
 //           return cachedResponse;
 //         },
 //       },
 //     ],
 //   },
 // },
 // {
 //   urlPattern: /\.(?:json|xml|csv)$/i,
 //   handler: "NetworkFirst",
 //   options: {
 //     cacheName: "static-data-assets",
 //     expiration: {
 //       maxEntries: 32,
 //       maxAgeSeconds: 24 * 60 * 60, // 24 hours
 //     },
 //   },
 // },
 // {
 //   urlPattern: ({ url }) => {
 //     const isSameOrigin = self.origin === url.origin;
 //     if (!isSameOrigin) return false;
 //     const pathname = url.pathname;
 //     // Exclude /api/auth/callback/* to fix OAuth workflow in Safari without impact other environment
 //     // Above route is default for next-auth, you may need to change it if your OAuth workflow has a different callback route
 //     // Issue: https://github.com/shadowwalker/next-pwa/issues/131#issuecomment-821894809
 //     if (pathname.startsWith("/api/auth/callback/")) return false;
 //     if (pathname.startsWith("/api/")) return true;
 //     return false;
 //   },
 //   handler: "NetworkFirst",
 //   method: "GET",
 //   options: {
 //     cacheName: "apis",
 //     expiration: {
 //       maxEntries: 16,
 //       maxAgeSeconds: 24 * 60 * 60, // 24 hours
 //     },
 //     networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
 //   },
 // },
 // {
 //   urlPattern: ({ url }) => {
 //     const isSameOrigin = self.origin === url.origin;
 //     if (!isSameOrigin) return false;
 //     const pathname = url.pathname;
 //     if (pathname.startsWith("/api/")) return false;
 //     return true;
 //   },
 //   handler: "NetworkFirst",
 //   options: {
 //     cacheName: "others",
 //     expiration: {
 //       maxEntries: 32,
 //       maxAgeSeconds: 24 * 60 * 60, // 24 hours
 //     },
 //     networkTimeoutSeconds: 10,
 //   },
 // },
 // {
 //   urlPattern: ({ url }) => {
 //     const isSameOrigin = self.origin === url.origin;
 //     return !isSameOrigin;
 //   },
 //   handler: "NetworkFirst",
 //   options: {
 //     cacheName: "cross-origin",
 //     expiration: {
 //       maxEntries: 32,
 //       maxAgeSeconds: 60 * 60, // 1 hour
 //     },
 //     networkTimeoutSeconds: 10,
 //   },
 // },
];
