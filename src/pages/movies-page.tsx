import { Search } from "lucide-react";
import { useState } from "react";

import PageContainer from "@/components/layout/page-container";
import MoviesGrid from "@/components/movies/movies-grid";
import { Input } from "@/components/ui/input";

export function MoviesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <PageContainer>
      <section className="py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-blue-600">
              TMDB catalog
            </span>

            <h1 className="mt-3 text-4xl font-bold">
              Explore Movies
            </h1>

            <p className="mt-3 text-muted-foreground">
              Browse popular movies from TMDB and open each title to review its
              synopsis, release data, rating, duration and genres.
            </p>
          </div>

          <label className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search popular movies"
              className="pl-9"
            />
          </label>
        </div>
      </section>

      <MoviesGrid
        description="Filtered from the current popular movies provided by TMDB."
        searchTerm={searchTerm}
        title="Popular Movies"
      />
    </PageContainer>
  );
}
