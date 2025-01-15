import Image from "next/image";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-6xl flex-col items-center justify-center px-4 sm:px-6">
      <div className="space-y-8 text-center">
        <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground">
          Oh no, it looks like you&apos;ve taken a wrong turn! 🙈
        </p>
        <div className="flex justify-center">
          <Image
            src="/404.gif"
            alt="404 Not Found"
            width={1024}
            height={1024}
            priority
            unoptimized
            className="h-64 w-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </main>
  );
}
