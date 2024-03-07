import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';

const ContactPage = () => {
  // For fields of userInputs
  const [inputs, setInputs] = useState({
    name: '',
    emailId: '',
    phone: '',
    message: '',
  });

  // useState vraible whether to send the email or not
  const [sendCopy, setSendCopy] = useState(false);

  // The data is been sending on Google sheets or the email is been sending
  const [sendingData, setSendingData] = useState(false);

  // Port here comes from the backend app.js
  const port = `${window.location.origin}`;
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  // It is to add classes on label tags
  const handleFocus = async (e) => {
    e.target.previousElementSibling.classList.add('placeholder-up');
    if (e.target.value) {
      e.target.previousElementSibling.classList.add('placeholder-up');
    }
  };

  // Used to remove classes from label tag
  const handleBlur = (e) => {
    if (!e.target.value) {
      e.target.previousElementSibling.classList.remove('placeholder-up');
    }
  };
  const handleCheckBoxChange = () => {
    setSendCopy(!sendCopy);
  };
  const notify = () =>
    toast.info("Thanks for Contacting!!Soon I'll get in touch with you", {
      icon: false,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendingData(true);

    // If any of the field is empty, alert will be displayed and return setting the sendingData as false
    if (!inputs.name || !inputs.emailId || !inputs.phone || !inputs.message) {
      alert("You can't leave any field blank");
      setSendingData(false);
      return;
    }

    // If email doesn't have a proper vailidation, alert will be displayed and returned
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.emailId)) {
      alert('Please enter a valid email address');
      setSendingData(false);
      return;
    }

    // If email has to send then this function will be triggered
    if (sendCopy) {
      await axios.post(`${port}/sentMail`, inputs).then((res) => {
        if (res.data.message === 'Wrong Email Address') {
          toast.error('Your Email Address is incorrect');
        }
      });
    }
    // This try-catch block is to send data in google sheets
    try {
      const data = {
        Name: inputs.name,
        EmailID: inputs.emailId,
        Phone: inputs.phone,
        Message: inputs.message,
      };
      // Sheet-base API here
      await axios
        .post(
          'https://sheet.best/api/sheets/6cd2c559-1a5a-45a7-a80e-67e60479d55b',
          data
        )
        .then((res) => {
          console.log(res);
          setInputs({ name: '', emailId: '', phone: '', message: '' });
        });
      document.querySelectorAll('.absolute').forEach((label) => {
        label.classList.remove('placeholder-up');
      });
      setSendingData(false);
      notify();
    } catch (error) {
      console.error('Error submitting form data:', error);
      setSendingData(false);
    }
  };
  return (
    <div className="flex lg:justify-around md:justify-around justify-center items-center lg:h-screen  md:h-screen lg:flex-row md:flex-row flex-col">
      <ToastContainer icon={false} />
      <div
        className=" flex justify-center items-center flex-col lg:mr-9"
        style={{ fontFamily: 'sans-serif' }}
      >
        <h1 className="text-4xl     mb-11 mt-11 lg:text-5xl font-semibold text-white lg:mb-11 md:mb-12 md:text-4xl ">
          Hello, My Name is <br />
          <span className="text-blue-400">
            {' '}
            Khushi <br /> Sharma
          </span>
        </h1>
        <h3 className="text-3xl  mb-5 lg:text-4xl md:text-4xl font-semibold text-white">
          Contact <span className="text-blue-400"> Me</span>
        </h3>
        <h4 className="text-center text-xl md:text-lg text-white lg:px-0 md:px-0 px-4 ">
          Have questions or need assistance? <br />
          Fill out the form below, and I will get in touch with you shortly.
        </h4>

        <h3 className="text-xl text-white mt-9" id="reachme">
          Reach out to Me at :{' '}
        </h3>
        <div className="flex justify-center items-center h-12 gap-12 mt-7">
          <a href="https:///github.com/khushiii01" target="_blank">
            <FaGithub className="text-white rounded-md text-3xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-125 hover:bg-white hover:text-black" />
          </a>
          <a
            href="https://www.linkedin.com/in/khushi-sharma-a5a662228/"
            target="_blank"
          >
            <FaLinkedin className="text-white rounded-md text-3xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-125 hover:bg-blue-400 hover:text-black" />
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-6 lg:px-24 md:px-12 py-10">
        <div className="relative w-full">
          <label
            className="absolute left-5 top-3 transition-all duration-300 ease-in-out text-sm text-gray-400 pointer-events-none"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            className="border border-gray-400 px-5 py-3 rounded-xl w-full focus:outline-none focus:ring focus:border-blue-500"
            name="name"
            value={inputs.name}
            onChange={change}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex flex-col lg:flex-row md:flex-row gap-6">
          <div className="relative flex-1">
            <label
              className="absolute left-5 top-3 transition-all duration-300 ease-in-out text-sm text-gray-400 pointer-events-none"
              htmlFor="emailId"
            >
              EmailId
            </label>
            <input
              type="email"
              className="border border-gray-400 px-5 py-3 rounded-xl w-full focus:outline-none focus:ring focus:border-blue-500"
              name="emailId"
              value={inputs.emailId}
              onChange={change}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div className="relative flex-1">
            <label
              className="absolute left-5 top-3 transition-all duration-300 ease-in-out text-sm text-gray-400 pointer-events-none"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="number"
              className="border border-gray-400 px-5 py-3 rounded-xl w-full focus:outline-none focus:ring focus:border-blue-500"
              name="phone"
              value={inputs.phone}
              onChange={change}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
        <div className="relative">
          <label
            className="absolute left-5 top-3 transition-all duration-300 ease-in-out text-sm text-gray-400 pointer-events-none"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            rows={6}
            className="border border-gray-400 px-5 py-3 rounded-xl w-full focus:outline-none focus:ring focus:border-blue-500"
            name="message"
            value={inputs.message}
            onChange={change}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="checkbox"
            checked={sendCopy}
            onChange={handleCheckBoxChange}
            className="cursor-pointer w-4 h-4"
          />

          <label
            htmlFor="checkbox"
            className="text-white lg:text-lg md:text-lg "
            style={{ fontFamily: 'sans-serif' }}
          >
            Send me a copy of this message
          </label>
        </div>

        {/* Used Daisy UI component &  tailwind classes along with the sendingData conditional rendering */}
        {/* If sendinData is true then it will be loaded else it will not */}
        <button
          className="px-6 py-3 bg-blue-800 rounded-full text-white outline-none cursor-pointer hover:bg-black hover:text-white focus:bg-black focus:text-white focus:outline-"
          onClick={handleSubmit}
        >
          <span className={sendingData ? 'loading loading-spinner' : ''}>
            Submit
          </span>
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
