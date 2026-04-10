"use client";

import {
  DataFormToolbarDefaultButtons,
  DataFormToolbarDelimiter,
  DataFormToolbarLayout,
} from "iqf-web-ui/data-form";

import { CancelTrainingAction } from "../actions/cancel-training-action";

export function FormToolbar() {
  return (
    <DataFormToolbarLayout>
      <CancelTrainingAction />

      <DataFormToolbarDelimiter />

      <DataFormToolbarDefaultButtons
        showLocate={false}
        showEdit={false}
        showDelete={false}
      />
    </DataFormToolbarLayout>
  );
}
