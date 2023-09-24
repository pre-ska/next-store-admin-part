import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { SettingsForm } from "./components/SettingsForm";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

// ! another way to write props type
// const SettingsPage : React.FC<SettingsPageProps> = async ({ params }) => {
const SettingsPage = async ({ params: { storeId } }: SettingsPageProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
