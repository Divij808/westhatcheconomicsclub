import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { SiLinkedin, SiInstagram } from "react-icons/si";
import { insertNewsletterSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
  });

  const newsletterForm = useForm<z.infer<typeof insertNewsletterSchema>>({
    resolver: zodResolver(insertNewsletterSchema),
  });

  const newsletterMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertNewsletterSchema>) => {
      await apiRequest("POST", "/api/newsletter", data);
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our newsletter updates.",
      });
      newsletterForm.reset();
    },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Address Section */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <MapPin className="h-8 w-8" />
          </div>
          <h3 className="font-semibold">Address</h3>
          <p>West Hatch High School</p>
        </div>

        {/* Phone Section */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Phone className="h-8 w-8" />
          </div>
          <h3 className="font-semibold">Phone</h3>
          <p>Click on the chat button below</p>
        </div>

        {/* Email Section */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Mail className="h-8 w-8" />
          </div>
          <h3 className="font-semibold">Email</h3>
          <a href="mailto:West-Hatch-Economic-Club@outlook.com" className="text-primary hover:underline">
            West-Hatch-Economic-Club@outlook.com
          </a>
        </div>

        {/* Connect Section */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <MessageCircle className="h-8 w-8" />
          </div>
          <h3 className="font-semibold">Connect</h3>
          <div className="flex justify-center gap-4">
            <a href="#linkedin" className="text-primary hover:text-primary/80">
              <SiLinkedin className="h-6 w-6" />
            </a>
            <a href="#instagram" className="text-primary hover:text-primary/80">
              <SiInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-center">Get in Touch</h2>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
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
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="How can we help?"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}