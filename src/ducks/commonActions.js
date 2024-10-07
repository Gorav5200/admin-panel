import { createAction } from "@reduxjs/toolkit";

export const deleteCase = createAction("deleteCase", (index) => {
  return { payload: index };
});
export const setActiveView = createAction("setActiveView", (view) => {
  return { payload: view };
});
