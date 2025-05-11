import LogoIcon from '/src/assets/images/logos/dental-crm-icon.svg'
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
   <Link to={'/'}>
      <img src={LogoIcon} alt="Dental CRM logo" />
    </Link>
  )
}

export default Logo
