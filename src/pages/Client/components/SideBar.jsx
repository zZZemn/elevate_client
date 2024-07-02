import LogoutIcon from "../../../components/Icons/LogoutIcon";
import ProfileIcon from "../../../components/Icons/ProfileIcon";
import SettingsIcon from "../../../components/Icons/SettingsIcon";

function SideBar() {
  return (
    <>
      <div className="bg-black text-white absolute p-5 right-0">
        <ul>
          <li className="py-2">
            <button className="flex">
              <ProfileIcon /> <span className="mx-2">Profile</span>
            </button>
          </li>
          <li className="py-2">
            <button className="flex">
              <SettingsIcon /> <span className="mx-2">Settings</span>
            </button>
          </li>
          <li className="py-2">
            <button className="flex">
              <LogoutIcon /> <span className="mx-2">Log Out</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
