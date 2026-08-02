# API Calls Guide for the Frontend

This file shows how to replace mock data in the frontend pages with real API calls from the backend.

## 1. Use the shared API client

The frontend already has a shared Axios instance in [client/src/api/axios.js](client/src/api/axios.js).

```js
import api from "../api/axios";

const response = await api.get("/books");
const data = response.data?.data;
```

Important note:

- The backend wraps data in an `ApiResponse` object.
- In most cases, the real data is inside `response.data.data`.

---

## 2. Auth pages

### Login page

Use this for real login:

- Endpoint: `POST /api/v1/users/login`
- Page: [client/src/pages/Login.jsx](client/src/pages/Login.jsx)

```js
const response = await api.post("/users/login", {
  email,
  password,
});

const { user, accessToken } = response.data.data;
localStorage.setItem("accessToken", accessToken);
localStorage.setItem("user", JSON.stringify(user));
```

### Register page

Use this for real signup:

- Endpoint: `POST /api/v1/users/register`
- Page: [client/src/pages/Register.jsx](client/src/pages/Register.jsx)

```js
await api.post("/users/register", {
  name,
  email,
  password,
});
```

---

## 3. Books page

### Current problem

The page [client/src/pages/Books.jsx](client/src/pages/Books.jsx) uses static mock data.

### Replace with real books

- Endpoint: `GET /api/v1/books`
- Supports query params: `keyword`, `category`, `minPrice`, `maxPrice`, `page`, `limit`

```js
useEffect(() => {
  const fetchBooks = async () => {
    try {
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
    } catch (error) {
      console.error("Failed to load books", error);
    }
  };

  fetchBooks();
}, [searchTerm, selectedCategory, minPrice, maxPrice]);
```

### Real response shape

```json
{
  "success": true,
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

---

## 4. Book details page

### Current problem

The page [client/src/pages/BookDetails.jsx](client/src/pages/BookDetails.jsx) uses mock book data.

### Replace with real book details

- Endpoint: `GET /api/v1/books/:id`

```js
useEffect(() => {
  const fetchBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      setBook(response.data?.data);
    } catch (error) {
      console.error("Failed to load book", error);
    }
  };

  fetchBook();
}, [id]);
```

---

## 5. Search page

### Current problem

The page [client/src/pages/Search.jsx](client/src/pages/Search.jsx) uses mock books.

### Replace with real search result data

- Endpoint: `GET /api/v1/books?keyword=...`

```js
const response = await api.get("/books", {
  params: { keyword: query },
});

setResults(response.data?.data?.books || []);
```

---

## 6. Cart page

### Current problem

The page [client/src/pages/Cart.jsx](client/src/pages/Cart.jsx) uses local mock state.

### Replace with real cart data

- Endpoint: `GET /api/v1/cart`

```js
const response = await api.get("/cart");
const cartData = response.data?.data;
setCartItems(cartData?.cart?.items || []);
```

### Add item to cart

- Endpoint: `POST /api/v1/cart/:bookId`

```js
await api.post(`/cart/${bookId}`, { quantity: 1 });
```

### Update quantity

- Endpoint: `PATCH /api/v1/cart/:bookId`

```js
await api.patch(`/cart/${bookId}`, { quantity: newQty });
```

### Remove item

- Endpoint: `DELETE /api/v1/cart/:bookId`

```js
await api.delete(`/cart/${bookId}`);
```

---

## 7. Wishlist page

### Current problem

The page [client/src/pages/Wishlist.jsx](client/src/pages/Wishlist.jsx) uses mock wishlist items.

### Replace with real wishlist data

- Endpoint: `GET /api/v1/wishlist`

```js
const response = await api.get("/wishlist");
setWishlistItems(response.data?.data?.books || []);
```

### Add to wishlist

- Endpoint: `POST /api/v1/wishlist/:bookId`

```js
await api.post(`/wishlist/${bookId}`);
```

### Remove from wishlist

- Endpoint: `DELETE /api/v1/wishlist/:bookId`

```js
await api.delete(`/wishlist/${bookId}`);
```

---

## 8. Profile page

### Current problem

The page [client/src/pages/Profile.jsx](client/src/pages/Profile.jsx) is partially connected, but it should use real library data.

### Fetch user library

- Endpoint: `GET /api/v1/library`

```js
const response = await api.get("/library");
setLibrary(response.data?.data || []);
```

### Download PDF from library

- Endpoint: `GET /api/v1/library/:bookId/access`

```js
const response = await api.get(`/library/${bookId}/access`, {
  responseType: "blob",
});
```

---

## 9. Checkout and payment page

### Create payment order

- Endpoint: `POST /api/v1/orders/create-order`

```js
const response = await api.post("/orders/create-order");
const { razorpayOrderId, amount } = response.data.data;
```

### Verify payment

- Endpoint: `POST /api/v1/orders/verify-payment`

```js
await api.post("/orders/verify-payment", {
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
});
```

### View order history

- Endpoint: `GET /api/v1/orders/history`

```js
const response = await api.get("/orders/history");
setOrders(response.data?.data || []);
```

---

## 10. Admin page

### Admin dashboard

- Endpoint: `GET /api/v1/admin/stats`

```js
const response = await api.get("/admin/stats");
setStats(response.data?.data);
```

---

## 11. Best practice for replacing mock data

When replacing mock data:

1. Remove hard-coded arrays from the page.
2. Add `useState` for real API data.
3. Fetch data inside `useEffect`.
4. Show loading and error states.
5. Use `try/catch` for API failures.

Example pattern:

```js
const [books, setBooks] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/books");
      setBooks(response.data?.data?.books || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  loadBooks();
}, []);
```

---

## 12. Summary of real backend routes

- Books: `/books`
- Book details: `/books/:id`
- Categories: `/categories`
- Users: `/users/login`, `/users/register`, `/users/logout`
- Cart: `/cart`
- Wishlist: `/wishlist`
- Library: `/library`
- Orders: `/orders/create-order`, `/orders/verify-payment`, `/orders/history`
- Admin: `/admin/stats`

This is the main path to make the frontend fully use real backend data instead of mock data.
