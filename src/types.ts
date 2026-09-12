export interface PersonalInfo {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  tagline: string;
  summary: string;
  avatarUrl: string;
  resumeUrl: string;
  status: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter?: string;
    codepen?: string;
  };
}

export interface AboutHighlight {
  icon: string;
  title: string;
  desc: string;
}

export interface AboutSection {
  headline: string;
  story: string[];
  highlights: AboutHighlight[];
  interests: string[];
}

export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'cs-fundamentals';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0 - 100
  experience: string;
  description: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  featured: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade: string;
  description: string;
  keyCourses: string[];
  achievements: string[];
}

export interface BCAResource {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  level: string;
  badge: string;
}

export interface BCAProjectIdea {
  id: string;
  title: string;
  semesterLevel: string;
  techStack: string[];
  description: string;
  keyFeatures: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface BCACareerGuide {
  id: string;
  role: string;
  description: string;
  keySkillsNeeded: string[];
  averageStartingSalary: string;
  higherStudiesOption: string;
}

export interface BCAOverview {
  intro: string;
  whyBCA: string[];
  techStackRecommendations: Array<{
    tech: string;
    role: string;
    reason: string;
  }>;
  studyTips: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PortfolioData {
  personal: PersonalInfo;
  about: AboutSection;
  skills: Skill[];
  projects: Project[];
  education: EducationItem[];
  bcaOverview: BCAOverview;
  bcaResources: BCAResource[];
  bcaProjectIdeas: BCAProjectIdea[];
  bcaCareerGuides: BCACareerGuide[];
}

export interface UserAuthSession {
  token: string;
  email: string;
  name: string;
  expiresAt: number;
}
