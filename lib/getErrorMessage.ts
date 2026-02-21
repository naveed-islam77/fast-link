import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  if (!error) return null;

  if ("data" in error && typeof error.data === "object") {
    return (error.data as any)?.message ?? "An error occurred";
  }

  if ("message" in error) {
    return error.message;
  }

  return "An error occurred";
};