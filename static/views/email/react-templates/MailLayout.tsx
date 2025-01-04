// Layout.jsx
import { Container, Head, Html, Section, Tailwind } from "@react-email/components";
import React from "react";
import {
    EMAIL_BG_IMAGE_URL,
    EMAIL_LOGO_URL,
    EMAIL_MAIL_LOGO,
    EMAIL_PHONE_LOGO,
} from "../constants";


function MailLayout({ children }: any ) {
    return (
        <Html lang="en">
            <Head></Head>

            <Tailwind>
                <Container
                    className="main-container w-[700px] my-4 p-8 bg-gray-100 rounded-lg"
                    style={{
                        backgroundImage: `url(${EMAIL_BG_IMAGE_URL})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        overflow: "visible",
                    }}
                >
                    <Section>
                        <div className="text-center px-4 pt-4 mb-0 pb-0">
                            <img
                                src={EMAIL_LOGO_URL}
                                className="w-[240px] mx-auto rounded-lg"
                                alt="TT Logo"
                            />
                        </div>

                        {/* <br /> */}
                        {/* <br /> */}
                        <main>{children}</main>
                        {/* <br /> */}
                        <br />

                        {/* Footer Section */}
                        <div className="footer mt-2 border-t mb-2">
                            <div className="flex justify-center items-center w-fit mx-auto text-center">
                                {/* Phone */}
                                <div className="flex justify-end items-center">
                                    <img src={EMAIL_PHONE_LOGO} className="w-5 h-5" alt="" />
                                    <button className="text-md border border-none bg-transparent ml-2 py-0 my-0 !text-white text-right">
                                        +91 40 4508 1790
                                    </button>
                                </div>

                                {/* Email */}
                                <div className="flex justify-start items-center ml-4">
                                    <img className="w-5 h-5" src={EMAIL_MAIL_LOGO} alt="" />
                                    <button className="text-md ml-2 cursor-pointer border border-none bg-transparent !text-white py-0 my-0">
                                        info@tonguetingler
                                    </button>
                                </div>
                            </div>
                            <button className="text-[15px] cursor-pointer w-full border border-none bg-transparent mt-4 !text-white  text-center font-bold pt-2 my-0">
                                tonguetingler
                            </button>
                            <div>
                                <p className="text-[16px] mt-5 text-center !text-white capitalize font-semibold">
                                    Experience the Tingle of Tradition in every bite!
                                </p>
                            </div>
                        </div>
                    </Section>
                </Container>
            </Tailwind>
        </Html>
    );
}

export default MailLayout;
