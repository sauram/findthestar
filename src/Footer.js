// Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-black py-4">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-white">Made by Saurabh Singh Gautam @2023</p>

        <div className="flex ml-4">
          <a
            href="https://www.linkedin.com/in/saurabhsinghgautam228/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2 hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
          <a
            href="https://github.com/sauram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2 hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
