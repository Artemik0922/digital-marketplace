import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const record = await prisma.downloadToken.findUnique({
    where: { token },
    include: { product: true },
  });

  if (!record) {
    return new NextResponse("Token not found", { status: 404 });
  }

  if (record.expiresAt < new Date()) {
    await prisma.downloadToken.delete({ where: { id: record.id } });
    return new NextResponse("Token expired", { status: 410 });
  }

  const fileUrl = `https://utfs.io/f/${record.product.fileKey}`;

  return NextResponse.redirect(fileUrl);
}
