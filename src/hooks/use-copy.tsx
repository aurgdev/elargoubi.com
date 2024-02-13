"use client";

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Copy to clipboard failed:", error);
    return false;
  }
};

// Example usage
const handleCopyClick = async (text: string) => {
  const success = await copyToClipboard(text);

  if (success) {
    // Reset the copied state after 3 seconds (adjust as needed)
    setTimeout(() => {
      console.log("Copied!");
    }, 3000);
  }
};
