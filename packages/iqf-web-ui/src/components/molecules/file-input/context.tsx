import { createContext, useContext } from "react";

type FileInputContextType = {
  /**
   * Input element's id. Can be used for `label` element, that can trigger
   * browser's file picker.
   */
  id: string;

  /**
   * Click handler, that triggers browser's file picker. After file selection,
   * `onChange` handler on `FileInput` component is called.
   */
  onClick: () => void;
};

const FileInputContext = createContext<FileInputContextType | null>(null);

export const useFileInputContext = () => {
  const context = useContext(FileInputContext);

  if (!context) {
    throw new Error(
      "Calling useFileInputContext outside of FileInputContextProvider",
    );
  }

  return context;
};

export const FileInputContextProvider = FileInputContext.Provider;
