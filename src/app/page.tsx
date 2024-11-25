"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, ChevronRight, Github, Twitter } from 'lucide-react'
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">IT Quiz</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">Giới thiệu</Link></li>
              <li><Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Tính năng</Link></li>
              <li><Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Liên hệ</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">Chào mừng bạn đến với IT Quiz</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Kiểm tra kiến thức của bạn với nền tảng quiz được hỗ trợ bởi AI của chúng tôi.</p>
        </div>

        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-28 h-28 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Brain className="w-16 h-16 text-blue-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-blue-600">
              Bắt đầu hành trình khám phá kiến thức của bạn
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-white-600">
              Thử thách bản thân với những câu hỏi được chọn lọc kỹ lưỡng về các chủ đề CNTT.
            </p>
            <div className="grid gap-4" id="features">
              <div className="flex items-center gap-3 justify-center">
                <span className="w-3 h-3 bg-blue-600 rounded-full" />
                <p className="text-white-600">Câu hỏi trắc nghiệm</p>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <span className="w-3 h-3 bg-blue-600 rounded-full" />
                <p className="text-white-600">Phản hồi tức thì</p>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <span className="w-3 h-3 bg-blue-600 rounded-full" />
                <p className="text-white-600">Theo dõi tiến độ học tập</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              className="w-64 text-lg py-6"
              onClick={() => router.push('/quiz')}
              variant="neo"
            >
              Bắt đầu
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>

        <section id="about" className="mt-20">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Về IT Quiz</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center">
            IT Quiz là một nền tảng sáng tạo được thiết kế dành cho những người yêu công nghệ, học sinh, và các chuyên gia, giúp kiểm tra và nâng cao kiến thức trong nhiều lĩnh vực CNTT. Hệ thống được hỗ trợ bởi AI của chúng tôi đảm bảo mang lại trải nghiệm học tập cá nhân hóa, phù hợp với trình độ và sở thích của từng người dùng.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100" id="contact">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-blue-600">IT Quiz</span>
            </div>
            <div className="flex space-x-4">
              <Link href="https://github.com" className="text-white-600 hover:text-blue-600 transition-colors">
                <Github className="w-6 h-6" />
              </Link>
              <Link href="https://twitter.com" className="text-white-600 hover:text-blue-600 transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-white-600">
            <p>&copy; 2023 IT Quiz AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

