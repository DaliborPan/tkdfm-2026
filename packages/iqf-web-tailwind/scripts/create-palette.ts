import Color from "color";
import inquirer from "inquirer";

inquirer
  .prompt<{
    primaryColor: string;
  }>({
    type: "input",
    name: "primaryColor",
    message: "Primary color in hexa code:",
    validate: (primaryColor: string) => {
      if (!primaryColor.match(/^#[0-9A-Fa-f]{6}$/i)) {
        return false;
      }
      return true;
    },
    filter: (directory: string) => directory.trim(),
  })
  .then((answers) => {
    const base = Color(answers.primaryColor);
    const baseHue = base.hue();
    const baseSat = base.saturationl();

    const primary50 = Color.hsl(baseHue, baseSat, 97);
    const primary100 = Color.hsl(baseHue, baseSat, 94);
    const primary200 = Color.hsl(baseHue, baseSat, 86);
    const primary300 = Color.hsl(baseHue, baseSat, 74);
    const primary400 = Color.hsl(baseHue, baseSat, 60);
    const primary500 = Color.hsl(baseHue, baseSat, 48);
    const primary600 = base;
    const primary700 = Color.hsl(baseHue, baseSat, 32);
    const primary800 = Color.hsl(baseHue, baseSat, 27);
    const primary900 = Color.hsl(baseHue, baseSat, 22);
    const primary950 = Color.hsl(baseHue, baseSat, 14);

    const lightText = Color("#ffffff"); // did not use `color-neutral-50` to be more consistent with most of the code
    const darkText = Color("#262626"); // color-neutral-950

    const primaryForeground =
      primary500.contrast(lightText) >= primary500.contrast(darkText)
        ? lightText
        : darkText;

    console.log(`
Copy following code into your styles/globals.css file:

@layer base {
  :root {
    --iqf-color-primary: ${primary600.hex()};
    --iqf-color-primary-50: ${primary50.hex()};
    --iqf-color-primary-100: ${primary100.hex()};
    --iqf-color-primary-200: ${primary200.hex()};
    --iqf-color-primary-300: ${primary300.hex()};
    --iqf-color-primary-400: ${primary400.hex()};
    --iqf-color-primary-500: ${primary500.hex()};
    --iqf-color-primary-600: ${primary600.hex()};
    --iqf-color-primary-700: ${primary700.hex()};
    --iqf-color-primary-800: ${primary800.hex()};
    --iqf-color-primary-900: ${primary900.hex()};
    --iqf-color-primary-950: ${primary950.hex()};
    --iqf-color-primary-foreground: ${primaryForeground.hex()};
  }
}

OR

copy following into env file:

VITE_PRIMARY_COLOR="${primary600.hex()}"
VITE_PRIMARY_COLOR_50="${primary50.hex()}"
VITE_PRIMARY_COLOR_100="${primary100.hex()}"
VITE_PRIMARY_COLOR_200="${primary200.hex()}"
VITE_PRIMARY_COLOR_300="${primary300.hex()}"
VITE_PRIMARY_COLOR_400="${primary400.hex()}"
VITE_PRIMARY_COLOR_500="${primary500.hex()}"
VITE_PRIMARY_COLOR_600="${primary600.hex()}"
VITE_PRIMARY_COLOR_700="${primary700.hex()}"
VITE_PRIMARY_COLOR_800="${primary800.hex()}"
VITE_PRIMARY_COLOR_900="${primary900.hex()}"
VITE_PRIMARY_COLOR_950="${primary950.hex()}"
VITE_PRIMARY_FOREGROUND="${primaryForeground.hex()}"

`);
  });
