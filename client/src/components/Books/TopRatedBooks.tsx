// src/components/DiscoverBooks/DiscoverBooks.tsx
import { useEffect, useState } from "react";
import { getTopRated } from "../../services/booksServiceClient";
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

const TopRatedBooks = () => {
  const [books, setBooks] = useState<BookTestItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data: GoogleBooksResponse = await getTopRated();

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

  return <BooksCarousel title="📚 Top Rated Books" items={books} />;
};

export default TopRatedBooks;
