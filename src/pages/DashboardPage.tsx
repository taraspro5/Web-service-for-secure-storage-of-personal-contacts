import { Contact } from "../components/Contact";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";

export function DashboardPage() {
  return (
    <>
      <Navbar />
      <Layout>
        <Contact />
      </Layout>
    </>
  );
}
