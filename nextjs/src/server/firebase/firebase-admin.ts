import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

// var serviceAccount = require("../../../peer-realtime-db-firebase-adminsdk-fbsvc-784211f66e.json");
var serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);

export let adminApp: App;
// Only initialize if not already initialized
if (getApps().length === 0) {
  adminApp = initializeApp({
    credential: cert(serviceAccount),
    databaseURL: process.env.FIREBASE_RT_DATABASE_URL,
  });
} else {
  adminApp = getApps()[0];
}

export const adminDb = getDatabase(adminApp);
