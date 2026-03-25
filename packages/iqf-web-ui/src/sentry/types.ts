export type SentryErrorBoundaryDataType = {
  /**
   * Example: "data-table", "data-form"
   */
  feature: string;

  /**
   * Example: { evidenceId: "USERS", itemId: "xxx-yyy-zzz" }
   */
  contexts?: Record<string, unknown>;
};
