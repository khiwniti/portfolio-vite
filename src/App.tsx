import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import GradientMesh from './components/GradientMesh';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import SkillGraph from './components/SkillGraph';
import Changelog from './components/Changelog';
import Skills from './components/Skills';
import Contact from './components/Contact';
import SectionDivider from './components/SectionDivider';
import ScrollToTop from './components/ScrollToTop';
import ProjectFocusPage from './components/ProjectFocusPage';
import { projects } from './data/portfolio';

import BlogSection from './components/BlogSection';
import BlogPostPage from './components/BlogPostPage';
import AdminPortal from './components/AdminPortal';
import AIChatbot from './components/AIChatbot';
import RecruiterBrief from './components/RecruiterBrief';
import SEOHead from './components/SEOHead';
import { profile } from './data/portfolio';

export default function App() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);

  const activeProject = projects.find((p) => p.id === activeProjectId);

  useEffect(() => {
    const syncRoute = () => {
      const route = window.location.hash.replace(/^#\/?/, '').split('/');
      if (route[0] === 'project' && route[1]) {
        setActiveProjectId(route[1]);
        setActiveBlogId(null);
        setAdminOpen(false);
      } else if (route[0] === 'blog' && route[1]) {
        setActiveBlogId(route[1]);
        setActiveProjectId(null);
        setAdminOpen(false);
      } else if (route[0] === 'admin') {
        setAdminOpen(true);
        setActiveProjectId(null);
        setActiveBlogId(null);
      } else {
        setAdminOpen(false);
        setActiveProjectId(null);
        setActiveBlogId(null);
      }
    };
    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  const openProject = (id: string) => {
    setActiveProjectId(id);
    setActiveBlogId(null);
    window.location.hash = `/project/${id}`;
  };

  const openBlog = (slug: string) => {
    setActiveBlogId(slug);
    setActiveProjectId(null);
    window.location.hash = `/blog/${slug}`;
  };

  const returnTo = (anchor: string) => {
    setActiveProjectId(null);
    setActiveBlogId(null);
    setAdminOpen(false);
    window.location.hash = anchor;
    setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 40);
  };

  return (
    <div className="page-shell relative min-h-screen">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Background />
      <GradientMesh />
      <CustomCursor />

      <AnimatePresence mode="wait">
        {adminOpen ? (
          <div className="light-shell" key="admin-portal">
            <AdminPortal
              onClose={() => setAdminOpen(false)}
              onOpenBlog={(slug) => {
                setAdminOpen(false);
                openBlog(slug);
              }}
            />
          </div>
        ) : activeBlogId ? (
          <div className="light-shell" key={`blog-${activeBlogId}`}>
            <BlogPostPage
              slugOrId={activeBlogId}
              onBack={() => returnTo('blog')}
              onSelectBlog={openBlog}
            />
          </div>
        ) : activeProject ? (
          <div className="light-shell" key={activeProject.id}>
            <ProjectFocusPage
              project={activeProject}
              onBack={() => returnTo('projects')}
              onSelectProject={openProject}
            />
          </div>
        ) : (
          <div key="landing-page">
            <SEOHead
              title="Forward Deployed AI Engineer & Full-Stack Product Builder"
              description={profile.tagline}
              keywords={['Forward Deployed AI Engineer', 'AI Engineer Thailand', 'LangGraph', 'MCP', 'Full Stack Developer', 'MLOps', '3D Digital Twins', 'Khiw Nitithadachot']}
            />
            <ScrollProgress />
            <Navbar onOpenRecruiter={() => setRecruiterOpen(true)} />
            <ScrollToTop />
            <main id="main-content">
              <Hero />
              <SectionDivider />
              <Timeline />
              <SectionDivider />
              <Projects onSelectProject={openProject} />
              <SectionDivider />
              <SkillGraph />
              <SectionDivider />
              <BlogSection onSelectBlog={openBlog} />
              <SectionDivider />
              <Changelog />
              <SectionDivider />
              <Skills />
              <Contact onOpenAdmin={() => { setAdminOpen(true); window.location.hash = '/admin'; }} />
            </main>
          </div>
        )}
      </AnimatePresence>

      <AIChatbot
        onSelectProject={(id) => {
          setActiveBlogId(null);
          openProject(id);
        }}
        onSelectBlog={(slug) => {
          setActiveProjectId(null);
          openBlog(slug);
        }}
      />
      <RecruiterBrief open={recruiterOpen} onClose={() => setRecruiterOpen(false)} />
    </div>
  );
}
