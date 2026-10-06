/**
 * Document APIs are not implemented on the backend yet.
 * Keep this module as the integration point so UI never calls invented URLs.
 */
export const documentApi = {
  unavailableReason:
    "Document storage, OCR, and AI analysis are not available on the server yet. Files you add here stay on this device only.",
};
