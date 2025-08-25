export default function Hero() {
    return (
        <section className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6">
            <h1 className="text-5xl font-bold mb-4">Welcome to HackDécouverte 2025</h1>
            <p className="text-lg mb-6 max-w-2xl">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, ratione dolores molestias nesciunt, aliquam nisi et sit illum unde eveniet omnis autem. Quibusdam mollitia ad debitis, tempore dolores eos. Aut.
            </p>
            <a
                href="#about-us"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:bg-gray-100"
            >
                Learn More
            </a>
        </section>
    );
}
