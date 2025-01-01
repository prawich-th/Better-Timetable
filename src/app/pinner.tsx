"use client";

import { useActionState } from "react";
import { pinLevel } from "./actions/action";

export default (props: { id: string; children: any; isPinned: boolean }) => {
  const [state, formAction, isPending] = useActionState(pinLevel, null);

  return (
    <form action={formAction}>
      <input type="text" hidden name="levelID" value={props.id} readOnly />
      <button type="submit">{props.children}</button>
    </form>
  );
};
