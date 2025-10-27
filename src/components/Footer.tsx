import { FileText, Github, Twitter, Linkedin, Mail } from 'lucide-react';
export const Footer = () => {
  return <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-8 w-8" />
              <h3 className="text-2xl font-bold">CareerBuilderz</h3>
            </div>
            <p className="text-primary-foreground/80 mb-6">
              Build professional resumes and find your dream job with our comprehensive platform.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/dev-pratap-srivastava-991811294" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-glow transition-colors"
              >
                <Linkedin className="h-5 w-5 cursor-pointer transition-colors" />
              </a>
              <a 
                href="mailto:srivastavadev626@gmail.com" 
                className="hover:text-primary-glow transition-colors"
              >
                <Mail className="h-5 w-5 cursor-pointer transition-colors" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Resume Builder</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Job Search</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Cover Letter Builder</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Resume Templates</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Career Tips</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">© 2024 CareerBuilderz. All rights reserved. Built with ❤️ for job seekers everywhere.</p>
        </div>
      </div>
    </footer>;
};