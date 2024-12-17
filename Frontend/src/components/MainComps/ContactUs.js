import React, { useContext, useEffect, useState } from "react";
import { datatransfer } from '../../App'
import { toast } from "react-toastify";

const ContactUs = () => {

  const { userdetail } = useContext(datatransfer)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  if(userdetail.firstname===undefined){
    toast.error(`Login First`, {
      position: "bottom-center",
      autoClose: 3000
    });
    userdetail.firstname = " " ;
    userdetail.lastname=""
    userdetail.email=""
    setFormData({
      name: "",
      email: "",
      message:""
    });
  }

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
          "Authorization":`${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        toast.success("Your message has been sent successfully!", {
          position: "bottom-center",
          autoClose: 3000
        });
        
      } else {
        const result = await response.json();
        toast.success(`Failed to send message: ${result.message}`, {
          position: "bottom-center",
          autoClose: 3000
        });
      }
    } catch (error) {
      toast.error(`Login First`, {
        position: "bottom-center",
        autoClose: 3000
      });
    }
  };

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
      {/* {status && <p className="contact-status-message">{status}</p>} */}
    </div>
  );
};

export default ContactUs;
