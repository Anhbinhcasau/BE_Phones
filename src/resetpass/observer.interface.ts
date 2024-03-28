
export interface Observer {
  updateSuccess(message: string): void;
  updateError(error: Error): void;
}
