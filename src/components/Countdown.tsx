import { useState, useEffect } from 'react';

const Countdown = ({ targetDate }: any) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: any = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
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

    const timerComponents: any[] = [];

    Object.keys(timeLeft).forEach((interval) => {
        timerComponents.push(
            <div
                key={interval}
                className='flex flex-col items-center mt-6 w-[80] md:w-[80px] animate-fade-bottom text-gray-900 dark:text-gray-100'
            >
                <span className='text-4xl md:text-5xl font-bold'>{timeLeft[interval]}</span>
                <span className='text-lg md:text-lg capitalize mt-2'>{interval}</span>
            </div>
        );
    });

    return (
        <div className='flex justify-center items-center space-x-4'>
            {timerComponents.length ? timerComponents : 'Event has started!'}
        </div>
    );
};

export default Countdown;