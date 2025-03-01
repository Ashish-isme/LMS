import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { courseCategories } from "@/config";
import { UserContext } from "@/context/user-context";

function StudentHomePage() {
  const [userCoursesList, setUserCoursesList] = useContext(UserContext);
  return (
    <div className="h-auto bg-white flex flex-col items-center justify-center">
      <section className="flex flex-col  mt-10 lg:flex-row items-center justify-between px-8 lg:px-20 w-full ">
        <div className="lg:w-1/2 text-center lg:text-left">
          <p className="text-gray-600 text-lg font-medium">Start today !</p>
          <h1 className="text-5xl lg:text-6xl font-extrabold mt-2 leading-tight">
            We’re{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-700">
              SkillSwap
            </span>
            <br />
            digital learning studio.
          </h1>
        </div>

        <div className="hidden lg:block absolute right-20 top-1/2 transform -translate-y-1/2">
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
              className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center"
            >
              <span className="text-lg">↓</span>
            </motion.div>
            <p className="text-gray-500 text-sm rotate-90 mt-2">scroll down</p>
          </div>
        </div>
      </section>

      <div className="mt-6">
        <Button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900">
          Browse Collection
        </Button>
      </div>

      <section className="py-8 px-4 lg:px-8 bg-gray-100 mt-20  w-full">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start"
              variant="outline"
              key={categoryItem.id}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
