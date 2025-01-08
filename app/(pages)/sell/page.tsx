"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { JSONContent } from "@tiptap/react";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SellProduct, State } from "@/app/actions";
import { toast } from "sonner";
import { SubmitButton } from "@/app/components/SubmitButton";
import { redirect } from "next/navigation";
import { SelectCategory } from "@/app/components/SelectCategory";
import { TipTapEditor } from "@/app/components/Editor";
import { UploadDropzone } from "@/app/lib/uploadthing";

const PageSell = () => {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(SellProduct, initialState);

  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<string[] | null>(null);
  const [productFile, setProductFile] = useState<string | null>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      redirect("/");
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Sell your product with ease</CardTitle>
            <CardDescription>
              Please describe your product here in details so that it can be
              sold
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Name</Label>
              <Input
                name="name"
                type="text"
                placeholder="Name of your product"
                required
                minLength={3}
              />
              {state?.errors?.["name"]?.[0] && (
                <p className="text-red-500">{state?.errors?.["name"]?.[0]}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
              {state?.errors?.["category"]?.[0] && (
                <p className="text-red-500">
                  {state?.errors?.["category"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input
                name="price"
                placeholder="28$"
                type="number"
                required
                min={1}
              />
              {state?.errors?.["price"]?.[0] && (
                <p className="text-red-500">{state?.errors?.["price"]?.[0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Small Summary</Label>
              <Textarea
                name="smallDescription"
                placeholder="Please describe your product shortly right here..."
                required
                minLength={10}
              />
              {state?.errors?.["smallDescription"]?.[0] && (
                <p className="text-red-500">
                  {state?.errors?.["smallDescription"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="description"
                value={JSON.stringify(json)}
              />
              <Label>Description</Label>
              <TipTapEditor json={json} setJson={setJson} />
              {state?.errors?.["description"]?.[0] && (
                <p className="text-red-500">
                  {state?.errors?.["description"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="images"
                value={JSON.stringify(images)}
              />
              <Label>Product Images</Label>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImages(res.map((item) => item.url));
                  toast.success("You images has been uploaded");
                }}
                onUploadError={() => {
                  toast.error("Something went wrong, try again");
                }}
              />
              {state?.errors?.["images"]?.[0] && (
                <p className="text-red-500">{state?.errors?.["images"]?.[0]}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                value={productFile ?? ""}
                name="productFile"
              />
              <Label>Product File</Label>
              <UploadDropzone
                endpoint="productFileUpload"
                onClientUploadComplete={(res) => {
                  setProductFile(res[0].url);
                  toast.success("You Product file has been uploaded");
                }}
                onUploadError={() => {
                  toast.error("Something went wrong, try again");
                }}
              />
              {state?.errors?.["productFile"]?.[0] && (
                <p className="text-red-500">
                  {state?.errors?.["productFile"]?.[0]}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="mt-5">
            <SubmitButton title="Create Your Product" />
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default PageSell;
