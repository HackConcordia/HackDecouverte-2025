import { useState, useEffect } from 'react';
import { useTranslation } from "@/i18n/TranslationContext";

interface CountdownProps {
    targetDate: string | Date;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const { t } = useTranslation();
    const calculateTimeLeft = (): TimeLeft => {
        const difference = +new Date(targetDate) - +new Date();

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!isClient) {
        return null;
    }

    const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
        <div
            key={interval}
            className="flex flex-col items-center mt-6 w-[80px] md:w-[80px] animate-fade-bottom text-gray-900"
        >
            <span className="text-4xl md:text-5xl font-bold">{value}</span>
            <span className="text-lg md:text-lg capitalize mt-2">{t(`hero.${interval}`)}</span>
        </div>
    ));

    return (
        <div className="flex justify-center items-center space-x-4">
            {timerComponents.length > 0 ? timerComponents : <span>{t("hero.started")}</span>}
        </div>
    );
};

export default Countdown;
