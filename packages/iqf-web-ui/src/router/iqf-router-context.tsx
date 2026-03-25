import { noop } from "lodash";
import { createContext } from "react";
import { type NavigateFunction } from "react-router";

type IqfRouterContext = {
  navigate: NavigateFunction;
};

export const IqfRouterContext = createContext<IqfRouterContext>({
  navigate: noop,
});
