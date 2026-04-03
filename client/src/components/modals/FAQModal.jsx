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

const AmlPolicyModal = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.modal}
      onClose={handleClose}
      style={{ fontFamily: "Poppins", }}
      open={open}
    >
      <div className={classes.titleBox} onClose={handleClose} >
        <span style={{flex: "auto", fontSize: "1.5rem", color: "#E0E4EB" }}>AML Policy</span>
        <svg className={classes.buttonIcon} style={{cursor: "pointer"}} onClick={() => handleClose()} fill="currentColor" tabIndex="-1" viewBox="0 0 320 512"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>
      </div>
      <div className={classes.content}>
        <div style={{color: "hsl(220, 22%, 90%)"}}>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Introduction</h2>
          </div>
          <p>
            MM2Stash ("we," "our," "us") is committed to the highest standards of anti-money laundering (AML) compliance and counter-terrorist financing (CTF). This AML Policy outlines our commitment to preventing the use of our services for money laundering or any activity that facilitates money laundering or the funding of terrorist or criminal activities.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Objectives</h2>
          </div>
          <p>
            <b>Compliance with Laws:</b> Ensure compliance with all applicable AML and CTF laws and regulations.
          </p>
          <p>
            <b>Risk Mitigation:</b> Identify and mitigate risks associated with money laundering and terrorist financing.
          </p>
          <p>
            <b>User Awareness:</b> Educate our users on the importance of AML and the measures we take to prevent illegal activities on our platform.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>User Verification</h2>
          </div>
          <p>
            <b>Know Your Customer (KYC):</b> We implement KYC procedures to verify the identity of our users. Users are required to provide valid identification documents, such as a government-issued ID, and proof of address. In order to increase their limits.
          </p>
          <p>
            <b>Age Verification:</b> Users must be at least 18 years old to use our services. We verify the age of our users during the KYC process.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Deposit and Wagering Policy</h2>
          </div>
          <p>
            <b>100% Wagering Requirement:</b> Users must wager 100% of their deposit amount before being eligible to withdraw any funds. This policy is in place to ensure that our platform is not used for money laundering activities.
          </p>
          <p>
            <b>Transaction Monitoring:</b> We monitor all transactions on our platform to identify and report suspicious activities. Any unusual or suspicious activity will be investigated, and appropriate action will be taken.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Suspicious Activity Reporting</h2>
          </div>
          <p>
            <b>Internal Reporting:</b> Our staff is trained to identify and report suspicious activities. Any suspicious transactions or behaviors will be reported to our compliance team for further investigation.
          </p>
          <p>
            <b>External Reporting:</b> We will report any suspicious activities to the relevant authorities in compliance with applicable laws and regulations.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>User Responsibilities</h2>
          </div>
          <p>
            <b>Accurate Information:</b> Users must provide accurate and complete information during the registration and verification process. Providing false information is strictly prohibited and will result in account suspension or termination.
          </p>
          <p>
            <b>Compliance with Policies:</b> Users must comply with our Terms of Service, Privacy Policy, and this AML Policy. Failure to comply may result in account suspension, termination, or legal action.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Internal Controls and Training</h2>
          </div>
          <p>
            <b>Internal Controls:</b> We maintain robust internal controls to prevent and detect money laundering and terrorist financing activities. These controls include transaction monitoring, user verification, and regular audits.
          </p>
          <p>
            <b>Employee Training:</b> Our employees receive regular training on AML and CTF regulations, recognizing suspicious activities, and reporting procedures.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Record Keeping</h2>
          </div>
          <p>
            <b>Transaction Records:</b> We maintain detailed records of all transactions, including deposits, wagers, and withdrawals, for a minimum of five years.
          </p>
          <p>
            <b>User Documentation:</b> We retain copies of user identification and verification documents for a minimum of five years following the termination of the user’s account.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Cooperation with Authorities</h2>
          </div>
          <p>
            We cooperate fully with law enforcement and regulatory authorities in the investigation and prosecution of money laundering and terrorist financing activities. This includes providing access to relevant records and documentation upon request.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Policy Review and Updates</h2>
          </div>
          <p>
            We regularly review and update our AML Policy to ensure compliance with applicable laws and regulations and to address emerging risks. Users will be notified of any significant changes to this policy.
          </p>
          <div style={{color: "hsl(274, 100%, 69%)"}}>
            <h2>Contact Information</h2>
          </div>
          <p>
            If you have any questions or concerns about this AML Policy, please contact us at <a href="mailto:support@mm2stash.com" style={{color: "hsl(274, 100%, 69%)"}}>support@mm2stash.com</a>.
          </p>
          <p>
            By using our website, you acknowledge that you have read, understood, and agreed to this AML Policy. Thank you for helping us maintain a safe and compliant platform at MM2Stash.
          </p>
        </div>
      </div>
    </Dialog>
  );
};

export default AmlPolicyModal;
