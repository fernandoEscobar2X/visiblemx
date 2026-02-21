import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { GymHero } from '../components/gym/GymHero';
import { GymServices } from '../components/GymServices';
import { GymProtocol } from '../components/gym/GymProtocol';
import { GymMemberships } from '../components/GymMemberships';
import { GymTrainers } from '../components/GymTrainers';
import { GymContact } from '../components/gym/GymContact';
import { GymLandingNavbar } from '../components/gym/GymLandingNavbar';

export function VisiblePageDemo() {
  const pageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end']
  });

  const servicesOffset = useTransform(scrollYProgress, [0.1, 0.34], [42, 0]);
  const protocolOffset = useTransform(scrollYProgress, [0.28, 0.54], [56, 0]);
  const membershipsOffset = useTransform(scrollYProgress, [0.46, 0.72], [44, 0]);
  const trainersOffset = useTransform(scrollYProgress, [0.64, 0.88], [40, 0]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#000000] text-[#E5E5E5] font-inter">
      <GymLandingNavbar />

      <GymHero />

      <main className="relative border-t border-[#222222] bg-[#000000]">
        <section className="border-b border-[#222222] bg-[#000000]">
          <motion.div style={{ y: servicesOffset }} className="will-change-transform">
            <GymServices />
          </motion.div>
        </section>

        <section className="border-b border-[#222222] bg-[#000000]">
          <motion.div style={{ y: protocolOffset }} className="will-change-transform">
            <GymProtocol />
          </motion.div>
        </section>

        <section className="border-b border-[#222222] bg-[#000000]">
          <motion.div style={{ y: membershipsOffset }} className="will-change-transform">
            <GymMemberships />
          </motion.div>
        </section>

        <section className="border-b border-[#222222] bg-[#000000]">
          <motion.div style={{ y: trainersOffset }} className="will-change-transform">
            <GymTrainers />
          </motion.div>
        </section>

        <section className="border-b border-[#222222] bg-[#000000]">
          <GymContact />
        </section>

        <footer className="border-t border-[#222222] bg-[#000000] py-12 text-center text-sm text-[#E5E5E5]/65">
          <p>© 2026 Iron Performance Gym. Powered by Visible Page.</p>
        </footer>
      </main>
    </div>
  );
}
