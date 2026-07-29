import { createUploadthing, type FileRouter } from "uploadthing/next";
import { generateUploadButton } from "@uploadthing/react";
import { auth } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(({ metadata }) => ({ uploadedBy: metadata.userId })),

  productFile: f({
    "application/zip": { maxFileSize: "128MB", maxFileCount: 1 },
    "application/pdf": { maxFileSize: "128MB", maxFileCount: 1 },
    "application/x-tar": { maxFileSize: "128MB", maxFileCount: 1 },
    "application/gzip": { maxFileSize: "128MB", maxFileCount: 1 },
    "application/x-7z-compressed": { maxFileSize: "128MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(({ metadata }) => ({ uploadedBy: metadata.userId })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const UploadButton = generateUploadButton<OurFileRouter>();
