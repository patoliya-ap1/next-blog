"use client";
import { useFormik } from "formik";
import { blogSchema } from "@/utility/blogSchema";
import { InputAdornment, TextField } from "@mui/material";

import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Editor, { BtnBold, BtnItalic, Toolbar } from "react-simple-wysiwyg";
import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

interface PostForm {
  title: string;
  body: string;
  imgUrl: string;
}

const UpdateBlog = () => {
  // const [updateValue, setUpdateValue] = useState({
  //   title: "",
  //   body: "",
  //   imgUrl: "",
  // });

  const initialValues = {
    title: "",
    body: "",
    imgUrl: "",
  };

  const router = useRouter();
  const { blogID } = useParams();

  console.log(blogID);

  // const getInitialFormData = async () => {
  //   const response = await fetch(`${process.env.BACKEND_API}${blogID}`);
  //   const data = await response.json();
  //   setUpdateValue(data);
  // };

  // useEffect(() => {
  //   getInitialFormData();
  // }, [blogID]);

  const updtadeData = async (data: PostForm) => {
    const response = await fetch(`${process.env.BACKEND_API}/posts/${blogID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      router.replace("/dashboard");
    }
  };

  const handleCreateBlog = (values: PostForm) => {
    updtadeData(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleCreateBlog,
    validationSchema: blogSchema,
    enableReinitialize: true,
  });

  return (
    <div className="mb-20">
      <h2 className="mb-3">Update Blog</h2>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-3">
            <div className="h-18">
              <TextField
                name="title"
                type="text"
                value={formik.values.title}
                fullWidth
                label="Enter Blog Title"
                error={
                  formik.errors.title && formik.touched.title ? true : false
                }
                helperText={formik.touched.title && formik.errors.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="h-18">
              <TextField
                id="input-with-icon-textfield"
                label="Image Link"
                name="imgUrl"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageIcon />
                        <InsertLinkIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                value={formik.values.imgUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.imgUrl && formik.errors.imgUrl ? true : false
                }
                helperText={formik.touched.imgUrl && formik.errors.imgUrl}
              />
            </div>

            <div>
              <Editor
                name="body"
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className=" h-60"
              >
                <Toolbar>
                  <BtnBold />
                  <BtnItalic />
                </Toolbar>
              </Editor>
            </div>
            <p className="h-3 text-red-600 text-sm">
              {formik.touched.body && formik.errors.body}
            </p>

            <Button type="submit" variant="contained">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
