import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 text-center flex flex-col gap-2">
        <p>
          &copy; {new Date().getFullYear()}. DeshDokan. All rights reserved.
        </p>
        <div className="flex items-center gap-4 justify-center text-2xl">
          <a href="" className="hover:text-primary-light">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-primary-light">
            <FaInstagram />
          </a>
          <a href="" className="hover:text-primary-light">
            <FaLinkedin/>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
