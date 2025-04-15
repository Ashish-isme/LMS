import React, { useContext, useState } from "react";
import { BookOpenText } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommonForm from "@/components/ui/common-form";
import { signUpFormControls } from "@/config";
import { signInFormControls } from "@/config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";

function Authpage() {
  const [activeTab, setActiveTab] = useState("signin");
  const { toast } = useToast();

  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
    error,
    loading,
  } = useContext(AuthContext);

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function signInFormValidation() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function signUpFormValidation() {
    return (
      signUpFormData &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== "" &&
      signUpFormData.userName !== ""
    );
  }

  const enhancedHandleLogin = async (e) => {
    e.preventDefault();

    if (!signInFormValidation()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    try {
      await handleLoginUser(e);
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully",
        duration: 3000,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error || "Invalid email or password",
      });
    }
  };

  const enhancedHandleRegister = async (e) => {
    e.preventDefault();

    if (!signUpFormValidation()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    try {
      await handleRegisterUser(e);
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully",
      });
      setActiveTab("signin"); // Switching to login tab after successful registration
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error || "An error occurred during registration",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to={"/"} className="flex items-center justify-center">
          <img src="/Oglogo.png" alt="SkillSwap Logo" className="h-12 mt-5" />
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email and password for login
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signInFormControls}
                  buttonText={"Sign In"}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!signInFormValidation()}
                  handleSubmit={enhancedHandleLogin}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText={"Sign Up"}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!signUpFormValidation()}
                  handleSubmit={enhancedHandleRegister}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Authpage;
