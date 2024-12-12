import React, { useContext, useEffect, useState } from "react";
import { datatransfer } from '../../App'

const ContactUs = () => {

  const { userdetail, getuserdetail } = useContext(datatransfer)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      name: userdetail.firstname + " " + userdetail.lastname,
      email: userdetail.email,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/api/auth/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const result = await response.json();
        setStatus(`Failed to send message: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred while sending your message.");
    }
  };

  // useEffect(() => {
  //   if (userdetail.length === 0) {
  //     getuserdetail();
  //     console.log(userdetail)
  //   }
  //   else {
  //     setFormData({ ...formData, name: userdetail.firstname + " " + userdetail.lastname, email: userdetail.email });
  //   }
  // }, [])
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-group">
          <label className="contact-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="contact-input"
            value={userdetail.firstname + " " + userdetail.lastname}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="contact-form-group">
          <label className="contact-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="contact-input"
            value={userdetail.email}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="contact-form-group">
          <label className="contact-label">Message</label>
          <textarea
            id="message"
            name="message"
            className="contact-textarea"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Write your message"
          ></textarea>
        </div>
        <button type="submit" className="contact-button">Send Message</button>
      </form>
      {status && <p className="contact-status-message">{status}</p>}
    </div>
  );
};

export default ContactUs;
