"use client";
import { useFormik } from "formik";
import { blogSchema } from "@/utility/blogSchema";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Editor, { BtnBold, BtnItalic, Toolbar } from "react-simple-wysiwyg";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PostForm {
  title: string;
  body: string;
  imgUrl: string;
  category: string;
}

const UpdateBlog = () => {
  const [updateValue, setUpdateValue] = useState({
    title: "",
    body: "",
    imgUrl: "",
    category: "",
  });

  const initialValues = {
    title: updateValue?.title || "",
    body: updateValue?.body || "",
    imgUrl: updateValue?.imgUrl || "",
    category: updateValue?.category || "",
  };

  const router = useRouter();
  const { blogID } = useParams();

  useEffect(() => {
    const getInitialFormData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/posts/${blogID}`,
      );
      const data = await response.json();
      setUpdateValue(data);
    };
    getInitialFormData();
  }, [blogID]);

  const updateData = async (data: PostForm) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/posts/${blogID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (response.ok) {
      router.replace("/dashboard");
    }
  };

  const handleCreateBlog = (values: PostForm) => {
    updateData(values);
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

            <FormControl variant="standard" fullWidth className="h-20">
              <InputLabel id="demo-select-small-label">Category</InputLabel>
              <Select
                error={
                  formik.errors.category && formik.touched.category
                    ? true
                    : false
                }
                name="category"
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={formik.values.category}
                label="Age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Coding">Coding</MenuItem>
                <MenuItem value="Travelling">Travelling</MenuItem>
              </Select>
              <FormHelperText sx={{ color: "red" }}>
                {formik.touched.category && formik.errors.category}
              </FormHelperText>
            </FormControl>

            <div></div>
            <TextField
              name="body"
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.body && formik.errors.body ? true : false}
              helperText={formik.touched.body && formik.errors.body}
              label="Blog Content"
              multiline
              minRows={10}
              maxRows={Infinity}
              variant="outlined"
              fullWidth
              placeholder="Start writing your masterpiece..."
            />

            <div className="mt-5">
              <Button type="submit" variant="contained">
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
