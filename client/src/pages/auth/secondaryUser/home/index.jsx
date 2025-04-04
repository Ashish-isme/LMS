import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";
import { UserContext } from "@/context/user-context";
import { fetchUserViewCourseListService } from "@/services";
import { checkCoursePurchaseInfoService } from "@/services";
import { courseCategories } from "@/config";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    async function fetchCourses() {
      const response = await fetchUserViewCourseListService();
      console.log(response, "ResponseCourseList From Home Page");
      if (response?.success) setUserViewCoursesList(response?.data);
    }
    fetchCourses();
  }, [setUserViewCoursesList]);

  async function handleCourseNavigation(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }

    console.log(response, "reponse for navigation");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-10 pb-16 relative overflow-hidden">
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
      <section className="py-8 px-4 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Courses
            </h2>
            <Button
              onClick={() => navigate("/courses")}
              className="flex items-center text-blue-600"
              variant="ghost"
            >
              View All
            </Button>
          </div>

          {userViewCoursesList && userViewCoursesList.length > 0 ? (
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {userViewCoursesList.map((courseItem) => (
                    <CarouselItem
                      key={courseItem._id}
                      className="pl-4 basis-full sm:basis-1/3 md:basis-1/4 lg:basis-1/4"
                    >
                      <div
                        className="cursor-pointer group border border-gray-200 rounded-lg overflow-hidden h-full"
                        onClick={() => handleCourseNavigation(courseItem._id)}
                      >
                        {/* Image Container */}
                        <div className="relative overflow-hidden">
                          <img
                            src={courseItem.image}
                            alt={courseItem.title}
                            className="w-full h-32 object-cover"
                          />
                          {courseItem.isNew && (
                            <div className="absolute bottom-2 left-2 bg-green-400 text-xs font-semibold px-2 py-0.5 rounded-full text-black">
                              New
                            </div>
                          )}
                        </div>

                        <div className="p-3">
                          {/* Course Info */}
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <div>{courseItem.students} students</div>
                            <div>{courseItem.duration || "4h 26m"}</div>
                          </div>

                          {/* Course Title */}
                          <h3 className="font-bold text-sm mb-1 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {courseItem.title}
                          </h3>

                          {/* Instructor Name */}
                          <p className="text-xs text-gray-700 mb-1">
                            {courseItem.userName}
                          </p>

                          {/* Price */}
                          <div className="flex justify-between items-center mt-2">
                            <p className="font-bold text-sm text-blue-600">
                              ${courseItem.pricing}
                            </p>
                            <button className="text-gray-400 hover:text-gray-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                  <CarouselNext className="h-8 w-8 bg-white border border-gray-200 shadow-md" />
                </div>
              </Carousel>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">No Courses Found</p>
            </div>
          )}
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
