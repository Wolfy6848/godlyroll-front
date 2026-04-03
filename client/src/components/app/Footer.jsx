import React, { useState } from 'react';
import { motion } from "framer-motion";
import { makeStyles } from '@material-ui/core/styles';
import logo from "../../assets/navbar/logo.svg";
import FAQModal from '../modals/FAQModal';
import TermsModal from '../modals/TermsModal';
import PrivacyPolicyModal from '../modals/PrivacyPolicyModal';
import AMLPolicyModal from '../modals/AMLPolicyModal';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: "0.5rem",
    color: '#fff',
    padding: '40px 0',
    fontFamily: 'Poppins, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: "15px",
    maxHeight: "350px",
    position: 'relative',
  },
  container: {
    maxHeight: "350px",
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
  },
  column: {
    flexBasis: '10%',
    marginBottom: '20px',
  },
  title: {
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '20px',
  },
  brandLogo: {
    height: "50px",
    width: "180px",
  },
  link: {
    display: 'block',
    color: '#999',
    fontSize: '10px',
    marginBottom: '10px',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      color: '#fff',
    },
  },
  socialIcons: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  legalText: {
    fontSize: '9px',
    color: '#999',
    marginTop: '40px',
    textAlign: 'left',
  },
  overlay: {
    position: 'absolute',
    right: '-100px',
    top: '-77px',
    width: '620px',
    height: '570px',
    mixBlendMode: 'overlay',
    opacity: 0.4,
    zIndex: 1,
  },
  ageRestriction: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    color: '#999',
    marginTop: '20px',
  },
  ageIcon: {
    width: '24px',
    height: '24px',
    marginRight: '10px',
  },
  closeModalButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
}));

