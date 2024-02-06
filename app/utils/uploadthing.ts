import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react";
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<typeof ourFileRouter>();
export const UploadButton = generateUploadButton<typeof ourFileRouter>();
export const UploadDropzone = generateUploadDropzone<typeof ourFileRouter>();
