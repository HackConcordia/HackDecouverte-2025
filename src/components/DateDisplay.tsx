import { useTranslation } from '@/i18n/TranslationContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegCalendarPlus } from 'react-icons/fa';

const DateDisplay = ({ startDate, endDate } : any) => {
  const { t } = useTranslation();
  const [formattedDate, setFormattedDate] = useState('');
  const [startISODate, setStartISODate] = useState('');
  const [endISODate, setEndISODate] = useState('');
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);

    const getOrdinalSuffix = (day: number) => {
      if (day > 3 && day < 21) return 'th'; // exceptions for 11th, 12th, 13th
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const formatDate = (date: string) => {
      try {
        const d = new Date(date);
        const day = d.getDate();
        const suffix = getOrdinalSuffix(day);
        return `${day}<sup>${suffix}</sup> ${d.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
        })}`;
      } catch (e) {
        setError('Invalid date value');
        return '';
      }
    };

    const toISOFormat = (date: string) => {
      try {
        return new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0];
      } catch (e) {
        setError('Invalid date value');
        return '';
      }
    };

    const startFormatted = formatDate(startDate);
    const endFormatted = formatDate(endDate);

    if (startFormatted && endFormatted) {
      setFormattedDate(`${startFormatted} - ${endFormatted}`);
      setStartISODate(toISOFormat(startDate));
      setEndISODate(toISOFormat(endDate));
    }
  }, [startDate, endDate]);

  if (!mounted || error) {
    return error ? <div className='text-center mt-6 text-red-500'>{error}</div> : null;
  }

  return (
    <div className='flex justify-center flex-col items-center mt-4 md:mt-4 md:mb-3 relative'>
      <p className="relative text-xs md:text-sm lg:text-base mb-0 font-bold lg:px-0 mt-1 lg:mt-0">
                {t("hero.event")}
            </p>
      <Link
        href={`https://www.google.com/calendar/render?action=TEMPLATE&text=HackDecouverte+2025&dates=${startISODate}/${endISODate}&details=Join+us+for+HackDecouverte!+Watch+our+social+media+platforms+and+emails+for+more+details.`}
        target='_blank'
        rel='noopener noreferrer'
        className={`hover:scale-105 active:scale-95 duration-300 group animate-fade-in-2 flex gap-1 items-center justify-center w-fit transition-all border-2 border-[#491000] text-[#491000] font-bold hover:bg-[#320b00] hover:text-white py-2 px-3 rounded-sm text-xs mt-4`}
      >
        Add to calendar
        <FaRegCalendarPlus className='text-sm opacity-70 transition-all group-hover:translate-x-1' />
      </Link>
    </div>
  );
};

export default DateDisplay;