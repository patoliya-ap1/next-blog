"use client";
import { useFormik } from "formik";
import { loginSchema } from "@/utility/loginSchema";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { globalState } from "../app/store";

interface InitialValues {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const { toggleLogin,addUser } = globalState();

  const initialValues: InitialValues = { email: "", password: "" };

  const [loginError, setLoginError] = useState(null);

  const loginPost = async (loginInfo: InitialValues) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });

    const data = await response.json();

    if (data.status === 200) {
      setLoginError(null);

      router.replace("/");
      addUser(data.user.email)
      localStorage.setItem("user", JSON.stringify(data.user.email));
      toggleLogin(true);
    } else {
      setLoginError(data.message);
    }
  };

  const handleLogin = (values: InitialValues) => {
    loginPost(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleLogin,
    validationSchema: loginSchema,
  });

  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="w-120 shadow-md p-5 h-80 flex justify-center items-center">
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <div className="h-18 w-100">
            <TextField
              type="email"
              name="email"
              variant="outlined"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email && formik.touched.email ? true : false}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
              fullWidth
            />
          </div>
          <div className="h-18">
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
                formik.errors.password && formik.touched.password ? true : false
              }
              helperText={formik.touched.password && formik.errors.password}
              onBlur={formik.handleBlur}
            />
          </div>
          <Button type="submit" variant="contained">
            Login
          </Button>
          <div className="mt-3 text-red-500">
            <p>{loginError}</p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
