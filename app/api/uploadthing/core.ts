import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromtoken";

const f = createUploadthing();

const authMiddleware = (opts: { req: NextRequest }) => {
  try {
    const userId = getDataFromToken(opts.req);
    if (!userId) throw new Error("Unauthorized");
    return { userId: userId };
  } catch (error) {
    throw new UploadThingError("Authentication failed");
  }
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authMiddleware)
    .onUploadComplete(() => { }),
  messageFile: f(["image", "pdf"])
    .middleware(authMiddleware)
    .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
