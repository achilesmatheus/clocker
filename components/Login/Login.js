import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import app from "./../../config/firebase/index";

import {
  Container,
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
} from "@chakra-ui/react";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import { useEffect } from "react";

const validationSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Coloque o email"),
  password: yup.string().required("Coloque a senha"),
});

export default function Login() {
  const auth = getAuth(app);

  const formik = useFormik({
    onSubmit: async (values, form) => {
      // Firebase state persistent auth
      setPersistence(auth, browserSessionPersistence);

      try {
        const user = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        console.log(user);
      } catch (error) {
        console.log("ERROR:", error);
      }
    },
    validationSchema,
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    console.log("Active Session: ", auth.currentUser);
  }, [auth]);

  return (
    <Container p={2} centerContent>
      <Heading p={2}>Clocker.io</Heading>
      <Box p={2}>
        <Text>Crie sua agenda</Text>
      </Box>
      <Box>
        <FormControl id="email" p={2} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && (
            <FormHelperText>{formik.errors.email}</FormHelperText>
          )}
        </FormControl>

        <FormControl id="password" p={2} isRequired>
          <FormLabel>Senha</FormLabel>
          <Input
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && (
            <FormHelperText>{formik.errors.password}</FormHelperText>
          )}
        </FormControl>

        <Box p={2}>
          <Button
            colorScheme="blue"
            onClick={formik.handleSubmit}
            isLoading={formik.isSubmiting}
            w="100%"
          >
            Entrar
          </Button>
        </Box>
      </Box>
      <Link href="/cadastro">Ainda não tem uma conta? Cadastre-se</Link>
    </Container>
  );
}
