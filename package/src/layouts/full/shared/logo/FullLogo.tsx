import Logo from "/src/assets/images/logos/dental-crm-logo-basic.svg";
import { Link } from "react-router";

const FullLogo = () => {
  return (
    <Link to={"/"} className="flex items-center justify-center h-full">
      <img src={Logo} alt="Dental CRM logo" className="h-8 w-auto" />
    </Link>
  );
};

export default FullLogo;
