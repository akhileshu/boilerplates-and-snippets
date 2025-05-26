import { AppLink } from "@/components/app/link";

export default function Home() {
  return (
    <main>
      <h1>welcome to solo to squard - landing page</h1>
      <AppLink
        title="Find new people to connect with"
        href="/connections/recommendations"
      >
        Explore Connections
      </AppLink>
    </main>
  );
}
