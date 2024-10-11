import { FaGithubSquare, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

export default function LinkShowCase() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-[#FAFAFA] border p-6 rounded-lg w-6/12">
        <div className="mb-8">
          <div className="block w-[80px] h-[80px] mx-auto mb-4">
            <img
              src="https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/420939625_3613720648874238_8150845650701322852_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=LfHLzEFM2g4Q7kNvgFuASUQ&_nc_ht=scontent.fdac41-1.fna&_nc_gid=A0qucnLEjZCrQLekvaW8Wsn&oh=00_AYCs9nMTw2vk2TgbCnywKY-aaSUYpQTGw35UlQaSKSRTJQ&oe=670EAD4F"
              alt="Polash Ahmad"
              className="w-full h-full rounded-full object-cover border-2 border-[#2D68FF]"
            />
          </div>
          <div className="flex justify-center items-center">
            <p className="font-semibold text-sm opacity-80">John Doe</p>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-[#6E6E6E] text-sm opacity-90">john@gmail.com</p>
          </div>
        </div>
        <div>
          <ul className="flex flex-wrap flex-col gap-2">
            <li className="text-sm bg-black text-white flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer">
              <FaGithubSquare />
              <span className="text-sm opacity-90">Github</span>
              <FaArrowRight />
            </li>

            <li className="text-sm bg-red-600 text-white flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer">
              <FaYoutube />
              <span className="text-sm opacity-90">YouTube</span>
              <FaArrowRight />
            </li>

            <li className="text-sm bg-black text-white flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer">
              <FaLinkedin />
              <span className="text-sm opacity-90">Linkedin</span>
              <FaArrowRight />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
