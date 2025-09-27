// src/components/DiscoverBooks/DiscoverBooks.tsx
import { useEffect, useState } from "react";
import { getTopRated } from "../../services/booksServiceClient";
import BooksCarousel from "../Carousel/BookCarousel";
import BookModal from "../Modals/BookModal";

interface BookTestItem {
  id: string;
  title: string;
  thumbnail?: string;
  averageRating?: number;
  description?: string; // Add this line
}

interface GoogleBooksVolumeInfo {
  title?: string;
  imageLinks?: {
    thumbnail?: string;
  };
  averageRating?: number;
  description?: string; // Add this line
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
  const [selectedBook, setSelectedBook] = useState<BookTestItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          description: item.volumeInfo?.description ?? "", // Add this line
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

  return (
    <>
      <BooksCarousel
        title="Top Rated Books"
        items={books}
        onItemClick={(book) => {
          setSelectedBook(book);
          setIsModalOpen(true);
        }}
      />
      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        book={selectedBook}
      />
    </>
  );
};

export default TopRatedBooks;