const Footer = () => {
  const classes = useStyles();
  const [isFAQModalOpen, setFAQModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [isPrivacyPolicyModalOpen, setPrivacyPolicyModalOpen] = useState(false);
  const [isAMLPolicyModalOpen, setAMLPolicyModalOpen] = useState(false);

  const openFAQModal = () => setFAQModalOpen(true);
  const closeFAQModal = () => setFAQModalOpen(false);

  const openTermsModal = () => setTermsModalOpen(true);
  const closeTermsModal = () => setTermsModalOpen(false);

  const openPrivacyPolicyModal = () => setPrivacyPolicyModalOpen(true);
  const closePrivacyPolicyModal = () => setPrivacyPolicyModalOpen(false);

  const openAMLPolicyModal = () => setAMLPolicyModalOpen(true);
  const closeAMLPolicyModal = () => setAMLPolicyModalOpen(false);

  const closeModalIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z" fill="#000"/>
    </svg>
  );

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.column} style={{ flexBasis: "400px"}}>
          <motion.img whileTap={{ scale: 0.97 }} className={classes.brandLogo} src={logo} />
          <div className={classes.socialIcons}>
            <a href="https://x.com/mm2stash" target="_blank" rel="noopener noreferrer">
              <svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.99611 20.904C18.6994 20.904 24.0081 12.8632 24.0081 5.90229C24.0081 5.67729 24.0081 5.44972 23.9978 5.22472C25.0319 4.47651 25.9244 3.55003 26.6335 2.48872C25.6667 2.91429 24.6445 3.19586 23.5967 3.32186C24.7004 2.6622 25.5269 1.62413 25.9225 0.400722C24.8855 1.01534 23.7503 1.44679 22.5668 1.67615C21.7717 0.829434 20.7195 0.268532 19.5733 0.0803176C18.4271 -0.107897 17.2508 0.0870788 16.2266 0.635047C15.2024 1.18301 14.3875 2.0534 13.9081 3.11139C13.4286 4.16938 13.3114 5.35594 13.5745 6.48729C11.4768 6.38221 9.42451 5.83734 7.55089 4.88801C5.67727 3.93868 4.02412 2.60611 2.69868 0.976722C2.02601 2.13882 1.82084 3.51336 2.12482 4.82124C2.42881 6.12912 3.21916 7.27227 4.3354 8.01858C3.49873 7.99025 2.68043 7.76564 1.94654 7.36286V7.43615C1.94813 8.65342 2.36993 9.83281 3.14065 10.775C3.91137 11.7172 4.98374 12.3644 6.17654 12.6073C5.72387 12.7321 5.25625 12.7944 4.78668 12.7924C4.45497 12.7924 4.12454 12.7629 3.79925 12.7011C4.13653 13.7491 4.79311 14.6653 5.67704 15.3214C6.56098 15.9776 7.628 16.3408 8.72868 16.3603C6.8589 17.829 4.54919 18.6256 2.17154 18.6219C1.75257 18.6233 1.33392 18.5988 0.917969 18.5486C3.3312 20.0875 6.13395 20.9047 8.99611 20.904Z" fill="url(#paint0_linear_587_2312)"/>
                <defs>
                  <linearGradient id="paint0_linear_587_2312" x1="13.7758" y1="0.0105286" x2="13.7758" y2="20.904" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#B95FFF"/>
                    <stop offset="1" stop-color="#A32DFF"/>
                  </linearGradient>
                </defs>
              </svg>
            </a>

            <a href="https://discord.gg/mm2stash" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.9045 2.02453C18.4492 1.34966 16.911 0.870219 15.3299 0.59867C15.3159 0.598282 15.302 0.600957 15.2891 0.606509C15.2762 0.61206 15.2647 0.620354 15.2554 0.630813C15.0625 0.984384 14.8375 1.44596 14.6871 1.79953C12.9822 1.54238 11.2491 1.54238 9.54424 1.79953C9.37524 1.39859 9.18202 1.0083 8.96566 0.630813C8.95538 0.610241 8.92323 0.59867 8.89109 0.59867C7.30999 0.871682 5.77156 1.35106 4.31523 2.02453C4.30495 2.02453 4.29466 2.03481 4.28309 2.0451C1.36966 6.40624 0.566092 10.6491 0.962092 14.8495C0.962092 14.8714 0.972378 14.892 0.994235 14.9035C2.92281 16.3178 4.77681 17.1741 6.60895 17.7424C6.64109 17.7527 6.67323 17.7424 6.68352 17.7205C7.11166 17.1317 7.49738 16.5107 7.83038 15.8562C7.85095 15.8138 7.83038 15.7701 7.78666 15.7598C7.17595 15.5245 6.59738 15.2455 6.03038 14.9241C5.98666 14.9035 5.98666 14.8392 6.01881 14.8071C6.13709 14.721 6.25538 14.6245 6.37238 14.5384C6.38235 14.5289 6.39504 14.5229 6.40865 14.521C6.42226 14.5192 6.43611 14.5217 6.44824 14.5281C10.1331 16.2098 14.1085 16.2098 17.7509 14.5281C17.7631 14.5217 17.7769 14.5192 17.7905 14.521C17.8041 14.5229 17.8168 14.5289 17.8268 14.5384C17.9438 14.6348 18.0621 14.721 18.1804 14.8174C18.2228 14.8495 18.2228 14.9138 18.1688 14.9344C17.6081 15.2621 17.0205 15.5417 16.4125 15.7701C16.3688 15.7817 16.3585 15.8344 16.3688 15.8665C16.7121 16.521 17.0978 17.142 17.5157 17.7308C17.5478 17.7424 17.5799 17.7527 17.6121 17.7424C19.6354 17.1236 21.5379 16.1631 23.2371 14.9022C23.2468 14.8973 23.2549 14.8897 23.2606 14.8804C23.2663 14.8711 23.2693 14.8604 23.2692 14.8495C23.7411 9.99596 22.4875 5.78524 19.9482 2.0451C19.9367 2.03481 19.9264 2.02453 19.9045 2.02453ZM8.38709 12.2884C7.28395 12.2884 6.36209 11.2701 6.36209 10.0165C6.36209 8.76296 7.26209 7.74596 8.38709 7.74596C9.52238 7.74596 10.4224 8.77453 10.4121 10.0178C10.4121 11.2701 9.51209 12.2884 8.38709 12.2884ZM15.8545 12.2884C14.7514 12.2884 13.8295 11.2701 13.8295 10.0165C13.8295 8.76296 14.7295 7.74596 15.8545 7.74596C16.9911 7.74596 17.8911 8.77453 17.8795 10.0178C17.8795 11.2701 16.9911 12.2884 15.8545 12.2884Z" fill="url(#paint0_linear_587_2315)"/>
                <defs>
                  <linearGradient id="paint0_linear_587_2315" x1="12.1175" y1="0.598633" x2="12.1175" y2="17.7466" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#B95FFF"/>
                    <stop offset="1" stop-color="#A32DFF"/>
                  </linearGradient>
                </defs>
              </svg>
            </a>

            <a href="https://kick.com/mm2stash" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-0.000244141 0H5.99976V3.99975H8V2.00025H10.0003V0H16.0003V6H14V8.00025H11.9998V9.99975H14V12H16.0003V18H10.0003V15.9998H8V14.0002H5.99976V18H-0.000244141V0Z" fill="url(#paint0_linear_587_2322)"/>
                <defs>
                  <linearGradient id="paint0_linear_587_2322" x1="8" y1="0" x2="8" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#B95FFF"/>
                    <stop offset="1" stop-color="#A32DFF"/>
                  </linearGradient>
                </defs>
              </svg>
            </a>

            <a href="https://twitch.tv/mm2stash" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.71 3.93H10.14V8.21H8.71M12.64 3.93H14.07V8.21H12.64M4.07 0L0.5 3.57V16.43H4.78V20L8.36 16.43H11.21L17.64 10V0M16.21 9.29L13.36 12.14H10.5L8 14.64V12.14H4.78V1.43H16.21V9.29Z" fill="url(#paint0_linear_587_2318)"/>
                <defs>
                  <linearGradient id="paint0_linear_587_2318" x1="9.07" y1="0" x2="9.07" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#B95FFF"/>
                    <stop offset="1" stop-color="#B14EFF"/>
                  </linearGradient>
                </defs>
              </svg>
            </a>
          </div>
          <div className={classes.legalText}>
            © 2024 MM2STASH. All Rights Reserved.<br /><br />
            MM2STASH is an independent platform and is not affiliated, associated, endorsed by,<br />
            or in any way officially connected with Roblox Corporation, its subsidiaries, or affiliates.<br />
            MM2STASH does not support the use of Roblox accounts or facilitate any transactions<br />
            involving Robux currency.
          </div>
          <div className={classes.ageRestriction}>
          <svg className={classes.ageIcon} width="48" height="47" viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" d="M45.6496 23.5C45.6496 35.648 35.7851 45.5 23.6114 45.5C11.4378 45.5 1.57324 35.648 1.57324 23.5C1.57324 11.352 11.4378 1.5 23.6114 1.5C35.7851 1.5 45.6496 11.352 45.6496 23.5Z" stroke="url(#paint0_linear_587_2299)" stroke-width="3"/>
            <path d="M12.408 31V17H14.668V31H12.408ZM9.60795 19.06V17H14.468V19.06H9.60795ZM21.6773 31.2C20.7173 31.2 19.884 31.0267 19.1773 30.68C18.4707 30.3333 17.9173 29.8533 17.5173 29.24C17.1307 28.6133 16.9373 27.9067 16.9373 27.12C16.9373 26.4933 17.0573 25.92 17.2973 25.4C17.5507 24.8667 17.9107 24.4133 18.3773 24.04C18.8573 23.6667 19.424 23.4 20.0773 23.24L20.0173 23.88C19.484 23.7333 19.0307 23.4933 18.6573 23.16C18.2973 22.8267 18.024 22.4333 17.8373 21.98C17.6507 21.5267 17.5573 21.0533 17.5573 20.56C17.5573 19.8133 17.7307 19.16 18.0773 18.6C18.4373 18.0267 18.9307 17.58 19.5573 17.26C20.184 16.94 20.8907 16.78 21.6773 16.78C22.4773 16.78 23.184 16.94 23.7973 17.26C24.424 17.58 24.9107 18.0267 25.2573 18.6C25.6173 19.16 25.7973 19.8133 25.7973 20.56C25.7973 21.0533 25.704 21.5267 25.5173 21.98C25.3307 22.4333 25.0573 22.8267 24.6973 23.16C24.3373 23.4933 23.884 23.7333 23.3373 23.88L23.2773 23.24C23.944 23.4 24.5107 23.6667 24.9773 24.04C25.444 24.4133 25.7973 24.8667 26.0373 25.4C26.2907 25.92 26.4173 26.4933 26.4173 27.12C26.4173 27.9067 26.224 28.6133 25.8373 29.24C25.4507 29.8533 24.8973 30.3333 24.1773 30.68C23.4707 31.0267 22.6373 31.2 21.6773 31.2ZM21.6773 29.12C22.1707 29.12 22.604 29.02 22.9773 28.82C23.364 28.62 23.664 28.3467 23.8773 28C24.104 27.6533 24.2173 27.26 24.2173 26.82C24.2173 26.3667 24.104 25.9733 23.8773 25.64C23.664 25.2933 23.364 25.02 22.9773 24.82C22.604 24.62 22.1707 24.52 21.6773 24.52C21.184 24.52 20.744 24.62 20.3573 24.82C19.984 25.02 19.684 25.2933 19.4573 25.64C19.244 25.9733 19.1373 26.3667 19.1373 26.82C19.1373 27.26 19.244 27.6533 19.4573 28C19.684 28.3467 19.984 28.62 20.3573 28.82C20.744 29.02 21.184 29.12 21.6773 29.12ZM21.6773 22.72C22.264 22.72 22.744 22.5333 23.1173 22.16C23.4907 21.7867 23.6773 21.3067 23.6773 20.72C23.6773 20.1333 23.4907 19.66 23.1173 19.3C22.744 18.9267 22.264 18.74 21.6773 18.74C21.104 18.74 20.624 18.9267 20.2373 19.3C19.864 19.66 19.6773 20.1333 19.6773 20.72C19.6773 21.3067 19.864 21.7867 20.2373 22.16C20.624 22.5333 21.104 22.72 21.6773 22.72ZM28.2144 25.3V23.3H37.0344V25.3H28.2144ZM31.6144 19.68H33.6544V28.9H31.6144V19.68Z" fill="url(#paint1_linear_587_2299)"/>
            <defs>
              <linearGradient id="paint0_linear_587_2299" x1="23.6114" y1="0" x2="23.6114" y2="47" gradientUnits="userSpaceOnUse">
                <stop stop-color="#B95FFF"/>
                <stop offset="1" stop-color="#9139FF"/>
              </linearGradient>
              <linearGradient id="paint1_linear_587_2299" x1="24.1123" y1="15" x2="24.1123" y2="33" gradientUnits="userSpaceOnUse">
                <stop stop-color="#B95FFF"/>
                <stop offset="1" stop-color="#9139FF"/>
              </linearGradient>
            </defs>
           </svg>

            18+ Only<br />
            Game responsibly
          </div>
        </div>
        <div className={classes.column}>
          <h3 className={classes.title}>About</h3>
          <a onClick={openFAQModal} className={classes.link}>FAQ</a>
          <a onClick={openTermsModal} className={classes.link}>Terms of Service</a>
          <a onClick={openPrivacyPolicyModal} className={classes.link}>Privacy Policy</a>
          <a onClick={openAMLPolicyModal} className={classes.link}>AML Policy</a>
        </div>
        <div className={classes.column}>
          <h3 className={classes.title}>Gamemodes</h3>
          <a href="/cases" className={classes.link}>Cases</a>
          <a href="/battles" className={classes.link}>Case Battles</a>
          <a href="/roulette" className={classes.link}>Roulette</a>
          <a href="/upgrader" className={classes.link}>Upgrader</a>
          <a href="/mines" className={classes.link}>Mines</a>
          <a href="/dice" className={classes.link}>Dice</a>
        </div>
        <div className={classes.column}>
          <h3 className={classes.title}>Support</h3>
          <a href="#" className={classes.link}>Support</a>
          <a href="#" className={classes.link}>Live Support</a>
          <a href="https://discord.gg/sponsorships" className={classes.link}>Sponsorship</a>
        </div>
      </div>

      <FAQModal open={isFAQModalOpen} onClose={closeFAQModal}>
        <button className={classes.closeModalButton} onClick={closeFAQModal}>
          {closeModalIcon}
        </button>
      </FAQModal>
      <TermsModal open={isTermsModalOpen} onClose={closeTermsModal}>
        <button className={classes.closeModalButton} onClick={closeTermsModal}>
          {closeModalIcon}
        </button>
      </TermsModal>
      <PrivacyPolicyModal open={isPrivacyPolicyModalOpen} onClose={closePrivacyPolicyModal}>
        <button className={classes.closeModalButton} onClick={closePrivacyPolicyModal}>
          {closeModalIcon}
        </button>
      </PrivacyPolicyModal>
      <AMLPolicyModal open={isAMLPolicyModalOpen} onClose={closeAMLPolicyModal}>
        <button className={classes.closeModalButton} onClick={closeAMLPolicyModal}>
          {closeModalIcon}
        </button>
      </AMLPolicyModal>
    </footer>
  );
};

export default Footer;
