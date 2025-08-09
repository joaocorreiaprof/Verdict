// src/components/DiscoverBooks/DiscoverBooks.tsx
import { useEffect, useState } from "react";
import { getTopRated } from "../../services/booksServiceClient";

interface BookTestItem {
  id: string;
  title: string;
  thumbnail?: string;
  averageRating?: number;
}

const TopRatedBooks = () => {
  const [books, setBooks] = useState<BookTestItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getTopRated();

        const mappedBooks: BookTestItem[] = (data.items || []).map(
          (item: any) => ({
            id: item.id,
            title: item.volumeInfo?.title ?? "Untitled",
            thumbnail: item.volumeInfo?.imageLinks?.thumbnail?.replace(
              "http://",
              "https://"
            ),
            averageRating: item.volumeInfo?.averageRating ?? 0,
          })
        );

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
    <div>
      <h2>📚 Top Rated Books</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {books.map((book) => (
          <li key={book.id} style={{ marginBottom: "1rem" }}>
            {book.thumbnail && (
              <img
                src={book.thumbnail}
                alt={book.title}
                style={{ width: "100px", height: "auto", marginRight: "1rem" }}
              />
            )}
            <div>
              <strong>{book.title}</strong>
              <p>⭐ {book.averageRating}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRatedBooks;
