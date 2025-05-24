
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-400 dark:to-gray-600"></div>
            <span className="text-xl font-bold">Brainly</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-4">
              <Link to="/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 md:px-6">
        <motion.section 
          className="py-20 flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            Your Second Brain for the Web
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl"
            variants={itemVariants}
          >
            Capture, organize, and share notes, videos, tweets, and links in one beautiful place.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Link to="/signup">
              <Button size="lg" className="rounded-full px-8">
                Start for free
              </Button>
            </Link>
          </motion.div>
        </motion.section>
        
        <motion.section 
          className="py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Create Notes</h3>
              <p className="text-gray-600 dark:text-gray-400">Write and format beautiful notes in markdown or Notion-like editor.</p>
            </div>
            
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Embed Content</h3>
              <p className="text-gray-600 dark:text-gray-400">Easily embed tweets, YouTube videos, and web links in your notes.</p>
            </div>
            
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Share with Friends</h3>
              <p className="text-gray-600 dark:text-gray-400">Share your entire collection with friends with just one click.</p>
            </div>
          </div>
        </motion.section>
      </main>
      
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 Brainly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
