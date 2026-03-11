import React, { useState } from "react";
import { Link } from "react-router-dom";

const Feedback = () => {

  const [formData, setFormData] = useState({
    rating: "",
    feedback: "",
    name: "",
    email: "",
    allowContact: false,
    file: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleFile = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("rating", formData.rating);
    data.append("feedback", formData.feedback);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("allowContact", formData.allowContact);
    data.append("file", formData.file);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        body: data
      });

      const result = await res.json();

      if (res.ok) {
        alert("Feedback submitted successfully!");
        setFormData({
          rating: "",
          feedback: "",
          name: "",
          email: "",
          allowContact: false,
          file: null
        });
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-8 max-w-3xl text-center">

      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        Leave a Feedback
      </h2>

      <p className="max-w-2xl mx-auto">
        Sharing your thoughts? If you would like to give feedback on our website
        based on the services we provide or the food items we offer, please
        complete the form below.
      </p>

      <br />

      <p>
        The data we collect is stored on a secure server. For more details,
        please read the FoodByAma{" "}
        <Link to="/privacy" className="text-primary underline">
          Privacy Policy
        </Link>
      </p>

      <br/><br/>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Rating */}
        <div>
          <h4 className="text-lg font-medium mb-2">
            How satisfied were you with the FoodByAma website today?
          </h4>

          <div className="flex items-center justify-center flex-wrap gap-4 text-sm">

            {[
              "Very dissatisfied",
              "Dissatisfied",
              "Neutral",
              "Satisfied",
              "Very satisfied"
            ].map((option) => (
              <label
                key={option}
                className="flex flex-col items-center gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer"
              >
                {option}
                <input
                  type="radio"
                  name="rating"
                  value={option}
                  checked={formData.rating === option}
                  onChange={handleChange}
                />
              </label>
            ))}

          </div>
        </div>

        {/* Feedback */}
        <div>
          <textarea
            name="feedback"
            rows={4}
            value={formData.feedback}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg w-full p-4"
            placeholder="Enter your feedback here..."
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Attach Screenshot (optional)
          </label>

          <input
            type="file"
            onChange={handleFile}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Contact permission */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            name="allowContact"
            checked={formData.allowContact}
            onChange={handleChange}
          />

          <span className="text-sm">
            I am happy to be contacted about my feedback
          </span>
        </div>

        {/* Name & Email */}
        {formData.allowContact && (
          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="border p-3 rounded"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="border p-3 rounded"
              value={formData.email}
              onChange={handleChange}
            />

          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90"
        >
          Submit Feedback
        </button>

      </form>

    </div>
  );
};

export default Feedback;