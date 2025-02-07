import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";

const CreateTicket = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { BASE_URL, loading, token } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    try {
      if (!BASE_URL) {
        throw new Error("BASE_URL is not defined in the environment variables.");
      }
  
      // Prepare form data as a simple object
      const formData = {
        category: data.category,
        priority: data.priority,
        subject: data.subject,
        description: data.description,
      };

      // console.log("token",token);
  
      // Make the API call
      const response = await axios.post(`${BASE_URL}createTicket`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const responseData = response.data;
  
      if (responseData.success) {
        toast.success("Ticket created successfully! 🎉");
        reset(); // Reset the form
        navigate("/client-dashboard/my-ticket"); // Redirect to My Tickets page
      } else {
        toast.error("Ticket creation failed: " + responseData.message);
      }
    } catch (error) {
      console.error("Error during ticket creation:", error.message);
      toast.error(
        `An error occurred: ${
          error.response?.data?.message || "Please try again later."
        }`
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create a New Ticket</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block font-semibold mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            {...register("subject", { required: "Subject is required" })}
            className={`w-full p-3 border rounded-lg focus:outline-none ${
              errors.subject ? "border-red-500" : "border-slate-300"
            }`}
            placeholder="Enter the subject of your issue"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className={`w-full p-3 border rounded-lg focus:outline-none ${
              errors.description ? "border-red-500" : "border-slate-300"
            }`}
            rows="5"
            placeholder="Describe your issue in detail"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block font-semibold mb-2">
            Priority
          </label>
          <select
            id="priority"
            {...register("priority", { required: "Priority is required" })}
            className={`w-full p-3 border rounded-lg focus:outline-none ${
              errors.priority ? "border-red-500" : "border-slate-300"
            }`}
          >
            <option value="" disabled hidden>
              Select Priority
            </option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Normal</option>
            <option value="Low">Low</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-sm mt-1">
              {errors.priority.message}     
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block font-semibold mb-2">
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className={`w-full p-3 border rounded-lg focus:outline-none ${
              errors.category ? "border-red-500" : "border-slate-300"
            }`}
          >
            <option value="" disabled hidden>
              Select a Category
            </option>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing/Payment</option>
            <option value="Account">Account/Access Issues</option>
            <option value="General">General Queries</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full h-12 bg-cyan-700 text-white rounded-lg ${
            loading ? "cursor-not-allowed opacity-50" : "hover:bg-cyan-600"
          } transition`}
          disabled={loading}
        >
          {loading ? "Creating Ticket..." : "Create Ticket"}
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
