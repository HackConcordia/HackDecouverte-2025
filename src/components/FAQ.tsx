const faqs = [
    {
        question: "What is HackDécouverte?",
        answer: "HackDécouverte is a hackathon where participants create projects and learn new skills.",
    },
    {
        question: "Who can participate?",
        answer: "Students, developers, designers, and innovators of all skill levels.",
    },
    {
        question: "Is there a registration fee?",
        answer: "No, participation is completely free!",
    },
];

export default function FAQ() {
    return (
        <section id="faq" className="py-20 bg-white">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="border rounded-lg p-4 shadow">
                        <h3 className="text-xl font-semibold">{faq.question}</h3>
                        <p className="text-gray-700 mt-2">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
