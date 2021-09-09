import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useAuthentication } from "./../Auth";

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

const validationSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Coloque o email"),
  password: yup.string().required("Coloque a senha"),
});

export default function Login() {
  const [authentication, { login }] = useAuthentication();
  const router = useRouter();

  const formik = useFormik({
    onSubmit: login,
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
