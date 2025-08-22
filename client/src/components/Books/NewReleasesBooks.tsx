// src/components/DiscoverBooks/DiscoverBooks.tsx
import { useEffect, useState } from "react";
import { getNewReleases } from "../../services/booksServiceClient";
import BooksCarousel from "../Carousel/BookCarousel";

interface BookTestItem {
  id: string;
  title: string;
  thumbnail?: string;
  averageRating?: number;
}

interface GoogleBooksVolumeInfo {
  title?: string;
  imageLinks?: {
    thumbnail?: string;
  };
  averageRating?: number;
}

interface GoogleBooksItem {
  id: string;
  volumeInfo?: GoogleBooksVolumeInfo;
}

interface GoogleBooksResponse {
  items?: GoogleBooksItem[];
}

const NewReleasesBooks = () => {
  const [books, setBooks] = useState<BookTestItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data: GoogleBooksResponse = await getNewReleases();

        const mappedBooks: BookTestItem[] = (data.items || []).map((item) => ({
          id: item.id,
          title: item.volumeInfo?.title ?? "Untitled",
          thumbnail: item.volumeInfo?.imageLinks?.thumbnail?.replace(
            "http://",
            "https://"
          ),
          averageRating: item.volumeInfo?.averageRating ?? 0,
        }));

        setBooks(mappedBooks);
      } catch (error) {
        console.error("Error fetching top-rated books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading...</p>;

  return <BooksCarousel title="📚 New Releases Books" items={books} />;
};

export default NewReleasesBooks;
