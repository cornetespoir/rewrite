"use client"
import { ReactElement } from "react"


const Header = (): ReactElement | null => {
    return (
        <>
                <nav>
                    <div className='nav-container'>
                        <h2>Findtags</h2>
                        <div className='nav-links'>
                            <a href='/'>Home</a>
                            <a href='/pages/about'>About</a>
                            <a href='/pages/faq'>FAQ</a>
                            <a href='/'>Github</a>
                        </div>
                    </div>
                </nav>
            <section id='heading'>
                <div>
                    <h3>Search for a tag to view any post with that tag (within the first 5 tags)</h3>
                    <div>
                        <p>
                            <a href='/pages/faq#faq-firstfive' target='_blank'>
                                Why only the first 5?
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-info">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export { Header }