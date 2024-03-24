import AppNavbar from "../../Components/AppNavbar";

export default function DefaultLayout({ children }) {
  return (
    <>
      <AppNavbar />
      {children}
    </>
  );
}
