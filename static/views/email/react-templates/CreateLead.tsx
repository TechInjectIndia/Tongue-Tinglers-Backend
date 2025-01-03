import React from "react";
import MailLayout from "./MailLayout";

const CreateLead = () => (
    <MailLayout>
        <div className="bg-white rounded-lg p-6">
            <div className="p-0">
                <p className="text-[20px] mt-0 text-center text-[#e38b2a] uppercase font-bold leading-normal">
                    Thank you for taking the <br /> first step toward joining the <br /> Tongue
                    Tinglers Revolution!
                </p>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    We’re excited about your interest to be a part of our growing franchise network.
                </p>

                {/* Button */}
                <div className="text-center">
                    <button
                        className="border border-none cursor-pointer text-[16px] text-white py-3 px-6 w-fit mx-auto rounded"
                        style={{
                            background: "linear-gradient(to right, #dc322f, #ffcd32)",
                        }}
                    >
                        What’s NEXT?
                    </button>
                </div>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    Our team will review your details and connect with you soon to share all the
                    information you need about our franchise opportunities.
                    <br />
                    From investment details to operational support, we’ll guide you through
                    everything to make your journey with Tongue Tinglers seamless and rewarding.
                    <br />
                    <br />
                    Thank you for trusting Tongue Tinglers. 
                    <br />
                    Together, we’ll create a legacy of taste and excellence!
                    </p>
            </div>
        </div>
    </MailLayout>
);

export default CreateLead;
