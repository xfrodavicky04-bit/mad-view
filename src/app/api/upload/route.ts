import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  // 1. Verify authentication
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const customWidth = formData.get("width") ? parseInt(formData.get("width") as string) : null;
    const customHeight = formData.get("height") ? parseInt(formData.get("height") as string) : null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 2. Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed." },
        { status: 400 }
      ) ;
    }

    // 3. Setup upload directory
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 4. Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const ext = path.extname(originalName) || ".jpg";
    const baseName = path.basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
    const filename = `${baseName}-${timestamp}${ext}`;
    const filePath = path.join(uploadDir, filename);

    // 5. Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;

    // 6. Save metadata to DB
    const media = await prisma.media.create({
      data: {
        filename,
        url: fileUrl,
        size: file.size,
        width: customWidth,
        height: customHeight,
      },
    });

    return NextResponse.json({
      success: true,
      url: fileUrl,
      media,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file." },
      { status: 500 }
    );
  }
}
