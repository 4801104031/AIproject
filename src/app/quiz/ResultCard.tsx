import React from 'react'
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { CheckCircle, XCircle } from 'lucide-react'

type Props = {
    isCorrect: boolean | null,
    correctAnswer: string
}

const ResultCard = ({ isCorrect, correctAnswer }: Props) => {
    if (isCorrect === null) {
        return null
    }

    const text = isCorrect ? 'Chính xác!' : `Chưa chính xác! Đáp án đúng là: ${correctAnswer}`
    
    const borderClasses = isCorrect ? "border-green-500" : "border-red-500"
    const bgClasses = isCorrect ? "bg-green-100" : "bg-red-100"
    const textClasses = isCorrect ? "text-green-700" : "text-red-700"
  
    return (
        <motion.div 
            className={cn(
                borderClasses,
                bgClasses,
                "border-2",
                "rounded-lg",
                "p-6",
                "text-center",
                "text-lg",
                "font-semibold",
                "mt-4",
                "shadow-md",
                "flex",
                "items-center",
                "justify-center",
                "space-x-3"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
                <XCircle className="w-6 h-6 text-red-500" />
            )}
            <span className={textClasses}>{text}</span>
        </motion.div>
    )
}

export default ResultCard

