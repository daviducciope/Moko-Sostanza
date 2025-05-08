import { Card } from "flowbite-react";
import { Icon } from "@iconify/react";

const Banner = () => {
  return (
    <div className="fixed bottom-0 left-0 w-[300px] p-4 bg-white border-t border-gray-200">
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-sm overflow-hidden">
        <div className="relative py-4">
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary/10 rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/10 rounded-full" />
          
          <div className="text-center relative z-10">
            <div className="flex justify-center mb-2">
              <Icon icon="solar:star-bold" className="text-primary w-6 h-6" />
            </div>
            <h5 className="text-sm font-semibold text-primary mb-1">
              Banner pubblicitario
            </h5>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Spazio disponibile per la tua pubblicità
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Banner;