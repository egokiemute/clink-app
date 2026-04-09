export const metadata = {
  title: "Deck",
};

export default function DeckPage() {
  return (
    <main className="flex h-screen w-full flex-col">
      <iframe
        src="/assets/clink.pdf"
        className="h-full w-full flex-1 border-0"
        title="Clink Deck"
      />
    </main>
  );
}
