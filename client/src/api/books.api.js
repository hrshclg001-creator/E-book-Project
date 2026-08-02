import api from "./axios";

export const getAllBooks = async (params = {}) => {
  const response = await api.get("/books", {
    params,
  });

  return response.data.data;
};

export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);

  return response.data.data;
};

export const createBook = async (formData) => {
  const response = await api.post("/books", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};

export const updateBook = async (id, formData) => {
  const response = await api.put(`/books/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);

  return response.data;
};
