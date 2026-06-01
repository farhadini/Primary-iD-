import { NextResponse } from "next/server";
import { SignJWT, importPKCS8 } from "jose";

// Google Sheets API integration using Service Account with JWT
// Requires: GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY

async function getAccessToken(email: string, privateKey: string): Promise<string> {
  const key = await importPKCS8(privateKey, "RS256");
  
  const now = Math.floor(Date.now() / 1000);
  const jwt = await new SignJWT({
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .sign(key);

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user, answers, scores, completedDims, overallScore } = body;

    // Prepare row data
    const timestamp = new Date().toISOString();
    const values = [
      timestamp,
      user?.name || "",
      user?.email || "",
      overallScore ?? "",
      scores?.oral ?? "",
      scores?.sleep ?? "",
      scores?.nutrition ?? "",
      scores?.genetics ?? "",
      scores?.airway ?? "",
      completedDims?.join(", ") || "",
    ];

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!sheetId || !serviceEmail || !privateKey) {
      console.log("[v0] Google Sheets not configured, data:", values);
      return NextResponse.json({
        success: true,
        message: "Assessment recorded (Google Sheets not configured)",
      });
    }

    // Get access token using JWT
    const accessToken = await getAccessToken(serviceEmail, privateKey);

    // Append row to Google Sheet
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:J:append?valueInputOption=USER_ENTERED`;
    
    const response = await fetch(appendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [values],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[v0] Google Sheets API error:", error);
      throw new Error("Failed to append to sheet");
    }

    return NextResponse.json({
      success: true,
      message: "Assessment submitted to Google Sheets",
    });
  } catch (error) {
    console.error("[v0] Error submitting assessment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit assessment" },
      { status: 500 }
    );
  }
}
