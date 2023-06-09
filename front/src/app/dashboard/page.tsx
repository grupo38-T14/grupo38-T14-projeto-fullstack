"use client";
import { useAdverts } from "@/hooks/advertHook";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { adverts } = useAdverts();

  return (
    <main className="h-fit">
      <h1>Dashboard</h1>

      <div>
        <ul>
          {adverts?.map((advert) => (
            <li
              key={advert.id}
              onClick={() => router.push(`/dashboard/${advert.id}`)}
            >
              {advert.model}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
