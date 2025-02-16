import { CreateStripeAccount, GetStripeDashboardLink } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLink: true,
    },
  });

  return data;
}

const BillingPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorize");
  }

  const data = await getData(user.id);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>
            Find all your details regarding your payments
          </CardDescription>
          <CardContent>
            {data?.stripeConnectedLink === false && (
              <form action={CreateStripeAccount}>
                <SubmitButton title="Link your Accout to stripe" />
              </form>
            )}

            {data?.stripeConnectedLink === true && (
              <form action={GetStripeDashboardLink}>
                <SubmitButton title="View dashboard" />
              </form>
            )}
          </CardContent>
        </CardHeader>
      </Card>
    </section>
  );
};

export default BillingPage;
