import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import mammoth from "mammoth";
import * as XLSX from "xlsx";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "coach") {
    return NextResponse.json({ error: "Coaches only" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = "";

    if (fileName.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const lines: string[] = [];

      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });

        if (workbook.SheetNames.length > 1) {
          lines.push(`--- ${sheetName} ---`);
        }

        for (const row of data) {
          if (Array.isArray(row) && row.some((cell) => cell !== undefined && cell !== "")) {
            lines.push(row.filter((cell) => cell !== undefined && cell !== "").join(" | "));
          }
        }
        lines.push("");
      }

      extractedText = lines.join("\n");
    } else if (fileName.endsWith(".csv")) {
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });
      const lines: string[] = [];

      for (const row of data) {
        if (Array.isArray(row) && row.some((cell) => cell !== undefined && cell !== "")) {
          lines.push(row.filter((cell) => cell !== undefined && cell !== "").join(" | "));
        }
      }

      extractedText = lines.join("\n");
    } else if (fileName.endsWith(".txt")) {
      extractedText = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Use .docx, .xlsx, .csv, or .txt files." },
        { status: 400 }
      );
    }

    if (!extractedText.trim()) {
      return NextResponse.json({ error: "File appears to be empty" }, { status: 400 });
    }

    return NextResponse.json({
      text: extractedText.trim(),
      fileName: file.name,
      fileType: fileName.split(".").pop(),
    });
  } catch (error: any) {
    console.error("File parsing error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to parse file" },
      { status: 500 }
    );
  }
}
