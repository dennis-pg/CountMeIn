import { createContext, useContext } from "react";

export const ManageDataPointsFormContext = createContext(null);

export const ManageDataPointsContextFormProvider = ManageDataPointsFormContext.Provider;

export function useManageDataPointsFormContext() {
  const context = useContext(ManageDataPointsFormContext);
  if (!context) {
    throw new Error("useManageDataPointsFormContext must be used within a FormProvider");
  }
  return context;
}