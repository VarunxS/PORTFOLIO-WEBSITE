'use client';

import { motion } from 'framer-motion';
import React from 'react';

// Fade In
export const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        className={className}
    >
        {children}
    </motion.div>
);

// Slide Up
export const SlideUp = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        className={className}
    >
        {children}
    </motion.div>
);

// Stagger Children
export const StaggerChildren = ({ children, staggerDelay = 0.1, className }: { children: React.ReactNode; staggerDelay?: number; className?: string }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.5 }}
        className={className}
    >
        {children}
    </motion.div>
);
