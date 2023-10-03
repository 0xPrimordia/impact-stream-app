"use client";

import React, { createContext, useState } from "react";
import { SummaryProposal } from "../types";

export const GrantsContext = createContext({});

export const GrantsProvider = ({ children }: { children: any[] }) => {
  const [grants, setGrants] = useState<SummaryProposal[]>([]);

  return (
    <GrantsContext.Provider
      value={{
        grants,
        setGrants,
      }}
    >
      {children}
    </GrantsContext.Provider>
  );
};
