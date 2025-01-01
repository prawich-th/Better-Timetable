"use client";

import { setDefaultFloor } from "./fl-action";
import { useActionState } from "react";

export default function SetFloor() {
  const [state, action, isPending] = useActionState(setDefaultFloor, null);

  return (
    <div className="">
      <form action={action}>
        <input type="text" name="floor" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
