import { CATEGORY_URL } from "../utils/linkConstants";
import { apiSlice } from "./apiSlice";

const categoryAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/lists`,
      }),
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
        body: "",
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryAPISlice;
