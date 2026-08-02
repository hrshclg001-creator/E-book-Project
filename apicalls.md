# API Calls Tutorial for the Frontend

This guide explains how to replace the frontend’s mock data with real data from the backend, page by page.

## 1. Understand the backend response format

The backend does not return raw arrays directly. It returns an `ApiResponse` object.

### Example response

```json
{
  "success": true,
  "message": "Books fetched successfully",
  "data": {
    "books": [],
    "pagination": {
      "totalBooks": 10,
      "totalPages": 2,
      "currentPage": 1,
      "limit": 10
    }
  }
}
```

### Important rule

When you call the API from the frontend, always read the data from:

```js
response.data.data;
```

So if the backend returns books, use:

```js
const books = response.data?.data?.books || [];
```

---

## 2. Use the shared API client

The frontend already has a shared Axios instance in [client/src/api/axios.js](client/src/api/axios.js).

```js
import api from "../api/axios";
```

This client already includes:

- the base URL
- cookie support
- the correct JSON headers

### Example: simple GET request

```js
const response = await api.get("/books");
console.log(response.data);
```

---

## 3. How to connect the Books page to the backend

The current file [client/src/pages/Books.jsx](client/src/pages/Books.jsx) uses mock data such as `mockBooks` and filters it locally.

To make it real, you need to:

1. remove the hard-coded array
2. store fetched books in state
3. fetch them when the page loads
4. apply filters on top of the real response

### Step 1: add the required states

```js
const [books, setBooks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
```

### Step 2: fetch the books from the backend

Use the GET route:

- Endpoint: `GET /api/v1/books`

```js
useEffect(() => {
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/books", {
        params: {
          keyword: searchTerm,
          category: selectedCategory !== "All" ? selectedCategory : undefined,
          minPrice,
          maxPrice,
          page: 1,
          limit: 12,
        },
      });

      const result = response.data?.data;
      setBooks(result?.books || []);
    } catch (err) {
      console.error("Failed to load books", err);
      setError("Unable to load books right now.");
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, [searchTerm, selectedCategory, minPrice, maxPrice]);
```

### Step 3: map the backend response to the UI structure

The current component expects fields like:

- `book.id`
- `book.title`
- `book.author`
- `book.price`
- `book.rating`
- `book.category`
- `book.cover`
- `book.description`

But the backend returns different field names.

#### Backend fields

```json
{
  "_id": "64abc...",
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 450,
  "description": "A practical framework...",
  "coverImage": "https://...",
  "category": {
    "name": "Self-Help"
  }
}
```

#### Frontend-friendly mapping

```js
const mappedBooks = (result?.books || []).map((book) => ({
  id: book._id,
  title: book.title,
  author: book.author,
  price: book.price,
  rating: book.rating || 4.7,
  category: book.category?.name || book.category,
  cover: book.coverImage || book.cover,
  description: book.description,
}));
```

Then use:

```js
setBooks(mappedBooks);
```

### Step 4: render the real books

Replace the mock array with the real `books` state:

```jsx
{
  loading ? (
    <p>Loading books...</p>
  ) : error ? (
    <p>{error}</p>
  ) : books.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onQuickPreview={(selected) => setPreviewBook(selected)}
        />
      ))}
    </div>
  ) : (
    <p>No books found.</p>
  );
}
```

---

## 4. How to connect the Book Details page

The page [client/src/pages/BookDetails.jsx](client/src/pages/BookDetails.jsx) currently uses mock data.

### Backend route

- Endpoint: `GET /api/v1/books/:id`

### Example implementation

```js
useEffect(() => {
  const fetchBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      const bookData = response.data?.data;

      setBook({
        id: bookData._id,
        title: bookData.title,
        author: bookData.author,
        price: bookData.price,
        description: bookData.description,
        category: bookData.category?.name || bookData.category,
        cover: bookData.coverImage || bookData.cover,
      });
    } catch (err) {
      console.error("Failed to load book details", err);
    }
  };

  fetchBook();
}, [id]);
```

---

## 5. How to connect the Search page

The Search page should call the books API with a search keyword.

### Backend route

