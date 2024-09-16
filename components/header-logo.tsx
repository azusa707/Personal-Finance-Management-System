import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
    return (
        <Link href="/">
            <div className="items-center hidden lg:flex">
                <Image src="/images/logo.png" alt="Finance Logo" height={30} width={100}
                    style={{
                        borderRadius: '50%',
                        objectFit: 'cover', // Ensures the image covers the circle
                        objectPosition: 'center', // Centers the image
                        transform: 'scale(1.2)', // Scales the image to zoom in
                        width: '50px', // Adjust to desired size
                        height: '50px' // Adjust to desired size
                    }} />
                <p className="font-semibold text-white text-2xl ml-2.5">
                    Finance
                </p>
            </div>
        </Link>
    );
};
