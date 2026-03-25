import { useIntl } from "react-intl";

import { DateLayoutField } from "../../components/form/layout/fields/date-layout-field";
import { TextLayoutField } from "../../components/form/layout/fields/text-layout-field";
import { DomainLayoutGroup } from "../domain";
import { type TitledFieldsProps, TitledLayoutGroup } from "../titled";

export function CodeLayoutField() {
  const intl = useIntl();

  return (
    <TextLayoutField
      name="code"
      label={intl.formatMessage({
        id: "dictionary-evidence.code",
        defaultMessage: "Kód",
      })}
    />
  );
}

export function ValidFromLayoutField() {
  const intl = useIntl();

  return (
    <DateLayoutField
      name="validFrom"
      type="instant"
      label={intl.formatMessage({
        id: "dictionary-evidence.valid-from",
        defaultMessage: "Platnost od",
      })}
    />
  );
}

export function ValidToLayoutField() {
  const intl = useIntl();

  return (
    <DateLayoutField
      name="validTo"
      type="instant"
      label={intl.formatMessage({
        id: "dictionary-evidence.valid-to",
        defaultMessage: "Platnost do",
      })}
    />
  );
}

export type DictionaryFieldsProps = TitledFieldsProps & {
  code?: boolean;
  validFrom?: boolean;
  validTo?: boolean;
};

export function DictionaryFields({
  code = true,
  validFrom = true,
  validTo = true,

  title = true,
  description = true,

  createdAt = true,
  createdBy = true,
  modifiedAt = true,
  modifiedBy = true,

  children,
}: DictionaryFieldsProps) {
  return (
    <>
      <TitledLayoutGroup title={title} description={description}>
        {code && <CodeLayoutField />}
        {validFrom && <ValidFromLayoutField />}
        {validTo && <ValidToLayoutField />}

        {children}
      </TitledLayoutGroup>

      <DomainLayoutGroup
        createdAt={createdAt}
        createdBy={createdBy}
        modifiedAt={modifiedAt}
        modifiedBy={modifiedBy}
      />
    </>
  );
}
