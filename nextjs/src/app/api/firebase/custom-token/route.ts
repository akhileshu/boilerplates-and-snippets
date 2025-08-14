// pages/api/firebase/custom-token.ts
import { adminApp } from "@/server/firebase/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { email, userId } = body;

    if (!email || !userId) {
      return NextResponse.json(
        { error: "Missing email or userId" },
        { status: 400 }
      );
    }

    const firebaseAuth = getAuth(adminApp);

    let user;

    try {
      user = await firebaseAuth.getUserByEmail(email);

      // ⚠️ UID mismatch? Likely old account. Delete & recreate.
      if (user.uid !== userId) {
        await firebaseAuth.deleteUser(user.uid);
        user = await firebaseAuth.createUser({ uid: userId, email });
      }
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        user = await firebaseAuth.createUser({ uid: userId, email });
      } else {
        console.error("❌ Firebase lookup failed", err);
        return NextResponse.json({ error: "Firebase error" }, { status: 500 });
      }
    }

    const token = await firebaseAuth.createCustomToken(user.uid);
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error generating custom token:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
