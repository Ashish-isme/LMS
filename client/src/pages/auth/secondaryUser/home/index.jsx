import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";
import { UserContext } from "@/context/user-context";
import { fetchUserViewCourseListService } from "@/services";
import { courseCategories } from "@/config";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowDown,
  Search,
  BookOpen,
  Award,
  ArrowRight,
  Star,
} from "lucide-react";

function StudentHomePage() {
  const navigate = useNavigate();
  const { userViewCoursesList, setUserViewCoursesList } =
    useContext(UserContext);

  useEffect(() => {
    async function fetchCourses() {
      const response = await fetchUserViewCourseListService();
      console.log(response, "ResponseCourseList From Home Page");
      if (response?.success) setUserViewCoursesList(response?.data);
    }
    fetchCourses();
  }, [setUserViewCoursesList]);

  const handleCourseNavigate = (courseId) => {
    console.log(`Navigating to course: ${courseId}`);
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
              <p className="text-gray-600 text-lg font-medium">Start today!</p>
              <h1 className="text-5xl lg:text-6xl font-extrabold mt-2 leading-tight">
                We're
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-700">
                  {" "}
                  SkillSwap
                </span>
                <br /> digital learning studio.
              </h1>
              <p className="text-xl text-gray-600 mt-4 max-w-xl">
                SkillSwap connects learners and educators worldwide. Enroll in
                courses to expand your knowledge or share your expertise with
                others.
              </p>
              <div className="mt-8">
                <Button className="px-6 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg">
                  Browse Collection
                </Button>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                alt="Students learning"
                className="rounded-xl shadow-lg object-cover mx-auto"
                style={{ maxHeight: "400px" }}
              />

              <div className="hidden lg:block absolute -right-4 bottom-1/4">
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "easeInOut",
                  }}
                  className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center"
                >
                  <ArrowDown className="h-5 w-5" />
                </motion.div>
                <p className="text-gray-500 text-sm mt-2 ml-1">scroll down</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="font-bold text-3xl text-blue-600 mb-1">1,500+</p>
              <p className="text-gray-600">Online Courses</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="font-bold text-3xl text-blue-600 mb-1">12,000+</p>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="font-bold text-3xl text-blue-600 mb-1">300+</p>
              <p className="text-gray-600">Expert Instructors</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="font-bold text-3xl text-blue-600 mb-1">95%</p>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 px-4 lg:px-8 w-full">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Course Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {courseCategories.map((category) => (
              <Button
                className="justify-start font-medium text-md h-12"
                variant="outline"
                key={category.id}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How SkillSwap Works
          </h2>

          <div className="relative">
            {/* Connected line between steps */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 p-4 mb-6">
                  <Search className="h-10 w-10 text-blue-600" />
                </div>
                <div className="absolute top-10 -left-2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Discover
                </h3>
                <p className="text-gray-600">
                  Browse through our extensive library of courses across various
                  categories.
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 p-4 mb-6">
                  <BookOpen className="h-10 w-10 text-blue-600" />
                </div>
                <div className="absolute top-10 -left-2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Learn</h3>
                <p className="text-gray-600">
                  Enroll in courses and learn at your own pace with expert
                  instructors.
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 p-4 mb-6">
                  <Award className="h-10 w-10 text-blue-600" />
                </div>
                <div className="absolute top-10 -left-2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Achieve
                </h3>
                <p className="text-gray-600">
                  Complete courses, earn certificates, and showcase your new
                  skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Button className="flex items-center text-blue-600" variant="ghost">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {userViewCoursesList && userViewCoursesList.length > 0 ? (
              userViewCoursesList.map((courseItem) => (
                <Card
                  key={courseItem._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCourseNavigate(courseItem._id)}
                >
                  <div className="relative">
                    <img
                      src={courseItem.image}
                      alt={courseItem.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      {courseItem.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {courseItem.userName}
                    </p>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        <Star className="h-4 w-4 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-gray-700">
                          {courseItem.rating}
                        </span>
                      </div>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-600">
                        {courseItem.students} students
                      </span>
                    </div>
                    <p className="font-bold text-lg text-blue-600">
                      ${courseItem.pricing}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-lg text-gray-600">No Courses Found</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Students Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "SkillSwap completely transformed my career. I went from
                  knowing basic HTML to building full-stack applications in just
                  a few months."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Alex"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Alex Thompson</p>
                    <p className="text-sm text-gray-600">Software Developer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "The design courses are exceptional. They teach you not only
                  the tools but also the principles behind great products.
                  Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Maya"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Maya Patel</p>
                    <p className="text-sm text-gray-600">UX Designer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400" />
                  ))}
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-gray-700 mb-6">
                  "As someone switching careers, SkillSwap was the perfect
                  platform to learn digital marketing. The projects helped me
                  build a portfolio."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/86.jpg"
                      alt="James"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">James Wilson</p>
                    <p className="text-sm text-gray-600">
                      Marketing Specialist
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg">
              Join SkillSwap Today
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already learning and growing
              with SkillSwap.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-lg">
              Get Started For Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
