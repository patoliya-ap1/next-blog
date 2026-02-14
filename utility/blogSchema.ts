import * as Yup from "yup";

export const blogSchema = Yup.object().shape({
  title: Yup.string()
    .min(30, "Title must be 30 or more character")
    .max(70, "Title must be 70 or less character")
    .required("Title is required"),
  imgUrl: Yup.string().url("Enter valid url"),
  body: Yup.string()
    .min(500, "Blog Content at least 500 or more character")
    .required("Blog Content is Required"),
  category: Yup.string().required("Category is required"),
});
