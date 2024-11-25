import { cn } from "@/lib/utils"

type BarProps = {
    percentage: number,
    color: string
}

const Bar = ({ percentage, color }: BarProps) => {
    const barStyle = {
        height: `${percentage}%`
    }

    const barBgClasses: Record<string, string> = {
        'green': 'bg-green-500',
        'red': 'bg-red-500',
        'blue': 'bg-blue-500'
    }

    return (
        <div className="h-40 flex flex-col items-center justify-end w-24">
            <div className="relative w-full h-full flex items-end">
                <div 
                    className={cn(
                        barBgClasses[color],
                        "w-16 rounded-t-xl shadow-lg transition-all duration-500 ease-out relative overflow-hidden"
                    )} 
                    style={barStyle}
                >
                    <div className="absolute inset-0 bg-white opacity-25 animate-pulse"></div>
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="h-full w-[200%] animate-shine bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="text-center mt-2 font-semibold text-gray-700">{percentage}%</div>
        </div>
    )
}

export default Bar;

