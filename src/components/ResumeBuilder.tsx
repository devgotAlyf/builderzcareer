import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Download, Eye, Code, TrendingUp, GraduationCap, Palette } from 'lucide-react';

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
  }
];

export const ResumeBuilder = () => {
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
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Resume Preview</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white text-black p-8 min-h-[800px] border rounded-lg">
                  {/* Resume Template */}
                  <div className="space-y-6">
                    {personalInfo.fullName && (
                      <div className="text-center border-b pb-4">
                        <h1 className="text-3xl font-bold text-gray-800">{personalInfo.fullName}</h1>
                        <div className="mt-2 text-gray-600 space-y-1">
                          {personalInfo.email && <div>{personalInfo.email}</div>}
                          {personalInfo.phone && <div>{personalInfo.phone}</div>}
                          {personalInfo.location && <div>{personalInfo.location}</div>}
                        </div>
                      </div>
                    )}

                    {personalInfo.summary && (
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Professional Summary</h2>
                        <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
                      </div>
                    )}

                    {experiences.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Work Experience</h2>
                        <div className="space-y-4">
                          {experiences.map((exp) => (
                            <div key={exp.id}>
                              <div className="flex justify-between items-start mb-1">
                                <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                                <span className="text-sm text-gray-500">{exp.duration}</span>
                              </div>
                              <div className="text-gray-600 mb-2">{exp.company}</div>
                              <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {education.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
                        <div className="space-y-2">
                          {education.map((edu) => (
                            <div key={edu.id} className="flex justify-between">
                              <div>
                                <div className="font-semibold text-gray-800">{edu.degree}</div>
                                <div className="text-gray-600">{edu.school}</div>
                              </div>
                              <div className="text-sm text-gray-500">{edu.year}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {skills.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};