export function setupPrimaryColorVariables({
  primaryColor = "#2362a2",
  primaryColor100 = "#ecf7ff",
  primaryColor200 = "#d9efff",
  primaryColor300 = "#b5d9f3",
  primaryColor400 = "#66a1d8",
  primaryColor500 = "#3077b7",
  primaryColor600 = "#2362a2",
  primaryColor700 = "#254e80",
  primaryColor800 = "#15355e",
  primaryColor900 = "#0d213a",
}: {
  primaryColor?: string;
  primaryColor100?: string;
  primaryColor200?: string;
  primaryColor300?: string;
  primaryColor400?: string;
  primaryColor500?: string;
  primaryColor600?: string;
  primaryColor700?: string;
  primaryColor800?: string;
  primaryColor900?: string;
}) {
  document.documentElement.style.setProperty(
    "--iqf-color-primary",
    primaryColor,
  );
  document.documentElement.style.setProperty(
    "--iqf-color-primary-100",
    primaryColor100,
  );
  document.documentElement.style.setProperty(
    "--iqf-color-primary-200",
    primaryColor200,
  );
  document.documentElement.style.setProperty(
    "--iqf-color-primary-300",
    primaryColor300,
  );
  document.documentElement.style.setProperty(
    "--iqf-color-primary-400",
    primaryColor400,
  );
  document.documentElement.style.setProperty(
    "--iqf-color-primary-500",
    primaryColor500,
  );
  document.documentElement.style.setProperty(
    "--iqf-color-primary-600",
    primaryColor600,
  );
  document.documentElement.style.setProperty(
    "--iqf-color-primary-700",
    primaryColor700,
  );
  document.documentElement.style.setProperty(
    "--iqf-color-primary-800",
    primaryColor800,
  );
  document.documentElement.style.setProperty(
    "--iqf-color-primary-900",
    primaryColor900,
  );
}
