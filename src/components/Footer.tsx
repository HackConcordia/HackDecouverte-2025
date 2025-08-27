export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 text-center">
            <p>
                © {new Date().getFullYear()}{" "}
                <a
                    href="https://www.hackconcordia.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                >
                    HackConcordia
                </a>
                . All rights reserved.
            </p>
        </footer>
    );
}