- Endpoint: `GET /api/v1/books?keyword=...`

### Example

```js
const response = await api.get("/books", {
  params: { keyword: query },
});

const results = response.data?.data?.books || [];
```

---

## 6. How to connect the Cart page

The cart page currently stores data locally in state. To make it real, use the cart backend routes.

### Backend routes

- `GET /api/v1/cart` → fetch the cart
- `POST /api/v1/cart/:bookId` → add an item
- `PATCH /api/v1/cart/:bookId` → update quantity
- `DELETE /api/v1/cart/:bookId` → remove item

### Fetch cart

```js
const response = await api.get("/cart");
const cartData = response.data?.data;
setCartItems(cartData?.cart?.items || []);
```

### Add item to cart

```js
await api.post(`/cart/${bookId}`, { quantity: 1 });
```

### Update quantity

```js
await api.patch(`/cart/${bookId}`, { quantity: newQty });
```

### Remove item

```js
await api.delete(`/cart/${bookId}`);
```

---

## 7. How to connect the Wishlist page

The wishlist page should use the wishlist API.

### Backend routes

- `GET /api/v1/wishlist` → fetch wishlist
- `POST /api/v1/wishlist/:bookId` → add to wishlist
- `DELETE /api/v1/wishlist/:bookId` → remove from wishlist

### Fetch wishlist

```js
const response = await api.get("/wishlist");
setWishlistItems(response.data?.data?.books || []);
```

---

## 8. How to connect the Profile page

The profile page should show the user’s purchased library and allow downloads.

### Backend routes

- `GET /api/v1/library` → fetch purchased books
- `GET /api/v1/library/:bookId/access` → stream the PDF

### Fetch library

```js
const response = await api.get("/library");
setLibrary(response.data?.data || []);
```

### Download PDF

```js
const response = await api.get(`/library/${bookId}/access`, {
  responseType: "blob",
});
```

---

## 9. How to connect authentication pages

### Login

Route:

- `POST /api/v1/users/login`

```js
const response = await api.post("/users/login", {
  email,
  password,
});

const { user, accessToken } = response.data.data;
localStorage.setItem("accessToken", accessToken);
localStorage.setItem("user", JSON.stringify(user));
```

### Register

Route:

- `POST /api/v1/users/register`

```js
await api.post("/users/register", {
  name,
  email,
  password,
});
```

---

## 10. How to connect checkout and payments

### Create payment order

Route:

- `POST /api/v1/orders/create-order`

```js
const response = await api.post("/orders/create-order");
const orderData = response.data?.data;
```

### Verify payment

Route:

- `POST /api/v1/orders/verify-payment`

```js
await api.post("/orders/verify-payment", {
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
});
```

---

## 11. Best practice for real frontend API work

When replacing mock data in any page, follow this pattern:

1. Create state for API data
2. Fetch data with `useEffect`
3. Handle loading
4. Handle error
5. Map backend fields to your component’s expected shape
6. Show the real data instead of hard-coded arrays

### Reusable pattern

```js
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/books");
      setData(response.data?.data?.books || []);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);
```

---

## 12. Common problems and fixes

### Problem: CORS error

Fix:

```env
CORS_ORIGIN=http://localhost:5173
```

### Problem: 401 Unauthorized

Fix:

- make sure the user is logged in
- check that the access token exists
- verify the backend auth middleware is working

### Problem: data is empty

Fix:

- check whether the backend actually returns data
- inspect `response.data` in the browser console
- confirm the route is correct

### Problem: fields do not match the UI

Fix:

- map backend field names to the UI field names
- use `coverImage` instead of `cover`
- use `category.name` instead of raw category data

---

## 13. Summary of the main routes

- Books: `/books`
- Book detail: `/books/:id`
- Categories: `/categories`
- Auth: `/users/login`, `/users/register`, `/users/logout`
- Cart: `/cart`
- Wishlist: `/wishlist`
- Library: `/library`
- Orders: `/orders/create-order`, `/orders/verify-payment`, `/orders/history`
- Admin: `/admin/stats`

This is the main workflow to make the frontend use real backend data instead of mock data.
