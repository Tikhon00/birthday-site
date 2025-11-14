import { Confetti } from '@/components/Confetti';
import { HeroSection } from '@/components/HeroSection';
import { StorySection } from '@/components/StorySection';
import { WishesSection } from '@/components/WishesSection';
import { FinalSection } from '@/components/FinalSection';

const Index = () => {
  return (
    <div className="relative">
      {/* Мощное анимированное конфетти */}
      <Confetti />
      
      {/* Основной контент */}
      <main className="relative z-10">
        <HeroSection />
        <StorySection />
        <WishesSection />
        <FinalSection />
      </main>
    </div>
  );
};

export default Index;
