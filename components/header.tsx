
import { HeaderLogo } from "./header-logo";
import { Navigation } from "./navigation";

export const Header = () => {
    return (
        <header className="bg-gradient-to-b from-blue-500 to-pink-300 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen--2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
            <div className="flex items-center lg:gap-x-16">
                <HeaderLogo/>
                <Navigation />
            </div>
        </div>
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome!
      </h2>
      </div>
        </header>
    );
};