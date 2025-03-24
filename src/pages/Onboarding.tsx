import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditScoreCard } from "@/components/CreditScoreCard";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const onboardingFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  annualIncome: z.string().refine((value) => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  }, {
    message: "Annual income must be a valid number greater than zero.",
  }),
  employmentStatus: z.enum(["employed", "self-employed", "unemployed"], {
    required_error: "Please select an employment status.",
  }),
  creditScoreGoal: z.enum(["increase", "maintain", "build"], {
    required_error: "Please select a credit score goal.",
  }),
});

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [estimatedScore, setEstimatedScore] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      annualIncome: "",
      employmentStatus: "employed",
      creditScoreGoal: "increase",
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    // Simulate fetching estimated credit score based on form data
    if (step === 2 && !estimatedScore) {
      // In a real application, you would send the form data to an API
      // and get the estimated score in response.
      const timeoutId = setTimeout(() => {
        // Generate a random score between 500 and 750 for demonstration
        const randomScore = Math.floor(Math.random() * (750 - 500 + 1)) + 500;
        setEstimatedScore(randomScore);
      }, 1500); // Simulate a 1.5 second loading time

      return () => clearTimeout(timeoutId);
    }
  }, [step, estimatedScore]);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (values: z.infer<typeof onboardingFormSchema>) => {
    try {
      // Simulate successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Success!",
        description: "Your onboarding data has been submitted.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to submit onboarding data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="container flex-1 py-12 px-6 md:px-10 lg:px-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome to CreditCloud AI</h1>
          <p className="text-muted-foreground">
            Let's set up your profile to unlock your credit potential.
          </p>
        </div>

        <Progress value={(step / 3) * 100} className="mb-6" />

        <Card className="border">
          <CardHeader>
            <CardTitle>Step {step}: {step === 1 ? "Personal Information" : step === 2 ? "Credit Score Estimation" : "Confirmation"}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {step === 1 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="annualIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Income</FormLabel>
                          <FormControl>
                            <Input placeholder="50000" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="employmentStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="employed">Employed</SelectItem>
                              <SelectItem value="self-employed">Self-Employed</SelectItem>
                              <SelectItem value="unemployed">Unemployed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="creditScoreGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Credit Score Goal</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select goal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="increase">Increase</SelectItem>
                              <SelectItem value="maintain">Maintain</SelectItem>
                              <SelectItem value="build">Build</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    {estimatedScore !== null ? (
                      <CreditScoreCard score={estimatedScore} />
                    ) : (
                      <div className="text-center">
                        <p className="text-muted-foreground mb-3">Estimating your credit score...</p>
                        <Progress value={70} className="max-w-md mx-auto" />
                      </div>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Confirm Your Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>First Name:</Label>
                        <p className="font-medium">{form.getValues("firstName")}</p>
                      </div>
                      <div>
                        <Label>Last Name:</Label>
                        <p className="font-medium">{form.getValues("lastName")}</p>
                      </div>
                      <div>
                        <Label>Email:</Label>
                        <p className="font-medium">{form.getValues("email")}</p>
                      </div>
                      <div>
                        <Label>Annual Income:</Label>
                        <p className="font-medium">${form.getValues("annualIncome")}</p>
                      </div>
                      <div>
                        <Label>Employment Status:</Label>
                        <p className="font-medium">{form.getValues("employmentStatus")}</p>
                      </div>
                      <div>
                        <Label>Credit Score Goal:</Label>
                        <p className="font-medium">{form.getValues("creditScoreGoal")}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  {step > 1 && (
                    <Button variant="secondary" onClick={prevStep} disabled={isLoading}>
                      Previous
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button onClick={nextStep} disabled={isLoading}>
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isLoading}>
                      Submit
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
