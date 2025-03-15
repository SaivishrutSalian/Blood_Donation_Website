import { useState } from "react";
import {
  FaBox,
  FaCalendarAlt,
  FaChartBar,
  FaClipboard,
  FaClipboardList,
  FaCog,
  FaElementor,
  FaHdd,
  FaHome,
  FaUser,
  FaUsers,
  FaAngleRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Menu = () => {
  const [activeLink, setActiveLink] = useState("/admin");
  const [isHovered, setIsHovered] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const menuItems = [
    {
      title: "Main",
      items: [
        { name: "Home", icon: FaHome, path: "/admin" },
        { name: "Profile", icon: FaUser, path: "/profile" }
      ]
    },
    {
      title: "Management",
      items: [
        { name: "Donors", icon: FaBox, path: "/admin/donors" },
        { name: "Prospects", icon: FaUsers, path: "/admin/prospects" },
        { name: "Orders", icon: FaClipboardList, path: "/admin/orders" }
      ]
    },
    {
      title: "System",
      items: [
        { name: "Elements", icon: FaElementor, path: "/elements" },
        { name: "Settings", icon: FaCog, path: "/settings" },
        { name: "Backups", icon: FaHdd, path: "/backups" }
      ]
    },
    {
      title: "Analytics",
      items: [
        { name: "Charts", icon: FaChartBar, path: "/charts" },
        { name: "Logs", icon: FaClipboard, path: "/logs" },
        { name: "Calendar", icon: FaCalendarAlt, path: "/calendar" }
      ]
    }
  ];

  return (
    <div className="h-screen bg-gray-900 shadow-xl w-[300px] transition-all duration-300">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-red-500">Blood Bank</h1>
        <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      <div className="py-4">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="px-6 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {section.title}
            </h2>
            {section.items.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                onClick={() => handleLinkClick(item.path)}
                onMouseEnter={() => setIsHovered(item.path)}
                onMouseLeave={() => setIsHovered("")}
              >
                <div
                  className={`flex items-center px-6 py-3 cursor-pointer transition-all duration-200
                    ${activeLink === item.path 
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white" 
                      : "hover:bg-gray-800"
                    }
                    ${isHovered === item.path ? "shadow-lg shadow-red-900/20" : ""}
                  `}
                >
                  <item.icon 
                    className={`w-5 h-5 ${
                      activeLink === item.path 
                        ? "text-white" 
                        : "text-red-500"
                    }`}
                  />
                  <span className={`ml-4 text-sm font-medium ${
                    activeLink === item.path 
                      ? "text-white"
                      : "text-gray-300" 
                  }`}>
                    {item.name}
                  </span>
                  <FaAngleRight 
                    className={`ml-auto transition-transform duration-200 ${
                      activeLink === item.path || isHovered === item.path
                        ? "opacity-100 transform translate-x-1"
                        : "opacity-0"
                    } ${activeLink === item.path ? "text-white" : "text-red-500"}`}
                  />
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
