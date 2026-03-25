import { type PropsWithChildren } from "react";
import { useIntl } from "react-intl";

import { LayoutGroup } from "../../components/form";
import { TextLayoutField } from "../../components/form/layout/fields/text-layout-field";
import { DomainLayoutGroup, type DomainLayoutGroupProps } from "../domain";

export function TitleLayoutField() {
  const intl = useIntl();

  return (
    <TextLayoutField
      name="title"
      label={intl.formatMessage({
        id: "titled-evidence.title",
        defaultMessage: "Název",
      })}
    />
  );
}

export function DescriptionLayoutField() {
  const intl = useIntl();

  return (
    <TextLayoutField
      name="description"
      label={intl.formatMessage({
        id: "titled-evidence.description",
        defaultMessage: "Popis",
      })}
      multiline={true}
    />
  );
}

export type TitledLayoutGroupProps = PropsWithChildren<{
  title?: boolean;
  description?: boolean;
}>;

export function TitledLayoutGroup({
  title = true,
  description = true,
  children,
}: TitledLayoutGroupProps) {
  const intl = useIntl();

  return (
    <LayoutGroup
      title={intl.formatMessage({
        id: "titled-evidence.layout-title",
        defaultMessage: "Základní informace",
      })}
    >
      {title && <TitleLayoutField />}
      {description && <DescriptionLayoutField />}

      {children}
    </LayoutGroup>
  );
}

export type TitledFieldsProps = DomainLayoutGroupProps & TitledLayoutGroupProps;

export function TitledFields({
  title = true,
  description = true,

  createdAt = true,
  createdBy = true,
  modifiedAt = true,
  modifiedBy = true,

  children,
}: TitledFieldsProps) {
  return (
    <>
      <TitledLayoutGroup title={title} description={description}>
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
