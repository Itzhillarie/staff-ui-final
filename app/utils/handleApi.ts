declare function showErrorToast(title: string, message: string): void;

interface ApiError {
  message?: string;
  detail?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export function handleApiError(error: unknown): never {
  console.error(error);

  // Network errors
  if (error instanceof TypeError) {
    showErrorToast(
      "Network Error",
      "Please check your internet connection and try again."
    );

    throw error;
  }

  // Custom API errors
  if (typeof error === "object" && error !== null) {
    const apiError = error as ApiError;

    if (apiError.detail) {
      showErrorToast("Request Failed", apiError.detail);
      throw error;
    }

    if (apiError.message) {
      showErrorToast("Request Failed", apiError.message);
      throw error;
    }

    if (apiError.error) {
      showErrorToast("Request Failed", apiError.error);
      throw error;
    }

    if (apiError.errors) {
      const firstKey = Object.keys(apiError.errors)[0];

      if (firstKey) {
        showErrorToast(
          firstKey,
          apiError.errors[firstKey].join(", ")
        );

        throw error;
      }
    }
  }

  showErrorToast(
    "Unexpected Error",
    "Something went wrong. Please try again."
  );

  throw error;
}