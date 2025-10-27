import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, Download, Eye, Code, TrendingUp, GraduationCap, Palette, Briefcase, Stethoscope, Beaker, Utensils, Music, Camera } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useToast } from '@/hooks/use-toast';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  personalInfo: PersonalInfo;
  experiences: Omit<Experience, 'id'>[];
  education: Omit<Education, 'id'>[];
  skills: string[];
}

const resumeTemplates: Template[] = [
  {
    id: 'software-developer',
    name: 'Software Developer',
    description: 'Perfect for tech professionals and developers',
    icon: Code,
    color: 'text-blue-600',
    personalInfo: {
      fullName: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Strong problem-solving skills and collaborative team player.'
    },
    experiences: [
      {
        company: 'TechCorp Inc.',
        position: 'Senior Software Engineer',
        duration: 'Jan 2022 - Present',
        description: 'Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored 3 junior developers and conducted code reviews.'
      },
      {
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        duration: 'Jun 2020 - Dec 2021',
        description: 'Built responsive web applications using React and Node.js. Integrated third-party APIs and payment systems. Collaborated with designers to implement pixel-perfect UI components.'
      }
    ],
    education: [
      {
        school: 'University of California, Berkeley',
        degree: 'Bachelor of Science in Computer Science',
        year: '2020'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'Git', 'Agile']
  },
  {
    id: 'marketing-manager',
    name: 'Marketing Manager',
    description: 'Ideal for marketing professionals and brand managers',
    icon: TrendingUp,
    color: 'text-green-600',
    personalInfo: {
      fullName: 'Sarah Martinez',
      email: 'sarah.martinez@email.com',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      summary: 'Results-driven marketing manager with 7+ years of experience in digital marketing, brand management, and campaign optimization. Proven track record of increasing brand awareness by 40% and driving revenue growth through data-driven strategies.'
    },
    experiences: [
      {
        company: 'Global Brands LLC',
        position: 'Senior Marketing Manager',
        duration: 'Mar 2021 - Present',
        description: 'Developed and executed integrated marketing campaigns resulting in 35% increase in lead generation. Managed $500K annual marketing budget and optimized ROI across multiple channels. Led cross-functional team of 8 members.'
      },
      {
        company: 'Creative Agency Pro',
        position: 'Digital Marketing Specialist',
        duration: 'Aug 2019 - Feb 2021',
        description: 'Created and managed social media campaigns for 15+ clients. Implemented SEO strategies that improved organic traffic by 60%. Analyzed campaign performance and provided actionable insights to clients.'
      }
    ],
    education: [
      {
        school: 'New York University',
        degree: 'Master of Business Administration (MBA)',
        year: '2019'
      }
    ],
    skills: ['Digital Marketing', 'SEO/SEM', 'Google Analytics', 'Social Media Marketing', 'Content Strategy', 'Email Marketing', 'Adobe Creative Suite', 'Project Management', 'Data Analysis', 'Brand Management']
  },
  {
    id: 'teacher',
    name: 'Teacher',
    description: 'Great for educators and academic professionals',
    icon: GraduationCap,
    color: 'text-purple-600',
    personalInfo: {
      fullName: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      summary: 'Dedicated high school mathematics teacher with 8+ years of experience inspiring students to achieve academic excellence. Specialized in creating engaging lesson plans and implementing innovative teaching methods that improved student test scores by 25%.'
    },
    experiences: [
      {
        company: 'Lincoln High School',
        position: 'Mathematics Teacher',
        duration: 'Aug 2020 - Present',
        description: 'Teach Algebra II and Calculus to 150+ students across 6 classes. Developed interactive learning modules that increased student engagement by 40%. Coordinate with parents and administrators to support student success.'
      },
      {
        company: 'Roosevelt Middle School',
        position: 'Math Teacher & Department Head',
        duration: 'Sep 2016 - Jul 2020',
        description: 'Led mathematics department of 12 teachers. Implemented new curriculum standards and professional development programs. Mentored new teachers and facilitated grade-level team meetings.'
      }
    ],
    education: [
      {
        school: 'University of Texas at Austin',
        degree: 'Master of Education in Mathematics',
        year: '2016'
      }
    ],
    skills: ['Curriculum Development', 'Classroom Management', 'Educational Technology', 'Student Assessment', 'Parent Communication', 'Differentiated Instruction', 'Google Classroom', 'Microsoft Office', 'Data Analysis', 'Team Leadership']
  },
  {
    id: 'designer',
    name: 'Creative Designer',
    description: 'Perfect for designers and creative professionals',
    icon: Palette,
    color: 'text-pink-600',
    personalInfo: {
      fullName: 'Emma Rodriguez',
      email: 'emma.rodriguez@email.com',
      phone: '+1 (555) 321-9876',
      location: 'Los Angeles, CA',
      summary: 'Creative visual designer with 6+ years of experience in branding, UI/UX design, and digital marketing materials. Passionate about creating compelling visual narratives that drive engagement and deliver measurable business results.'
    },
    experiences: [
      {
        company: 'Design Studio Pro',
        position: 'Senior Graphic Designer',
        duration: 'Feb 2022 - Present',
        description: 'Lead designer for 20+ client projects including brand identity, web design, and marketing collateral. Increased client satisfaction scores by 30% through collaborative design process. Mentor junior designers and manage project timelines.'
      },
      {
        company: 'Creative Collective',
        position: 'UI/UX Designer',
        duration: 'May 2020 - Jan 2022',
        description: 'Designed user interfaces for mobile and web applications. Conducted user research and usability testing to improve conversion rates by 25%. Collaborated with developers to ensure design feasibility and brand consistency.'
      }
    ],
    education: [
      {
        school: 'Art Center College of Design',
        degree: 'Bachelor of Fine Arts in Graphic Design',
        year: '2020'
      }
    ],
    skills: ['Adobe Creative Suite', 'Figma', 'Sketch', 'UI/UX Design', 'Branding', 'Typography', 'Color Theory', 'Web Design', 'Print Design', 'Client Communication']
  },
  {
    id: 'business-analyst',
    name: 'Business Analyst',
    description: 'Perfect for business professionals and analysts',
    icon: Briefcase,
    color: 'text-indigo-600',
    personalInfo: {
      fullName: 'Robert Kim',
      email: 'robert.kim@email.com',
      phone: '+1 (555) 789-0123',
      location: 'Chicago, IL',
      summary: 'Strategic business analyst with 6+ years of experience in process optimization and data-driven decision making. Expert in stakeholder management and translating business requirements into technical solutions. Proven track record of improving operational efficiency by 35%.'
    },
    experiences: [
      {
        company: 'Global Solutions Inc.',
        position: 'Senior Business Analyst',
        duration: 'Mar 2021 - Present',
        description: 'Analyzed business processes and identified optimization opportunities saving $2M annually. Led cross-functional teams to implement CRM systems and streamline operations. Presented findings to C-suite executives.'
      },
      {
        company: 'Financial Services Corp',
        position: 'Business Analyst',
        duration: 'Sep 2018 - Feb 2021',
        description: 'Conducted market research and competitive analysis for strategic planning. Developed financial models and forecasting reports. Collaborated with IT teams to implement new reporting tools.'
      }
    ],
    education: [
      {
        school: 'Northwestern University',
        degree: 'MBA in Business Strategy',
        year: '2018'
      }
    ],
    skills: ['Business Analysis', 'Data Analytics', 'SQL', 'Tableau', 'Agile/Scrum', 'Process Mapping', 'Stakeholder Management', 'Financial Modeling', 'Power BI', 'Project Management']
  },
  {
    id: 'doctor',
    name: 'Healthcare Professional',
    description: 'Ideal for doctors and medical professionals',
    icon: Stethoscope,
    color: 'text-red-600',
    personalInfo: {
      fullName: 'Dr. Sophia Anderson',
      email: 'sophia.anderson@email.com',
      phone: '+1 (555) 234-5678',
      location: 'Boston, MA',
      summary: 'Board-certified physician with 10+ years of experience in internal medicine. Passionate about patient care and medical research. Published 15+ papers in peer-reviewed journals. Committed to advancing healthcare through evidence-based practices.'
    },
    experiences: [
      {
        company: 'Boston General Hospital',
        position: 'Senior Physician',
        duration: 'Jul 2019 - Present',
        description: 'Provide comprehensive care to 2000+ patients annually. Lead weekly grand rounds and mentor medical residents. Participate in clinical trials and medical research initiatives.'
      },
      {
        company: 'Mercy Medical Center',
        position: 'Attending Physician',
        duration: 'Jun 2014 - Jun 2019',
        description: 'Managed inpatient and outpatient care for diverse patient population. Coordinated with multidisciplinary teams for complex cases. Maintained 98% patient satisfaction rating.'
      }
    ],
    education: [
      {
        school: 'Harvard Medical School',
        degree: 'Doctor of Medicine (MD)',
        year: '2014'
      }
    ],
    skills: ['Internal Medicine', 'Patient Care', 'Medical Research', 'Clinical Trials', 'Medical Writing', 'EHR Systems', 'Team Leadership', 'Problem Solving', 'Medical Spanish', 'CPR Certified']
  },
  {
    id: 'research-scientist',
    name: 'Research Scientist',
    description: 'Great for scientists and researchers',
    icon: Beaker,
    color: 'text-purple-600',
    personalInfo: {
      fullName: 'Dr. James Park',
      email: 'james.park@email.com',
      phone: '+1 (555) 345-6789',
      location: 'Seattle, WA',
      summary: 'Research scientist with 8+ years of experience in biotechnology and drug development. Published 25+ peer-reviewed articles. Expert in molecular biology, protein biochemistry, and experimental design. Passionate about advancing scientific knowledge and developing innovative solutions.'
    },
    experiences: [
      {
        company: 'BioTech Innovations',
        position: 'Senior Research Scientist',
        duration: 'Jan 2020 - Present',
        description: 'Lead research team developing novel cancer therapeutics. Manage $5M+ research budget. Published 8 papers in Nature and Cell journals. Collaborate with pharmaceutical companies on drug development.'
      },
      {
        company: 'National Institute of Health',
        position: 'Research Scientist',
        duration: 'Jun 2016 - Dec 2019',
        description: 'Conducted breakthrough research on neurodegenerative diseases. Secured $3M in research grants. Mentored 10+ junior researchers and graduate students.'
      }
    ],
    education: [
      {
        school: 'MIT',
        degree: 'PhD in Molecular Biology',
        year: '2016'
      }
    ],
    skills: ['Molecular Biology', 'Biochemistry', 'Drug Development', 'Cell Culture', 'PCR', 'Western Blot', 'Grant Writing', 'Data Analysis', 'Laboratory Management', 'Scientific Writing']
  },
  {
    id: 'chef',
    name: 'Professional Chef',
    description: 'Perfect for culinary professionals',
    icon: Utensils,
    color: 'text-orange-600',
    personalInfo: {
      fullName: 'Isabella Martinez',
      email: 'isabella.martinez@email.com',
      phone: '+1 (555) 456-7890',
      location: 'San Francisco, CA',
      summary: 'Award-winning chef with 12+ years of experience in fine dining and restaurant management. Michelin-star restaurant veteran. Expert in fusion cuisine and sustainable cooking practices. Passionate about creating memorable culinary experiences.'
    },
    experiences: [
      {
        company: 'The Michelin Restaurant',
        position: 'Executive Chef',
        duration: 'Jan 2021 - Present',
        description: 'Lead kitchen team of 20 chefs serving 200+ covers nightly. Maintained Michelin star rating for 3 consecutive years. Developed innovative seasonal menus using locally sourced ingredients.'
      },
      {
        company: 'Fusion Bistro',
        position: 'Head Chef',
        duration: 'Mar 2016 - Dec 2020',
        description: 'Created award-winning Asian-Latin fusion menu. Increased restaurant revenue by 40% through innovative dishes and strategic marketing.'
      }
    ],
    education: [
      {
        school: 'Culinary Institute of America',
        degree: 'Associate Degree in Culinary Arts',
        year: '2012'
      }
    ],
    skills: ['Fine Dining', 'Fusion Cuisine', 'Kitchen Management', 'Menu Development', 'Food Safety', 'Cost Control', 'Team Leadership', 'Sous Vide', 'Molecular Gastronomy', 'Wine Pairing']
  },
  {
    id: 'musician',
    name: 'Music Professional',
    description: 'Ideal for musicians and audio professionals',
    icon: Music,
    color: 'text-pink-600',
    personalInfo: {
      fullName: 'Marcus Johnson',
      email: 'marcus.johnson@email.com',
      phone: '+1 (555) 567-8901',
      location: 'Nashville, TN',
      summary: 'Multi-platinum music producer and songwriter with 15+ years in the music industry. Worked with Grammy-winning artists. Expert in music production, mixing, and mastering. Published songwriter with 100+ song placements.'
    },
    experiences: [
      {
        company: 'Melody Records',
        position: 'Senior Music Producer',
        duration: 'Jan 2020 - Present',
        description: 'Produce tracks for chart-topping artists. Manage production team of 15. Achieved 5 #1 hits and multiple gold/platinum certifications.'
      },
      {
        company: 'Beats Studio',
        position: 'Music Producer & Engineer',
        duration: 'Jun 2015 - Dec 2019',
        description: 'Produced and engineered albums for independent and major label artists. Specialized in hip-hop, R&B, and pop genres.'
      }
    ],
    education: [
      {
        school: 'Berklee College of Music',
        degree: 'Bachelor of Music in Music Production',
        year: '2010'
      }
    ],
    skills: ['Music Production', 'Audio Engineering', 'Songwriting', 'Mixing', 'Mastering', 'Pro Tools', 'Ableton Live', 'Music Theory', 'Recording', 'Artist Development']
  },
  {
    id: 'photographer',
    name: 'Photographer',
    description: 'Perfect for photographers and visual artists',
    icon: Camera,
    color: 'text-cyan-600',
    personalInfo: {
      fullName: 'Luna Chen',
      email: 'luna.chen@email.com',
      phone: '+1 (555) 678-9012',
      location: 'Los Angeles, CA',
      summary: 'Award-winning photographer with 10+ years specializing in portrait, fashion, and commercial photography. Published in Vogue, GQ, and National Geographic. Expert in digital and film photography with a distinctive artistic vision.'
    },
    experiences: [
      {
        company: 'Freelance Photographer',
        position: 'Professional Photographer',
        duration: '2018 - Present',
        description: 'Shoot for fashion brands, magazines, and advertising agencies. Clients include major brands in fashion, tech, and hospitality. Maintain 98% client satisfaction rate.'
      },
      {
        company: 'Prestige Magazine',
        position: 'Staff Photographer',
        duration: 'Jan 2014 - Dec 2017',
        description: 'Created compelling visual narratives for editorial spreads. Covered major events and celebrity portraits. Won 3 industry awards for photography excellence.'
      }
    ],
    education: [
      {
        school: 'Art Institute of Los Angeles',
        degree: 'Bachelor of Fine Arts in Photography',
        year: '2013'
      }
    ],
    skills: ['Portrait Photography', 'Fashion Photography', 'Photo Editing', 'Lighting', 'Adobe Photoshop', 'Adobe Lightroom', 'Color Grading', 'Retouching', 'Video Production', 'Art Direction']
  }
];

export const ResumeBuilder = () => {
  const { toast } = useToast();
  const [selectedTheme, setSelectedTheme] = useState<string>('flat');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const loadTemplate = (template: Template) => {
    setPersonalInfo(template.personalInfo);
    setExperiences(template.experiences.map((exp, index) => ({
      ...exp,
      id: (Date.now() + index).toString()
    })));
    setEducation(template.education.map((edu, index) => ({
      ...edu,
      id: (Date.now() + index + 1000).toString()
    })));
    setSkills(template.skills);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      description: ''
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      year: ''
    };
    setEducation([...education, newEdu]);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const generateResumeJSON = () => {
    return {
      basics: {
        name: personalInfo.fullName,
        email: personalInfo.email,
        phone: personalInfo.phone,
        location: {
          address: personalInfo.location
        },
        summary: personalInfo.summary
      },
      work: experiences.map(exp => ({
        company: exp.company,
        position: exp.position,
        startDate: exp.duration.split(' - ')[0],
        endDate: exp.duration.includes('Present') ? undefined : exp.duration.split(' - ')[1],
        summary: exp.description
      })),
      education: education.map(edu => ({
        institution: edu.school,
        area: edu.degree,
        studyType: 'Degree',
        endDate: edu.year
      })),
      skills: skills.map(skill => ({
        name: skill
      }))
    };
  };

  const isResumeComplete = () => {
    return (
      personalInfo.fullName.trim() !== '' &&
      personalInfo.email.trim() !== '' &&
      personalInfo.phone.trim() !== '' &&
      personalInfo.location.trim() !== '' &&
      personalInfo.summary.trim() !== '' &&
      experiences.length > 0 &&
      education.length > 0 &&
      skills.length > 0
    );
  };

  const handleDownload = async () => {
    // Validate resume completion
    if (!isResumeComplete()) {
      toast({
        title: "Incomplete Resume",
        description: "Please fill in all required fields (Personal Info, Experience, Education, and Skills) before downloading.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Find the resume preview element
      const element = document.getElementById('resume-preview');
      if (!element) {
        toast({
          title: "Error",
          description: "Could not find resume preview. Please refresh and try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your resume PDF.",
      });

      // Convert to canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Download
      pdf.save(`${personalInfo.fullName}-Resume.pdf`);

      toast({
        title: "Success!",
        description: "Your resume has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: "Error",
        description: "Failed to download resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="resume-builder" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Build Your Professional{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Resume
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create a stunning resume that stands out to employers with our easy-to-use builder
          </p>
        </div>

        {/* Resume Templates */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Start with a Template</h3>
            <p className="text-muted-foreground">Choose from our professional templates to get started quickly</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {resumeTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card key={template.id} className="hover:shadow-elegant transition-all duration-300 cursor-pointer border-2 hover:border-primary/20" onClick={() => loadTemplate(template)}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{template.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={personalInfo.fullName}
                      onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                      placeholder="New York, NY"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    value={personalInfo.summary}
                    onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
                    placeholder="A brief overview of your professional background and career goals..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Work Experience</CardTitle>
                  <Button onClick={addExperience} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="grid md:grid-cols-2 gap-4 flex-1">
                        <Input
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        />
                        <Input
                          placeholder="Position"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                        className="ml-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Duration (e.g., Jan 2020 - Present)"
                      value={exp.duration}
                      onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                    />
                    <Textarea
                      placeholder="Job description and achievements..."
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      rows={3}
                    />
                  </div>
                ))}
                {experiences.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">
                    No work experience added yet. Click "Add Experience" to get started.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Education</CardTitle>
                  <Button onClick={addEducation} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="grid md:grid-cols-2 gap-4 flex-1">
                        <Input
                          placeholder="School/University"
                          value={edu.school}
                          onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                        />
                        <Input
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                        className="ml-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Year (e.g., 2020)"
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                    />
                  </div>
                ))}
                {education.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">
                    No education added yet. Click "Add Education" to get started.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24">
            <Card className="shadow-elegant">
              <CardHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Resume Preview</CardTitle>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <Label htmlFor="theme-select">Select Theme</Label>
                      <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                        <SelectTrigger id="theme-select">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flat">Flat Theme</SelectItem>
                          <SelectItem value="elegant">Elegant Theme</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleDownload} className="w-full bg-gradient-primary hover:opacity-90">
                      <Download className="h-4 w-4 mr-2" />
                      Download as PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div id="resume-preview" className={`bg-white text-black p-8 min-h-[800px] border rounded-lg ${
                  selectedTheme === 'elegant' ? 'shadow-2xl' : ''
                }`}>
                  {/* Resume Template */}
                  {selectedTheme === 'flat' ? (
                    /* Flat Theme - Clean and Modern */
                    <div className="space-y-6">
                      {personalInfo.fullName && (
                        <div className="text-center border-b-2 border-gray-300 pb-4">
                          <h1 className="text-4xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
                          <div className="mt-2 text-gray-600 space-y-1 text-sm">
                            {personalInfo.email && <div>{personalInfo.email}</div>}
                            {personalInfo.phone && <div>{personalInfo.phone}</div>}
                            {personalInfo.location && <div>{personalInfo.location}</div>}
                          </div>
                        </div>
                      )}

                      {personalInfo.summary && (
                        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                          <h2 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h2>
                          <p className="text-gray-700 leading-relaxed text-sm">{personalInfo.summary}</p>
                        </div>
                      )}

                      {experiences.length > 0 && (
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">Work Experience</h2>
                          <div className="space-y-6">
                            {experiences.map((exp) => (
                              <div key={exp.id} className="border-l-4 border-blue-500 pl-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{exp.duration}</span>
                                </div>
                                <div className="text-gray-700 font-medium mb-2">{exp.company}</div>
                                <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {education.length > 0 && (
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">Education</h2>
                          <div className="space-y-3">
                            {education.map((edu) => (
                              <div key={edu.id} className="flex justify-between items-center border-l-4 border-green-500 pl-4 bg-gray-50 p-3 rounded">
                                <div>
                                  <div className="font-bold text-gray-900">{edu.degree}</div>
                                  <div className="text-gray-700 text-sm">{edu.school}</div>
                                </div>
                                <div className="text-sm font-semibold text-gray-600 bg-gray-200 px-3 py-1 rounded">{edu.year}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {skills.length > 0 && (
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">Skills</h2>
                          <div className="flex flex-wrap gap-3">
                            {skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-4 py-2 bg-blue-500 text-white rounded font-medium text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Elegant Theme - Sophisticated and Refined */
                    <div className="space-y-8">
                      {personalInfo.fullName && (
                        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                          <h1 className="text-5xl font-bold mb-3 tracking-wide">{personalInfo.fullName}</h1>
                          <div className="mt-3 space-y-1 text-sm opacity-95">
                            {personalInfo.email && <div>{personalInfo.email}</div>}
                            {personalInfo.phone && <div>{personalInfo.phone}</div>}
                            {personalInfo.location && <div>{personalInfo.location}</div>}
                          </div>
                        </div>
                      )}

                      {personalInfo.summary && (
                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg shadow-md border border-purple-200">
                          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                            Professional Summary
                          </h2>
                          <p className="text-gray-700 leading-relaxed text-base italic">{personalInfo.summary}</p>
                        </div>
                      )}

                      {experiences.length > 0 && (
                        <div>
                          <div className="flex items-center mb-6">
                            <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-4"></div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                              Work Experience
                            </h2>
                            <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full ml-4"></div>
                          </div>
                          <div className="space-y-8">
                            {experiences.map((exp, idx) => (
                              <div key={exp.id} className="relative">
                                <div className="absolute -left-6 top-0 w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                                <div className="ml-8 bg-white p-6 rounded-lg shadow-lg border-l-4 border-gradient-to-b from-purple-400 to-blue-400 border-purple-500">
                                  <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                                    <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{exp.duration}</span>
                                  </div>
                                  <div className="text-lg font-semibold text-blue-600 mb-2">{exp.company}</div>
                                  <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {education.length > 0 && (
                        <div>
                          <div className="flex items-center mb-6">
                            <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-4"></div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                              Education
                            </h2>
                            <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full ml-4"></div>
                          </div>
                          <div className="space-y-4">
                            {education.map((edu) => (
                              <div key={edu.id} className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-lg shadow-md border-l-4 border-purple-500 transform transition-all hover:shadow-lg">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="font-bold text-lg text-gray-900">{edu.degree}</div>
                                    <div className="text-gray-700 text-sm font-medium">{edu.school}</div>
                                  </div>
                                  <div className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full shadow-md">
                                    {edu.year}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {skills.length > 0 && (
                        <div>
                          <div className="flex items-center mb-6">
                            <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-4"></div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                              Skills
                            </h2>
                            <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full ml-4"></div>
                          </div>
                          <div className="flex flex-wrap gap-4">
                            {skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-sm shadow-lg transform transition-all hover:scale-105"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};