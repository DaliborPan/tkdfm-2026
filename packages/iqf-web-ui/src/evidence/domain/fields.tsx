import { useIntl } from "react-intl";

import { useDataFormContext } from "../../components/data-form";
import { LayoutGroup } from "../../components/form";
import { DateLayoutValue } from "../../components/form/layout/values/date-layout-value";
import { TextLayoutValue } from "../../components/form/layout/values/text-layout-value";
import { type DomainObject } from "./schema";

const useDomainFormContext = useDataFormContext<DomainObject, DomainObject>;

export function CreatedAtLayoutValue() {
  const intl = useIntl();

  const { entity } = useDomainFormContext();

  return (
    !!entity?.createdAt && (
      <DateLayoutValue
        value={entity.createdAt}
        label={intl.formatMessage({
          id: "domain-evidence.created-at",
          defaultMessage: "Datum vytvoření",
        })}
      />
    )
  );
}

export function ModifiedAtLayoutValue() {
  const intl = useIntl();

  const { entity } = useDomainFormContext();

  return (
    !!entity?.modifiedAt && (
      <DateLayoutValue
        value={entity.modifiedAt}
        label={intl.formatMessage({
          id: "domain-evidence.modified-at",
          defaultMessage: "Datum úpravy",
        })}
      />
    )
  );
}

export function CreatedByLayoutValue() {
  const intl = useIntl();

  const { entity } = useDomainFormContext();

  return (
    !!entity?.createdBy && (
      <TextLayoutValue
        value={entity.createdBy.displayName}
        label={intl.formatMessage({
          id: "domain-evidence.created-by",
          defaultMessage: "Vytvořil",
        })}
      />
    )
  );
}

export function ModifiedByLayoutValue() {
  const intl = useIntl();

  const { entity } = useDomainFormContext();

  return (
    !!entity?.modifiedBy && (
      <TextLayoutValue
        value={entity.modifiedBy.displayName}
        label={intl.formatMessage({
          id: "domain-evidence.modified-by",
          defaultMessage: "Upravil",
        })}
      />
    )
  );
}

export type DomainLayoutGroupProps = {
  createdAt?: boolean;
  modifiedAt?: boolean;
  createdBy?: boolean;
  modifiedBy?: boolean;
};

export function DomainLayoutGroup({
  createdAt = true,
  modifiedAt = true,
  createdBy = true,
  modifiedBy = true,
}: DomainLayoutGroupProps) {
  const intl = useIntl();

  const { entity } = useDomainFormContext();

  return (
    !!entity && (
      <LayoutGroup
        title={intl.formatMessage({
          id: "domain-evidence.audit-log",
          defaultMessage: "Auditní záznam",
        })}
      >
        {createdAt && <CreatedAtLayoutValue />}
        {modifiedAt && <ModifiedAtLayoutValue />}
        {createdBy && <CreatedByLayoutValue />}
        {modifiedBy && <ModifiedByLayoutValue />}
      </LayoutGroup>
    )
  );
}
