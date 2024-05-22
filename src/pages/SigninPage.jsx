import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { Signin } from "../components/Signin";

export function SigninPage() {
  return (
    <>
      <Navbar />
      <Layout>
        <Signin />
      </Layout>
    </>
  );
}
