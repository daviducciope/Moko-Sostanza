import Logo from "/src/assets/images/logos/dental-crm-logo-basic.svg";
import { Link } from "react-router";

const FullLogo = () => {
  return (
    <Link to={"/"}>
      <img src={Logo} alt="Dental CRM logo" className="block" />
    </Link>
  );
};

export default FullLogo;
