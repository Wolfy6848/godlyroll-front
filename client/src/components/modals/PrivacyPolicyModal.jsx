import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

// Custom Styles
const useStyles = makeStyles(theme => ({
  modal: {
    minHeight: "35rem",
    width: "100%",
    "& .MuiDialog-paperWidthSm": {
      scrollbarWidth: "none",
      background: "#050614",
      borderRadius: "0.5em",
      color: "#fff",
      maxWidth: "800px",
      scrollbarWidth: "none",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        margin: "15px",
        marginTop: "80px",
        maxHeight: "80%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        margin: "15px",
        marginTop: "80px",
        maxHeight: "80%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
        margin: "15px",
        marginTop: "80px",
        maxHeight: "80%",
      },
    },
  },
  titleBox: {
    display: "flex",
    boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
    alignItems: "center",
    paddingTop: "1em",
    paddingLeft: "1.5em",
    paddingRight: "1em",
    paddingBottom: "1em",
    fontFamily: "Poppins", 
    backgroundColor: "#101123", 
    justifyContent: "space-between",
    width: "100%"
  },
  content: {
    padding: "1.5em",
    display: "block",
    "& img": {
      width: "5rem",
      marginBottom: "1rem",
    },
    "& h1": {
      margin: "0 0 2rem 0",
      color: "#b9b9b9",
      fontFamily: "Poppins",
      fontSize: "19px",
      fontWeight: 500,
    },
    "& b": {
      color: "#9d9d9d",
      fontFamily: "Poppins",
      fontSize: "16px",
      fontWeight: 500,
      letterSpacing: ".005em",
    },
  },
  buttonIcon: {
    color: "#9E9FBD",
    marginRight: ".5em",
    fill: "currentColor",
    flex: "none",
    width: "1.25em",
    height: "1.25em",
    display: "inline-block",
    outline: "none",
  },
  ol: {
    marginBlockEnd: 0,
    marginBlockStart: "1em",
    paddingInlineStart: "2em",
    color: "hsl(220, 22%, 90%)"
  }
}));

const PrivacyPolicyModal = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.modal}
      onClose={handleClose}
      style={{ fontFamily: "Poppins", }}
      open={open}
    >
      <div className={classes.titleBox} onClose={handleClose} >
        <span style={{flex: "auto", fontSize: "1.5rem", color: "#E0E4EB" }}>Privacy Policy</span>
        <svg className={classes.buttonIcon} style={{cursor: "pointer"}} onClick={() => handleClose()} fill="currentColor" tabIndex="-1" viewBox="0 0 320 512"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>
      </div>
      <div className={classes.content}>
        <div style={{color: "hsl(220, 22%, 90%)"}}>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Introduction</h2>
          </div>
          <p>
            MM2Stash ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website mm2stash.com ("Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Information We Collect</h2>
          </div>
          <p>
            <b>Personal Information:</b> When you register on our website, we may collect personal information such as your name, email address, date of birth, and payment information. This information is necessary for account creation, deposits, and withdrawals.
          </p>
          <p>
            <b>Usage Data:</b> We collect information on how our services are accessed and used. This may include your IP address, browser type, operating system, the pages of our Site that you visit, the time and date of your visit, and other diagnostic data.
          </p>
          <p>
            <b>Cookies and Tracking Technologies:</b> We use cookies and similar tracking technologies to track activity on our Site and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Use of Your Information</h2>
          </div>
          <p>We use the information we collect in the following ways:</p>
          <p>
            <b>To Provide and Maintain Our Service:</b> Ensuring that our services function correctly, processing transactions, and providing customer support.
          </p>
          <p>
            <b>To Improve Our Service:</b> Analyzing how users interact with our website to enhance user experience and optimize our services.
          </p>
          <p>
            <b>To Communicate with You:</b> Sending you updates, notifications, and other information related to your account and our services.
          </p>
          <p>
            <b>To Ensure Security and Prevent Fraud:</b> Monitoring and verifying activity to prevent and detect fraudulent activities and ensure the security of our platform.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Disclosure of Your Information</h2>
          </div>
          <p>
            <b>No Third-Party Sharing:</b> We do not share, sell, rent, or trade your personal information with any third parties. Your information will remain solely within our database.
          </p>
          <p>
            <b>Legal Requirements:</b> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Data Security</h2>
          </div>
          <p>
            <b>Protection Measures:</b> We use administrative, technical, and physical security measures to protect your personal information from unauthorized access, use, or disclosure.
          </p>
          <p>
            <b>Data Retention:</b> We retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. When your information is no longer required, we will securely delete or anonymize it.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Your Rights</h2>
          </div>
          <p>
            <b>Access and Update:</b> You have the right to access and update your personal information at any time through your account settings.
          </p>
          <p>
            <b>Deletion:</b> You may request the deletion of your personal information by contacting us. We will comply with your request to the extent required by applicable law.
          </p>
          <p>
            <b>Opt-Out:</b> You can opt-out of receiving promotional communications from us by following the unsubscribe link in the emails we send or by contacting us directly.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Children's Privacy</h2>
          </div>
          <p>
            Our website and services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have inadvertently received personal information from a user under the age of 18, we will delete such information from our records.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Changes to This Privacy Policy</h2>
          </div>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Contact Us</h2>
          </div>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@mm2stash.com" style={{color: "hsl(274, 100%, 69%)"}}>support@mm2stash.com</a>.
          </p>
          <p>
            By using our website, you acknowledge that you have read, understood, and agreed to this Privacy Policy. Thank you for trusting MM2Stash with your information.
          </p>
        </div>
      </div>
    </Dialog>
  );
};

export default PrivacyPolicyModal;
