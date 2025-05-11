import Logo from "/src/assets/images/logos/dental-crm-logo-basic.svg";

const FullLogo = () => {
  return (
    <a href="/" className="flex items-center justify-center h-full">
      <img src={Logo} alt="Dental CRM logo" className="h-8 w-auto" />
    </a>
  );
};

export default FullLogo;
