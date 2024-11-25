import { useEffect } from "react"
import Bar from "@/components/Bar"
import Image from "next/image"
import { useReward } from "react-rewards"
import { motion } from "framer-motion"

type Props = {
    scorePercentage: number,
    score: number,
    totalQuestions: number
}

const QuizzSubmission = (props: Props) => {
    const { scorePercentage, score, totalQuestions } = props
    const { reward } = useReward('rewardId', 'confetti')
    
    useEffect(() => {
        if (scorePercentage === 100) {
            reward()
        }
    }, [scorePercentage, reward])

    return (
        <div className="flex flex-col flex-1 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <main className="py-11 flex flex-col gap-8 items-center flex-1 mt-24 px-4">
                <motion.h2 
                    className="text-4xl font-bold text-blue-600"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Hoàn thành kiểm tra!
                </motion.h2>
                <motion.p 
                    className="text-2xl text-gray-700"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Điểm của bạn: <span className="font-bold text-blue-600">{scorePercentage}%</span>
                </motion.p>
                {scorePercentage === 100 ? (
                    <motion.div 
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <p className="text-2xl font-bold text-green-500 mb-4">Chúc mừng!</p>
                        <div className="flex justify-center rounded-full overflow-hidden shadow-lg">
                            <Image src="/images/owl-smiling.png" alt="Smiling owl image" width={300} height={300} />
                        </div>
                        <span id="rewardId"/>
                    </motion.div>
                ) : (
                    <>
                        <motion.div 
                            className="flex flex-row gap-8 mt-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Bar percentage={scorePercentage} color="green" />
                            <Bar percentage={100 - scorePercentage} color="red"/>
                        </motion.div>
                        <motion.div 
                            className="flex flex-row gap-8 text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <p className="text-green-600 font-semibold">{score} Chính xác</p>
                            <p className="text-red-600 font-semibold">{totalQuestions - score} Chưa chính xác</p>
                        </motion.div>
                    </>
                )}
            </main>
        </div>
    )
}

export default QuizzSubmission;

