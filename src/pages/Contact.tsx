import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const contactSchema = z.object({
	fullName: z.string().min(2, "Please enter your full name"),
	email: z.string().email("Enter a valid email address"),
	message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

const Contact = () => {
	const form = useForm<ContactValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			fullName: "",
			email: "",
			message: "",
		},
	});

	// Update this to your support inbox
	const supportEmail = useMemo(() => "support@careerbuilderz.com", []);

	const onSubmit = (values: ContactValues) => {
		const subject = encodeURIComponent(`New contact from ${values.fullName}`);
		const body = encodeURIComponent(
			`Name: ${values.fullName}\nEmail: ${values.email}\n\nMessage:\n${values.message}`
		);
		const mailtoUrl = `mailto:${supportEmail}?subject=${subject}&body=${body}`;

		// Attempt to open the user's email client
		window.location.href = mailtoUrl;
		toast({
			title: "Opening your email client...",
			description: "If nothing happens, please email us directly.",
		});
	};

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1 container mx-auto px-4 py-10">
				<div className="max-w-2xl mx-auto">
					<Card>
						<CardHeader>
							<CardTitle>Contact Us</CardTitle>
						</CardHeader>
						<CardContent>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
									<FormField
										control={form.control}
										name="fullName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Full Name</FormLabel>
												<FormControl>
													<Input placeholder="John Doe" {...field} />
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
													<Input type="email" placeholder="you@example.com" {...field} />
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
													<Textarea placeholder="How can we help you?" className="min-h-[140px]" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="flex items-center justify-between">
										<p className="text-sm text-muted-foreground">Prefer email? Reach us at <a href={`mailto:${supportEmail}`} className="underline">{supportEmail}</a></p>
										<Button type="submit">Send message</Button>
									</div>
								</form>
							</Form>
						</CardContent>
					</Card>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Contact;



