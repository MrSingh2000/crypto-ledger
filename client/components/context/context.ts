import { createContext } from "react";
import { ContextData } from "../interface/context.interface";

// making a context for the notes using createContext
const defaultContext = createContext<ContextData>({} as ContextData);

export default defaultContext;