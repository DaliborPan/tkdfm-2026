import { type IntlShape } from "react-intl";
import { z } from "zod";

import { makeZodErrorMap } from "./make-error-map";

export function setZodErrorMap(intl: IntlShape) {
  z.setErrorMap((issue) => makeZodErrorMap(issue, intl));
}
