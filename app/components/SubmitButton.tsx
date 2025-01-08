'use client'

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2  animate-spin size-4" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit">
            Create Your Product
        </Button>
      )}
    </>
  );
};
