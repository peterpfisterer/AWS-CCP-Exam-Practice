import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';  // Brand icon

const FooterComponent = () => {
  return (
    <footer class="d-flex flex-wrap justify-content-center align-items-center py-3 mt-4 border-top">
        <div class="col-12 d-flex align-items-center justify-content-center">
            <span class="mb-md-0 text-muted">Created by Peter Pfisterer</span>
        </div>
        <div class="col-12 mt-md-2 d-flex align-items-center justify-content-center">
          <a href="https://github.com/peterpfisterer" target="_blank" rel="noreferrer" class="footer-icon">
            <FontAwesomeIcon icon={faGithub} size="2x"/>
          </a>
        </div>
    </footer>
  );
};

export default FooterComponent