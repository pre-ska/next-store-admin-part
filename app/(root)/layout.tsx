import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  //! treba ispitati dali postoji iti jedan store od korisnika kada se korisnik logira
  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  //! ako postoji redirectaj usera na dashboard tog store-a
  //! to je u dashboard grupi, [storeId] će ga uhvatit
  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
