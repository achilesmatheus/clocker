import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { useAuthentication } from "./../Auth";

import {
  Container,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Coloque o email"),
  username: yup.string().required("Coloque o usuário"),
  password: yup.string().required("Coloque a senha"),
});

export default function Cadastro() {
  const [authentication, { signup }] = useAuthentication();
  const router = useRouter();

  const formik = useFormik({
    onSubmit: signup,
    validationSchema,
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    authentication.user && router.push("/agenda");
  }, [authentication, router]);

  if (authentication.loading) return "Carregando";

  return (
    <Container p={2} centerContent>
      <Heading p={2}>Login</Heading>
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

        <FormControl id="username" p={2} isRequired>
          <InputGroup>
            <InputLeftAddon>clocker.work</InputLeftAddon>
            <Input
              name="username"
              type="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </InputGroup>
          {formik.touched.username && (
            <FormHelperText>{formik.errors.username}</FormHelperText>
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
      <Link href="/">Já tem cadastro? Faça login</Link>
    </Container>
  );
}
