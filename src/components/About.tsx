import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Palette, Users, Award, Linkedin, Github, Mail } from "lucide-react";
import nombuleloImage from "@/assets/nombulelo.jpeg";
import sukoluhleImage from "@/assets/sukoluhle.jpeg";

const designers = [
  {
    name: "Nombulelo Martha Olifant",
    role: "Lead Designer & Co-Founder",
    image: nombuleloImage,
    description: "Passionate about creating user-centric designs that bridge the gap between complex AI technology and intuitive user experiences. With expertise in UX/UI design and behavioral psychology.",
    skills: ["UX/UI Design", "Behavioral Psychology", "User Research", "Design Systems"],
    social: {
      linkedin: "https://www.linkedin.com/in/nombulelo-martha-olifant-846252251/",
      github: "https://github.com/MissOlifant",
      email: "onombulelomartha@gmail.com"
    }
  },
  {
    name: "Sukoluhle Ndlovu",
    role: "Technical Designer & Co-Founder", 
    image: sukoluhleImage,
    description: "Specializes in translating complex AI algorithms into beautiful, accessible interfaces. Combines technical expertise with design thinking to create innovative testing solutions.",
    skills: ["Frontend Development", "AI/ML Integration", "Design Engineering", "Data Visualization"],
    social: {
      linkedin: "https://www.linkedin.com/in/sukoluhle-ndlovu-68924219a",
      github: "https://github.com/SukoluhleNdlovu", 
      email: "sukoluhle926@gmail.com"
    }
  }
];

const achievements = [
  {
    icon: Brain,
    title: "AI Innovation Award",
    description: "Recognized for breakthrough in context-aware testing technology"
  },
  {
    icon: Users,
    title: "User Experience Excellence",
    description: "Outstanding achievement in making complex AI accessible to users"
  },
  {
    icon: Award,
    title: "Tech Leadership",
    description: "Featured in top emerging technologies for software testing"
  }
];

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/50 to-primary/5">
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <Badge variant="secondary" className="px-4 py-2">
              <Brain className="w-4 h-4 mr-2" />
              About TestMind
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Revolutionary Testing Intelligence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              TestMind is the world's first Context-Aware Testing Intelligence Platform, combining emotional AI, 
              behavioral psychology, and predictive analytics to transform software testing from code-focused 
              to human-experience-focused validation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that software should be tested not just for functionality, but for real human usability 
                under actual conditions. Our platform understands the human context behind software usage and 
                predicts real-world failure scenarios.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Code className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Context-Aware Testing</h3>
                    <p className="text-sm text-muted-foreground">
                      Test applications under different user emotional states and real-world conditions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Predictive Intelligence</h3>
                    <p className="text-sm text-muted-foreground">
                      Use AI to predict where applications will fail before they actually do
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Palette className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Human-Centric Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Focus on user experience rather than just code coverage and functional testing
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className="border-0 bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                          <p className="text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Meet Our Founders
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The visionary minds behind TestMind's revolutionary approach to intelligent testing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {designers.map((designer, index) => (
              <Card key={index} className="border-0 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <img 
                      src={designer.image} 
                      alt={designer.name}
                      className="w-full h-full rounded-full object-cover border-4 border-primary/20"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent"></div>
                  </div>
                  <CardTitle className="text-xl">{designer.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{designer.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground text-center">{designer.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-center">Core Expertise</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {designer.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 pt-4 border-t border-border/50">
                    <a 
                      href={designer.social.linkedin} 
                      className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 text-primary" />
                    </a>
                    <a 
                      href={designer.social.github} 
                      className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4 text-primary" />
                    </a>
                    <a 
                      href={`mailto:${designer.social.email}`} 
                      className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4 text-primary" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">68%</div>
              <p className="text-sm text-muted-foreground">Bugs found by users, not QA teams</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">35%</div>
              <p className="text-sm text-muted-foreground">Testing time wasted on non-value activities</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">39%</div>
              <p className="text-sm text-muted-foreground">Skill gap in test automation</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime SLA guarantee</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};