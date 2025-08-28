export default function Footer() {
    return (
        <footer className="py-6 text-center bg-[#412721] text-white">
            <p>
                © {new Date().getFullYear()}{" "}
                <a
                    href="https://www.hackconcordia.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    HackConcordia
                </a>
                . All rights reserved.
            </p>
        </footer>
    );
}
