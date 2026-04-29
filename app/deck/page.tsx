export const metadata = {
  title: "Deck",
};

export default function DeckPage() {
  return (
    <main className="flex h-dvh w-full flex-col">
      <iframe
        src="https://drive.google.com/file/d/1QrKCSfizxIpVJ5JNFMYnV1lWZzouCwnt/preview"
        className="h-full w-full flex-1 border-0"
        title="Clink Deck"
      />
    </main>
  );
}
