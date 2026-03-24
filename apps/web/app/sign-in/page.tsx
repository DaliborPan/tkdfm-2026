"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [nationalId, setNationalId] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsPending(true);

    try {
      const response = await authClient.signInNationalId({
        nationalId,
      });

      if (response.error) {
        setError(response.error.message ?? "Prihlaseni se nezdarilo.");
        return;
      }

      if (!response.data) {
        setError("Prihlaseni se nezdarilo.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Prihlaseni se nezdarilo.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/40 px-6 py-12 sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.white),transparent_45%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />

      <Card className="relative z-10 w-full max-w-lg rounded-2xl border border-border/70 bg-background/95 shadow-xl shadow-black/5 backdrop-blur">
        <CardHeader className="gap-4 px-8 pt-8 sm:px-10 sm:pt-10">
          <div className="w-fit rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            TKDFM 2026
          </div>
          <CardTitle className="text-3xl tracking-tight">
            Prihlaseni trenera
          </CardTitle>
          <CardDescription className="max-w-md text-[15px] leading-6">
            Zadej rodne cislo. Pokud odpovida existujicimu trenerovi, vytvori se
            session a budes prihlasen.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8 sm:px-10 sm:pb-10">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <FieldGroup>
              <Field data-invalid={error ? true : undefined}>
                <FieldLabel htmlFor="nationalId">Rodne cislo</FieldLabel>
                <Input
                  aria-invalid={error ? true : undefined}
                  autoComplete="off"
                  autoFocus
                  disabled={isPending}
                  id="nationalId"
                  inputMode="numeric"
                  name="nationalId"
                  onChange={(event) => setNationalId(event.target.value)}
                  placeholder="napr. 010101/1234"
                  value={nationalId}
                  className="h-11 px-4 text-sm"
                />
                <FieldDescription>
                  Pouzij stejne rodne cislo, ktere je evidovane u trenera.
                </FieldDescription>
              </Field>
            </FieldGroup>

            {error ? (
              <Alert variant="destructive">
                <AlertTitle>Prihlaseni se nezdarilo</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <Button
              className="h-11 w-full text-sm"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Prihlasuji..." : "Prihlasit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
