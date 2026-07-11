import { useEffect, useState } from 'react';
import API from '../../api/axios';
import { Trash2, Edit2, AlertTriangle, CheckCircle } from 'lucide-react';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');

  const fetchBooks = async () => {
    try {
      const { data } = await API.get('/books');
      setBooks(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await API.delete(`/books/${id}`); // Assumes DELETE /api/books/:id is ready on backend
        setMessage('Book removed successfully!');
        fetchBooks();
      } catch (err) {
        setMessage('Failed to delete book.');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Books</h1>
          <p className="text-gray-500">Review, update, or remove inventory items.</p>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-xl font-medium">
          {message}
        </div>
      )}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Book Details</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Stock Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 flex items-center space-x-4">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-10 h-14 rounded-lg object-cover bg-gray-100 shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 truncate max-w-xs">{book.title}</h4>
                    <p className="text-xs text-gray-400">{book.author}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                  {book.category}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className={`h-2 w-2 rounded-full ${book.availableStock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-sm font-semibold text-gray-700">
                      {book.availableStock} / {book.totalStock} Avail.
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(book._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;