"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const complaintSchema = z.object({
  name: z.string().min(3,"Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phonenumber: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  incidentdetails: z.string().min(10, "Incident details must be at least 10 characters"),
  location: z.string().min(3, "Location must be at least 3 characters")
})

type ComplaintFormData = z.infer<typeof complaintSchema>;


export default function ReportPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    incidentdetails: "",
    location: ""
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema),
  });
  

  const onSubmit = async (data: ComplaintFormData) => {
    if (!isEmailVerified) {
      alert("Please verify your email first.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/add", data);
      if (response.data.success) {
        alert("Report submitted successfully!");
        reset({
          name: "",
          email: "",
          phonenumber: "",
          incidentdetails: "", 
          location: ""
        });
        setIsEmailVerified(false);
      } else {
        alert("Failed to submit report. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting the report.");
    }
  };

  const handleSendOTP = async() => {
    if (!formData.email) return;
     setIsLoading(true);
    // In a real application, this would trigger an API call to send OTP
    try {
      const response = await axios.post("http://localhost:8000/send-otp", {
        email: formData.email,
      });

      console.log(response.data);
      if (response.data.success) {
        setIsOtpSent(true);
        alert("OTP sent successfully!");
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending OTP.");
    }
    setIsOtpSent(true);
  };

  const handleVerifyOTP = async() => {
    if (otp.length !== 6) return;
    // In a real application, this would verify the OTP with the backend
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/verify-otp", {
        email: formData.email,
        otp: otp,
      });
  
      if (response.data.success) {
        setIsEmailVerified(true);
        setIsOtpSent(false);
        alert("Email verified successfully!");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred while verifying OTP.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Link href="/" className="inline-flex items-center text-purple-600 hover:text-pink-600 hover:underline mb-6 transition-colors duration-300">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <Card className="p-6 bg-white/70 backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Report an Incident</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Your Name</Label>
              <Input 
                id="name" 
                {...register("name")}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your name" 
                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="flex gap-2">
                <Input 
                  id="email" 
                  type="email"
                  {...register("email")} 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email"
                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  required
                  readOnly={isEmailVerified}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                {!isEmailVerified && (
                  <Button 
                    type="button"
                    onClick={handleSendOTP}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white whitespace-nowrap"
                  >
                    Send OTP
                  </Button>
                )}
              </div>
              {isEmailVerified && (
                <p className="text-sm text-green-600">✓ Email verified</p>
              )}
            </div>

            {isOtpSent && !isEmailVerified && (
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-gray-700">Verification Code</Label>
                <div className="flex gap-2">
                  {[...Array(6)].map((_, index) => (
                    <Input
                      key={index}
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      value={otp[index] || ''}
                      onChange={(e) => {
                        const newOtp = otp.split('');
                        newOtp[index] = e.target.value;
                        setOtp(newOtp.join(''));
                        
                        if (e.target.value && index < 5) {
                          const nextInput = e.target.parentElement?.querySelector(
                            `input:nth-child(${index + 2})`
                          ) as HTMLInputElement;
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[index] && index > 0) {
                          const prevInput = e.currentTarget.parentElement?.querySelector(
                            `input:nth-child(${index})`
                          ) as HTMLInputElement;
                          if (prevInput) prevInput.focus();
                        }
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={() => setIsOtpSent(false)}
                    className="text-sm text-purple-600 hover:text-pink-600 hover:underline"
                  >
                    Change email
                  </button>
                  <Button 
                    type="button"
                    onClick={handleVerifyOTP}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    disabled={otp.length !== 6}
                  >
                    Verify OTP
                  </Button>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                {...register("phonenumber")}
                value={formData.phonenumber}
                onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
                placeholder="Enter your phone number"
                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                required
              />
              {errors.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="incident" className="text-gray-700">Incident Details</Label>
              <Textarea 
                id="incident"
                {...register("incidentdetails")}
                value={formData.incidentdetails}
                onChange={(e) => setFormData({ ...formData, incidentdetails: e.target.value })}
                placeholder="Please provide details about the incident"
                className="min-h-[150px] border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                required
              />
              {errors.incidentdetails && <p className="text-red-500 text-sm">{errors.incidentdetails.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700">Location of Incident</Label>
              <Input 
                id="location" 
                {...register("location")}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter the location"
                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                required
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                disabled={!isEmailVerified}
              >
                Submit Report
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-4">
                All reports are confidential and will be handled with utmost privacy
              </p>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
