import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { Signup } from "../components/Signup";

export function SignupPage() {
  return (
    <>
      <Navbar />
      <Layout>
        <Signup />
      </Layout>
    </>
  );
}
