import { type Ref } from "react";

/**
 * If omitting Discriminated union type, we need to use
 * custom OmitDiscriminatedUnion type to not break the type.
 */
export type OmitDiscriminatedUnion<Type, TNames> = {
  [Property in keyof Type as Exclude<Property, TNames>]: Type[Property];
};

/**
 * Utility type to add correctly typed ref to props
 *
 * @template TProps The props the component accepts, if any.
 * @template TElement The type of the element the component renders.
 */
export type PropsWithElementRef<TProps, TElement> = TProps & {
  ref?: Ref<TElement>;
};
