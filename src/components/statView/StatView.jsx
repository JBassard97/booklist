import "./statView.css";

export default function StatView({ bookCount }) {
  return (
    <div className="book-stats">
      <p>Books: {bookCount}</p>
    </div>
  );
}
