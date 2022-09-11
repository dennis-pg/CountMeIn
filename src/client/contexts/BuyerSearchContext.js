import { createContext, useContext } from "react";

export const BuyerSearchFormContext = createContext(null);

export const BuyerSearchFormContextProvider = BuyerSearchFormContext.Provider;

export function useBuyerSearchFormContext() {
  const context = useContext(BuyerSearchFormContext);
  if (!context) {
    throw new Error("useManageDataPointsFormContext must be used within a FormProvider");
  }
  return context;
}