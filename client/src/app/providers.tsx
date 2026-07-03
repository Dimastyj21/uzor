'use client'

import { ReduxProvider } from "@/shared/store/ReduxProvider";
import React from "react";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <ReduxProvider>{children}</ReduxProvider>
    )
}