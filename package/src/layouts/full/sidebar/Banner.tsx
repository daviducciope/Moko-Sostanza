import { Card } from "flowbite-react";

const Banner = () => {
  return (
    <div className="absolute bottom-25 left-0 right-0 px-5">
      <Card className="bg-gray-100 dark:bg-gray-700 border-none shadow-sm">
        <div className="text-center py-4">
          <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
            Banner
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Banner;