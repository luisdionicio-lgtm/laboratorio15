import { Link } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";

export function NotFoundPage() {
  return (
    <PageContainer>
      <section className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <span className="text-sm font-medium text-blue-600">
          404
        </span>

        <h1 className="mt-3 text-4xl font-bold">
          Page not found
        </h1>

        <p className="mt-4 max-w-md text-muted-foreground">
          This route does not exist in CineSpoilerS. Return to the catalog and
          keep exploring movies.
        </p>

        <Link
          to="/movies"
          className="mt-8 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Explore Movies
        </Link>
      </section>
    </PageContainer>
  );
}
