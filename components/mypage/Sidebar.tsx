import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { MdOutlineMarkunreadMailbox } from "react-icons/md";
import { TbInvoice } from "react-icons/tb";

type ProfileLink = {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

type ProfileLinksProps = {
  activeLink: string; // Current active route
};

const ProfileLinks: React.FC<ProfileLinksProps> = ({ activeLink }) => {
  const profileLinks: ProfileLink[] = [
    {
      href: "/minside",
      icon: <BiUser size={20} />,
      title: "Personlige opplysninger",
      description: "Se og endre dine personlige opplysninger",
    },
    {
      href: "/minside/ordrehistorikk",
      icon: <MdOutlineMarkunreadMailbox size={20} />,
      title: "Ordrehistorikk",
      description: "Se dine tidligere ordre her",
    },
    //{
    //  href: "/minside/fakturahistorikk",
    //  icon: <TbInvoice size={20} />,
    //  title: "Fakturahistorikk",
    //  description: "Se fakturahistorikken din her",
    //},
  ];

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {profileLinks.map((link, index) => {
        const isActive = link.href === activeLink;

        return (
          <Link
            key={index}
            href={isActive ? "#" : link.href}
            className={`flex group py-6 px-4 sm:px-8 items-center ${
              isActive
                ? "bg-secondary border-primary"
                : "bg-white border-transparent hover:bg-secondary hover:border-primary"
            } border-l-2 transition duration-200`}
          >
            <div
              className={`flex-shrink-0 flex self-start items-center justify-center ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-background group-hover:bg-primary text-primary group-hover:text-white"
              } w-12 h-12 mr-4 rounded-full transition duration-200`}
            >
              {link.icon}
            </div>
            <div>
              <h4
                className={`text-sm font-light tracking-wide ${
                  isActive
                    ? "text-white"
                    : "text-gray-600 group-hover:text-white"
                } mb-1`}
              >
                {link.title}
              </h4>
              <p
                className={`text-xs font-light ${
                  isActive
                    ? "text-gray-50"
                    : "text-gray-400 group-hover:text-gray-50"
                } transition duration-200`}
              >
                {link.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfileLinks;
